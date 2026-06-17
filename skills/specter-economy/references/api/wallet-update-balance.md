# Client API (v2): `wallet/update-balance`

**Endpoint:** `POST /v2/client/wallet/update-balance`

**Tag:** Wallet

**Summary:** Update wallet balance (V2)

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `UpdateWalletBalanceV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `operation` | string | ✅ | `add` \| `subtract` | Operation type to perform on wallet balance |
| `currencyId` | string | ✅ | e.g. `currency-id-123` | Currency ID for the wallet update |
| `walletType` | string | ✅ | `virtual` \| `rm_deposit` \| `rm_winning` \| `rm_bonus` | Wallet type to update |
| `amount` | number | ✅ | e.g. `100` | Amount to add or subtract |
| `customParams` | object | — | e.g. `{"key":"value"}` | Optional custom parameters |

