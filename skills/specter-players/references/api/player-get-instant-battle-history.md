# Client API (v2): `player/get-instant-battle-history`

**Endpoint:** `POST /v2/client/player/get-instant-battle-history`

**Tag:** Player Others

**Summary:** Get player instant battle history

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get instant battle history for |
| `attributes` | string[] | — | e.g. `["config","match"]` | Attributes to include |

