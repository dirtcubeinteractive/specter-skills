# V2 API: `client/account/link`

**Endpoint:** `POST /v2/client/account/link`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | **Yes** | Account type to link: `"customId"`, `"google"`, or `"facebook"` |
| `id` | `string` | **Yes** | The external account ID to link |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Account linked successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Link Custom ID
**Request:**
```json
{
  "type": "customId",
  "id": "device-id-12345"
}
```

### Example 2: Link Google Account
**Request:**
```json
{
  "type": "google",
  "id": "google-oauth-user-id"
}
```

### Example 3: Link Facebook Account
**Request:**
```json
{
  "type": "facebook",
  "id": "facebook-user-id-123456"
}
```

---

## Notes

- User must be authenticated with a valid access token
- Links an external account to the current user's profile
- Allows users to login using multiple authentication methods
- The external ID must not already be linked to another user
- Supported account types: `customId`, `google`, `facebook`

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account already linked | The external ID is already linked to another user |
| Invalid type | The account type is not supported |
| Already has this type | User already has an account of this type linked |
| Unauthorized | User is not authenticated |

---

## Source Files

- **DTO**: `src/users/dto/link-user-accounts.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
