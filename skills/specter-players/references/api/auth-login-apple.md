# Client API (v2): `auth/login-apple`

**Endpoint:** `POST /v2/client/auth/login-apple`

**Tag:** Auth

**Summary:** Login with Apple

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `identityToken` | string | ✅ | e.g. `apple-identity-token-123` | Apple identity token |
| `authorizationCode` | string | — | e.g. `apple-auth-code-123` | Apple authorization code |

