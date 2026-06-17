# Client API (v2): `player/get-inventory`

**Endpoint:** `POST /v2/client/player/get-inventory`

**Tag:** Player Others

**Summary:** Get player inventory

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get inventory for |
| `attributes` | string[] | — | e.g. `[]` | Attributes to include |
| `limit` | number | — | e.g. `10` | Number of items to fetch |
| `offset` | number | — | e.g. `0` | Offset for pagination |

