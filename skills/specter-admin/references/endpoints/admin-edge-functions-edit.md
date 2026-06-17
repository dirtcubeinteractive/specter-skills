# Admin API: `admin/edge-functions/edit`

**Endpoint:** `POST /v2/admin/edge-functions/edit`

**Tag:** Edge Functions

**Summary:** Update edge function

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateFunctionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | ✅ | e.g. `function-uuid-here` | Function ID |
| `name` | string | — | e.g. `calcDamageV2` | New function name |
| `description` | string | — |  | Updated description |
| `files` | object | — | e.g. `{"main.ts":"export default { async fetch(req)…` | Updated code files |
| `entryPoint` | string | — |  | Updated entry point |

