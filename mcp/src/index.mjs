#!/usr/bin/env node
/**
 * @specterapp/mcp — Model Context Protocol server for the Specter game backend.
 *
 * Read-only tools (admin gateway, after browser login): verify_setup + list
 * currencies, items, bundles, stores, tasks, events, leaderboards, tournaments,
 * battlepasses, progression systems, markers.
 * Mutating admin tools (opt-in via SPECTER_ALLOW_MUTATIONS=true + login): create
 * currency, item, bundle, store, task, mission, battlepass, level system,
 * progression marker, leaderboard, competition; schedule live-ops; grant reward; or call any endpoint via the admin_call/client_call escape hatches.
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
import { SpecterClient, toolResult, listResult, INTERVAL_UNIT } from './specter-client.mjs';
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
  { name: 'specter', version: '0.11.0' },
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
    try {
      const projectId = await specter.resolveProjectId();
      const checks = [`auth: signed in${loadCreds(specter.env)?.memberId ? ` (member ${loadCreds(specter.env).memberId})` : ''}`, `project: ${projectId}`];
      const count = async (ep, key, extra = {}) => {
        const { json } = await specter.admin(ep, { projectId, pageNo: 0, pageSize: 1, ...extra });
        return json?.data?.totalCount ?? (json?.data?.[key]?.length ?? 0);
      };
      checks.push(`currencies: ${await count('currencies/get', 'currenciesDetails')}`);
      checks.push(`custom events: ${await count('app-event/get/custom', 'appEventDetails')}`);
      checks.push(`tasks: ${await count('task/get', 'tasks')}`);
      return { content: [{ type: 'text', text: `Specter (${specter.env}) setup:\n- ${checks.join('\n- ')}` }] };
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't verify setup: ${e.message}` }] };
    }
  }
);

// Data-driven list tools — admin gateway (<entity>/get, projectId + member/tool Bearer).
// Read tools use admin (not the client api-key) so they work right after browser login.
const LIST_TOOLS = [
  { name: 'specter_list_currencies', endpoint: 'currencies/get', key: 'currenciesDetails', label: 'currencies' },
  { name: 'specter_list_items', endpoint: 'items/get', key: 'items', label: 'items' },
  { name: 'specter_list_bundles', endpoint: 'bundle/get', key: 'bundles', label: 'bundles / loot boxes' },
  { name: 'specter_list_stores', endpoint: 'store/get', key: 'stores', label: 'stores' },
  { name: 'specter_list_tasks', endpoint: 'task/get', key: 'tasks', label: 'tasks / achievements' },
  { name: 'specter_list_events', endpoint: 'app-event/get/custom', key: 'appEventDetails', label: 'custom events' },
  { name: 'specter_list_leaderboards', endpoint: 'leaderboard/get', key: 'leaderboards', label: 'leaderboards' },
  { name: 'specter_list_tournaments', endpoint: 'competitions/get', key: 'competitionDetails', label: 'tournaments / competitions', extra: { competitionFormatTypeMasterId: 1 } },
  { name: 'specter_list_battlepasses', endpoint: 'battlepass/get', key: 'battlepassDetails', label: 'battle passes' },
  { name: 'specter_list_progression_systems', endpoint: 'level-system/get', key: 'levelDetails', label: 'level / progression systems' },
  { name: 'specter_list_markers', endpoint: 'progression-marker/get', key: 'progressionMarkers', label: 'progression markers', pagination: 'offset' },
];

for (const { name, endpoint, key, label, extra, pagination } of LIST_TOOLS) {
  server.registerTool(
    name,
    {
      title: `List ${label}`,
      description: `List the ${label} configured in this Specter project. Returns ids/slugs you can reference when creating other entities. Requires a one-time browser sign-in (specter_login).`,
      inputSchema: {
        limit: z.number().int().min(1).max(200).optional(),
        search: z.string().optional(),
        projectId: z.string().optional().describe('Defaults to the auto-detected project'),
      },
      annotations: { readOnlyHint: true, openWorldHint: true },
    },
    async ({ limit, search, projectId }) => {
      try {
        const resp = await specter.adminList(endpoint, {
          pageSize: limit ?? 50,
          search,
          pagination,
          extra: { ...(extra || {}), ...(projectId ? { projectId } : {}) },
        });
        return listResult(resp, key, label);
      } catch (e) {
        return { isError: true, content: [{ type: 'text', text: `Couldn't list ${label}: ${e.message}` }] };
      }
    }
  );
}

// ---- client / runtime tools: act as a TEST PLAYER to exercise the v2 client API ----
// These call the /v2/client gateway as a sandboxed test player (customId
// "specter-mcp-test-player"), so a dev can PROVE their config works end-to-end:
// fire the trigger event, then watch the task complete and the reward land.
// They never touch admin config or real players.

server.registerTool(
  'specter_get_player_state',
  {
    title: 'Read the test player (tasks, wallet, inventory)',
    description: "Sign in the sandbox test player and read their task/achievement status, wallet balances, and inventory. Use to inspect what a player currently sees, or to check an achievement's progress.",
    inputSchema: { include: z.array(z.enum(['tasks', 'wallet', 'inventory'])).optional().describe('Which sections to fetch (default all)') },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ include }) => {
    try {
      const want = include?.length ? include : ['tasks', 'wallet', 'inventory'];
      const out = {};
      if (want.includes('tasks')) out.tasks = (await specter.client('player/me/get-task-status', {}, { auth: 'player' })).json?.data ?? null;
      if (want.includes('wallet')) {
        // get-wallet-balance requires currencyIds (currency slugs)
        const cd = await specter.admin('currencies/get', { projectId: await specter.resolveProjectId(), pageNo: 0, pageSize: 100 });
        const slugs = (cd.json?.data?.currenciesDetails ?? []).map((c) => c.currencyId).filter(Boolean);
        out.wallet = slugs.length ? (await specter.client('player/me/get-wallet-balance', { currencyIds: slugs }, { auth: 'player' })).json?.data ?? null : [];
      }
      if (want.includes('inventory')) out.inventory = (await specter.client('player/me/get-inventory', {}, { auth: 'player' })).json?.data ?? null;
      return { content: [{ type: 'text', text: JSON.stringify(out, null, 1).slice(0, 12000) }] };
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't read player state: ${e.message}` }] };
    }
  }
);

server.registerTool(
  'specter_send_event',
  {
    title: 'Fire an event as the test player',
    description: 'Send a custom event (by its slug) as the sandbox test player — the same event your game would fire. Use to trigger tasks/achievements and verify they respond. `params` are the event parameters (statistics/states) your rule references.',
    inputSchema: {
      event: z.string().describe('Custom event slug, e.g. "riff_played"'),
      params: z.record(z.any()).optional().describe('Event parameters, e.g. {"score": 1200}'),
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
  async ({ event, params }) => {
    try {
      const body = { eventId: event, ...(params ? { customParams: params, specterParams: params } : {}) };
      return toolResult(await specter.client('events/send-custom', body, { auth: 'player' }));
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't send event: ${e.message}` }] };
    }
  }
);

server.registerTool(
  'specter_test_achievement',
  {
    title: 'Test an achievement end-to-end',
    description: "Prove a configured task/achievement works: reads the test player's task status, fires the trigger event (with optional params), polls again, and reports whether the task progressed/completed. Use right after creating a task to verify it actually fires.",
    inputSchema: {
      event: z.string().describe('The trigger event slug the task listens to'),
      params: z.record(z.any()).optional().describe('Event parameters to satisfy the rule, e.g. {"score": 1200}'),
      taskId: z.string().optional().describe('The task slug to focus the report on (otherwise summarises all)'),
      times: z.number().int().min(1).max(20).optional().describe('Fire the event N times (for "do X N times" rules)'),
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
  async ({ event, params, taskId, times }) => {
    try {
      const findTask = (data) => {
        const arr = Array.isArray(data) ? data : data?.tasks ?? data?.taskStatus ?? [];
        const list = Array.isArray(arr) ? arr : [];
        if (taskId) return list.find((t) => t.taskId === taskId || t.id === taskId) ?? null;
        return list;
      };
      const before = findTask((await specter.client('player/me/get-task-status', {}, { auth: 'player' })).json?.data);
      const n = times ?? 1;
      for (let i = 0; i < n; i++) {
        await specter.client('events/send-custom', { eventId: event, ...(params ? { customParams: params, specterParams: params } : {}) }, { auth: 'player' });
      }
      // task processing is queue-backed — poll a few times
      let after = null;
      for (let i = 0; i < 4; i++) {
        await new Promise((r) => setTimeout(r, 1200));
        after = findTask((await specter.client('player/me/get-task-status', {}, { auth: 'player' })).json?.data);
        if (taskId && after && (after.status === 'completed' || after.isCompleted)) break;
      }
      const summary = {
        firedEvent: event,
        times: n,
        focusTask: taskId ?? '(all)',
        before: taskId ? before : `${Array.isArray(before) ? before.length : 0} tasks`,
        after: taskId ? after : `${Array.isArray(after) ? after.length : 0} tasks`,
        verdict: taskId
          ? after
            ? `task "${taskId}" status: ${after.status ?? after.isCompleted ?? 'see after'}`
            : `task "${taskId}" not found in the player's task list — is it scheduled/live and subscribed to this event?`
          : 'fired; compare before/after task lists',
      };
      return { content: [{ type: 'text', text: JSON.stringify(summary, null, 1).slice(0, 12000) }] };
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't test achievement: ${e.message}` }] };
    }
  }
);

server.registerTool(
  'specter_get_reward_history',
  {
    title: "Read the test player's reward history",
    description:
      "Read the test player's reward history — including PENDING rewards waiting to be claimed (on-claim tasks). Filter by status ('pending' shows claimable). Each entry has sourceType + sourceId (e.g. the task), amount, and status (pending → completed).",
    inputSchema: {
      status: z.enum(['pending', 'completed']).optional().describe("'pending' = claimable/unclaimed; omit for all"),
      rewardGrant: z.enum(['client', 'server']).optional().describe("'client' = on-claim (player must claim); 'server' = automatic"),
      limit: z.number().int().min(1).max(100).optional(),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ status, rewardGrant, limit }) => {
    try {
      const body = { attributes: ['rewardDetails'], limit: limit ?? 50, offset: 0, ...(status ? { status } : {}), ...(rewardGrant ? { rewardGrant } : {}) };
      return toolResult(await specter.client('player/me/get-reward-history', body, { auth: 'player' }));
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't read reward history: ${e.message}` }] };
    }
  }
);

server.registerTool(
  'specter_claim_reward',
  {
    title: 'Claim a pending reward (test player)',
    description:
      "Claim the test player's pending reward(s) from a source — this is how a game claims an ON-CLAIM task/mission reward after it completes (grant-reward-by-source). It grants the reward to the wallet/inventory and flips its status pending → completed. Identify the source by its slug/id and type.",
    inputSchema: {
      source: z.string().describe('The source id/slug, e.g. the task slug "daily_login"'),
      type: z.enum(['task', 'task_group', 'level', 'tournament', 'instant_battle', 'leaderboard', 'ugc_leaderboard', 'battlepass']).default('task'),
      instanceId: z.string().optional().describe('Optional: claim a specific pending batch by its instanceId (from reward history)'),
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
  async ({ source, type, instanceId }) => {
    try {
      const body = { sources: [{ id: source, type: type || 'task', ...(instanceId ? { instanceId } : {}) }] };
      return toolResult(await specter.client('achievements/grant-reward-by-source', body, { auth: 'player' }));
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't claim reward: ${e.message}` }] };
    }
  }
);

// ---- client integration codegen ----
// Emit ready-to-paste game-side code (REST, v2/client) wired with the project's
// real api-key + a real event slug, so a dev can drop it straight into their game.
const CLIENT_BASES_FOR_CODE = {
  staging: 'https://client.staging.specterapp.xyz/v2/client',
  production: 'https://api.specterapp.xyz/v2/client',
};

function genJs(base, apiKey, sampleEvent, sampleCurrency) {
  return `// specter-client.js — generated by specter-skills (env: ${specter.env})
// Game-side Specter integration over the v2 client REST API. Works in browser,
// Node, React Native, or any JS engine. The api-key below is your project's
// CLIENT key (safe to ship in client builds).
const SPECTER = {
  baseUrl: ${JSON.stringify(base)},
  apiKey: ${JSON.stringify(apiKey)},
};

async function specterCall(path, body, accessToken) {
  const res = await fetch(\`\${SPECTER.baseUrl}/\${path}\`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': SPECTER.apiKey,
      ...(accessToken ? { Authorization: \`Bearer \${accessToken}\` } : {}),
    },
    body: JSON.stringify(body || {}),
  });
  const json = await res.json();
  if (json.status !== 'success') throw new Error(JSON.stringify(json.errors || json));
  return json.data;
}

// 1) Log the player in. customId is your own stable player id.
//    (Swap for auth/login-email or auth/login-username as needed.)
export async function login(customId) {
  const data = await specterCall('auth/login-custom', { customId, createAccount: true });
  return data.accessToken; // store this; pass to the player-scoped calls below
}

// 2) Fire a gameplay event — this is what drives tasks/achievements.
export async function sendEvent(accessToken, eventId, params) {
  return specterCall('events/send-custom', { eventId, customParams: params || {} }, accessToken);
}

// 3) Read the player's task / achievement status.
export const getTasks = (accessToken) => specterCall('player/me/get-task-status', {}, accessToken);

// 4) List the game's currencies (api-key only — no login needed).
export async function getCurrencies() {
  const data = await specterCall('app/get-currencies', {});
  return data.currencies || data; // [{ id: slug, uuid, name, ... }]
}

// 5) Read the player's wallet balances. currencyIds are currency slugs, e.g. ['${sampleCurrency}'].
export async function getWallet(accessToken, currencyIds) {
  const ids = currencyIds || (await getCurrencies()).map((c) => c.id);
  return specterCall('player/me/get-wallet-balance', { currencyIds: ids }, accessToken);
}

// --- Example usage ---
// const token = await login('player-123');
// await sendEvent(token, ${JSON.stringify(sampleEvent)}, { /* score: 1200 */ });
// console.log(await getTasks(token));
// console.log(await getWallet(token, [${JSON.stringify(sampleCurrency)}]));
`;
}

function genCsharp(base, apiKey, sampleEvent, sampleCurrency) {
  return `// SpecterClient.cs — generated by specter-skills (env: ${specter.env})
// Dependency-free Unity integration over the v2 client REST API. For production,
// prefer the official Specter Unity SDK: https://manual.specterapp.xyz/specter-unity-sdk
// (parse responses with JsonUtility or Newtonsoft.Json).
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

public static class SpecterClient {
    const string BaseUrl = ${JSON.stringify(base)};
    const string ApiKey  = ${JSON.stringify(apiKey)};
    public static string AccessToken; // set after login

    public static IEnumerator Call(string path, string jsonBody, System.Action<string> onDone) {
        using (var req = new UnityWebRequest($"{BaseUrl}/{path}", "POST")) {
            req.uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(jsonBody ?? "{}"));
            req.downloadHandler = new DownloadHandlerBuffer();
            req.SetRequestHeader("Content-Type", "application/json");
            req.SetRequestHeader("api-key", ApiKey);
            if (!string.IsNullOrEmpty(AccessToken))
                req.SetRequestHeader("Authorization", $"Bearer {AccessToken}");
            yield return req.SendWebRequest();
            if (req.result != UnityWebRequest.Result.Success)
                Debug.LogError($"Specter {path}: {req.error} {req.downloadHandler.text}");
            else onDone?.Invoke(req.downloadHandler.text);
        }
    }

    // Example flow: log in, fire an event, read tasks.
    public static IEnumerator Demo() {
        yield return Call("auth/login-custom", "{\\"customId\\":\\"player-123\\",\\"createAccount\\":true}", res => {
            Debug.Log(res); // parse data.accessToken from res and assign to AccessToken
        });
        yield return Call("events/send-custom", "{\\"eventId\\":\\"" + ${JSON.stringify(sampleEvent)} + "\\"}", res => Debug.Log(res));
        yield return Call("player/me/get-task-status", "{}", res => Debug.Log(res));
        // get-wallet-balance requires currencyIds (currency slugs)
        yield return Call("player/me/get-wallet-balance", "{\\"currencyIds\\":[\\"" + ${JSON.stringify(sampleCurrency)} + "\\"]}", res => Debug.Log(res));
    }
}
`;
}

server.registerTool(
  'specter_generate_client_code',
  {
    title: 'Generate game-side client code',
    description:
      'Generate ready-to-paste game integration code (v2 client REST) wired with this project\'s real client api-key + a real event slug. Covers login, firing events, reading tasks, and wallet. JS works anywhere; C# is dependency-free Unity (the official Specter Unity SDK is recommended for production).',
    inputSchema: {
      language: z.enum(['js', 'csharp']).describe('"js" (browser/Node/RN) or "csharp" (Unity UnityWebRequest)'),
      projectId: z.string().optional(),
    },
    annotations: { readOnlyHint: true, openWorldHint: true },
  },
  async ({ language, projectId }) => {
    try {
      const pid = await specter.resolveProjectId(projectId);
      const apiKey = await specter.resolveClientApiKey();
      const base = CLIENT_BASES_FOR_CODE[specter.env] || CLIENT_BASES_FOR_CODE.staging;
      let sampleEvent = 'your_event_slug';
      let sampleCurrency = 'your_currency_slug';
      try {
        const ev = await specter.admin('app-event/get/custom', { projectId: pid, pageNo: 0, pageSize: 1 });
        sampleEvent = ev.json?.data?.appEventDetails?.[0]?.eventId || sampleEvent;
        const cu = await specter.admin('currencies/get', { projectId: pid, pageNo: 0, pageSize: 1 });
        sampleCurrency = cu.json?.data?.currenciesDetails?.[0]?.currencyId || sampleCurrency;
      } catch {
        /* samples are cosmetic */
      }
      const code = language === 'csharp' ? genCsharp(base, apiKey, sampleEvent, sampleCurrency) : genJs(base, apiKey, sampleEvent, sampleCurrency);
      const file = language === 'csharp' ? 'SpecterClient.cs' : 'specter-client.js';
      return { content: [{ type: 'text', text: `Save as \`${file}\`:\n\n\`\`\`${language === 'csharp' ? 'csharp' : 'javascript'}\n${code}\n\`\`\`` }] };
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't generate client code: ${e.message}` }] };
    }
  }
);

// Escape hatch: call ANY /v2/client endpoint as the test player. Covers the long
// tail (friends, profile, store purchase, leaderboard fetch, tournament enter, …)
// that has no dedicated tool — look up the path + body in the client API refs.
server.registerTool(
  'specter_client_call',
  {
    title: 'Call any client (v2) endpoint',
    description:
      "Escape hatch for the game-facing API: POST to any /v2/client/* endpoint as the sandbox test player. Use for client calls that lack a dedicated tool (e.g. player/me/get-inventory, friends/send-request, stores/default-purchase, leaderboards/get-rankings, competitions/enter). Find the exact path + body in the client-api-index / curated-client-api references. asPlayer=true (default) sends the test-player token; false = api-key-only catalog reads.",
    inputSchema: {
      path: z.string().describe('Path without the /v2/client/ prefix, e.g. "player/me/get-inventory"'),
      body: z.record(z.any()).optional().describe('Request body per the client API reference'),
      asPlayer: z.boolean().optional().describe('Send the test-player bearer token (default true)'),
    },
    annotations: { readOnlyHint: false, openWorldHint: true },
  },
  async ({ path, body, asPlayer }) => {
    try {
      const p = path.replace(/^\/?(v2\/client\/)?/, '');
      return toolResult(await specter.client(p, body || {}, { auth: asPlayer === false ? 'none' : 'player' }));
    } catch (e) {
      return { isError: true, content: [{ type: 'text', text: `Couldn't call client endpoint: ${e.message}` }] };
    }
  }
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
    name: 'specter_create_item',
    title: 'Create item',
    endpoint: 'items/add',
    wrap: 'items',
    desc: 'Create an inventory item. Properties (consumable/equippable/...), prices, unlock conditions go in `fields`.',
    schema: { name: z.string(), typeId: z.string().describe('Item type id') },
    defaults: { itemPrices: [], rewardUnlockCondition: [], tags: [], meta: {} },
  },
  {
    name: 'specter_create_bundle',
    title: 'Create bundle / loot box',
    endpoint: 'bundle/create',
    wrap: 'bundles',
    desc: 'Create a bundle. For a gacha/loot box set isGacha + pity fields in `fields`; contents/prices go in `fields` too.',
    schema: { name: z.string(), typeId: z.string().describe('Bundle type id') },
    defaults: { bundleContent: [], bundlePrices: [], bundleRarityProbabilities: [], rewardUnlockCondition: [], tags: [], meta: {} },
  },
  {
    name: 'specter_create_store',
    title: 'Create store',
    endpoint: 'store/create',
    wrap: 'stores',
    desc: 'Create a store. Categories/contents/platforms go in `fields` (storeCategories[]).',
    schema: { name: z.string(), storeId: z.string().describe('Stable slug') },
    defaults: { storeCategories: [], storePlatformIds: [], storeLocationIds: [], rewardUnlockCondition: [], tags: [], meta: {} },
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
    defaults: { tags: [], meta: {} },
  },
  {
    name: 'specter_create_leaderboard',
    title: 'Create leaderboard',
    endpoint: 'leaderboard/create',
    desc: 'Create a leaderboard. prizeDistributionRule/prize config goes in `fields`. outcomeType: 1=high_score, 2=time_trial, 4=position_weighting, 5=cumulative_score. sourceType: 1=match, 2=statistics, 3=custom.',
    schema: {
      leaderboardId: z.string(),
      name: z.string().optional(),
      leaderboardOutcomeTypeMasterId: z.number().int().describe('1=high_score, 2=time_trial, 4=position_weighting, 5=cumulative_score'),
      sourceTypeId: z.number().int().describe('1=match, 2=statistics, 3=custom'),
      leaderboardOutcomeDetails: z.array(z.any()).optional().describe('Outcome / scoring configuration (required only for position-weighting)'),
    },
    defaults: { leaderboardOutcomeDetails: [], active: true, archive: false },
  },
  {
    name: 'specter_create_competition',
    title: 'Create competition / tournament',
    endpoint: 'competitions/create',
    desc: 'Create a competition. competitionFormatTypeMasterId: 2=tournament, 3=instant battle, 4=paid challenge, 5=bracket. For match-based (sourceTypeId 1) pass matchId+gameId in `fields`; entry prices/prizes/schedule also go in `fields`.',
    schema: {
      name: z.string(),
      competitionId: z.string(),
      competitionFormatTypeMasterId: z.number().int().describe('2=tournament, 3=instant battle, 4=paid challenge, 5=bracket'),
      isSpecialEvent: z.boolean(),
    },
    defaults: { active: true, archive: false },
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
        // Inject controller-required present-but-empty scaffolding (the API reads
        // `.length` on these and 500s if absent); user-supplied fields win.
        let entity = { ...(spec.defaults || {}), ...rest, ...(fields || {}) };
        if (spec.transform) entity = spec.transform(entity);
        if (!spec.noProjectId) entity.projectId = await specter.resolveProjectId(projectId);
        const body = spec.wrap ? { [spec.wrap]: [entity] } : entity;
        return toolResult(await specter.admin(spec.endpoint, body));
      }
    );
  }

  const slugify = (s) => String(s).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  const mutAnnotations = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true };
  const errResult = (verb, e) => ({ isError: true, content: [{ type: 'text', text: `Couldn't ${verb}: ${e.message}` }] });

  // Shared zod shapes for achievements.
  const rewardsSchema = z
    .array(
      z.object({
        currency: z.string().optional().describe('Currency slug or name'),
        item: z.string().optional().describe('Item slug, name, or id'),
        bundle: z.string().optional().describe('Bundle slug, name, or id'),
        marker: z.string().optional().describe('Progression marker slug or name'),
        rewardSet: z.string().optional().describe('Reward-set UUID'),
        quantity: z.number().int().positive(),
      })
    )
    .describe('Rewards, e.g. [{currency:"gems", quantity:50}] or [{item:"sword", quantity:1}]');

  // A completion rule → builds the coupled `config[]` (drives completion) + `businessLogic`
  // (the json-rules-engine mirror) the backend needs. Omit = complete on the first event fire.
  const OP_MAP = { '=': 'equal', '!=': 'notEqual', '>': 'greaterThan', '>=': 'greaterThanInclusive', '<': 'lessThan', '<=': 'lessThanInclusive' };
  const completionSchema = z
    .object({
      param: z.string().describe('Event parameter name (the rule "fact"), e.g. "score" or "wins"'),
      op: z.enum(['=', '!=', '>', '>=', '<', '<=']).describe('Comparison operator'),
      value: z.union([z.number(), z.string(), z.boolean()]).describe('Target value, e.g. 10'),
      mode: z.enum(['cumulative', 'one-shot', 'streak']).default('cumulative').describe('cumulative = sum across events, one-shot = single event check, streak = N consecutive'),
      count: z.union([z.number().int().positive(), z.literal('all')]).optional().describe('noOfRecords — N for streak / cumulative window (default "all")'),
    })
    .describe('Completion rule. e.g. {param:"wins",op:">=",value:10} = "win 10 matches"; {param:"login",op:"=",value:true,mode:"streak",count:7} = "7-day streak". Omit to complete on the first event.');
  function buildCompletion(c) {
    // No rule → businessLogic MUST be null (NOT {all:[]}). The backend's task
    // filter (evaluateBusinessLogicFilter) treats null as "always include", but
    // an empty {all:[]} goes to fact/value matching, finds no fact, and DROPS the
    // task — so it would never complete. Verified live on staging.
    if (!c) return { config: [], businessLogic: null };
    const operator = OP_MAP[c.op];
    return {
      config: [{ parameterName: c.param, operator, value: c.value, incrementalType: c.mode || 'cumulative', noOfRecords: c.count ?? 'all' }],
      businessLogic: { all: [{ fact: c.param, operator, value: c.value }] },
    };
  }

  const innerTaskSchema = z.object({
    name: z.string(),
    event: z.string().describe('Event slug/name that triggers this sub-task'),
    eventType: z.enum(['custom', 'default']).optional().describe('"custom" (default) or "default" Specter event'),
    taskId: z.string().optional(),
    description: z.string().optional(),
    rewardClaim: z.enum(['automatic', 'on-claim']).optional().describe('inherits the group default if omitted'),
    rewards: rewardsSchema.optional(),
    completion: completionSchema.optional(),
    sortingOrder: z.number().int().optional().describe('order/step index (auto 1..N if omitted)'),
  });
  const levelLocksSchema = z
    .array(z.object({ levelSystem: z.string().describe('Level-system slug/name/id'), level: z.number().int().optional() }))
    .describe('Gate this achievement behind a level system, e.g. [{levelSystem:"player_level", level:5}]');

  // Build one taskDetails[] element with the verified scaffolding (config is an ARRAY here).
  async function buildTaskDetail(pid, t, groupRewardClaim, idx) {
    const eventType = t.eventType || 'custom';
    const eventId = await specter.resolveAppEventId(pid, t.event, eventType);
    const comp = buildCompletion(t.completion);
    const td = {
      projectId: pid, // REQUIRED: inner tasks are filtered by projectId in getFilteredTaskIds; without it the task never matches an event and never completes
      name: t.name,
      taskId: t.taskId || slugify(t.name),
      rewardClaim: t.rewardClaim || groupRewardClaim || 'on-claim',
      config: comp.config,
      businessLogic: comp.businessLogic,
      rewardDetails: await specter.resolveRewardDetails(pid, t.rewards || []),
      linkedRewardDetails: [],
      isLinkedReward: false,
      sortingOrder: t.sortingOrder ?? idx + 1,
    };
    if (eventType === 'default') td.defaultEventId = eventId;
    else td.customEventId = eventId;
    if (t.description) td.description = t.description;
    return td;
  }

  // Build a full task-group/create body for mission/step-series/time-series.
  async function buildGroup(pid, { name, taskGroupId, description, typeId, rewardClaim, tasks, groupRewards, levelLocks, extra }) {
    const rc = rewardClaim || 'on-claim';
    const taskDetails = [];
    for (let i = 0; i < tasks.length; i++) taskDetails.push(await buildTaskDetail(pid, tasks[i], rc, i));
    const levelDetails = [];
    for (const l of levelLocks || []) {
      levelDetails.push({ levelSystemId: await specter.resolveLevelSystemId(pid, l.levelSystem), ...(l.level != null ? { level: l.level } : {}) });
    }
    return {
      projectId: pid,
      name,
      taskGroupId: taskGroupId || slugify(name),
      ...(description ? { description } : {}),
      typeId,
      rewardClaim: rc,
      config: {}, // group config is an OBJECT (task-level config is an array — do not unify)
      rewardDetails: await specter.resolveRewardDetails(pid, groupRewards || []),
      levelDetails,
      linkedRewardDetails: [],
      isLinkedRewardSameAsGeneralRewards: false,
      taskDetails,
      ...(extra || {}),
    };
  }

  const notLiveNote = ' Created but NOT live yet — call specter_schedule_achievement to activate it (with dates/recurrence).';

  // --- create currency (dedicated: exposes `type`, auto-slugs) ---
  server.registerTool(
    'specter_create_currency',
    {
      title: 'Create currency (admin)',
      description:
        'Create a virtual or real-money currency. `type` is "virtual" (in-game, e.g. coins/gems) or "real" (real-money). currencyId (slug) is auto-derived from the name if omitted. MUTATES live game config — confirm with the user and prefer staging.',
      inputSchema: {
        name: z.string().describe('Display name, e.g. "Gems"'),
        type: z.enum(['virtual', 'real']).default('virtual').describe('"virtual" = in-game currency, "real" = real-money'),
        currencyId: z.string().optional().describe('Stable slug, e.g. "gems" (defaults to a slug of the name)'),
        description: z.string().optional(),
        code: z.string().optional().describe('Short code, e.g. "GEM"'),
        rarityId: z.number().int().optional(),
        projectId: z.string().optional().describe('Defaults to the auto-detected project'),
        fields: z.record(z.any()).optional().describe('Any other currency fields (tags, meta, …)'),
      },
      annotations: mutAnnotations,
    },
    async ({ name, type, currencyId, description, code, rarityId, projectId, fields }) => {
      try {
        const entity = {
          name,
          type,
          currencyId: currencyId || slugify(name),
          ...(description ? { description } : {}),
          ...(code ? { code } : {}),
          ...(rarityId ? { rarityId } : {}),
          ...(fields || {}),
          projectId: await specter.resolveProjectId(projectId),
        };
        return toolResult(await specter.admin('currencies/add', entity));
      } catch (e) {
        return errResult('create currency', e);
      }
    }
  );

  // --- create currency conversion (exchange rate between two currencies) ---
  server.registerTool(
    'specter_create_currency_conversion',
    {
      title: 'Create currency conversion (admin)',
      description:
        'Define an exchange rate from one currency to another (e.g. 100 gems → 1 gold). Pass currencies by slug/name; the tool resolves them to the integer ids the API needs. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        source: z.string().describe('Source currency slug/name (what the player spends)'),
        target: z.string().describe('Target currency slug/name (what they receive)'),
        conversionRate: z.number().positive().describe('Target per 1 source, e.g. 0.01 for 100:1'),
        conversionFee: z.number().min(0).max(100).optional().describe('Percentage fee 0-100 (default 0)'),
        isEnabled: z.boolean().optional().describe('Default true'),
        projectId: z.string().optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ source, target, conversionRate, conversionFee, isEnabled, projectId }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const body = {
          projectId: pid,
          sourceCurrencyId: await specter.resolveCurrencyId(pid, source),
          targetCurrencyId: await specter.resolveCurrencyId(pid, target),
          conversionRate,
          conversionFee: conversionFee ?? 0,
          isEnabled: isEnabled ?? true,
        };
        return toolResult(await specter.admin('currencies/conversions/add', body));
      } catch (e) {
        return errResult('create currency conversion', e);
      }
    }
  );

  // --- create currency policy (balance limits / decay / earning caps) ---
  server.registerTool(
    'specter_create_currency_policy',
    {
      title: 'Create currency policy (admin)',
      description:
        'Attach a policy to a currency: "balance_limits" (min/max a player can hold), "currency_decay" (lose a % over time), or "earning_caps" (max earnable per period). Pass the currency by slug/name. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        policyType: z.enum(['balance_limits', 'currency_decay', 'earning_caps']),
        currency: z.string().describe('Currency slug/name the policy applies to'),
        // balance_limits
        maxBalance: z.number().optional(),
        minBalance: z.number().optional(),
        enforceMaxBalance: z.boolean().optional(),
        // decay + earning_caps
        enabled: z.boolean().optional().describe('Required for decay/earning_caps'),
        period: z.enum(['daily', 'weekly', 'monthly']).optional().describe('Required for decay/earning_caps'),
        rate: z.number().min(0).max(100).optional().describe('Decay: % per period'),
        threshold: z.number().optional().describe('Decay: balance below which decay stops'),
        capAmount: z.number().optional().describe('Earning caps: max earnable per period'),
        includePurchases: z.boolean().optional(),
        includeConversions: z.boolean().optional(),
        projectId: z.string().optional(),
      },
      annotations: mutAnnotations,
    },
    async (a) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(a.projectId);
        const currencyId = await specter.resolveCurrencyId(pid, a.currency);
        const base = { projectId: pid, currencyId };
        let endpoint, body;
        if (a.policyType === 'balance_limits') {
          endpoint = 'policy/create-balance-limits';
          body = { ...base, ...(a.maxBalance != null ? { maxBalance: a.maxBalance } : {}), ...(a.minBalance != null ? { minBalance: a.minBalance } : {}), ...(a.enforceMaxBalance != null ? { enforceMaxBalance: a.enforceMaxBalance } : {}) };
        } else if (a.policyType === 'currency_decay') {
          endpoint = 'policy/create-currency-decay';
          body = { ...base, enabled: a.enabled ?? true, rate: a.rate, period: a.period, ...(a.threshold != null ? { threshold: a.threshold } : {}) };
        } else {
          endpoint = 'policy/create-earning-caps';
          body = { ...base, enabled: a.enabled ?? true, capAmount: a.capAmount, period: a.period, ...(a.includePurchases != null ? { includePurchases: a.includePurchases } : {}), ...(a.includeConversions != null ? { includeConversions: a.includeConversions } : {}) };
        }
        return toolResult(await specter.admin(endpoint, body));
      } catch (e) {
        return errResult('create currency policy', e);
      }
    }
  );

  // --- create match (multiplayer match template) ---
  const MATCH_FORMAT = { single_player: 1, multi_player: 2, multi_player_team: 3 };
  const MATCH_OUTCOME = { score: 1, completion_time: 2, finish_position: 4 };
  server.registerTool(
    'specter_create_match',
    {
      title: 'Create match template (admin)',
      description:
        'Create a multiplayer match template (the config a real-time session is based on). `format` is single/multi/team; `outcome` is how a winner is decided (highest score, fastest time, finish position). The game is resolved by name/slug. Matchmaking rules (team size, MMR) go in `fields`. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        name: z.string(),
        format: z.enum(['single_player', 'multi_player', 'multi_player_team']),
        outcome: z.enum(['score', 'completion_time', 'finish_position']),
        game: z.string().optional().describe('Game name/slug/id (defaults to the project\'s first game)'),
        matchId: z.string().optional().describe('Stable slug (defaults to a slug of the name)'),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional().describe('Matchmaking rules: team size, MMR range, regions, etc.'),
      },
      annotations: mutAnnotations,
    },
    async ({ name, format, outcome, game, matchId, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const entity = {
          projectId: pid,
          name,
          matchId: matchId || slugify(name),
          matchFormatTypeMasterId: MATCH_FORMAT[format],
          matchOutcomeTypeMasterId: MATCH_OUTCOME[outcome],
          gameId: await specter.resolveGameId(pid, game),
          ...(fields || {}),
        };
        return toolResult(await specter.admin('match/add', entity));
      } catch (e) {
        return errResult('create match', e);
      }
    }
  );

  // --- create custom event (the trigger a task/mission listens to) ---
  server.registerTool(
    'specter_create_event',
    {
      title: 'Create custom event (admin)',
      description:
        'Create a custom event that tasks/achievements can be triggered by (e.g. "boss_defeated"). Create the event BEFORE the task that references it. eventId (slug) is auto-derived from the name. MUTATES live game config — confirm with the user and prefer staging.',
      inputSchema: {
        name: z.string().describe('Display name, e.g. "Boss Defeated"'),
        eventId: z.string().optional().describe('Stable slug (defaults to a slug of the name)'),
        description: z.string().optional(),
        parameters: z
          .array(z.object({ name: z.string(), type: z.enum(['state', 'statistic']).default('statistic'), dataTypeId: z.number().int().default(1) }))
          .optional()
          .describe('Optional event parameters the game sends, e.g. [{name:"score", type:"statistic"}]'),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ name, eventId, description, parameters, projectId, fields }) => {
      try {
        const entity = {
          projectId: await specter.resolveProjectId(projectId),
          name,
          eventId: eventId || slugify(name),
          description: description || '',
          tags: [],
          meta: {},
          // controller reads payload.customParameterDetails.length — must be present
          customParameterDetails: (parameters || []).map((p) => ({ name: p.name, type: p.type || 'statistic', dataTypeId: p.dataTypeId ?? 1 })),
          ...(fields || {}),
        };
        return toolResult(await specter.admin('app-event/add/custom', entity));
      } catch (e) {
        return errResult('create event', e);
      }
    }
  );

  // --- create single TASK (the simplest achievement) ---
  server.registerTool(
    'specter_create_task',
    {
      title: 'Create task / achievement (admin)',
      description:
        'Create a SINGLE-objective achievement (a "task"/"quest"/"objective" — one trigger, one reward). For multi-objective achievements use specter_create_mission (a pool), specter_create_step_series (sequential), or specter_create_time_series (streaks). `event` is the trigger event (slug/name, resolved automatically). `rewards` grants currencies/items/markers (by slug/name). `recurring` captures cadence intent (actual go-live is via scheduling). MUTATES live game config — confirm with the user and prefer staging.',
      inputSchema: {
        name: z.string().describe('Display name, e.g. "Daily Streak Reward"'),
        event: z.string().describe('Trigger event slug or name, e.g. "daily_streak_hit"'),
        eventType: z.enum(['custom', 'default']).optional().describe('"custom" (default) or built-in "default" event'),
        taskId: z.string().optional().describe('Stable slug (defaults to a slug of the name)'),
        description: z.string().optional(),
        rewardClaim: z.enum(['automatic', 'on-claim']).default('on-claim').describe('Default on-claim (player claims). Note: this project keeps only on-claim live — confirm before using automatic.'),
        rewards: rewardsSchema.optional(),
        levelLocks: levelLocksSchema.optional(),
        recurring: z
          .object({ unit: z.enum(['minute', 'hour', 'day', 'week', 'month', 'year']), frequency: z.number().int().positive().default(1) })
          .optional()
          .describe('Cadence intent, e.g. {unit:"day",frequency:1} for daily. Omit for one-time.'),
        completion: completionSchema.optional(),
        businessLogic: z.record(z.any()).optional().describe('Advanced: raw json-rules-engine rule (overrides `completion`). Defaults from `completion`, or null (no condition → completes on first event fire). Note: a non-empty rule must have a `fact` matching an event param, and an empty {"all":[]} would never complete — leave null instead.'),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional().describe('Any other task fields (meta, tags, …)'),
      },
      annotations: mutAnnotations,
    },
    async ({ name, event, eventType, taskId, description, rewardClaim, rewards, levelLocks, recurring, completion, businessLogic, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const evType = eventType || 'custom';
        const eventId = await specter.resolveAppEventId(pid, event, evType);
        const rewardDetails = await specter.resolveRewardDetails(pid, rewards || []);
        const levelDetails = [];
        for (const l of levelLocks || []) {
          levelDetails.push({ levelSystemId: await specter.resolveLevelSystemId(pid, l.levelSystem), ...(l.level != null ? { level: l.level } : {}) });
        }
        const comp = buildCompletion(completion);
        const entity = {
          projectId: pid,
          name,
          taskId: taskId || slugify(name),
          ...(description ? { description } : {}),
          rewardClaim,
          config: comp.config,
          businessLogic: businessLogic || comp.businessLogic,
          rewardDetails,
          linkedRewardDetails: [],
          levelDetails,
          isLinkedReward: false,
          isLinkedRewardSameAsGeneralRewards: false,
          ...(recurring
            ? { isRecurring: true, intervalUnitId: INTERVAL_UNIT[recurring.unit], recurrenceFrequency: recurring.frequency ?? 1 }
            : { isRecurring: false }),
        };
        if (evType === 'default') entity.defaultEventId = eventId;
        else entity.customEventId = eventId;
        Object.assign(entity, fields || {});
        const res = await specter.admin('task/create', entity);
        const r = toolResult(res);
        if (!r.isError) r.content[0].text += notLiveNote;
        return r;
      } catch (e) {
        return errResult('create task', e);
      }
    }
  );

  // --- create MISSION (task-group typeId 1 — a rotating pool) ---
  server.registerTool(
    'specter_create_mission',
    {
      title: 'Create mission (task pool) (admin)',
      description:
        'Create a MISSION: a pool of tasks where players see/complete a subset per cycle (typeId 1). Use for "daily missions", "rotating challenges", "pick N of these". For sequential use specter_create_step_series; for streaks use specter_create_time_series. Each task in `tasks` is created inline. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        name: z.string(),
        tasks: z.array(innerTaskSchema).min(1).describe('The tasks in the pool (each has its own event + rewards)'),
        taskGroupId: z.string().optional(),
        description: z.string().optional(),
        rewardClaim: z.enum(['automatic', 'on-claim']).default('on-claim').describe('Group default, inherited by tasks'),
        noOfMissionsPerCycle: z.number().int().positive().optional().describe('How many of the pool are active per cycle'),
        missionSequenceOrder: z.enum(['random', 'sequence']).default('random').describe('"random" subset each cycle, or "sequence" fixed order'),
        groupRewards: rewardsSchema.optional().describe('Bonus rewards for completing the whole pool'),
        levelLocks: levelLocksSchema.optional(),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ name, tasks, taskGroupId, description, rewardClaim, noOfMissionsPerCycle, missionSequenceOrder, groupRewards, levelLocks, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const body = await buildGroup(pid, {
          name, taskGroupId, description, typeId: 1, rewardClaim, tasks, groupRewards, levelLocks,
          extra: { missionSequenceOrder: missionSequenceOrder || 'random', noOfMissionsPerCycle: noOfMissionsPerCycle ?? null, ...(fields || {}) },
        });
        const r = toolResult(await specter.admin('task-group/create', body));
        if (!r.isError) r.content[0].text += notLiveNote;
        return r;
      } catch (e) {
        return errResult('create mission', e);
      }
    }
  );

  // --- create STEP SERIES (task-group typeId 2 — sequential) ---
  server.registerTool(
    'specter_create_step_series',
    {
      title: 'Create step series (sequential) (admin)',
      description:
        'Create a STEP SERIES: ordered tasks where each unlocks the next (typeId 2). Use for "quest lines", "tutorial chains", "finish step 1 before step 2". The order of `tasks` (or each task\'s sortingOrder) defines the sequence. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        name: z.string(),
        tasks: z.array(innerTaskSchema).min(1).describe('Ordered steps (array order = step order unless sortingOrder is set)'),
        taskGroupId: z.string().optional(),
        description: z.string().optional(),
        rewardClaim: z.enum(['automatic', 'on-claim']).default('on-claim'),
        groupRewards: rewardsSchema.optional().describe('Bonus rewards for finishing the whole series'),
        levelLocks: levelLocksSchema.optional(),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ name, tasks, taskGroupId, description, rewardClaim, groupRewards, levelLocks, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const body = await buildGroup(pid, {
          name, taskGroupId, description, typeId: 2, rewardClaim, tasks, groupRewards, levelLocks, extra: fields || {},
        });
        const r = toolResult(await specter.admin('task-group/create', body));
        if (!r.isError) r.content[0].text += notLiveNote;
        return r;
      } catch (e) {
        return errResult('create step series', e);
      }
    }
  );

  // --- create TIME SERIES (task-group typeId 3 — streak/per-window) ---
  server.registerTool(
    'specter_create_time_series',
    {
      title: 'Create time series (streak) (admin)',
      description:
        'Create a TIME SERIES: per-window recurring tasks, e.g. a daily login streak (typeId 3). Use for "streaks", "login N days in a row", "weekly recurring that resets on miss". `stageLength` is the window count (e.g. 7) and `interval` its unit (e.g. "day"). MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        name: z.string(),
        stageLength: z.number().int().positive().describe('Number of windows, e.g. 7 for a 7-day streak'),
        interval: z.enum(['minute', 'hour', 'day', 'week', 'month']).describe('Window unit (e.g. "day")'),
        tasks: z.array(innerTaskSchema).min(1).describe('The per-window tasks (e.g. day-1..day-N)'),
        seriesResetMiss: z.boolean().default(true).describe('Reset the streak if the player misses a window'),
        seriesResetEnd: z.boolean().default(true).describe('Reset the streak at the end of the full series'),
        taskGroupId: z.string().optional(),
        description: z.string().optional(),
        rewardClaim: z.enum(['automatic', 'on-claim']).default('on-claim'),
        groupRewards: rewardsSchema.optional().describe('Bonus rewards for completing the full streak'),
        levelLocks: levelLocksSchema.optional(),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ name, stageLength, interval, tasks, seriesResetMiss, seriesResetEnd, taskGroupId, description, rewardClaim, groupRewards, levelLocks, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const body = await buildGroup(pid, {
          name, taskGroupId, description, typeId: 3, rewardClaim, tasks, groupRewards, levelLocks,
          extra: { stageLength, stageIntervalUnitId: INTERVAL_UNIT[interval], seriesResetMiss: seriesResetMiss ?? true, seriesResetEnd: seriesResetEnd ?? true, ...(fields || {}) },
        });
        const r = toolResult(await specter.admin('task-group/create', body));
        if (!r.isError) r.content[0].text += notLiveNote;
        return r;
      } catch (e) {
        return errResult('create time series', e);
      }
    }
  );

  // --- schedule an achievement live (task OR task-group) ---
  server.registerTool(
    'specter_schedule_achievement',
    {
      title: 'Schedule an achievement live (admin)',
      description:
        'Activate a created task or task-group (mission/step-series/time-series) by setting its dates/recurrence. Pass exactly one of taskRef (single task) or groupRef (a group), by slug/name/id. Omitting startDate makes it go live immediately. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        taskRef: z.string().optional().describe('Single task — slug, name, or id'),
        groupRef: z.string().optional().describe('Mission/step-series/time-series — slug, name, or id'),
        startDate: z.string().optional().describe('ISO 8601; omit to start immediately'),
        endDate: z.string().optional().describe('ISO 8601'),
        recurring: z
          .object({ unit: z.enum(['minute', 'hour', 'day', 'week', 'month', 'year']), frequency: z.number().int().positive().default(1), count: z.number().int().positive().optional() })
          .optional()
          .describe('Repeat config; presence sets scheduleType to "recurring"'),
        timezone: z.string().default('Asia/Kolkata'),
        projectId: z.string().optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ taskRef, groupRef, startDate, endDate, recurring, timezone, projectId }) => {
      try {
        if (!taskRef === !groupRef) throw new Error('Pass exactly one of taskRef or groupRef.');
        const pid = await specter.resolveProjectId(projectId);
        const sched = {
          ...(startDate ? { startDate } : {}),
          ...(endDate ? { endDate } : {}),
          scheduleType: recurring ? 'recurring' : 'normal',
          timezone: timezone || 'Asia/Kolkata',
          ...(recurring ? { intervalUnitId: INTERVAL_UNIT[recurring.unit], recurrenceFrequency: recurring.frequency ?? 1, ...(recurring.count != null ? { recurrenceCount: recurring.count } : {}) } : {}),
        };
        if (taskRef) return toolResult(await specter.admin('task/schedule', { taskId: await specter.resolveTaskId(pid, taskRef), ...sched }));
        return toolResult(await specter.admin('task-group/schedule', { taskGroupId: await specter.resolveTaskGroupId(pid, groupRef), ...sched }));
      } catch (e) {
        return errResult('schedule achievement', e);
      }
    }
  );

  // --- stop an achievement (non-destructive halt) ---
  server.registerTool(
    'specter_stop_achievement',
    {
      title: 'Stop an achievement (admin)',
      description: 'Halt a live task or task-group (keeps the record; reversible by scheduling again). Pass exactly one of taskRef / groupRef. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        taskRef: z.string().optional(),
        groupRef: z.string().optional(),
        projectId: z.string().optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ taskRef, groupRef, projectId }) => {
      try {
        if (!taskRef === !groupRef) throw new Error('Pass exactly one of taskRef or groupRef.');
        const pid = await specter.resolveProjectId(projectId);
        if (taskRef) return toolResult(await specter.admin('task/stop', { taskId: await specter.resolveTaskId(pid, taskRef) }));
        return toolResult(await specter.admin('task-group/stop', { taskGroupId: await specter.resolveTaskGroupId(pid, groupRef) }));
      } catch (e) {
        return errResult('stop achievement', e);
      }
    }
  );

  // --- delete an achievement (destructive, soft-delete) ---
  server.registerTool(
    'specter_delete_achievement',
    {
      title: 'Delete an achievement (admin)',
      description: 'Soft-delete a single task (kind="task") or a group (kind="mission"|"step_series"|"time_series"). Provide refs (slugs/names/ids). DESTRUCTIVE — confirm with the user first, and prefer staging.',
      inputSchema: {
        kind: z.enum(['task', 'mission', 'step_series', 'time_series']).describe('"task" → task/delete; the three group kinds → task-group/delete'),
        refs: z.array(z.string()).min(1).describe('Slugs, names, or ids to delete'),
        projectId: z.string().optional(),
      },
      annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true },
    },
    async ({ kind, refs, projectId }) => {
      try {
        const pid = await specter.resolveProjectId(projectId);
        const isTask = kind === 'task';
        const ids = [];
        for (const ref of refs) ids.push(isTask ? await specter.resolveTaskId(pid, ref) : await specter.resolveTaskGroupId(pid, ref));
        const endpoint = isTask ? 'task/delete' : 'task-group/delete';
        return toolResult(await specter.admin(endpoint, { projectId: pid, ids }));
      } catch (e) {
        return errResult('delete achievement', e);
      }
    }
  );

  // ---- edit / update tools ----

  // Edit a currency (rename, change code/description/type).
  server.registerTool(
    'specter_edit_currency',
    {
      title: 'Edit currency (admin)',
      description: 'Update an existing currency (name, description, code, type, …). Identify it by slug/name. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        currency: z.string().describe('Currency slug/name to edit'),
        name: z.string().optional(),
        description: z.string().optional(),
        code: z.string().optional(),
        type: z.enum(['virtual', 'real']).optional(),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional().describe('Any other currency fields'),
      },
      annotations: mutAnnotations,
    },
    async ({ currency, name, description, code, type, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const id = await specter.resolveCurrencyId(pid, currency); // integer id
        const body = { id, projectId: pid, ...(name ? { name } : {}), ...(description ? { description } : {}), ...(code ? { code } : {}), ...(type ? { type } : {}), ...(fields || {}) };
        return toolResult(await specter.admin('currencies/edit', body));
      } catch (e) {
        return errResult('edit currency', e);
      }
    }
  );

  // Edit a task. NOTE: passing `rewards` REPLACES the task's reward set.
  server.registerTool(
    'specter_edit_task',
    {
      title: 'Edit task / achievement (admin)',
      description: "Update an existing single task's name, description, rewardClaim, recurrence, or businessLogic (identify it by slug/name). To CHANGE REWARDS, delete and recreate the task — task/edit uses diff-semantics on rewards that aren't reliably expressible here. MUTATES live game config — confirm and prefer staging.",
      inputSchema: {
        task: z.string().describe('Task slug/name to edit'),
        name: z.string().optional(),
        description: z.string().optional(),
        rewardClaim: z.enum(['automatic', 'on-claim']).optional(),
        recurring: z.object({ unit: z.enum(['minute', 'hour', 'day', 'week', 'month', 'year']), frequency: z.number().int().positive().default(1) }).optional(),
        businessLogic: z.record(z.any()).optional(),
        projectId: z.string().optional(),
        fields: z.record(z.any()).optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ task, name, description, rewardClaim, recurring, businessLogic, projectId, fields }) => {
      try {
        specter.clearResolveCache();
        const pid = await specter.resolveProjectId(projectId);
        const id = await specter.resolveTaskId(pid, task);
        const body = { id, projectId: pid };
        if (name) body.name = name;
        if (description) body.description = description;
        if (rewardClaim) body.rewardClaim = rewardClaim;
        if (businessLogic) body.businessLogic = businessLogic;
        if (recurring) {
          body.isRecurring = true;
          body.intervalUnitId = INTERVAL_UNIT[recurring.unit];
          body.recurrenceFrequency = recurring.frequency ?? 1;
        }
        Object.assign(body, fields || {});
        return toolResult(await specter.admin('task/edit', body));
      } catch (e) {
        return errResult('edit task', e);
      }
    }
  );

  // Generic update-by-id for the other entities (you supply the id from a list_* tool).
  const UPDATE_SPECS = {
    item: { endpoint: 'items/update', wrap: 'items' },
    bundle: { endpoint: 'bundle/update', wrap: 'bundles' },
    store: { endpoint: 'store/update', wrap: 'stores' },
    leaderboard: { endpoint: 'leaderboard/update' },
    competition: { endpoint: 'competitions/update' },
    battlepass: { endpoint: 'battlepass/update' },
    level_system: { endpoint: 'level-system/edit' },
    marker: { endpoint: 'progression-marker/edit' },
    mission: { endpoint: 'task-group/edit' },
    step_series: { endpoint: 'task-group/edit' },
    time_series: { endpoint: 'task-group/edit' },
    event: { endpoint: 'app-event/edit/custom' },
  };
  server.registerTool(
    'specter_update_entity',
    {
      title: 'Update an entity by id (admin)',
      description:
        'Generic editor for the long tail: update an item/bundle/store/leaderboard/competition/battlepass/level_system/marker/mission/step_series/time_series/event. Pass the entity\'s `id` (from the matching list_* tool) and the `fields` to change. MUTATES live game config — confirm and prefer staging.',
      inputSchema: {
        entity: z.enum(Object.keys(UPDATE_SPECS)),
        id: z.string().describe('The entity id (UUID, or integer for markers) — get it from list_*'),
        fields: z.record(z.any()).describe('Fields to update (merged with id + projectId)'),
        projectId: z.string().optional(),
      },
      annotations: mutAnnotations,
    },
    async ({ entity, id, fields, projectId }) => {
      try {
        const spec = UPDATE_SPECS[entity];
        const pid = await specter.resolveProjectId(projectId);
        const idVal = /^\d+$/.test(String(id)) ? Number(id) : id;
        const obj = { id: idVal, projectId: pid, ...(fields || {}) };
        const body = spec.wrap ? { [spec.wrap]: [obj] } : obj;
        return toolResult(await specter.admin(spec.endpoint, body));
      } catch (e) {
        return errResult('update entity', e);
      }
    }
  );

  // Escape hatch: call ANY /v1 admin endpoint. Makes every documented admin
  // endpoint reachable (match/add, member/invite/send, reward-set/create, tags,
  // games, ugc-leaderboard, app-event subscribe, bulk-upload, …) without a
  // dedicated tool — look up the exact path + body in the admin references.
  server.registerTool(
    'specter_admin_call',
    {
      title: 'Call any admin (v1) endpoint',
      description:
        "Escape hatch for the dashboard/admin API: POST to any /v1 admin endpoint that lacks a dedicated tool (e.g. match/add, member/invite/send, reward-set/create, games/add, tag/create, ugc-leaderboard/create, app-event/custom/subscribe-all, bulk-upload/*). Find the exact path + request body in the specter-admin references (references/endpoints-index.md and admin-endpoints.md). projectId is auto-injected when omitted. MUTATES live config — ALWAYS confirm with the user first, treat any path containing '/delete' as destructive, and prefer staging.",
      inputSchema: {
        path: z.string().describe('Admin path without the /v1/ prefix, e.g. "match/add"'),
        body: z.record(z.any()).optional().describe('Request body per the admin reference'),
        injectProjectId: z.boolean().optional().describe('Inject the resolved projectId if absent from body (default true)'),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
    },
    async ({ path, body, injectProjectId }) => {
      try {
        const p = path.replace(/^\/?(v1\/)?/, '');
        const b = { ...(body || {}) };
        if (injectProjectId !== false && b.projectId === undefined) b.projectId = await specter.resolveProjectId();
        return toolResult(await specter.admin(p, b));
      } catch (e) {
        return errResult('call admin endpoint', e);
      }
    }
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`specter-mcp running (env=${specter.env}, mutations=${specter.allowMutations && specter.adminEnabled ? 'on' : 'off'})`);
