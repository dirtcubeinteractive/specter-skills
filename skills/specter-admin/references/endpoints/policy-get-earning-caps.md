# Admin API: `policy/get-earning-caps`

**Endpoint:** `POST /v1/policy/get-earning-caps`

**Tag:** Policy

**Summary:** Get earning caps policies

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetCurrencyPolicyDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `currencyId` | number | — | e.g. `1` | Filter by currency ID |
| `search` | string | — | e.g. `gold` | Search keyword |
| `limit` | number | — | e.g. `10` | Number of records to return |
| `offset` | number | — | e.g. `0` | Pagination offset |

