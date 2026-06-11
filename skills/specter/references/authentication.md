# Specter authentication reference

## Headers

| Header | Required | Value |
|---|---|---|
| `api-key` | Always | Environment-specific project API key from the dashboard (Project → API Keys). Dev, QA and production keys differ — using the wrong environment's key returns 401. |
| `Authorization` | Player-scoped endpoints | `Bearer <accessToken>` from any login/signup endpoint |
| `Content-Type` | When sending a body | `application/json` |

The gateway validates the api-key (cached ~60s server-side), checks the organization's plan
limits and billing status, applies rate limits, and only then forwards the request. The Bearer
token's embedded `projectId` must match the api-key's project — a mismatch returns
`401 Invalid Api Key or access token`.

## Token lifecycle

- `auth/login-*` / `auth/signup-*` → returns `accessToken` (JWT, ~1h expiry) and `entityToken`.
- `auth/refresh-token` (api-key; send `entityToken` + the expiring access token in the **body**)
  → new access token. Refresh proactively before expiry.
- `auth/validate-token` (Bearer) → check validity (useful on game resume).
- Tokens are also accepted by the multiplayer Socket.io server in the connection handshake
  (`auth: { token, apiKey }`) — same JWT, no separate credential.

## Auth matrix by endpoint family

| Endpoint family | Auth | Notes |
|---|---|---|
| `app/get-*`, `app/welcome` | api-key only | App catalog — safe before any login |
| `auth/signup-*`, `auth/login-*`, `auth/forgot-password`, `auth/reset-password` | api-key only | Produce tokens |
| `player/me/*` | api-key + Bearer | Acts on the authenticated player |
| `player/*` (non-`me`: get-profile, get-inventory, get-wallet-balance…) | api-key + Bearer | Look up *other* players using your own user token (profile screens, friend views). Mutating variants (`player/update-data`, `player/remove-data`) belong in trusted/server contexts — don't ship them in untrusted client flows. |
| `stores/*` purchases, `inventory/*`, `wallet/*`, `leaderboards/*`, `competitions/*`, `matchmaking/*` | api-key + Bearer | Player actions |
| `auth/validate-token`, `account/change-password`, `account/link`, `account/unlink`, `account/update` | api-key + Bearer | Token/account management |
| `auth/refresh-token` | api-key (tokens in body) | See token lifecycle above |

## Choosing a login method

| Method | Use when | Endpoints |
|---|---|---|
| Custom ID | You already have player identity (device id, your own auth) — silent login. Prefer `auth/login-custom` with `createAccount: true` (login-or-create in one call) | `auth/login-custom`, `auth/signup-custom` |
| Email / Username + password | You want Specter to own credentials | `auth/signup-email`, `auth/login-email`, `auth/signup-username`, `auth/login-username` |
| Google / Apple / Facebook / Steam / Discord | Platform sign-in | `auth/signup-<provider>`, `auth/login-<provider>` |
| Account linking | Player started anonymous (custom ID), later adds a social login | `account/link`, `account/unlink` |

A player can have multiple linked auth methods mapped to one Specter account
(`user_account_link_mapping`). Start anonymous with custom ID, link later — this avoids losing
progress when players switch devices.

## Security rules for generated code

- Never embed the api-key of the production environment in client code that also enables
  api-key-only mutating endpoints for other players; those flows belong on a trusted game server.
- Never log full Bearer tokens.
- Store tokens in platform-appropriate secure storage (Keychain/Keystore), not plain prefs.
