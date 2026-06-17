# Client API (v2): `player/get-friends`

**Endpoint:** `POST /v2/client/player/get-friends`

**Tag:** Player Others

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `player-123` | User ID to get friends for |
| `includeOnlineStatus` | boolean | — | e.g. `true` | Include online status |
| `limit` | number | — | e.g. `10` | Number of friends to fetch |
| `offset` | number | — | e.g. `0` | Offset for pagination |

