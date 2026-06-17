# Admin API: `admin/edge-functions/secrets/add`

**Endpoint:** `POST /v2/admin/edge-functions/secrets/add`

**Tag:** Edge Functions

**Summary:** Add or update secret

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `AddSecretDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `key` | string | ✅ | e.g. `STRIPE_API_KEY` | Secret key (uppercase with underscores) |
| `value` | string | ✅ | e.g. `sk_live_xxxxx` | Secret value |

