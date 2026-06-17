# Client API (v2): `player/get-time-series-progress`

**Endpoint:** `POST /v2/client/player/get-time-series-progress`

**Tag:** Player Others

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get time series progress for |
| `taskGroupIds` | string[] | — | e.g. `[]` | Optional task group IDs to filter |

