# Client API (v2): `auth/signup-google`

**Endpoint:** `POST /v2/client/auth/signup-google`

**Tag:** Auth

**Summary:** Sign up with Google

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `idToken` | string | ✅ | e.g. `google-id-token-123` | Google ID token |

