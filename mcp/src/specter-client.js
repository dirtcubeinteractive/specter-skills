// Thin HTTP client for the Specter APIs, shared by all MCP tools.
// Client API: api-key (+ test-player Bearer where needed).
// Admin API: member email/password → Bearer JWT (cached, re-login on 401).

const CLIENT_BASES = {
  staging: 'https://client.staging.specterapp.xyz/v2/client',
  production: 'https://api.specterapp.xyz/v2/client',
};

export class SpecterClient {
  constructor(env) {
    this.env = env.SPECTER_ENV ?? 'staging';
    this.base = CLIENT_BASES[this.env];
    if (!this.base) throw new Error(`SPECTER_ENV must be staging or production, got "${this.env}"`);
    this.apiKey = env.SPECTER_API_KEY;
    if (!this.apiKey) throw new Error('SPECTER_API_KEY is required');

    this.adminBase = env.SPECTER_ADMIN_URL ?? null; // e.g. https://admin.specterapp.xyz/v1
    this.memberEmail = env.SPECTER_MEMBER_EMAIL ?? null;
    this.memberPassword = env.SPECTER_MEMBER_PASSWORD ?? null;
    this.projectId = env.SPECTER_PROJECT_ID ?? null;
    this.allowMutations = env.SPECTER_ALLOW_MUTATIONS === 'true';

    this.playerToken = null;
    this.adminToken = null;
  }

  get adminEnabled() {
    return Boolean(this.adminBase && this.memberEmail && this.memberPassword);
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

  /** Admin API call (member Bearer). */
  async admin(path, body = {}) {
    if (!this.adminEnabled) {
      throw new Error('Admin tools need SPECTER_ADMIN_URL, SPECTER_MEMBER_EMAIL and SPECTER_MEMBER_PASSWORD in the MCP server env.');
    }
    if (!this.adminToken) await this.#loginMember();
    let r = await this.#post(`${this.adminBase}/${path}`, body, { Authorization: `Bearer ${this.adminToken}` });
    if (r.http === 401 || r.json?.code === 401) {
      await this.#loginMember();
      r = await this.#post(`${this.adminBase}/${path}`, body, { Authorization: `Bearer ${this.adminToken}` });
    }
    return r;
  }

  async #loginMember() {
    const { json } = await this.#post(`${this.adminBase}/member/sign-in`, {
      email: this.memberEmail,
      password: this.memberPassword,
    });
    this.adminToken = json?.data?.authToken ?? json?.data?.accessToken ?? json?.data?.token ?? null;
    if (!this.adminToken) throw new Error(`Member sign-in failed: ${JSON.stringify(json?.errors ?? json)?.slice(0, 200)}`);
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
