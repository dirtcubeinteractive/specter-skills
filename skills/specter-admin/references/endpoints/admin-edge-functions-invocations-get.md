# Admin API: `admin/edge-functions/invocations/get`

**Endpoint:** `POST /v2/admin/edge-functions/invocations/get`

**Tag:** Edge Functions

**Summary:** Get function invocations

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetInvocationsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | — | e.g. `function-uuid-here` | Filter by Function ID |
| `status` | string | — | `success` \| `error` \| `timeout` \| `unauthorized` | Filter by status |
| `since` | string | — | e.g. `2025-01-01T00:00:00Z` | Start time filter (ISO 8601 format) |
| `until` | string | — | e.g. `2025-01-02T00:00:00Z` | End time filter (ISO 8601 format) |
| `limit` | number | — |  | Number of items per page |
| `offset` | number | — |  | Page offset |

