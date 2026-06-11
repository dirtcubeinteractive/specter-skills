# V2 API: `client/auth/signup-google`

**Endpoint:** `POST /v2/client/auth/signup-google`

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
  "code": 201,
  "message": "User Signed Up with Google",
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
| `user.email` | `string` | Email from Google account |
| `user.displayName` | `string` | Display name from Google profile |
| `user.firstName` | `string` | First name from Google |
| `user.lastName` | `string` | Last name from Google |
| `user.linkedAccounts` | `array` | Shows Google as linked provider |
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
  "code": "4/0AX4XfWh..."
}
```

### Example 2: Signup with ID Token (Mobile/App Flow)
**Request:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Example 3: Signup with Referral Code
**Request:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...",
  "referralCode": "REF456XYZ"
}
```

---

## Notes

- Creates a new user account linked to a Google account
- Use `code` for web OAuth flow (authorization code)
- Use `idToken` for mobile/app flow (ID token from Google Sign-In SDK)
- User info (email, name, photo) is extracted from Google profile
- Google account must be configured in the project's OAuth settings
- If account already exists with this Google ID, returns error

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account already exists | A user with this Google ID already exists |
| Invalid token | The OAuth code or ID token is invalid |
| Token expired | The OAuth code or ID token has expired |
| Google auth not configured | Google OAuth not set up for this project |
| Invalid referral code | The referral code doesn't exist |

---

## Source Files

- **DTO**: `src/users/dto/google-signup.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
