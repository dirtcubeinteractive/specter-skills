# Admin API: `admin/edge-functions/delete`

**Endpoint:** `POST /v2/admin/edge-functions/delete`

**Tag:** Edge Functions

**Summary:** Delete edge function

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteFunctionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | ✅ | e.g. `function-uuid-here` | Function ID |

