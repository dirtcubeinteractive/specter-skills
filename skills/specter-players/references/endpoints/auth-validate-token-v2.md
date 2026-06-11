# V2 API: `client/auth/validate-token`

**Endpoint:** `POST /v2/client/auth/validate-token`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `accessToken` | `string` | **Yes** | The access token to validate |
| `entityToken` | `string` | No | Optional entity token for additional validation |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Access token Validated Successfully",
  "data": {
    "valid": true,
    "user": {
      "id": "user-uuid",
      "email": "user@example.com",
      "username": "player123",
      "displayName": "Player One"
    },
    "expiresAt": "2024-01-15T11:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `valid` | `boolean` | Whether the token is valid |
| `user` | `object` | User information from the token |
| `user.id` | `string` | Unique user identifier |
| `user.email` | `string` | User's email address |
| `user.username` | `string` | User's username |
| `user.displayName` | `string` | User's display name |
| `expiresAt` | `string` | ISO timestamp when the token expires |

---

## Request Examples

### Example 1: Validate Access Token Only
**Request:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example 2: Validate with Entity Token
**Request:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "entityToken": "entity-token-string"
}
```

---

## Notes

- Use this endpoint to verify if an access token is still valid
- Returns user information extracted from the token
- Can be used by game servers to validate player tokens
- The `entityToken` parameter provides additional validation if provided
- Token validation doesn't consume or modify the token

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Invalid token | The access token is malformed or invalid |
| Token expired | The access token has expired |
| Token revoked | The access token has been revoked |

---

## Source Files

- **DTO**: `src/users/dto/validate-token.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
