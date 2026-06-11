# V2 API: `client/account/change-password`

**Endpoint:** `POST /v2/client/account/change-password`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currentPassword` | `string` | **Yes** | The user's current password |
| `newPassword` | `string` | **Yes** | The new password to set |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Password changed successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Change Password
**Request:**
```json
{
  "currentPassword": "oldPassword123",
  "newPassword": "newSecurePassword456"
}
```

---

## Notes

- User must be authenticated with a valid access token
- The `currentPassword` must match the user's existing password
- Password change invalidates existing sessions (user may need to re-login)
- Use strong passwords that meet your application's password policy

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Invalid current password | The provided current password doesn't match |
| Weak password | The new password doesn't meet security requirements |
| Same password | The new password is the same as the current password |
| Unauthorized | User is not authenticated |

---

## Source Files

- **DTO**: `src/users/dto/change-password.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
