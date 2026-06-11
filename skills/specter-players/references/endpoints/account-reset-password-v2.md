# V2 API: `client/account/reset-password`

**Endpoint:** `POST /v2/client/account/reset-password`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | The user's email address or username |
| `type` | `string` | **Yes** | Identifier type: `"email"` or `"username"` |
| `resetPasswordToken` | `string` | **Yes** | Token received from forgot-password endpoint |
| `password` | `string` | **Yes** | The new password to set |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Password reset successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Reset Password by Email
**Request:**
```json
{
  "id": "user@example.com",
  "type": "email",
  "resetPasswordToken": "abc123-reset-token-xyz789",
  "password": "newSecurePassword456"
}
```

### Example 2: Reset Password by Username
**Request:**
```json
{
  "id": "player123",
  "type": "username",
  "resetPasswordToken": "abc123-reset-token-xyz789",
  "password": "newSecurePassword456"
}
```

---

## Notes

- This endpoint completes the password reset flow
- The `resetPasswordToken` must be obtained from the `/v2/client/account/forgot-password` endpoint
- The `id` and `type` must match what was used in the forgot-password request
- After successful reset, the user can login with the new password
- The reset token becomes invalid after successful use
- No user authentication required, only API key

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Invalid token | The reset password token is invalid or malformed |
| Token expired | The reset password token has expired |
| User not found | No user exists with the provided email/username |
| Token mismatch | The token doesn't match the user |
| Weak password | The new password doesn't meet security requirements |

---

## Source Files

- **DTO**: `src/users/dto/client-reset-password.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
