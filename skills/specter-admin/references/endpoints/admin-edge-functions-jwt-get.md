# Admin API: `admin/edge-functions/jwt/get`

**Endpoint:** `POST /v2/admin/edge-functions/jwt/get`

**Tag:** Edge Functions

**Summary:** Get JWT token

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetJwtDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |

