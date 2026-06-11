# V2 API: `client/account/update`

**Endpoint:** `POST /v2/client/account/update`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | **Yes** | Account type to update: `"customId"`, `"google"`, or `"facebook"` |
| `id` | `string` | **Yes** | The new external account ID |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Account updated successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Update Custom ID
**Request:**
```json
{
  "type": "customId",
  "id": "new-device-id-67890"
}
```

### Example 2: Update Google Account
**Request:**
```json
{
  "type": "google",
  "id": "new-google-oauth-user-id"
}
```

### Example 3: Update Facebook Account
**Request:**
```json
{
  "type": "facebook",
  "id": "new-facebook-user-id-789012"
}
```

---

## Notes

- User must be authenticated with a valid access token
- Updates an existing linked account with a new external ID
- The user must already have an account of this type linked
- The new external ID must not already be linked to another user
- Supported account types: `customId`, `google`, `facebook`
- Use `/v2/client/account/link` to add a new account type instead

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account not linked | User doesn't have this account type linked to update |
| ID already in use | The new external ID is already linked to another user |
| Invalid type | The account type is not supported |
| Unauthorized | User is not authenticated |

---

## Source Files

- **DTO**: `src/users/dto/link-user-accounts.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
