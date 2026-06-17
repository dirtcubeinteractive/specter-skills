# Client API (v2): `player/me/remove-data`

**Endpoint:** `POST /v2/client/player/me/remove-data`

**Tag:** My Player

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `RemovePlayerDataDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `keysToRemove` | string[] | ✅ | e.g. `["level","score"]` | Array of keys to remove from player data |

