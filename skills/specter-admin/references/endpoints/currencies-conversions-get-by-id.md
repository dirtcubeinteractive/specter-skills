# Admin API: `currencies/conversions/get-by-id`

**Endpoint:** `POST /v1/currencies/conversions/get-by-id`

**Tag:** Currency Conversions

**Summary:** Get currency conversion by ID

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | ✅ | e.g. `1` | ID of the currency conversion to retrieve |

