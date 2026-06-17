# Admin API: `content/get`

**Endpoint:** `POST /v1/content/get`

**Tag:** Blueprint

**Summary:** Get content

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetContentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["content-uuid-1","content-uuid-2"]` | Array of content IDs to filter by |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `player` | Search keyword to filter by name |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `desc` | Sort order (asc or desc) |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get content for |
| `showArchived` | boolean | — | e.g. `false` | Whether to include archived content |

