# V2 API: `client/auth/login-google`

**Endpoint:** `POST /v2/client/auth/login-google`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `string` | No* | OAuth authorization code (for web flow) |
| `idToken` | `string` | No* | Google ID token (for app flow) |
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
  "message": "Logged in via Google",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": "user@gmail.com",
      "displayName": "John Doe",
      "firstName": "John",
      "lastName": "Doe",
      "hash": "abc123hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": "https://lh3.googleusercontent.com/...",
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "google",
          "userId": "google-sub-id"
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
        "amount": 5000
      },
      {
        "uuid": "currency-uuid-2",
        "id": "gems",
        "name": "Gems",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "code": "GEM",
        "type": "virtual",
        "amount": 200
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Overall player level",
        "iconUrl": "https://cdn.example.com/level.png",
        "amount": 45
      },
      {
        "uuid": "marker-uuid-2",
        "id": "player-xp",
        "name": "Experience Points",
        "description": "Total XP earned",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 25000
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
| `user.email` | `string` | Email from Google account |
| `user.displayName` | `string` | Display name from Google |
| `user.firstName` | `string` | First name from Google |
| `user.lastName` | `string` | Last name from Google |
| `user.linkedAccounts` | `array` | Shows Google as linked provider |
| `accessToken` | `string` | JWT access token for authentication |
| `entityToken` | `string` | Token for refreshing access token |
| `createdAccount` | `boolean` | False for login (true for signup) |
| `currencies` | `array` | User's currency balances |
| `progression` | `array` | User's progression markers |

---

## Request Examples

### Example 1: Login with OAuth Code (Web Flow)
**Request:**
```json
{
  "code": "4/0AX4XfWh..."
}
```

### Example 2: Login with ID Token (Mobile/App Flow)
**Request:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example 3: Login with Player Data
**Request:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "includePlayerData": true,
  "includeEquipItem": true
}
```

---

## Notes

- User must have previously signed up with Google
- Use `code` for web OAuth flow (authorization code)
- Use `idToken` for mobile/app flow (ID token from Google Sign-In SDK)
- Google account must be configured in the project's OAuth settings
- The Google `sub` claim is used to identify the user

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| User not found | No account linked with this Google ID |
| Invalid token | The OAuth code or ID token is invalid |
| Token expired | The OAuth code or ID token has expired |
| Google auth not configured | Google OAuth not set up for this project |

---

## Source Files

- **DTO**: `src/users/dto/google-signup.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
