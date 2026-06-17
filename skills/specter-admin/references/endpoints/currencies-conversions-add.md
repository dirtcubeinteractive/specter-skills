# Admin API: `currencies/conversions/add`

**Endpoint:** `POST /v1/currencies/conversions/add`

**Tag:** Currency Conversions

**Summary:** Create currency conversion

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateCurrencyConversionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `sourceCurrencyId` | number | ✅ | e.g. `1` | Internal ID of the source currency |
| `targetCurrencyId` | number | ✅ | e.g. `2` | Internal ID of the target currency |
| `conversionRate` | number | ✅ | e.g. `0.1` | Conversion rate from source to target currency (e.g., 0.1 means 10 source = 1 target) |
| `conversionFee` | number | — | e.g. `5` | Fee percentage charged on conversion (0-100) |
| `isEnabled` | boolean | — | e.g. `true` | Whether this conversion is enabled |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this conversion belongs to |

