# Client API (v2): `player/get-tournament-history`

**Endpoint:** `POST /v2/client/player/get-tournament-history`

**Tag:** Player Others

**Summary:** Get player tournament history

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get tournament history for |
| `attributes` | string[] | — | e.g. `["config","type","sourceType","match"]` | Attributes to include |
| `scheduleStatuses` | string[] | — | e.g. `["completed"]` | Filter by schedule statuses |

