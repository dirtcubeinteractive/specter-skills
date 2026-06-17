# Admin API: `inventory/search`

**Endpoint:** `POST /v1/inventory/search`

**Tag:** Inventory

**Summary:** Search inventory

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `SearchInventoryDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Project ID |
| `search` | string | — | e.g. `sword` | Search keyword |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `filters` | object | — | e.g. `{}` | Filter criteria for inventory search |

