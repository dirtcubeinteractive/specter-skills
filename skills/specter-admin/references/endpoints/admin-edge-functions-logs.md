# Admin API: `admin/edge-functions/logs`

**Endpoint:** `POST /v2/admin/edge-functions/logs`

**Tag:** Edge Functions

**Summary:** Get function logs

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetLogsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | ✅ | e.g. `function-uuid-here` | Function ID |
| `limit` | number | — |  | Maximum number of log entries to return (max 10000) |
| `level` | string | — | `error` \| `warning` \| `info` \| `debug` | Log level filter (error, warning, info, debug) |
| `since` | string | — | e.g. `2025-01-01T00:00:00Z` | Start time for filtering logs (ISO 8601 format) |
| `until` | string | — | e.g. `2025-01-02T00:00:00Z` | End time for filtering logs (ISO 8601 format) |
| `search` | string | — |  | Text to search for in log messages |
| `order` | string | — | `asc` \| `desc` | Sort order (asc or desc) |
| `cursor` | string | — |  | Cursor for pagination (from previous response) |

