# Admin API: `app/link/accounts`

**Endpoint:** `POST /v1/app/link/accounts`

**Tag:** App

**Summary:** Link accounts

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `LinkAccountsProjectDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to link accounts to |
| `clientId` | string | ✅ | e.g. `your-client-id.apps.googleusercontent.com` | OAuth Client ID from the auth provider |
| `clientSecret` | string | — | e.g. `GOCSPX-xxxxxxxxxxxxxxxx` | OAuth Client Secret from the auth provider |
| `redirectUri` | string | ✅ | e.g. `https://myapp.com/auth/callback` | OAuth redirect URI for callback |
| `userAuthAccountMasterId` | number | ✅ | e.g. `1` | Auth account master ID (1=Google, 2=Facebook, 3=Apple, etc.) |

