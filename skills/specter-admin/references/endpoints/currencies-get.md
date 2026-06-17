# Admin API: `currencies/get`

**Endpoint:** `POST /v1/currencies/get`

**Tag:** Currencies

**Summary:** Get currencies

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetCurrenciesDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["gold-coins","gems"]` | Filter by specific currency IDs |
| `types` | string[] | — | e.g. `["virtual"]` | Filter by currency types |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `20` | Maximum number of records to return |
| `search` | string | — | e.g. `gold` | Search keyword to filter currencies by name |
| `sortField` | string | — | e.g. `name` | Field to sort by |
| `sortOrder` | string | — | e.g. `ASC` | Sort order (ASC or DESC) |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID to fetch currencies for |
| `showArchived` | boolean | — | e.g. `false` | Include archived currencies in results |

