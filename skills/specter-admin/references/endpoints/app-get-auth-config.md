# Admin API: `app/get-auth-config`

**Endpoint:** `POST /v1/app/get-auth-config`

**Tag:** App

**Summary:** Get auth config

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetAuthConfigDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | — | e.g. `proj-uuid-12345` | Project ID to get auth configuration for |
| `userAuthAccountMasterId` | number | ✅ | e.g. `1` | Auth account master ID (1=Google, 2=Facebook, 3=Apple, etc.) |

