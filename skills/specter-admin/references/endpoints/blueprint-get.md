# Admin API: `blueprint/get`

**Endpoint:** `POST /v1/blueprint/get`

**Tag:** Blueprint

**Summary:** Get blueprints

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetBlueprintDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["bp-uuid-1","bp-uuid-2"]` | Array of blueprint IDs to filter by |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `player` | Search keyword to filter by name |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `desc` | Sort order (asc or desc) |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get blueprints for |
| `showArchived` | boolean | — | e.g. `false` | Whether to include archived blueprints |

