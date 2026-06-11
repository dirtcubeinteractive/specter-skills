# V2 API: `client/account/unlink`

**Endpoint:** `POST /v2/client/account/unlink`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | **Yes** | Account type to unlink: `"customId"`, `"google"`, or `"facebook"` |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Account unlinked successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Unlink Custom ID
**Request:**
```json
{
  "type": "customId"
}
```

### Example 2: Unlink Google Account
**Request:**
```json
{
  "type": "google"
}
```

### Example 3: Unlink Facebook Account
**Request:**
```json
{
  "type": "facebook"
}
```

---

## Notes

- User must be authenticated with a valid access token
- Removes the link between the external account and the user's profile
- User must have at least one other login method remaining after unlinking
- The unlinked account can be linked to a different user afterward
- Supported account types: `customId`, `google`, `facebook`

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account not linked | The user doesn't have this account type linked |
| Cannot unlink | Cannot unlink the only login method |
| Invalid type | The account type is not supported |
| Unauthorized | User is not authenticated |

---

## Source Files

- **DTO**: `src/users/dto/unlink-account.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
