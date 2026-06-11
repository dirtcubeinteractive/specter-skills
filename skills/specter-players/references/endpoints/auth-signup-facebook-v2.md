# V2 API: `client/auth/signup-facebook`

**Endpoint:** `POST /v2/client/auth/signup-facebook`

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
  "code": 201,
  "message": "User Signed Up with Facebook",
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
    "createdAccount": true,
    "currencies": [
      {
        "uuid": "currency-uuid-1",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png",
        "code": "GLD",
        "type": "virtual",
        "amount": 100
      },
      {
        "uuid": "currency-uuid-2",
        "id": "gems",
        "name": "Gems",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "code": "GEM",
        "type": "virtual",
        "amount": 10
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Overall player level",
        "iconUrl": "https://cdn.example.com/level.png",
        "amount": 1
      },
      {
        "uuid": "marker-uuid-2",
        "id": "player-xp",
        "name": "Experience Points",
        "description": "Total XP earned",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 0
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
| `user.uuid` | `string` | Unique identifier for the new user |
| `user.email` | `string` | Email from Facebook account |
| `user.displayName` | `string` | Display name from Facebook profile |
| `user.linkedAccounts` | `array` | Shows Facebook as linked provider |
| `accessToken` | `string` | JWT access token for authentication |
| `entityToken` | `string` | Token for refreshing access token |
| `createdAccount` | `boolean` | True for signup |
| `currencies` | `array` | Initial currency balances |
| `progression` | `array` | Initial progression markers |

---

## Request Examples

### Example 1: Signup with OAuth Code (Web Flow)
**Request:**
```json
{
  "code": "AQDvCav..."
}
```

### Example 2: Signup with Access Token (Mobile/App Flow)
**Request:**
```json
{
  "accessToken": "EAAGm..."
}
```

### Example 3: Signup with Referral Code
**Request:**
```json
{
  "accessToken": "EAAGm...",
  "referralCode": "REF456XYZ"
}
```

---

## Notes

- Creates a new user account linked to a Facebook account
- Use `code` for web OAuth flow (authorization code)
- Use `accessToken` for mobile/app flow (from Facebook SDK)
- User info (email, name, photo) is extracted from Facebook profile
- Facebook app must be configured in the project's OAuth settings
- If account already exists with this Facebook ID, returns error

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account already exists | A user with this Facebook ID already exists |
| Invalid token | The access token or code is invalid |
| Token expired | The access token has expired |
| Facebook auth not configured | Facebook OAuth not set up for this project |
| Invalid referral code | The referral code doesn't exist |

---

## Source Files

- **DTO**: `src/users/dto/facebook-signup.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
