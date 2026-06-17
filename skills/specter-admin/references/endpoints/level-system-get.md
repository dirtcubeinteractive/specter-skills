# Admin API: `level-system/get`

**Endpoint:** `POST /v1/level-system/get`

**Tag:** Progression System

**Summary:** Get level systems

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetLevelSystemDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["level-uuid-1","level-uuid-2"]` | Filter by level system IDs |
| `typeIds` | string[] | — | e.g. `[1,2]` | Filter by type IDs |
| `limit` | number | — | e.g. `10` | Number of records to return |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `search` | string | — | e.g. `rank` | Search keyword |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | `ASC` \| `DESC` | Sort order |
| `showArchived` | boolean | — | e.g. `false` | Show archived level systems |

