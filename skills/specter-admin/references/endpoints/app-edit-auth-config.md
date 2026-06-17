# Admin API: `app/edit-auth-config`

**Endpoint:** `POST /v1/app/edit-auth-config`

**Tag:** App

**Summary:** Edit auth config

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditAuthConfigDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `clientId` | string | ✅ | e.g. `your-client-id.apps.googleusercontent.com` | OAuth Client ID from the auth provider |
| `clientSecret` | string | — | e.g. `GOCSPX-xxxxxxxxxxxxxxxx` | OAuth Client Secret from the auth provider |
| `redirectUri` | string | — | e.g. `https://myapp.com/auth/callback` | OAuth redirect URI for callback |
| `additionalConfig` | object | — | e.g. `{"scopes":["email","profile"],"hostedDomain":…` | Additional configuration specific to the auth provider |
| `projectId` | string | — | e.g. `proj-uuid-12345` | Project ID to configure auth for |
| `userAuthAccountMasterId` | number | ✅ | e.g. `1` | Auth account master ID (1=Google, 2=Facebook, 3=Apple, etc.) |
| `active` | boolean | — | e.g. `true` | Whether this auth configuration is active |

