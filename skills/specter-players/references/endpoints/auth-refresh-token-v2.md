# V2 API: `client/auth/refresh-token`

**Endpoint:** `POST /v2/client/auth/refresh-token`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `entityToken` | `string` | **Yes** | Entity token received during login/signup |
| `expiringAccessToken` | `string` | **Yes** | The current access token that is expiring |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Access token Refreshed Successfully",
  "data": {
    "refreshAccessToken": {
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "expiresIn": 3600
    }
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `refreshAccessToken` | `object` | Token refresh result |
| `refreshAccessToken.accessToken` | `string` | New JWT access token |
| `refreshAccessToken.expiresIn` | `number` | Token expiry time in seconds |

---

## Request Examples

### Example 1: Refresh Token
**Request:**
```json
{
  "entityToken": "entity-token-received-at-login",
  "expiringAccessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## Notes

- Use this endpoint to get a new access token before the current one expires
- The `entityToken` is a long-lived token provided during login/signup
- The new `accessToken` should replace the old one for subsequent API calls
- Token refresh should be done proactively before expiration to avoid authentication errors
- The entity token remains valid and can be reused for multiple refreshes

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Invalid entity token | The entity token is invalid or expired |
| Invalid access token | The access token format is invalid |
| Token mismatch | The access token doesn't match the entity token |

---

## Source Files

- **DTO**: `src/users/dto/refresh-access-token.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
