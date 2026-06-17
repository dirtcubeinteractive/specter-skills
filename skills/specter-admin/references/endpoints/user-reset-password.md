# Admin API: `user/reset-password`

**Endpoint:** `POST /v1/user/reset-password`

**Tag:** Users

**Summary:** Reset user password

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UserResetPasswordDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `john@example.com` | User identifier (email or username) |
| `projectId` | string | ✅ | e.g. `proj123` | Project ID |
| `type` | string | ✅ | `email` \| `username` | Type of identifier |
| `password` | string | ✅ | e.g. `newPassword123` | New password |

