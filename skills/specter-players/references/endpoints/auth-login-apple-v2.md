# V2 API: `client/auth/login-apple`

**Endpoint:** `POST /v2/client/auth/login-apple`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `string` | No* | OAuth authorization code (for web flow) |
| `idToken` | `string` | No* | Apple ID token (for app flow) |
| `referralCode` | `string` | No | Referral code from another user |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |

*Either `code` or `idToken` is required

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Logged in via Apple",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": "user@privaterelay.appleid.com",
      "displayName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "hash": "abc123hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "apple",
          "userId": "apple-user-id"
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
        "amount": 1500
      },
      {
        "uuid": "currency-uuid-2",
        "id": "gems",
        "name": "Gems",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "code": "GEM",
        "type": "virtual",
        "amount": 50
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Overall player level",
        "iconUrl": "https://cdn.example.com/level.png",
        "amount": 25
      },
      {
        "uuid": "marker-uuid-2",
        "id": "player-xp",
        "name": "Experience Points",
        "description": "Total XP earned",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 12500
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
| `user.email` | `string` | Email (may be Apple relay email) |
| `user.displayName` | `string` | Display name |
| `user.linkedAccounts` | `array` | Shows Apple as linked provider |
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
  "code": "c1234567890..."
}
```

### Example 2: Login with ID Token (Mobile/App Flow)
**Request:**
```json
{
  "idToken": "eyJraWQiOiJXNldjT0..."
}
```

### Example 3: Login with Player Data
**Request:**
```json
{
  "idToken": "eyJraWQiOiJXNldjT0...",
  "includePlayerData": true,
  "includeEquipItem": true
}
```

---

## Notes

- User must have previously signed up with Apple
- Use `code` for web OAuth flow (authorization code)
- Use `idToken` for mobile/app flow (from Sign in with Apple SDK)
- Apple may provide a private relay email instead of the user's actual email
- Apple Sign In must be configured in the project's OAuth settings
- The Apple user ID (sub claim) is used to identify the user

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| User not found | No account linked with this Apple ID |
| Invalid token | The ID token or authorization code is invalid |
| Token expired | The token has expired |
| Apple auth not configured | Apple Sign In not set up for this project |

---

## Source Files

- **DTO**: `src/users/dto/apple-auth.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
