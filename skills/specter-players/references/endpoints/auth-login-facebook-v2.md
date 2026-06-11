# V2 API: `client/auth/login-facebook`

**Endpoint:** `POST /v2/client/auth/login-facebook`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `string` | No* | OAuth authorization code (for web flow) |
| `accessToken` | `string` | No* | Facebook access token (for app flow) |
| `referralCode` | `string` | No | Referral code from another user |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |

*Either `code` or `accessToken` is required

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Logged in via Facebook",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": "user@example.com",
      "displayName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "hash": "abc123hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": "https://graph.facebook.com/...",
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "facebook",
          "userId": "facebook-user-id"
        }
      ],
      "referralCode": "REF123ABC",
      "isKycComplete": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "entityToken": "entity-token-string",
    "createdAccount": false,
    "currencies": [
      {
        "uuid": "currency-uuid-1",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png",
        "code": "GLD",
        "type": "virtual",
        "amount": 3200
      },
      {
        "uuid": "currency-uuid-2",
        "id": "gems",
        "name": "Gems",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "code": "GEM",
        "type": "virtual",
        "amount": 120
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Overall player level",
        "iconUrl": "https://cdn.example.com/level.png",
        "amount": 32
      },
      {
        "uuid": "marker-uuid-2",
        "id": "player-xp",
        "name": "Experience Points",
        "description": "Total XP earned",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 15800
      }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `user` | `object` | User profile information |
| `user.uuid` | `string` | Unique identifier |
| `user.email` | `string` | Email from Facebook account |
| `user.displayName` | `string` | Display name from Facebook |
| `user.linkedAccounts` | `array` | Shows Facebook as linked provider |
| `accessToken` | `string` | JWT access token for authentication |
| `entityToken` | `string` | Token for refreshing access token |
| `createdAccount` | `boolean` | False for login |
| `currencies` | `array` | User's currency balances |
| `progression` | `array` | User's progression markers |

---

## Request Examples

### Example 1: Login with OAuth Code (Web Flow)
**Request:**
```json
{
  "code": "AQDvCav..."
}
```

### Example 2: Login with Access Token (Mobile/App Flow)
**Request:**
```json
{
  "accessToken": "EAAGm..."
}
```

### Example 3: Login with Player Data
**Request:**
```json
{
  "accessToken": "EAAGm...",
  "includePlayerData": true
}
```

---

## Notes

- User must have previously signed up with Facebook
- Use `code` for web OAuth flow (authorization code)
- Use `accessToken` for mobile/app flow (from Facebook SDK)
- Facebook app must be configured in the project's OAuth settings
- The Facebook user ID is used to identify the user

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| User not found | No account linked with this Facebook ID |
| Invalid token | The access token or code is invalid |
| Token expired | The access token has expired |
| Facebook auth not configured | Facebook OAuth not set up for this project |

---

## Source Files

- **DTO**: `src/users/dto/facebook-signup.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
