# Client API (v2): `player/get-task-group-status`

**Endpoint:** `POST /v2/client/player/get-task-group-status`

**Tag:** Player Others

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get task group status for |
| `attributes` | string[] | — | e.g. `["tasks"]` | Attributes to include |

