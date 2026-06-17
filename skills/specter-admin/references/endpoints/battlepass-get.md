# Admin API: `battlepass/get`

**Endpoint:** `POST /v1/battlepass/get`

**Tag:** Battlepass

**Summary:** Get battlepasses

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetBattlepassDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["bp-uuid-1","bp-uuid-2"]` | Array of battlepass IDs to filter by |
| `isLocked` | boolean | — | e.g. `false` | Filter by locked/unlocked status |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `summer` | Search keyword to filter by name |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `desc` | Sort order (asc or desc) |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get battlepasses for |
| `showArchived` | boolean | — | e.g. `false` | Whether to include archived battlepasses |

