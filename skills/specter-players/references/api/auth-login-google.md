# Client API (v2): `auth/login-google`

**Endpoint:** `POST /v2/client/auth/login-google`

**Tag:** Auth

**Summary:** Login with Google

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `idToken` | string | ✅ | e.g. `google-id-token-123` | Google ID token |

