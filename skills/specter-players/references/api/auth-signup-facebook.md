# Client API (v2): `auth/signup-facebook`

**Endpoint:** `POST /v2/client/auth/signup-facebook`

**Tag:** Auth

**Summary:** Sign up with Facebook

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `accessToken` | string | ✅ | e.g. `facebook-access-token-123` | Facebook access token |

