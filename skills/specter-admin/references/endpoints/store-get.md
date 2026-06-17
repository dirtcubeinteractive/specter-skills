# Admin API: `store/get`

**Endpoint:** `POST /v1/store/get`

**Tag:** Inventory

**Summary:** Get stores

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetStoresDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["store_001","store_002"]` | Store identifiers to filter |
| `storePlatforms` | string[] | — | e.g. `["PC","Mobile"]` | Store platforms to filter |
| `storeLocations` | string[] | — | e.g. `["US","EU"]` | Store locations to filter |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `premium` | Search keyword |
| `sortField` | string | — | e.g. `name` | Field to sort by |
| `sortOrder` | string | — | e.g. `ASC` | Sort order |
| `projectId` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Project ID |
| `showArchived` | boolean | — | e.g. `false` | Whether to show archived stores |

