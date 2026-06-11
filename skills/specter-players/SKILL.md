---
name: specter-players
description: >-
  Specter player accounts and identity — sign up and log in players (email, username, custom ID,
  Google, Apple, Steam, Discord, Facebook), refresh and validate tokens, link/unlink social
  accounts, manage player profiles and custom player data, upload avatars, and the friends system
  (friend requests, friends lists). Use for any "add login", "player accounts", "save player data",
  "user profiles" or "friends/social" feature built on Specter.
---

# Specter Players — auth, profiles, player data, friends

Base URL and headers: see the `specter` skill. Everything here is `POST {base}/...` with
`api-key`; player-scoped (`player/me/*`) endpoints also need `Authorization: Bearer <token>`.

## Signing players in

**Default recommendation for games: custom ID auth** — silent login keyed to your own player
identity (device id or your server's user id). No password UX, and one call handles both first
launch and returning players:

```json
POST /auth/login-custom
{ "customId": "device-or-player-id", "createAccount": true }
→ data: { accessToken, entityToken, user: {...} }
```

`createAccount: true` signs the player up automatically on first login. Full method list:

| Method | Signup | Login |
|---|---|---|
| Custom ID (silent) | `auth/signup-custom` | `auth/login-custom` |
| Email + password | `auth/signup-email` | `auth/login-email` |
| Username + password | `auth/signup-username` | `auth/login-username` |
| Google | `auth/signup-google` | `auth/login-google` |
| Apple | `auth/signup-apple` | `auth/login-apple` |
| Facebook | `auth/signup-facebook` | `auth/login-facebook` |
| Steam | `auth/signup-steam` | `auth/login-steam` |
| Discord | `auth/signup-discord` | `auth/login-discord` |

Password lifecycle: `account/change-password` (Bearer), `account/forgot-password` → emailed
link → `account/reset-password`.

Token lifecycle: access tokens expire ~1h. Refresh proactively with `auth/refresh-token`
(api-key auth; send `entityToken` + the expiring access token in the body) and check with
`auth/validate-token` (Bearer) on app resume. On 401, refresh once, then re-login.

**Signup is the moment Specter initializes the player** — wallets for every project currency,
default inventory items, and battle pass tiers are created by a background queue right after
signup. This takes a moment; don't assume wallets/inventory exist in the same frame as the
signup response.

## Account linking (avoid lost progress)

Players who start anonymously (custom ID) should be able to attach a recoverable login later:

- `account/link` (Bearer) — attach email/social credentials to the current account
- `account/unlink` (Bearer) — detach a method

One Specter account ↔ many auth methods. Always offer linking before players switch devices.

## Profiles & custom player data

| Endpoint | Auth | Purpose |
|---|---|---|
| `player/me/get-profile` | Bearer | Authenticated player's full profile |
| `player/me/update-data` | Bearer | Write custom key/value player data |
| `player/me/get-data` | Bearer | Read custom data |
| `player/me/remove-data` | Bearer | Delete custom data keys |
| `player/me/upload-icon` | Bearer | Avatar upload |
| `player/get-profile` | Bearer | Another player's public profile (profile screens) |
| `player/update-data`, `player/remove-data` | Bearer | Mutate another player's data — **trusted contexts only**, never an untrusted client flow |
| `app/get-players` | api-key | Bulk player lookup |

Custom data is schemaless key/value per player — good for game settings, save-state pointers,
flags. It is **not** the inventory/wallet system; use specter-economy for owned things.

## Friends

Request flow: `friends/send-request` → recipient `friends/accept-request` /
`friends/decline-request`; sender can `friends/cancel-request`; either side `friends/remove`.

Reads: `player/me/get-friends`, `player/me/get-pending-friend-requests`,
`player/me/get-sent-friend-requests`; `player/get-friends` (api-key) for other players.

## Full endpoint details

Request DTOs, optional `attributes`, and response examples for every endpoint:
[references/endpoints-index.md](references/endpoints-index.md)
Working client code: [examples/javascript.md](examples/javascript.md), [examples/unity-csharp.md](examples/unity-csharp.md)
