# Client API (v2): `player/get-task-status`

**Endpoint:** `POST /v2/client/player/get-task-status`

**Tag:** Player Others

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get task status for |
| `scheduleStatuses` | string[] | — | e.g. `["in progress","yet to start"]` | Filter by schedule statuses |

