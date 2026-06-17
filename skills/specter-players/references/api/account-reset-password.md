# Client API (v2): `account/reset-password`

**Endpoint:** `POST /v2/client/account/reset-password`

**Tag:** Account

**Summary:** Reset password

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `ClientResetPasswordDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `john@example.com` | User identifier (email or username) |
| `type` | string | ✅ | `email` \| `username` | Type of identifier |
| `resetPasswordToken` | string | ✅ | e.g. `reset-token-123` | Reset password token |
| `password` | string | ✅ | e.g. `newPassword123` | New password |

