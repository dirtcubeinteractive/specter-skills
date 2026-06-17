# Client API (v2): `wallet/get-history`

**Endpoint:** `POST /v2/client/wallet/get-history`

**Tag:** Wallet

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetTransactionHistoryDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `limit` | number | — | e.g. `10` | Limit for pagination |
| `offset` | number | — | e.g. `0` | Offset for pagination |

