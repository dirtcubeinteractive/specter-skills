# Admin API: `admin/edge-functions/secrets/delete`

**Endpoint:** `POST /v2/admin/edge-functions/secrets/delete`

**Tag:** Edge Functions

**Summary:** Delete secret

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteSecretDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `key` | string | ✅ | e.g. `STRIPE_API_KEY` | Secret key |

