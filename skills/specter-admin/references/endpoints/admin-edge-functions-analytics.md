# Admin API: `admin/edge-functions/analytics`

**Endpoint:** `POST /v2/admin/edge-functions/analytics`

**Tag:** Edge Functions

**Summary:** Get function analytics

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetAnalyticsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | ✅ | e.g. `function-uuid-here` | Function ID |
| `startDate` | string | — |  | Start date for analytics period |
| `endDate` | string | — |  | End date for analytics period |

