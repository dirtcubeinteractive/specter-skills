# Admin API: `admin/edge-functions/invocations/sync`

**Endpoint:** `POST /v2/admin/edge-functions/invocations/sync`

**Tag:** Edge Functions

**Summary:** Sync invocations from logs

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `SyncInvocationsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | — | e.g. `function-uuid-here` | Function ID (sync single function, or all if not provided) |
| `since` | string | — | e.g. `2025-01-01T00:00:00Z` | Start time for sync (ISO 8601 format) |
| `until` | string | — | e.g. `2025-01-02T00:00:00Z` | End time for sync (ISO 8601 format) |

