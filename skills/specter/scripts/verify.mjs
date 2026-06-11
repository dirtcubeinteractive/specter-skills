#!/usr/bin/env node
/**
 * Specter integration smoke-test. Claude (or a developer) runs this to answer
 * "is my Specter setup working?" — api-key, auth, wallets, tasks, events.
 *
 *   SPECTER_API_KEY=<key> node verify.mjs [--env staging|production] [--event <eventId>]
 *
 * Read-only except: creates/logs-in one reusable test player (customId
 * "specter-verify-bot") and, only when --event is passed, sends that event as
 * the test player. Requires Node 18+ (built-in fetch). Zero dependencies.
 */

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 ? args[i + 1] : undefined;
};

const ENV = flag('env') ?? 'staging';
const BASES = {
  staging: 'https://client.staging.specterapp.xyz/v2/client',
  production: 'https://api.specterapp.xyz/v2/client',
};
const BASE = BASES[ENV];
const API_KEY = process.env.SPECTER_API_KEY;
const TEST_EVENT = flag('event');

if (!BASE) fail(`--env must be staging or production, got "${ENV}"`);
if (!API_KEY) fail('Set SPECTER_API_KEY env var (dashboard → Project → API Keys; use the key matching --env).');

let token = null;
const results = [];

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

function report(name, ok, detail) {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
}

async function call(path, body = {}, { auth = false } = {}) {
  for (let attempt = 1; ; attempt++) {
    try {
      const res = await fetch(`${BASE}/${path}`, {
        method: 'POST',
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json',
          ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000),
      });
      let json = null;
      try {
        json = await res.json();
      } catch {
        /* non-JSON body (gateway errors) */
      }
      return { http: res.status, json };
    } catch (e) {
      if (attempt >= 3) return { http: 0, json: null, networkError: e.cause?.code ?? e.message };
      await new Promise((r) => setTimeout(r, attempt * 1500));
    }
  }
}

console.log(`Specter setup verification — ${ENV} (${BASE})\n`);

// 1. api-key works at all
{
  const { http, json } = await call('app/welcome');
  if (json?.status === 'success') report('api-key valid (app/welcome)', true);
  else if (http === 401) report('api-key valid', false, `401 — wrong key or wrong environment (this is the ${ENV} endpoint; dev/qa/prod keys differ)`);
  else if (http === 402) report('api-key valid', false, '402 — billing term ended, renew subscription');
  else report('api-key valid', false, `HTTP ${http}: ${JSON.stringify(json)?.slice(0, 120)}`);
}

// 2. project info
{
  const { json } = await call('app/get-info', {});
  report('project info (app/get-info)', json?.status === 'success', json?.data?.name ? `project: ${json.data.name}` : undefined);
}

// 3. currencies configured?
let currencyIds = [];
{
  const { json } = await call('app/get-currencies', { limit: 20 });
  const list = json?.data?.currencies ?? json?.data ?? [];
  currencyIds = (Array.isArray(list) ? list : []).map((c) => c.id).filter(Boolean);
  report(
    'currencies configured',
    currencyIds.length > 0,
    currencyIds.length ? currencyIds.slice(0, 5).join(', ') : 'none found — create currencies in the dashboard before wallet calls'
  );
}

// 4. player login (login-or-create)
{
  const { json } = await call('auth/login-custom', { customId: 'specter-verify-bot', createAccount: true });
  token = json?.data?.accessToken ?? null;
  report(
    'player auth (auth/login-custom)',
    !!token,
    token ? `test player ok (createdAccount: ${json.data.createdAccount})` : JSON.stringify(json?.errors)?.slice(0, 120)
  );
}

// 5. wallet provisioned for test player
if (token && currencyIds.length) {
  const { json } = await call('player/me/get-wallet-balance', { currencyIds: currencyIds.slice(0, 5) }, { auth: true });
  const balances = Array.isArray(json?.data) ? json.data : [];
  report(
    'wallets provisioned',
    balances.length > 0,
    balances.map((b) => `${b.id}=${b.balance}`).join(', ').slice(0, 100)
  );
}

// 6. tasks configured?
{
  const { json } = await call('app/get-tasks', { limit: 5, attributes: ['event'] });
  const tasks = json?.data?.tasks ?? [];
  const detail = tasks.length
    ? tasks.slice(0, 3).map((t) => `${t.id}${t.event?.name ? ` (event: ${t.event.name})` : ''}`).join(', ')
    : 'none — configure tasks in the dashboard for quests/achievements';
  report('tasks configured', tasks.length > 0, detail);
}

// 7. optional: send a test event end-to-end
if (TEST_EVENT && token) {
  const { json } = await call('events/send-custom', { eventId: TEST_EVENT, customParams: { verify: 1 } }, { auth: true });
  const ok = json?.status === 'success';
  report(
    `event "${TEST_EVENT}" accepted`,
    ok,
    ok
      ? 'task validation runs async — check player/me/get-task-status in a few seconds'
      : json?.errors?.[0]?.errorCode === 1119
        ? 'EventNotFound — eventId must be the dashboard slug (e.g. daily_streak_hit), NOT the event.id UUID from get-tasks'
        : JSON.stringify(json?.errors)?.slice(0, 120)
  );
}

// summary
const failed = results.filter((r) => !r.ok);
console.log(
  `\n${failed.length === 0 ? '✓ All checks passed — this Specter project is ready to integrate.' : `✗ ${failed.length}/${results.length} checks failed: ${failed.map((f) => f.name).join('; ')}`}`
);
process.exit(failed.length ? 1 : 0);
