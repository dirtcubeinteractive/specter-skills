# V2 API: `client/auth/signup-discord`

**Endpoint:** `POST /v2/client/auth/signup-discord`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `string` | No* | OAuth authorization code (for web flow) |
| `accessToken` | `string` | No* | Discord access token (for direct flow) |
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
  "message": "User Signed Up with Discord",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": "user@example.com",
      "displayName": "DiscordUser#1234",
      "firstName": null,
      "lastName": null,
      "hash": "abc123hash",
      "username": "discorduser",
      "birthdate": null,
      "thumbUrl": "https://cdn.discordapp.com/avatars/...",
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "discord",
          "userId": "discord-user-id"
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
| `user.email` | `string` | Email from Discord account |
| `user.displayName` | `string` | Discord username with discriminator |
| `user.thumbUrl` | `string` | Discord avatar URL |
| `user.linkedAccounts` | `array` | Shows Discord as linked provider |
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
  "code": "NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee"
}
```

### Example 2: Signup with Access Token
**Request:**
```json
{
  "accessToken": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG"
}
```

### Example 3: Signup with Referral Code
**Request:**
```json
{
  "code": "NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee",
  "referralCode": "REF456XYZ"
}
```

---

## Notes

- Creates a new user account linked to a Discord account
- Use `code` for web OAuth flow (authorization code)
- Use `accessToken` for direct token flow
- User info (email, username, avatar) is extracted from Discord profile
- Discord OAuth must be configured in the project settings
- If account already exists with this Discord ID, returns error

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account already exists | A user with this Discord ID already exists |
| Invalid token | The access token or code is invalid |
| Token expired | The access token has expired |
| Discord auth not configured | Discord OAuth not set up for this project |
| Invalid referral code | The referral code doesn't exist |

---

## Source Files

- **DTO**: `src/users/dto/signup-with-discord.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
