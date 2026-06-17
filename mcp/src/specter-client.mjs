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

// Single source of truth for recurrence interval units. Verified against the
// backend `leaderboardIntervals` seed (constants.ts) AND the task/schedule
// controller switch: id 1=days, 2=weeks, 3=monthly, 4=yearly, 5=all_time,
// 6=custom, 7=minutes, 8=hours. Used for task/task-group scheduling
// (intervalUnitId) and time-series stageIntervalUnitId — they share this table.
export const INTERVAL_UNIT = { minute: 7, hour: 8, day: 1, week: 2, month: 3, year: 4, all_time: 5, custom: 6 };

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export class SpecterClient {
  constructor(env) {
    this.env = env.SPECTER_ENV ?? 'staging';
    this.base = CLIENT_BASES[this.env];
    if (!this.base) throw new Error(`SPECTER_ENV must be staging or production, got "${this.env}"`);
    // Optional: after a browser login the dev api-key from the member's sign-in is
    // cached and used instead, so SPECTER_API_KEY is only needed for client API
    // reads before logging in.
    this.apiKey = env.SPECTER_API_KEY ?? null;

    this.adminBase = env.SPECTER_ADMIN_URL ?? ADMIN_BASES[this.env];
    this.dashboardUrl = env.SPECTER_DASHBOARD_URL ?? null;
    this.adminTokenEnv = env.SPECTER_ADMIN_TOKEN ?? null;
    this.memberEmail = env.SPECTER_MEMBER_EMAIL ?? null;
    this.memberPassword = env.SPECTER_MEMBER_PASSWORD ?? null;
    this.projectId = env.SPECTER_PROJECT_ID ?? null;
    this.allowMutations = env.SPECTER_ALLOW_MUTATIONS === 'true';

    this.playerToken = null;
    this.adminToken = null; // a short-lived authToken minted from a tool token / login
    this.resolveCache = new Map(); // per-invocation memo for resolver list lookups
  }

  /** Clear the resolver lookup cache — call at the start of each create tool so
   *  one invocation reuses lookups but the next sees freshly-created entities. */
  clearResolveCache() {
    this.resolveCache.clear();
  }

  /** Cached admin list fetch — returns the `data` object, memoised by cache key. */
  async cachedListData(endpoint, body, cacheKey) {
    if (this.resolveCache.has(cacheKey)) return this.resolveCache.get(cacheKey);
    const { json } = await this.admin(endpoint, body);
    const data = json?.data ?? {};
    this.resolveCache.set(cacheKey, data);
    return data;
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

  /**
   * projectId for admin create calls. Priority: tool arg → SPECTER_PROJECT_ID →
   * auto-discover from the logged-in member's organisation (no config needed).
   */
  async resolveProjectId(arg) {
    if (arg) return arg;
    if (this.projectId) return this.projectId;
    if (this.discoveredProjectId) return this.discoveredProjectId;

    const creds = loadCreds(this.env);
    if (!creds?.organisationId) {
      throw new Error(
        'No project selected and not signed in. Run `specter-mcp login`, or pass projectId / set SPECTER_PROJECT_ID.'
      );
    }
    const { json } = await this.admin('app/get', {
      organisationId: creds.organisationId,
      pageNo: 0,
      pageSize: 100,
    });
    const projects = json?.data?.projectDetails ?? [];
    if (projects.length === 1) {
      this.discoveredProjectId = projects[0].id;
      return this.discoveredProjectId;
    }
    if (projects.length === 0) {
      throw new Error('No projects found in your organisation. Create one in the dashboard first.');
    }
    throw new Error(
      `You have multiple projects — tell me which one (pass projectId). Options: ${projects
        .map((p) => `${p.name} = ${p.id}`)
        .join('; ')}`
    );
  }

  /**
   * Paginated admin list. Resolves projectId, applies the right pagination
   * shape, and returns { http, json } like the other callers expect.
   */
  async adminList(endpoint, { pageSize = 50, search, extra = {}, pagination = 'page' } = {}) {
    const projectId = await this.resolveProjectId(extra.projectId);
    const page =
      pagination === 'offset'
        ? { ids: [], offset: 0, limit: pageSize }
        : { pageNo: 0, pageSize };
    const body = { projectId, ...page, ...(search ? { search } : {}), ...extra };
    delete body.projectId; // re-add cleanly so a null extra.projectId can't clobber it
    body.projectId = projectId;
    return this.admin(endpoint, body);
  }

  /** Resolve a currency reference (integer id, slug, or display name) → integer id. */
  async resolveCurrencyId(projectId, ref) {
    if (typeof ref === 'number') return ref;
    if (/^\d+$/.test(String(ref))) return Number(ref);
    const data = await this.cachedListData('currencies/get', { projectId, pageNo: 0, pageSize: 200 }, `currencies:${projectId}`);
    const list = data.currenciesDetails ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((c) => c.currencyId?.toLowerCase() === needle || c.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Currency "${ref}" not found. Available: ${list.map((c) => c.currencyId).join(', ') || '(none — create one first)'}`);
    return m.id; // INTEGER id
  }

  /** Resolve a custom-event reference (UUID, slug, or name) → event UUID. */
  async resolveEventId(projectId, ref) {
    if (!ref) return null;
    if (UUID_RE.test(String(ref))) return ref;
    const data = await this.cachedListData('app-event/get/custom', { projectId, pageNo: 0, pageSize: 200 }, `customevents:${projectId}`);
    const list = data.appEventDetails ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((e) => e.eventId?.toLowerCase() === needle || e.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Custom event "${ref}" not found. Available: ${list.map((e) => e.eventId).join(', ') || '(none — create one with specter_create_event first)'}`);
    return m.id; // UUID
  }

  /** Resolve a default-event reference (UUID or name) → event UUID. */
  async resolveDefaultEventId(projectId, ref) {
    if (!ref) return null;
    if (UUID_RE.test(String(ref))) return ref;
    const data = await this.cachedListData('app-event/get/default', { projectId, pageNo: 0, pageSize: 300 }, `defaultevents:${projectId}`);
    const list = data.appEventDetails ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((e) => e.name?.toLowerCase() === needle || e.eventId?.toLowerCase() === needle);
    if (!m) throw new Error(`Default event "${ref}" not found. Some available: ${list.slice(0, 30).map((e) => e.name).join(', ')}`);
    return m.id; // UUID
  }

  /** Dispatch to custom/default event resolver. */
  async resolveAppEventId(projectId, ref, eventType = 'custom') {
    return eventType === 'default' ? this.resolveDefaultEventId(projectId, ref) : this.resolveEventId(projectId, ref);
  }

  /** Resolve a progression-marker reference (int id, slug, or name) → INTEGER id. */
  async resolveMarkerId(projectId, ref) {
    if (typeof ref === 'number') return ref;
    if (/^\d+$/.test(String(ref))) return Number(ref);
    const data = await this.cachedListData('progression-marker/get', { projectId, ids: [], offset: 0, limit: 200 }, `markers:${projectId}`);
    const list = data.progressionMarkers ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((x) => x.progressionMarkerId?.toLowerCase() === needle || x.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Progression marker "${ref}" not found. Available: ${list.map((x) => x.progressionMarkerId || x.name).join(', ') || '(none)'}`);
    return m.id; // INTEGER id
  }

  /** Resolve an item reference (UUID, slug, or name) → item UUID. */
  async resolveItemId(projectId, ref) {
    if (UUID_RE.test(String(ref))) return ref;
    const data = await this.cachedListData('items/get', { projectId, pageNo: 0, pageSize: 200 }, `items:${projectId}`);
    const list = data.items ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((x) => x.itemId?.toLowerCase() === needle || x.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Item "${ref}" not found. Available: ${list.map((x) => x.itemId).join(', ') || '(none)'}`);
    return m.id; // UUID
  }

  /** Resolve a bundle reference (UUID, slug, or name) → bundle UUID. */
  async resolveBundleId(projectId, ref) {
    if (UUID_RE.test(String(ref))) return ref;
    const data = await this.cachedListData('bundle/get', { projectId, pageNo: 0, pageSize: 200 }, `bundles:${projectId}`);
    const list = data.bundles ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((x) => x.bundleId?.toLowerCase() === needle || x.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Bundle "${ref}" not found. Available: ${list.map((x) => x.bundleId).join(', ') || '(none)'}`);
    return m.id; // UUID
  }

  /** Resolve a level-system reference (UUID, slug, or name) → level-system UUID. */
  async resolveLevelSystemId(projectId, ref) {
    if (UUID_RE.test(String(ref))) return ref;
    const data = await this.cachedListData('level-system/get', { projectId, pageNo: 0, pageSize: 200 }, `levelsystems:${projectId}`);
    const list = data.levelDetails ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((x) => x.levelSystemId?.toLowerCase() === needle || x.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Level system "${ref}" not found. Available: ${list.map((x) => x.levelSystemId || x.name).join(', ') || '(none)'}`);
    return m.id; // UUID
  }

  /** Resolve a task reference (UUID, slug, or name) → task UUID. */
  async resolveTaskId(projectId, ref) {
    if (UUID_RE.test(String(ref))) return ref;
    const data = await this.cachedListData('task/get', { projectId, pageNo: 0, pageSize: 200 }, `tasks:${projectId}`);
    const list = data.tasks ?? [];
    const needle = String(ref).toLowerCase();
    const m = list.find((x) => x.taskId?.toLowerCase() === needle || x.name?.toLowerCase() === needle);
    if (!m) throw new Error(`Task "${ref}" not found.`);
    return m.id; // UUID
  }

  /** Resolve a task-group reference (UUID, slug, or name) → group UUID. Probes all 3 types. */
  async resolveTaskGroupId(projectId, ref) {
    if (UUID_RE.test(String(ref))) return ref;
    const needle = String(ref).toLowerCase();
    for (const typeId of [1, 2, 3]) {
      const data = await this.cachedListData('task-group/get', { projectId, typeId, ids: [], pageNo: 0, pageSize: 200 }, `taskgroups${typeId}:${projectId}`);
      const arr = Object.values(data).find((v) => Array.isArray(v)) ?? [];
      const m = arr.find((x) => x.taskGroupId?.toLowerCase() === needle || x.name?.toLowerCase() === needle);
      if (m) return m.id;
    }
    throw new Error(`Task group "${ref}" not found in missions / step-series / time-series.`);
  }

  /**
   * Turn user-friendly rewards [{currency|item|bundle|marker|rewardSet, quantity, probability?}]
   * into the backend TaskReward shape, routing each by kind so integer-PK ids
   * (currency, marker) and UUID ids (item, bundle, rewardSet) never get crossed.
   */
  async resolveRewardDetails(projectId, rewards = []) {
    const out = [];
    for (const r of rewards) {
      if (!r) continue;
      const base = r.probability != null ? { probability: r.probability } : {};
      if (r.currency != null) out.push({ currencyId: await this.resolveCurrencyId(projectId, r.currency), quantity: r.quantity, ...base });
      else if (r.item != null) out.push({ itemId: await this.resolveItemId(projectId, r.item), quantity: r.quantity, ...base });
      else if (r.bundle != null) out.push({ bundleId: await this.resolveBundleId(projectId, r.bundle), quantity: r.quantity, ...base });
      else if (r.marker != null) out.push({ progressionMarkerId: await this.resolveMarkerId(projectId, r.marker), quantity: r.quantity, ...base });
      else if (r.rewardSet != null) out.push({ rewardSetId: r.rewardSet, quantity: r.quantity, ...base });
      else throw new Error(`Reward entry needs one of currency/item/bundle/marker/rewardSet: ${JSON.stringify(r)}`);
    }
    return out;
  }

  /** The api-key for the client API gateway: explicit env, else the cached dev key. */
  #clientApiKey() {
    const key = this.apiKey || loadCreds(this.env)?.apiKey;
    if (!key) {
      throw new Error(
        'No api-key available. Set SPECTER_API_KEY, or run `specter-mcp login` (its dev api-key is then reused).'
      );
    }
    return key;
  }

  /**
   * The CLIENT-gateway api-key. The member's cached dev key is NOT a valid client
   * key — the client gateway wants the project's clientStaging/Dev/Production key
   * (from app/get → projectDetails.apiKeys). Resolve + cache it. Explicit
   * SPECTER_API_KEY still wins.
   */
  async resolveClientApiKey() {
    if (this.apiKey) return this.apiKey;
    if (this._clientApiKey) return this._clientApiKey;
    const creds = loadCreds(this.env);
    if (!creds?.organisationId) {
      throw new Error('Not signed in — run `specter-mcp login` to use the client/test tools (they call the game-facing /v2/client API).');
    }
    const projectId = await this.resolveProjectId();
    const { json } = await this.admin('app/get', { organisationId: creds.organisationId, pageNo: 0, pageSize: 100 });
    const projects = json?.data?.projectDetails ?? [];
    const proj = projects.find((p) => p.id === projectId) || projects[0];
    const ak = proj?.apiKeys ?? {};
    // The staging client host (client.staging.specterapp.xyz) accepts the
    // clientDevAPIKey; production uses clientProductionAPIKey. (clientStaging/
    // production keys 503 against the staging host — verified.)
    const key =
      this.env === 'production'
        ? ak.clientProductionAPIKey?.[0]
        : ak.clientDevAPIKey?.[0] || ak.clientStagingAPIKey?.[0];
    const resolved = key || ak.clientDevAPIKey?.[0] || ak.clientStagingAPIKey?.[0] || ak.clientProductionAPIKey?.[0];
    if (!resolved) throw new Error('No client api-key found for this project (create one in the dashboard → API Settings).');
    this._clientApiKey = resolved;
    return resolved;
  }

  /** Client API call. auth: 'none' | 'player' (test-player Bearer). */
  async client(path, body = {}, { auth = 'none' } = {}) {
    const apiKey = await this.resolveClientApiKey();
    const headers = { 'api-key': apiKey };
    if (auth === 'player') {
      if (!this.playerToken) await this.#loginTestPlayer(apiKey);
      headers.Authorization = `Bearer ${this.playerToken}`;
    }
    let r = await this.#post(`${this.base}/${path}`, body, headers);
    if (auth === 'player' && r.json?.code === 401) {
      await this.#loginTestPlayer(apiKey);
      headers.Authorization = `Bearer ${this.playerToken}`;
      r = await this.#post(`${this.base}/${path}`, body, headers);
    }
    return r;
  }

  async #loginTestPlayer(apiKey) {
    const key = apiKey || (await this.resolveClientApiKey());
    const { json } = await this.#post(
      `${this.base}/auth/login-custom`,
      { customId: 'specter-mcp-test-player', createAccount: true },
      { 'api-key': key }
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

/** Format an admin list response: pull the array at `key` into concise rows. */
export function listResult({ http, json }, key, label) {
  if (json?.status !== 'success') {
    const err = json?.errors?.length ? JSON.stringify(json.errors) : JSON.stringify(json) || `HTTP ${http}`;
    return { isError: true, content: [{ type: 'text', text: `Specter error (HTTP ${http}) listing ${label}: ${err.slice(0, 800)}` }] };
  }
  const arr = json?.data?.[key] ?? [];
  if (!arr.length) return { content: [{ type: 'text', text: `No ${label} configured in this project yet.` }] };
  // Keep the fields an LLM needs to reference an entity later, without the noise.
  const rows = arr.map((o) => {
    const keep = {};
    for (const f of ['id', 'name', 'currencyId', 'eventId', 'taskId', 'itemId', 'bundleId', 'storeId', 'leaderboardId', 'competitionId', 'battlepassId', 'type', 'quantity', 'rewardClaim', 'isRecurring', 'active'])
      if (o[f] !== undefined && o[f] !== null) keep[f] = o[f];
    return Object.keys(keep).length ? keep : o;
  });
  return { content: [{ type: 'text', text: `${arr.length} ${label}:\n${JSON.stringify(rows, null, 1).slice(0, 11000)}` }] };
}
