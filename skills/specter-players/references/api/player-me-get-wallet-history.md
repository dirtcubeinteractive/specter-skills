# Client API (v2): `player/me/get-wallet-history`

**Endpoint:** `POST /v2/client/player/me/get-wallet-history`

**Tag:** My Player

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `limit` | number | — | e.g. `10` | Number of transactions to fetch |
| `offset` | number | — | e.g. `0` | Offset for pagination |

