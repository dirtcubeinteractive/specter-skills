# Client API (v2): `auth/login-custom`

**Endpoint:** `POST /v2/client/auth/login-custom`

**Tag:** Auth

**Summary:** Login with custom ID

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `customId` | string | ✅ | e.g. `custom_user_123` | Custom identifier |
| `createAccount` | boolean | — | e.g. `false` | Create account if not exists |
| `meta` | object | — | e.g. `{}` | Optional metadata |
| `customParams` | object | — | e.g. `{}` | Custom parameters |

