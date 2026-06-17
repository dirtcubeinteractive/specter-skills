# Admin API: `member/reset-password`

**Endpoint:** `POST /v1/member/reset-password`

**Tag:** Member

**Summary:** Reset password

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ResetPasswordDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `token` | string | ✅ | e.g. `reset-token-abc123` | Password reset token received via email |
| `email` | string | ✅ | e.g. `john@example.com` | Email address of the member |
| `newPassword` | string | ✅ | e.g. `NewSecurePassword123!` | New password to set |

