# Client API (v2): `auth/login-username`

**Endpoint:** `POST /v2/client/auth/login-username`

**Tag:** Auth

**Summary:** Login with username

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `username` | string | ✅ | e.g. `johndoe123` | Username |
| `password` | string | ✅ | e.g. `password123` | User password |
| `createAccount` | boolean | — | e.g. `false` | Create account if not exists |
| `meta` | object | — | e.g. `{}` | Optional metadata |
| `customParams` | object | — | e.g. `{}` | Custom parameters |

