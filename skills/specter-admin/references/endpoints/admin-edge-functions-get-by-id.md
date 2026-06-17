# Admin API: `admin/edge-functions/get-by-id`

**Endpoint:** `POST /v2/admin/edge-functions/get-by-id`

**Tag:** Edge Functions

**Summary:** Get edge function details

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetFunctionByIdDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `functionId` | string | ✅ | e.g. `function-uuid-here` | Function ID |

