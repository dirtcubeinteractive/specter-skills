# Admin API: `admin/edge-functions/secrets/get`

**Endpoint:** `POST /v2/admin/edge-functions/secrets/get`

**Tag:** Edge Functions

**Summary:** Get secrets

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetSecretsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |

