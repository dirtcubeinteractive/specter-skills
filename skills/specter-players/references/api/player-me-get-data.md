# Client API (v2): `player/me/get-data`

**Endpoint:** `POST /v2/client/player/me/get-data`

**Tag:** My Player

**Summary:** Get current player data V2

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetPlayerDataDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `keys` | string[] | — | e.g. `["level","score"]` | Array of keys to retrieve from player data |
| `userId` | string | — | e.g. `user123` | User ID |

