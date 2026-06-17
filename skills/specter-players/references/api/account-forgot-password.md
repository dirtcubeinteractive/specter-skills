# Client API (v2): `account/forgot-password`

**Endpoint:** `POST /v2/client/account/forgot-password`

**Tag:** Account

**Summary:** Forgot password

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `ForgotPasswordDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `john@example.com` | User identifier (email or username) |
| `type` | string | ✅ | `email` \| `username` | Type of identifier |

