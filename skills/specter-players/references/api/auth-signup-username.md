# Client API (v2): `auth/signup-username`

**Endpoint:** `POST /v2/client/auth/signup-username`

**Tag:** Auth

**Summary:** Sign up with username

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `username` | string | ✅ | e.g. `johndoe123` | Username |
| `password` | string | ✅ | e.g. `password123` | User password |
| `meta` | object | — | e.g. `{}` | Optional metadata |
| `customParams` | object | — | e.g. `{}` | Custom parameters |

