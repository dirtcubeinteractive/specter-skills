# Admin API: `app/api-key/create`

**Endpoint:** `POST /v1/app/api-key/create`

**Tag:** App

**Summary:** Create API key

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateApiKeyDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `appId` | string | ✅ | e.g. `proj-uuid-12345` | App/Project ID to create API key for |
| `envId` | number | ✅ | e.g. `1` | Environment ID (1 = Development, 2 = Production) |
| `organisationId` | string | ✅ | e.g. `org-uuid-12345` | Organisation ID the project belongs to |

