# Client API (v2): `player/get-data`

**Endpoint:** `POST /v2/client/player/get-data`

**Tag:** Player Others

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userIds` | string[] | ✅ | e.g. `["player-123","player-456"]` | Array of user IDs |
| `keys` | string[] | — | e.g. `["settings"]` | Optional keys to filter |

