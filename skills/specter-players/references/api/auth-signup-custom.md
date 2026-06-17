# Client API (v2): `auth/signup-custom`

**Endpoint:** `POST /v2/client/auth/signup-custom`

**Tag:** Auth

**Summary:** Sign up with custom ID

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `customId` | string | ✅ | e.g. `custom_user_123` | Custom identifier |
| `meta` | object | — | e.g. `{}` | Optional metadata |
| `customParams` | object | — | e.g. `{}` | Custom parameters |

