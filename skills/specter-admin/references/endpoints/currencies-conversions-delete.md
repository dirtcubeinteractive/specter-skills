# Admin API: `currencies/conversions/delete`

**Endpoint:** `POST /v1/currencies/conversions/delete`

**Tag:** Currency Conversions

**Summary:** Delete currency conversion

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | ✅ | e.g. `1` | ID of the currency conversion to delete |

