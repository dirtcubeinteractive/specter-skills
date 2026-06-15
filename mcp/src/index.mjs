#!/usr/bin/env node
/**
 * @specterapp/mcp — Model Context Protocol server for the Specter game backend.
 *
 * Read-only tools (always on): verify_setup + list currencies, items, bundles,
 * stores, tasks, leaderboards, tournaments, battlepasses, progression systems,
 * markers.
 * Mutating admin tools (opt-in via SPECTER_ALLOW_MUTATIONS=true + login): create
 * currency, item, bundle, store, task, mission, battlepass, level system,
 * progression marker, leaderboard, competition; schedule live-ops; grant reward.
 * Each is annotated non-readonly so MCP hosts gate it behind user confirmation.
 *
 * Configure via env in your MCP host (e.g. claude_desktop_config.json):
 *   SPECTER_API_KEY          (required)         client api-key
 *   SPECTER_ENV              staging|production (default staging)
 *   SPECTER_ALLOW_MUTATIONS  "true" to enable create-* tools
 *   SPECTER_ADMIN_URL        admin API base (e.g. https://admin.specterapp.xyz/v1)
 *   SPECTER_MEMBER_EMAIL / SPECTER_MEMBER_PASSWORD   dashboard member login
 *   SPECTER_PROJECT_ID       default projectId for admin calls
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { SpecterClient, toolResult } from './specter-client.mjs';
import { loginViaBrowser, clearCreds, loadCreds } from './auth.mjs';

const specter = new SpecterClient(process.env);

// --- CLI subcommands (run in a terminal, before/outside the MCP host) ---
const sub = process.argv[2];
if (sub === 'login') {
  console.log(`Opening the Specter dashboard to authorize specter-mcp (${specter.env})…`);
  try {
    const creds = await loginViaBrowser({
      env: specter.env,
      adminBase: specter.adminBase,
      apiKey: specter.apiKey,
      dashboardUrl: specter.dashboardUrl,
      onUrl: (u) => console.log(`If the browser didn't open, visit:\n  ${u}\n`),
    });
    console.log(`✓ Authenticated${creds.memberId ? ` as member ${creds.memberId}` : ''}. Saved to ~/.specter/credentials.json`);
    process.exit(0);
  } catch (e) {
    console.error(`✗ Login failed: ${e.message}`);
    process.exit(1);
  }
} else if (sub === 'logout') {
  clearCreds(specter.env);
  console.log(`✓ Cleared stored credentials for ${specter.env}.`);
  process.exit(0);
} else if (sub === 'whoami') {
  const c = loadCreds(specter.env);
  console.log(c ? `Authenticated for ${specter.env} (member ${c.memberId ?? '?'}, saved ${c.savedAt})` : `Not logged in for ${specter.env}. Run: specter-mcp login`);
  process.exit(0);
}

const server = new McpServer(
  { name: 'specter', version: '0.1.0' },
  { instructions: 'Inspect and configure a Specter game backend. Read tools are safe; create-* tools mutate live game configuration — confirm with the user and prefer the staging environment.' }
);

// ---- read-only tools ----

server.registerTool(
  'specter_verify_setup',
  {
    title: 'Verify Specter setup',
    description: 'Smoke-test the configured Specter project: api-key validity, project info, currencies, test-player login, wallet provisioning, and tasks. Use this first to answer "is my Specter backend set up correctly?".',
    inputSchema: {},
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async () => {
    const checks = [];
    const welcome = await specter.client('app/welcome');
    checks.push(`api-key: ${welcome.json?.status === 'success' ? 'valid' : `FAILED (HTTP ${welcome.http})`}`);
    const info = await specter.client('app/get-info', {});
    checks.push(`project: ${info.json?.data?.name ?? 'unknown'}`);
    const cur = await specter.client('app/get-currencies', { limit: 20 });
    const curList = cur.json?.data?.currencies ?? cur.json?.data ?? [];
    checks.push(`currencies: ${Array.isArray(curList) && curList.length ? curList.map((c) => c.id).join(', ') : 'none'}`);
    const tasks = await specter.client('app/get-tasks', { limit: 5 });
    checks.push(`tasks: ${tasks.json?.data?.tasks?.length ?? 0} configured`);
    let walletLine = 'wallets: (skipped)';
    try {
      const ids = (Array.isArray(curList) ? curList : []).map((c) => c.id).filter(Boolean).slice(0, 5);
      if (ids.length) {
        const w = await specter.client('player/me/get-wallet-balance', { currencyIds: ids }, { auth: 'player' });
        walletLine = `wallets: ${Array.isArray(w.json?.data) ? `provisioned (${w.json.data.length})` : 'NOT provisioned'}`;
      }
    } catch (e) {
      walletLine = `wallets: login failed (${e.message})`;
    }
    checks.push(walletLine);
    return { content: [{ type: 'text', text: `Specter (${specter.env}) setup:\n- ${checks.join('\n- ')}` }] };
  }
);

// Data-driven list tools — each reads an app/get-* catalog endpoint (client api-key).
const LIST_TOOLS = [
  ['specter_list_currencies', 'app/get-currencies', 'currencies'],
  ['specter_list_items', 'app/get-items', 'items'],
  ['specter_list_bundles', 'app/get-bundles', 'bundles / loot boxes'],
  ['specter_list_stores', 'app/get-stores', 'stores'],
  ['specter_list_tasks', 'app/get-tasks', 'tasks / achievements'],
  ['specter_list_leaderboards', 'app/get-leaderboards', 'leaderboards'],
  ['specter_list_tournaments', 'app/get-tournaments', 'tournaments / competitions'],
  ['specter_list_battlepasses', 'app/get-battlepasses', 'battle passes'],
  ['specter_list_progression_systems', 'app/get-progression-systems', 'level / progression systems'],
  ['specter_list_markers', 'app/get-markers', 'progression markers'],
];

for (const [name, endpoint, label] of LIST_TOOLS) {
  server.registerTool(
    name,
    {
      title: `List ${label}`,
      description: `List the ${label} configured in this Specter project.`,
      inputSchema: {
        limit: z.number().int().min(1).max(100).optional(),
        search: z.string().optional(),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ limit, search }) =>
      toolResult(
        await specter.client(endpoint, {
          limit: limit ?? 50,
          ...(search ? { search } : {}),
          ...(endpoint === 'app/get-tasks' ? { attributes: ['event'] } : {}),
        })
      )
  );
}

// ---- admin auth + mutating tools (opt-in) ----

if (specter.allowMutations) {
  server.registerTool(
    'specter_login',
    {
      title: 'Authenticate for admin actions',
      description: 'Opens the Specter dashboard in the browser so the member can sign in (email/password, Google, or Apple) and authorize this tool. Required once before creating currencies/tasks. No password is ever shared with the tool.',
      inputSchema: {},
      annotations: { readOnlyHint: false, openWorldHint: true },
    },
    async () => {
      if (specter.hasAdminCredential()) {
        return { content: [{ type: 'text', text: 'Already authenticated for admin actions.' }] };
      }
      let shownUrl = '';
      try {
        const creds = await loginViaBrowser({
          env: specter.env,
          adminBase: specter.adminBase,
      apiKey: specter.apiKey,
          dashboardUrl: specter.dashboardUrl,
          onUrl: (u) => (shownUrl = u),
        });
        return { content: [{ type: 'text', text: `Authenticated${creds.memberId ? ` as member ${creds.memberId}` : ''}. You can now create currencies/tasks.` }] };
      } catch (e) {
        return { isError: true, content: [{ type: 'text', text: `Login failed: ${e.message}${shownUrl ? `\nYou can also open this URL manually:\n${shownUrl}` : ''}` }] };
      }
    }
  );
}

// Data-driven create tools. Each exposes the verified required fields as typed
// params plus a `fields` passthrough for the full schema (documented in the
// specter-admin skill). `wrap` array-wraps the entity where the endpoint expects
// it; `transform` renames/derives fields; `noProjectId` skips projectId.
const CREATE_TOOLS = [
  {
    name: 'specter_create_currency',
    title: 'Create currency',
    endpoint: 'currencies/add',
    desc: 'Create a virtual or real-money currency. Put type/code/exchangeRate etc. in `fields` (see specter-admin skill).',
    schema: { name: z.string().describe('Display name, e.g. "Gems"'), currencyId: z.string().optional().describe('Stable slug, e.g. "gems"') },
  },
  {
    name: 'specter_create_item',
    title: 'Create item',
    endpoint: 'items/add',
    wrap: 'items',
    desc: 'Create an inventory item. Properties (consumable/equippable/...), prices, unlock conditions go in `fields`.',
    schema: { name: z.string(), typeId: z.string().describe('Item type id') },
  },
  {
    name: 'specter_create_bundle',
    title: 'Create bundle / loot box',
    endpoint: 'bundle/create',
    wrap: 'bundles',
    desc: 'Create a bundle. For a gacha/loot box set isGacha + pity fields in `fields`; contents/prices go in `fields` too.',
    schema: { name: z.string(), typeId: z.string().describe('Bundle type id') },
  },
  {
    name: 'specter_create_store',
    title: 'Create store',
    endpoint: 'store/create',
    wrap: 'stores',
    desc: 'Create a store. Categories/contents/platforms go in `fields` (storeCategories[]).',
    schema: { name: z.string(), storeId: z.string().describe('Stable slug') },
  },
  {
    name: 'specter_create_task',
    title: 'Create task / achievement',
    endpoint: 'task/create',
    desc: 'Create a task. businessLogic is a json-rules-engine rule; rewardDetails configures rewards (see specter-progression skill).',
    schema: {
      name: z.string(),
      taskId: z.string().describe('Stable slug, e.g. "daily-click-100"'),
      eventId: z.string().describe('Dashboard event slug that triggers this task'),
      businessLogic: z.record(z.any()).optional().describe('e.g. {"all":[{"fact":"clicks","operator":"greaterThanInclusive","value":100}]}'),
    },
    transform: (e) => {
      const { eventId, ...rest } = e;
      return { ...rest, customEventId: eventId };
    },
  },
  {
    name: 'specter_create_mission',
    title: 'Create mission / task group',
    endpoint: 'task-group/create',
    desc: 'Create a task group. typeId: 1=mission, 2=step series, 3=time series. taskDetails is the array of tasks in the group.',
    schema: {
      name: z.string(),
      taskGroupId: z.string(),
      typeId: z.number().int().describe('1=mission, 2=step series, 3=time series'),
      taskDetails: z.array(z.any()).describe('Tasks in the group'),
    },
  },
  {
    name: 'specter_create_battlepass',
    title: 'Create battle pass',
    endpoint: 'battlepass/create',
    desc: 'Create a battle pass. tiers (free/premium rewards per tier) go in `fields`.',
    schema: {
      name: z.string(),
      battlepassId: z.string(),
      levelSystemId: z.string().describe('Level system id that drives tier progression'),
    },
  },
  {
    name: 'specter_create_level_system',
    title: 'Create level / progression system',
    endpoint: 'level-system/create',
    desc: 'Create a level system. levelSystemTypeId: 1=XP-based, 2=event-based. levelDetails is the per-level config.',
    schema: {
      name: z.string(),
      levelSystemTypeId: z.number().int().describe('1=XP-based, 2=event-based'),
      levelDetails: z.array(z.any()).describe('Per-level definitions'),
      rewardGrantScheduleType: z.string().describe("'on-completion' or 'custom'"),
    },
  },
  {
    name: 'specter_create_progression_marker',
    title: 'Create progression marker',
    endpoint: 'progression-marker/create',
    desc: 'Create a progression marker (a named counter like XP or trophies).',
    schema: { name: z.string() },
  },
  {
    name: 'specter_create_leaderboard',
    title: 'Create leaderboard',
    endpoint: 'leaderboard/create',
    desc: 'Create a leaderboard. prizeDistributionRule and scoring config go in `fields`.',
    schema: {
      leaderboardId: z.string(),
      leaderboardOutcomeDetails: z.array(z.any()).describe('Outcome / scoring configuration'),
      name: z.string().optional(),
    },
  },
  {
    name: 'specter_create_competition',
    title: 'Create competition / tournament',
    endpoint: 'competitions/create',
    desc: 'Create a competition. competitionFormatTypeMasterId: 1=tournament, 2=instant battle. Entry prices/prizes/schedule go in `fields`.',
    schema: {
      name: z.string(),
      competitionId: z.string(),
      competitionFormatTypeMasterId: z.number().int().describe('1=tournament, 2=instant battle'),
      isSpecialEvent: z.boolean(),
    },
  },
  {
    name: 'specter_schedule_liveops',
    title: 'Schedule a leaderboard / competition (live-ops)',
    endpoint: 'live-ops/schedule',
    desc: 'Schedule a leaderboard or competition live. Provide exactly one of competitionId / leaderboardId. Recurrence config goes in `fields`.',
    schema: {
      startDate: z.string().describe('ISO 8601 start'),
      endDate: z.string().describe('ISO 8601 end'),
      competitionId: z.string().optional(),
      leaderboardId: z.string().optional(),
    },
  },
  {
    name: 'specter_grant_reward',
    title: 'Grant reward to a player',
    endpoint: 'admin/rewards/grant',
    noProjectId: true,
    desc: 'Grant items/bundles/currencies/markers to a player. rewardDetails is an array; each entry has rewards: {items[],bundles[],currencies[],progressionMarkers[]}.',
    schema: {
      userId: z.string().describe('Player UUID'),
      rewardDetails: z.array(z.any()).describe('Reward detail objects'),
    },
  },
];

if (specter.allowMutations) {
  for (const spec of CREATE_TOOLS) {
    const inputSchema = { ...spec.schema };
    if (!spec.noProjectId) inputSchema.projectId = z.string().optional().describe('Defaults to SPECTER_PROJECT_ID');
    inputSchema.fields = z.record(z.any()).optional().describe('Any other fields for this entity — see the specter-admin skill for the full schema');

    server.registerTool(
      spec.name,
      {
        title: `${spec.title} (admin)`,
        description: `${spec.desc} MUTATES live game config — confirm with the user and prefer staging.`,
        inputSchema,
        annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
      },
      async (args) => {
        const { projectId, fields, ...rest } = args;
        let entity = { ...rest, ...(fields || {}) };
        if (spec.transform) entity = spec.transform(entity);
        if (!spec.noProjectId) entity.projectId = await specter.resolveProjectId(projectId);
        const body = spec.wrap ? { [spec.wrap]: [entity] } : entity;
        return toolResult(await specter.admin(spec.endpoint, body));
      }
    );
  }
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`specter-mcp running (env=${specter.env}, mutations=${specter.allowMutations && specter.adminEnabled ? 'on' : 'off'})`);
