# Admin API: `admin/edge-functions/jwt/regenerate`

**Endpoint:** `POST /v2/admin/edge-functions/jwt/regenerate`

**Tag:** Edge Functions

**Summary:** Regenerate JWT token

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `RegenerateJwtDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |

