# Admin API: `currencies/conversions/edit`

**Endpoint:** `POST /v1/currencies/conversions/edit`

**Tag:** Currency Conversions

**Summary:** Update currency conversion

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateCurrencyConversionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | ✅ | e.g. `1` | Internal ID of the currency conversion to update |
| `conversionRate` | number | — | e.g. `0.15` | Updated conversion rate from source to target currency |
| `conversionFee` | number | — | e.g. `3` | Updated fee percentage charged on conversion (0-100) |
| `isEnabled` | boolean | — | e.g. `true` | Whether this conversion is enabled |

