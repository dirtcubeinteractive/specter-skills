// Thin HTTP client for the Specter APIs, shared by all MCP tools.
// Client API: api-key (+ test-player Bearer where needed).
// Admin API auth, in priority order:
//   1. Browser login (loopback OAuth) → tool token cached in ~/.specter/credentials.json
//   2. SPECTER_ADMIN_TOKEN env (for CI / non-interactive)
//   3. SPECTER_MEMBER_EMAIL + _PASSWORD (legacy fallback — password members only)

import { loadCreds } from './auth.mjs';

const CLIENT_BASES = {
  staging: 'https://client.staging.specterapp.xyz/v2/client',
  production: 'https://api.specterapp.xyz/v2/client',
};

const ADMIN_BASES = {
  staging: 'https://admin.staging.specterapp.xyz/v1',
  production: 'https://admin.specterapp.xyz/v1',
};

export class SpecterClient {
  constructor(env) {
    this.env = env.SPECTER_ENV ?? 'staging';
    this.base = CLIENT_BASES[this.env];
    if (!this.base) throw new Error(`SPECTER_ENV must be staging or production, got "${this.env}"`);
    this.apiKey = env.SPECTER_API_KEY;
    if (!this.apiKey) throw new Error('SPECTER_API_KEY is required');

    this.adminBase = env.SPECTER_ADMIN_URL ?? ADMIN_BASES[this.env];
    this.dashboardUrl = env.SPECTER_DASHBOARD_URL ?? null;
    this.adminTokenEnv = env.SPECTER_ADMIN_TOKEN ?? null;
    this.memberEmail = env.SPECTER_MEMBER_EMAIL ?? null;
    this.memberPassword = env.SPECTER_MEMBER_PASSWORD ?? null;
    this.projectId = env.SPECTER_PROJECT_ID ?? null;
    this.allowMutations = env.SPECTER_ALLOW_MUTATIONS === 'true';

    this.playerToken = null;
    this.adminToken = null; // a short-lived authToken minted from a tool token / login
  }

  /** True if mutating admin tools should be registered (gated, not yet authenticated). */
  get adminEnabled() {
    return this.allowMutations;
  }

  /** Whether we already have a usable admin credential (no browser login needed). */
  hasAdminCredential() {
    return Boolean(this.adminTokenEnv || loadCreds(this.env)?.toolToken || (this.memberEmail && this.memberPassword));
  }

  async #post(url, body, headers) {
    for (let attempt = 1; ; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...headers },
          body: JSON.stringify(body ?? {}),
          signal: AbortSignal.timeout(20000),
        });
        let json = null;
        try {
          json = await res.json();
        } catch {
          /* gateway errors may be non-JSON */
        }
        return { http: res.status, json };
      } catch (e) {
        if (attempt >= 3) throw new Error(`Network error calling ${url}: ${e.cause?.code ?? e.message}`);
        await new Promise((r) => setTimeout(r, attempt * 1000));
      }
    }
  }

  /** Client API call. auth: 'none' | 'player' (test-player Bearer). */
  async client(path, body = {}, { auth = 'none' } = {}) {
    const headers = { 'api-key': this.apiKey };
    if (auth === 'player') {
      if (!this.playerToken) await this.#loginTestPlayer();
      headers.Authorization = `Bearer ${this.playerToken}`;
    }
    let r = await this.#post(`${this.base}/${path}`, body, headers);
    if (auth === 'player' && r.json?.code === 401) {
      await this.#loginTestPlayer();
      headers.Authorization = `Bearer ${this.playerToken}`;
      r = await this.#post(`${this.base}/${path}`, body, headers);
    }
    return r;
  }

  async #loginTestPlayer() {
    const { json } = await this.#post(
      `${this.base}/auth/login-custom`,
      { customId: 'specter-mcp-test-player', createAccount: true },
      { 'api-key': this.apiKey }
    );
    this.playerToken = json?.data?.accessToken ?? null;
    if (!this.playerToken) throw new Error(`Test-player login failed: ${JSON.stringify(json?.errors ?? json)?.slice(0, 200)}`);
  }

  /** Admin API call. Resolves an admin token from the best available source. */
  async admin(path, body = {}) {
    if (!this.adminToken) await this.#resolveAdminToken();
    // The admin API is behind the api-key gateway. Prefer the dev api-key handed
    // back by the browser login (stored with the tool token); fall back to the
    // configured SPECTER_API_KEY. Plus the member/tool Bearer for backend auth.
    const gatewayKey = loadCreds(this.env)?.apiKey || this.apiKey;
    const headers = () => ({ 'api-key': gatewayKey, Authorization: `Bearer ${this.adminToken}` });
    let r = await this.#post(`${this.adminBase}/${path}`, body, headers());
    if (r.http === 401 || r.json?.code === 401) {
      // token expired/revoked — re-resolve once
      this.adminToken = null;
      await this.#resolveAdminToken();
      r = await this.#post(`${this.adminBase}/${path}`, body, headers());
    }
    return r;
  }

  // Priority: explicit env token → cached browser-login tool token → legacy email/password.
  async #resolveAdminToken() {
    if (this.adminTokenEnv) {
      this.adminToken = this.adminTokenEnv;
      return;
    }
    const creds = loadCreds(this.env);
    if (creds?.toolToken) {
      // The backend member auth guard accepts the tool token (a type:'tool' JWT)
      // directly as the bearer, authenticating as the member via its jti.
      this.adminToken = creds.toolToken;
      return;
    }
    if (this.memberEmail && this.memberPassword) {
      const { json } = await this.#post(
        `${this.adminBase}/member/sign-in`,
        { email: this.memberEmail, password: this.memberPassword },
        { 'api-key': this.apiKey }
      );
      this.adminToken = json?.data?.authToken ?? json?.data?.accessToken ?? json?.data?.token ?? null;
      if (this.adminToken) return;
    }
    throw new Error(
      'Not authenticated for admin actions. Run `specter-mcp login` (opens the dashboard in your browser), or set SPECTER_ADMIN_TOKEN.'
    );
  }
}

/** Format a Specter response for an MCP tool result. */
export function toolResult({ http, json }) {
  if (json?.status === 'success') {
    return { content: [{ type: 'text', text: JSON.stringify(json.data ?? {}, null, 1).slice(0, 12000) }] };
  }
  const err = json?.errors?.length ? JSON.stringify(json.errors) : JSON.stringify(json) || `HTTP ${http}`;
  return { isError: true, content: [{ type: 'text', text: `Specter error (HTTP ${http}): ${err.slice(0, 800)}` }] };
}
