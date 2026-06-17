# Admin API: `admin/edge-functions/get`

**Endpoint:** `POST /v2/admin/edge-functions/get`

**Tag:** Edge Functions

**Summary:** Get all edge functions

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetFunctionsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `status` | string | — | e.g. `deployed` | Filter by status |
| `search` | string | — |  | Search by name |
| `limit` | number | — |  | Number of items per page |
| `offset` | number | — |  | Page offset |
| `sortField` | string | — | `created_at` \| `updated_at` \| `name` \| `status` | Field to sort by |
| `sortOrder` | string | — | `asc` \| `desc` | Sort order |

