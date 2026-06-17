# Client API (v2): `wallet/convert-currency`

**Endpoint:** `POST /v2/client/wallet/convert-currency`

**Tag:** Wallet

**Summary:** Convert currency (V2)

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `ConvertCurrencyDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `sourceCurrencyId` | string | ✅ | e.g. `source-currency-id` | Source currency ID to convert from |
| `targetCurrencyId` | string | ✅ | e.g. `target-currency-id` | Target currency ID to convert to |
| `amount` | number | ✅ | e.g. `100` | Amount to convert |

