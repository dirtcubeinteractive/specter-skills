# Client API (v2): `player/me/get-wallet-balance`

**Endpoint:** `POST /v2/client/player/me/get-wallet-balance`

**Tag:** My Player

**Summary:** Get my wallet balance (V2)

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetMyWalletBalanceV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `type` | string[] | — | e.g. `["virtual","rm_deposit"]` | Wallet type(s) to filter by |
| `currencyIds` | string[] | ✅ | e.g. `["currency-id-1","currency-id-2"]` | Array of currency IDs to retrieve balance for |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |

