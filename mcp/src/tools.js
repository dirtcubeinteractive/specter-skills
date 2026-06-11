import { z } from 'zod';
import { toolResult } from './specter-client.js';

const text = (s) => ({ content: [{ type: 'text', text: s }] });

// ---------------------------------------------------------------------------
// Client-API tools — read/inspect a project + safe test-player actions.
// ---------------------------------------------------------------------------
export function registerClientTools(server, specter) {
  server.registerTool(
    'specter_verify_setup',
    {
      description:
        'Smoke-test the configured Specter project: api-key validity, project info, currencies, test-player auth, wallet provisioning, and configured tasks. Call this first when diagnosing "is my Specter setup working?".',
      inputSchema: {},
    },
    async () => {
      const lines = [];
      const step = (name, ok, detail) => lines.push(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
      try {
        const welcome = await specter.client('app/welcome');
        step('api-key valid', welcome.json?.status === 'success', welcome.json?.status !== 'success' ? `HTTP ${welcome.http}` : undefined);
        const info = await specter.client('app/get-info');
        step('project info', info.json?.status === 'success', info.json?.data?.name);
        const cur = await specter.client('app/get-currencies', { limit: 10 });
        const currencies = (cur.json?.data?.currencies ?? cur.json?.data ?? []).map((c) => c.id);
        step('currencies configured', currencies.length > 0, currencies.join(', ') || 'none');
        const bal = currencies.length
          ? await specter.client('player/me/get-wallet-balance', { currencyIds: currencies.slice(0, 5) }, { auth: 'player' })
          : null;
        if (bal) step('test player + wallets', Array.isArray(bal.json?.data), (bal.json?.data ?? []).map((b) => `${b.id}=${b.balance}`).join(', '));
        const tasks = await specter.client('app/get-tasks', { limit: 5, attributes: ['event'] });
        const t = tasks.json?.data?.tasks ?? [];
        step('tasks configured', t.length > 0, t.map((x) => x.id).join(', ') || 'none');
      } catch (e) {
        step('network', false, e.message);
      }
      return text(lines.join('\n'));
    }
  );

  server.registerTool(
    'specter_get_project_info',
    { description: 'Get the Specter project/app configuration (name, platforms, metadata).', inputSchema: {} },
    async () => toolResult(await specter.client('app/get-info'))
  );

  server.registerTool(
    'specter_get_currencies',
    {
      description: 'List the project\'s configured currencies (id, name, type virtual/real, code). Currency `id` is the slug used in wallet calls.',
      inputSchema: { limit: z.number().optional().describe('max results, default 20') },
    },
    async ({ limit }) => toolResult(await specter.client('app/get-currencies', { limit: limit ?? 20 }))
  );

  server.registerTool(
    'specter_get_items',
    {
      description: 'List the project\'s configured inventory items. Supports text search.',
      inputSchema: {
        search: z.string().optional().describe('search keyword in item names'),
        limit: z.number().optional().describe('max results, default 10'),
      },
    },
    async ({ search, limit }) =>
      toolResult(await specter.client('app/get-items', { search, limit: limit ?? 10, attributes: ['properties', 'prices'] }))
  );

  server.registerTool(
    'specter_get_tasks',
    {
      description:
        'List configured tasks/achievements with their trigger events. NOTE: the returned event.id is a UUID; events/send-custom needs the dashboard event SLUG (event name in snake_case), not that UUID.',
      inputSchema: { limit: z.number().optional().describe('max results, default 20') },
    },
    async ({ limit }) => toolResult(await specter.client('app/get-tasks', { limit: limit ?? 20, attributes: ['event', 'rewardDetails'] }))
  );

  server.registerTool(
    'specter_get_leaderboards',
    { description: 'List the project\'s configured leaderboards (interval, scoring, prizes).', inputSchema: {} },
    async () => toolResult(await specter.client('app/get-leaderboards', { limit: 20 }))
  );

  server.registerTool(
    'specter_send_test_event',
    {
      description:
        'Send a custom event AS THE DEDICATED TEST PLAYER (customId "specter-mcp-test-player") to test task rules end-to-end. eventId is the dashboard event slug (e.g. "daily_streak_hit"). Affects only the test player. Task validation is async — check status a few seconds later with specter_get_test_player_status.',
      inputSchema: {
        eventId: z.string().describe('dashboard event slug, NOT the event UUID'),
        customParams: z.record(z.union([z.number(), z.string(), z.boolean()])).optional().describe('event parameters, e.g. {"clicks": 100}'),
      },
    },
    async ({ eventId, customParams }) =>
      toolResult(await specter.client('events/send-custom', { eventId, customParams: customParams ?? {} }, { auth: 'player' }))
  );

  server.registerTool(
    'specter_get_test_player_status',
    {
      description: 'Get the test player\'s wallet balances and task statuses — use after specter_send_test_event to verify task rules fired.',
      inputSchema: {
        currencyIds: z.array(z.string()).optional().describe('currency slugs to check, e.g. ["coins"]'),
        taskIds: z.array(z.string()).optional().describe('task ids to check'),
      },
    },
    async ({ currencyIds, taskIds }) => {
      const out = {};
      if (currencyIds?.length) {
        const r = await specter.client('player/me/get-wallet-balance', { currencyIds }, { auth: 'player' });
        out.wallets = r.json?.data ?? r.json?.errors;
      }
      const r2 = await specter.client('player/me/get-task-status', taskIds?.length ? { taskIds } : {}, { auth: 'player' });
      out.taskStatuses = r2.json?.data ?? r2.json?.errors;
      if (taskIds?.length) {
        const r3 = await specter.client('player/me/get-task-progress', { taskIds }, { auth: 'player' });
        out.taskProgress = r3.json?.data ?? r3.json?.errors;
      }
      return text(JSON.stringify(out, null, 1).slice(0, 12000));
    }
  );
}

// ---------------------------------------------------------------------------
// Admin tools — configure the game. Read tools always (when admin creds set);
// mutating tools only with SPECTER_ALLOW_MUTATIONS=true, and every call must
// pass confirm:true after the user has approved the exact payload.
// ---------------------------------------------------------------------------
const CONFIRM = z
  .boolean()
  .describe('Must be true. BEFORE setting this, show the user exactly what will be created/changed and get their explicit approval.');

function gate(specter, input, summary) {
  if (!specter.allowMutations) {
    return text('Mutations are disabled on this MCP server. Set SPECTER_ALLOW_MUTATIONS=true in the server env to enable (recommended only against dev/staging projects).');
  }
  if (input.confirm !== true) {
    return text(`NOT EXECUTED. Show the user this plan and call again with confirm:true after they approve:\n${summary}`);
  }
  return null;
}

export function registerAdminTools(server, specter) {
  server.registerTool(
    'specter_admin_list_projects',
    {
      description: 'ADMIN: list the organisation\'s projects/apps (id, name, environments).',
      inputSchema: { organisationId: z.string().describe('organisation id') },
    },
    async ({ organisationId }) => toolResult(await specter.admin('app/get', { organisationId, pageNo: 1, pageSize: 20 }))
  );

  server.registerTool(
    'specter_admin_create_currency',
    {
      description:
        'ADMIN/MUTATING: create a currency in the project. EXPERIMENTAL — payload fields may need adjustment; on validation errors, report them to the user rather than retrying blindly.',
      inputSchema: {
        confirm: CONFIRM,
        projectId: z.string().optional().describe('defaults to SPECTER_PROJECT_ID'),
        name: z.string().describe('display name, e.g. "Gems"'),
        currencyId: z.string().describe('slug used by the client API, e.g. "gems"'),
        currencyType: z.enum(['soft', 'hard']).describe('soft = earnable, hard = premium'),
        description: z.string().optional(),
        extraFields: z.record(z.any()).optional().describe('additional DTO fields if needed'),
      },
    },
    async (input) => {
      const projectId = input.projectId ?? specter.projectId;
      const body = {
        projectId,
        name: input.name,
        currencyId: input.currencyId,
        currencyType: input.currencyType,
        description: input.description,
        ...input.extraFields,
      };
      return gate(specter, input, JSON.stringify(body, null, 1)) ?? toolResult(await specter.admin('currencies/add', body));
    }
  );

  server.registerTool(
    'specter_admin_create_item',
    {
      description: 'ADMIN