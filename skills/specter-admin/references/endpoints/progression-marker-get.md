# Admin API: `progression-marker/get`

**Endpoint:** `POST /v1/progression-marker/get`

**Tag:** Progression Marker

**Summary:** Get progression markers

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetProgressionMarker`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | ✅ | e.g. `[1,2,3]` | Filter by progression marker IDs |
| `offset` | number | ✅ | e.g. `0` | Pagination offset |
| `limit` | number | ✅ | e.g. `10` | Number of records to return |
| `search` | string | — | e.g. `xp` | Search keyword |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | `ASC` \| `DESC` | Sort order |
| `showArchived` | boolean | — | e.g. `false` | Show archived markers |

