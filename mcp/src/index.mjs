#!/usr/bin/env node
/**
 * @specterapp/mcp — Model Context Protocol server for the Specter game backend.
 *
 * Read-only tools (always on): inspect a project's currencies, items, tasks,
 * leaderboards, wallets, and run an integration smoke-test.
 * Mutating admin tools (opt-in via SPECTER_ALLOW_MUTATIONS=true + admin creds):
 * create currencies and tasks. Every mutating tool is annotated destructive/
 * non-readonly so MCP hosts gate it behind user confirmation.
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

server.registerTool(
  'specter_list_currencies',
  {
    title: 'List currencies',
    description: 'List the virtual/real currencies configured in this Specter project (id, name, type).',
    inputSchema: { limit: z.number().int().min(1).max(100).optional() },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ limit }) => toolResult(await specter.client('app/get-currencies', { limit: limit ?? 50 }))
);

server.registerTool(
  'specter_list_items',
  {
    title: 'List items',
    description: 'List inventory items configured in this Specter project.',
    inputSchema: { limit: z.number().int().min(1).max(100).optional(), search: z.string().optional() },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ limit, search }) => toolResult(await specter.client('app/get-items', { limit: limit ?? 25, ...(search ? { search } : {}) }))
);

server.registerTool(
  'specter_list_tasks',
  {
    title: 'List tasks',
    description: 'List tasks/achievements/quests configured in this Specter project, including their trigger events.',
    inputSchema: { limit: z.number().int().min(1).max(100).optional() },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ limit }) => toolResult(await specter.client('app/get-tasks', { limit: limit ?? 25, attributes: ['event'] }))
);

server.registerTool(
  'specter_list_leaderboards',
  {
    title: 'List leaderboards',
    description: 'List leaderboards configured in this Specter project.',
    inputSchema: { limit: z.number().int().min(1).max(100).optional() },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ limit }) => toolResult(await specter.client('app/get-leaderboards', { limit: limit ?? 25 }))
);

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

if (specter.allowMutations) {
  server.registerTool(
    'specter_create_currency',
    {
      title: 'Create currency (admin)',
      description: 'Create a virtual or real-money currency in the Specter dashboard. MUTATES live game config — confirm with the user first and prefer staging.',
      inputSchema: {
        name: z.string().describe('Display name, e.g. "Gems"'),
        currencyId: z.string().describe('Stable slug used by the API, e.g. "gems"'),
        currencyType: z.enum(['soft', 'hard']).describe('soft = virtual/earned, hard = premium/purchased'),
        projectId: z.string().optional().describe('Defaults to SPECTER_PROJECT_ID'),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async ({ name, currencyId, currencyType, projectId }) =>
      toolResult(await specter.admin('currencies/add', { name, currencyId, currencyType, projectId: projectId ?? specter.projectId }))
  );

  server.registerTool(
    'specter_create_task',
    {
      title: 'Create task (admin)',
      description: 'Create a task/achievement in the Specter dashboard. MUTATES live game config — confirm with the user first and prefer staging. Business logic uses json-rules-engine; see the specter-progression skill for rule shape.',
      inputSchema: {
        name: z.string(),
        taskId: z.string().describe('Stable slug, e.g. "daily-click-100"'),
        eventId: z.string().describe('Dashboard event slug that triggers this task'),
        businessLogic: z.record(z.any()).describe('json-rules-engine rule, e.g. {"all":[{"fact":"clicks","operator":"greaterThanInclusive","value":100}]}'),
        rewardDetails: z.record(z.any()).optional().describe('Reward config (currencies/items)'),
        projectId: z.string().optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async ({ name, taskId, eventId, businessLogic, rewardDetails, projectId }) =>
      toolResult(await specter.admin('task/create', { name, taskId, customEventId: eventId, businessLogic, rewardDetails, projectId: projectId ?? specter.projectId }))
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`specter-mcp running (env=${specter.env}, mutations=${specter.allowMutations && specter.adminEnabled ? 'on' : 'off'})`);
