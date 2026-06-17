# Admin API: `member/update-password`

**Endpoint:** `POST /v1/member/update-password`

**Tag:** Member

**Summary:** Update password

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdatePasswordDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `john@example.com` | Email address of the member |
| `currentPassword` | string | ✅ | e.g. `CurrentPassword123!` | Current password for verification |
| `newPassword` | string | ✅ | e.g. `NewSecurePassword123!` | New password to set |

