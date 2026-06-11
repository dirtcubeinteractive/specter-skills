# V2 API: `client/auth/login-discord`

**Endpoint:** `POST /v2/client/auth/login-discord`

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
  "code": 200,
  "message": "Logged in via Discord",
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
        "amount": 2500
      },
      {
        "uuid": "currency-uuid-2",
        "id": "gems",
        "name": "Gems",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "code": "GEM",
        "type": "virtual",
        "amount": 75
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Overall player level",
        "iconUrl": "https://cdn.example.com/level.png",
        "amount": 18
      },
      {
        "uuid": "marker-uuid-2",
        "id": "player-xp",
        "name": "Experience Points",
        "description": "Total XP earned",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 8500
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
| `user.email` | `string` | Email from Discord account |
| `user.displayName` | `string` | Discord username with discriminator |
| `user.thumbUrl` | `string` | Discord avatar URL |
| `user.linkedAccounts` | `array` | Shows Discord as linked provider |
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
  "code": "NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee"
}
```

### Example 2: Login with Access Token
**Request:**
```json
{
  "accessToken": "6qrZcUqja7812RVdnEKjpzOL4CvHBFG"
}
```

### Example 3: Login with Player Data
**Request:**
```json
{
  "code": "NhhvTDYsFcdgNLnnLijcl7Ku7bEEeee",
  "includePlayerData": true
}
```

---

## Notes

- User must have previously signed up with Discord
- Use `code` for web OAuth flow (authorization code)
- Use `accessToken` for direct token flow
- Discord OAuth must be configured in the project settings
- The Discord user ID is used to identify the user

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| User not found | No account linked with this Discord ID |
| Invalid token | The access token or code is invalid |
| Token expired | The access token has expired |
| Discord auth not configured | Discord OAuth not set up for this project |

---

## Source Files

- **DTO**: `src/users/dto/signup-with-discord.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
