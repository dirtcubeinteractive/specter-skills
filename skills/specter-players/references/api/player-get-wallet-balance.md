# Client API (v2): `player/get-wallet-balance`

**Endpoint:** `POST /v2/client/player/get-wallet-balance`

**Tag:** Player Others

**Summary:** Get player wallet balance (V2)

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetPlayerWalletBalanceV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `user-id-123` | User ID to retrieve wallet balance for |
| `currencyIds` | string[] | ✅ | e.g. `["currency-id-1","currency-id-2"]` | Array of currency IDs to retrieve balance for |
| `type` | string[] | — | e.g. `["virtual","rm_deposit"]` | Wallet type(s) to filter by |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `sortField` | string | — | e.g. `createdAt` | Field name to sort by |
| `sortOrder` | string | — | e.g. `asc` | Sort order direction |

