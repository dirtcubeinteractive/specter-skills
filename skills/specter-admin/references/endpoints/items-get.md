# Admin API: `items/get`

**Endpoint:** `POST /v1/items/get`

**Tag:** Inventory

**Summary:** Get items

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `FilterItemsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `typeId` | string | — | e.g. `weapon` | Type identifier |
| `types` | string[] | — | e.g. `["consumable","equippable"]` | Item types to filter |
| `subTypes` | string[] | — | e.g. `["sword","axe"]` | Item sub-types to filter |
| `isLimited` | boolean | — | e.g. `false` | Filter by limited status |
| `ids` | string[] | — | e.g. `["item_001","item_002"]` | Item identifiers to filter |
| `isLocked` | boolean | — | e.g. `false` | Filter by locked status |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `sword` | Search keyword |
| `sortField` | string | — | e.g. `name` | Field to sort by |
| `sortOrder` | string | — | e.g. `ASC` | Sort order |
| `projectId` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Project ID |
| `showArchived` | boolean | — | e.g. `false` | Whether to show archived items |

