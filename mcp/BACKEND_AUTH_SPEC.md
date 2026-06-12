# "Authorize a local tool" (browser loopback auth) — status & remaining work

Lets a member authorize the `specter-mcp` server (or any local tool) **without sharing a
password** — works for **Google / Apple** sign-in members too.

## Status

- ✅ **MCP server side** — implemented (`mcp/src/auth.mjs`, `mcp/src/specter-client.mjs`).
- ✅ **Backend endpoints** — implemented on branch `feature/mcp-tool-auth` in
  `gamestarz_dashboard_backend` (`member/tool-auth/issue-code | exchange | list | revoke`,
  the `member_tool_token` table + migration, and an additive `AuthGuard` change that accepts
  `type:'tool'` JWTs). `nest build` passes; needs **security review** + the **migration applied
  to the master DB**.
- ⏳ **Dashboard `/authorize-tool` consent page** — *still needed* (separate frontend repo). It's
  the only missing piece. Spec in §1 below; it just calls the already-built `issue-code` endpoint.

The original full design follows for reference; the backend half is now built to it.

## The flow

```
specter-mcp                         browser / dashboard                backend
-----------                         -------------------                -------
1. start loopback server
   on http://127.0.0.1:<port>
2. open browser →
   {DASHBOARD}/authorize-tool?redirect_uri=http://127.0.0.1:<port>/callback
                              &state=<random>&client=specter-mcp&env=<env>
                                    3. member signs in (email/pass, Google,
                                       or Apple — dashboard's normal login)
                                    4. consent screen:
                                       "Allow specter-mcp to manage your
                                        Specter projects?"  [Allow] [Deny]
                                    5. on Allow → backend issues a short-lived
                                       one-time CODE bound to (member, state)  ──▶ stores code
                                    6. redirect 302 →
                                       http://127.0.0.1:<port>/callback?code=<CODE>&state=<state>
7. verify state matches
8. POST {ADMIN_API}/member/tool-auth/exchange
   { code, state }                                                     ──▶  9. validate code (one-time,
                                                                              short TTL), return token
   ◀── { data: { toolToken, memberId, organisationId } } ─────────────────
10. cache toolToken in
    ~/.specter/credentials.json (0600)
```

For each admin API call the MCP server then mints a short-lived `authToken`:

```
POST {ADMIN_API}/member/tool-auth/refresh  { toolToken }
  ◀── { data: { authToken } }     # ~1h, used as Authorization: Bearer on admin routes
```

(If you'd rather the `toolToken` be accepted **directly** as the bearer on admin routes, the MCP
client already falls back to that when `tool-auth/refresh` is absent — but a dedicated short-lived
authToken is cleaner.)

## 1. Dashboard page: `GET {DASHBOARD}/authorize-tool`

Query params (all from the tool): `redirect_uri`, `state`, `client`, `env`.

- **Require the member to be logged in.** If not, run the dashboard's normal login first
  (email/password, Google, Apple — whatever the member uses), then return here. The tool never
  sees credentials; all auth happens on the dashboard origin.
- **Validate `redirect_uri`** — it MUST be a loopback address: host `127.0.0.1` or `localhost`,
  scheme `http`, any port, path `/callback`. Reject anything else (prevents token exfiltration).
- **Show a consent screen** naming the client (`specter-mcp`) and what it can do.
- On **Allow**: create a one-time `code` (see below) and `302` redirect to
  `redirect_uri?code=<code>&state=<state>` (echo `state` back verbatim).
- On **Deny**: redirect to `redirect_uri?error=access_denied&state=<state>`.

## 2. Backend: issue + exchange the code

- **Code**: random, single-use, **≤ 60s TTL**, bound to `{ memberId, state, redirect_uri }`.
  Stored server-side (Redis is ideal).
- **`POST {ADMIN_API}/member/tool-auth/exchange`** body `{ code, state }` →
  `{ data: { toolToken, memberId, organisationId } }`.
  - Validate the code exists, is unused, unexpired, and its stored `state` equals the request
    `state`. Mark it used.
  - Issue a **`toolToken`**: long-lived (e.g. 90d) or non-expiring-but-revocable, **bound to the
    member**, with a `client` label (`specter-mcp`). Store a hash; show it in a dashboard
    "Connected tools / tokens" list with a **Revoke** button.
- **`POST {ADMIN_API}/member/tool-auth/refresh`** body `{ toolToken }` →
  `{ data: { authToken } }` (~1h member auth token, same shape as `member/sign-in`'s
  `data.authToken`). Reject revoked/expired tool tokens with 401.

## Security checklist

- [ ] `redirect_uri` loopback-only (127.0.0.1 / localhost), validated server-side too.
- [ ] `state` round-tripped and compared (CSRF).
- [ ] `code` one-time, short TTL, bound to member + state; never the long-lived token in a URL.
- [ ] `toolToken` revocable from the dashboard; scoped to the member's orgs/projects.
- [ ] Consent screen so the member explicitly approves.
- [ ] Rate-limit `exchange`/`refresh`.

## Notes for whoever implements it

- `member/sign-in` already returns `data.authToken` (1h) + a 90d refresh token; this flow is the
  same idea but issues a **purpose-built, revocable tool credential** instead of reusing the
  dashboard session — so a leaked tool token can be killed without touching the member's login.
- `{DASHBOARD}` = `https://console.specterapp.xyz` (prod) / `https://staging.specterapp.xyz`
  (staging). `{ADMIN_API}` = `https://admin.specterapp.xyz/v1`.
- Once these two endpoints exist, **no MCP changes are needed** — `specter-mcp login` works.
