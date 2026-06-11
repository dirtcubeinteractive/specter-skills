# V2 API: `client/account/forgot-password`

**Endpoint:** `POST /v2/client/account/forgot-password`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | The user's email address or username |
| `type` | `string` | **Yes** | Identifier type: `"email"` or `"username"` |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Password reset token generated",
  "data": {
    "resetPasswordToken": "abc123-reset-token-xyz789",
    "expiresIn": 3600
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `resetPasswordToken` | `string` | Token to use with the reset-password endpoint |
| `expiresIn` | `number` | Token expiry time in seconds |

---

## Request Examples

### Example 1: Forgot Password by Email
**Request:**
```json
{
  "id": "user@example.com",
  "type": "email"
}
```

### Example 2: Forgot Password by Username
**Request:**
```json
{
  "id": "player123",
  "type": "username"
}
```

---

## Notes

- This endpoint initiates the password reset flow
- The returned `resetPasswordToken` should be used with the `/v2/client/account/reset-password` endpoint
- In production, the token is typically sent via email rather than returned directly
- The token has a limited validity period (check `expiresIn`)
- No authentication required, only API key

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| User not found | No user exists with the provided email/username |
| Invalid type | The `type` field must be either "email" or "username" |
| Rate limited | Too many password reset requests |

---

## Source Files

- **DTO**: `src/users/dto/forgot-password.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
