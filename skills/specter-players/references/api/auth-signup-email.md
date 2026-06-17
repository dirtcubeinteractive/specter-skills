# Client API (v2): `auth/signup-email`

**Endpoint:** `POST /v2/client/auth/signup-email`

**Tag:** Auth

**Summary:** Sign up with email

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `user@example.com` | User email address |
| `password` | string | ✅ | e.g. `password123` | User password |
| `meta` | object | — | e.g. `{}` | Optional metadata |
| `customParams` | object | — | e.g. `{}` | Custom parameters |

