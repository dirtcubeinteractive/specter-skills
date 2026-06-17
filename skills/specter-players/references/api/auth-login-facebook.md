# Client API (v2): `auth/login-facebook`

**Endpoint:** `POST /v2/client/auth/login-facebook`

**Tag:** Auth

**Summary:** Login with Facebook

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `accessToken` | string | ✅ | e.g. `facebook-access-token-123` | Facebook access token |

