// Browser-based "authorize a local tool" flow (loopback OAuth, like gh/gcloud/vercel).
//
// The member authenticates in their browser on the Specter dashboard — by ANY method
// (email/password, Google, Apple) — so this MCP server never sees a password or social
// credential. The dashboard hands back a short-lived `code` to a loopback URL; we exchange
// it for a long-lived, revocable tool token and cache it in ~/.specter/credentials.json.
//
// Backend contract this expects is documented in mcp/BACKEND_AUTH_SPEC.md.

import http from 'node:http';
import { randomBytes } from 'node:crypto';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, chmodSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const DASHBOARD_BASES = {
  staging: 'https://staging.specterapp.xyz',
  production: 'https://console.specterapp.xyz',
};

const CRED_DIR = join(homedir(), '.specter');
const CRED_FILE = join(CRED_DIR, 'credentials.json');

function dashboardBase(env, override) {
  return override ?? DASHBOARD_BASES[env] ?? DASHBOARD_BASES.production;
}

export function loadCreds(env) {
  try {
    const all = JSON.parse(readFileSync(CRED_FILE, 'utf8'));
    return all[env] ?? null;
  } catch {
    return null;
  }
}

function saveCreds(env, creds) {
  mkdirSync(CRED_DIR, { recursive: true });
  let all = {};
  try {
    all = JSON.parse(readFileSync(CRED_FILE, 'utf8'));
  } catch {
    /* first write */
  }
  all[env] = creds;
  writeFileSync(CRED_FILE, JSON.stringify(all, null, 2));
  try {
    chmodSync(CRED_FILE, 0o600);
  } catch {
    /* best-effort on platforms without POSIX perms */
  }
}

export function clearCreds(env) {
  let all = {};
  try {
    all = JSON.parse(readFileSync(CRED_FILE, 'utf8'));
  } catch {
    return;
  }
  delete all[env];
  writeFileSync(CRED_FILE, JSON.stringify(all, null, 2));
}

function openBrowser(url) {
  const cmd =
    process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '""', url] : [url];
  try {
    spawn(cmd, args, { stdio: 'ignore', detached: true }).unref();
    return true;
  } catch {
    return false;
  }
}

const SUCCESS_HTML = `<!doctype html><html><head><meta charset="utf-8"><title>Specter</title>
<style>body{font-family:system-ui;background:#0e0e10;color:#eee;display:grid;place-items:center;height:100vh;margin:0}
.box{text-align:center}.c{color:#5ee6a0;font-size:48px}</style></head>
<body><div class="box"><div class="c">&#10003;</div><h2>Connected to Specter</h2>
<p>You can close this tab and return to Claude.</p></div></body></html>`;

const FAIL_HTML = (msg) => `<!doctype html><html><head><meta charset="utf-8"><title>Specter</title>
<style>body{font-family:system-ui;background:#0e0e10;color:#eee;display:grid;place-items:center;height:100vh;margin:0}
.c{color:#ff6b6b;font-size:48px}</style></head>
<body><div style="text-align:center"><div class="c">&#10007;</div><h2>Authentication failed</h2>
<p>${msg}</p></div></body></html>`;

/**
 * Run the loopback login flow. Resolves to the stored creds object.
 * @param {{env: string, adminBase: string, apiKey: string, dashboardUrl?: string,
 *          timeoutMs?: number, onUrl?: (url:string)=>void}} opts
 */
export async function loginViaBrowser(opts) {
  const { env, adminBase, apiKey, dashboardUrl, timeoutMs = 180000, onUrl } = opts;
  const state = randomBytes(16).toString('hex');

  return new Promise((resolve, reject) => {
    const server = http.createServer(async (req, res) => {
      const url = new URL(req.url, 'http://127.0.0.1');
      if (url.pathname !== '/callback') {
        res.writeHead(404).end();
        return;
      }
      const code = url.searchParams.get('code');
      const retState = url.searchParams.get('state');
      const err = url.searchParams.get('error');

      const finish = (status, html, settle) => {
        res.writeHead(status, { 'Content-Type': 'text/html' }).end(html);
        clearTimeout(timer);
        server.close();
        settle();
      };

      if (err) return finish(400, FAIL_HTML(err), () => reject(new Error(`Dashboard returned: ${err}`)));
      if (retState !== state) return finish(400, FAIL_HTML('state mismatch'), () => reject(new Error('state mismatch (possible CSRF) — try again')));
      if (!code) return finish(400, FAIL_HTML('no code'), () => reject(new Error('no authorization code returned')));

      try {
        // Exchange the short-lived code for a long-lived tool token.
        // The exchange route is bypassed at the gateway (one-time code is the
        // security), so an api-key is not required — include it only if present.
        const r = await fetch(`${adminBase}/member/tool-auth/exchange`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(apiKey ? { 'api-key': apiKey } : {}) },
          body: JSON.stringify({ code, state }),
          signal: AbortSignal.timeout(15000),
        });
        const json = await r.json().catch(() => null);
        const data = json?.data ?? json;
        const toolToken = data?.toolToken ?? data?.token;
        if (!r.ok || !toolToken) {
          throw new Error(json?.errors?.[0]?.errorMessage ?? `exchange failed (HTTP ${r.status})`);
        }
        const creds = {
          toolToken,
          memberId: data.memberId ?? null,
          organisationId: data.organisationId ?? null,
          // Dev api-key from the member's sign-in, used to clear the gateway on
          // admin calls — so the user doesn't have to configure one separately.
          apiKey: data.apiKey ?? null,
          savedAt: new Date().toISOString(),
        };
        saveCreds(env, creds);
        finish(200, SUCCESS_HTML, () => resolve(creds));
      } catch (e) {
        finish(500, FAIL_HTML(e.message), () => reject(e));
      }
    });

    const timer = setTimeout(() => {
      server.close();
      reject(new Error('Login timed out — no response from the browser within 3 minutes.'));
    }, timeoutMs);

    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      const redirectUri = `http://127.0.0.1:${port}/callback`;
      const authUrl =
        `${dashboardBase(env, dashboardUrl)}/authorize-tool` +
        `?redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}&client=specter-mcp&env=${encodeURIComponent(env)}`;
      onUrl?.(authUrl);
      openBrowser(authUrl);
    });

    server.on('error', (e) => {
      clearTimeout(timer);
      reject(new Error(`Could not start local callback server: ${e.message}`));
    });
  });
}
