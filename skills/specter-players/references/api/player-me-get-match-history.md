# Client API (v2): `player/me/get-match-history`

**Endpoint:** `POST /v2/client/player/me/get-match-history`

**Tag:** My Player

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetMyMatchHistoryV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `attributes` | object | — | e.g. `["score","duration"]` | Attributes to include in response |
| `matchSessionId` | string | — | e.g. `match123` | Match session ID |
| `limit` | number | — | e.g. `10` | Limit for pagination |
| `offset` | number | — | e.g. `0` | Offset for pagination |

