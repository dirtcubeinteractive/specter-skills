# V2 API: `client/auth/login-steam`

**Endpoint:** `POST /v2/client/auth/login-steam`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `steamTicket` | `string` | **Yes** | Steam authentication ticket from Steamworks SDK |
| `identity` | `string` | **Yes** | Steam identity/app ID for verification |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Logged in via Steam",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": null,
      "displayName": "SteamPlayer",
      "firstName": null,
      "lastName": null,
      "hash": "abc123hash",
      "username": "steamplayer",
      "birthdate": null,
      "thumbUrl": "https://avatars.steamstatic.com/...",
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "steam",
          "userId": "76561198012345678"
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
        "amount": 7500
      },
      {
        "uuid": "currency-uuid-2",
        "id": "gems",
        "name": "Gems",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "code": "GEM",
        "type": "virtual",
        "amount": 350
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Overall player level",
        "iconUrl": "https://cdn.example.com/level.png",
        "amount": 58
      },
      {
        "uuid": "marker-uuid-2",
        "id": "player-xp",
        "name": "Experience Points",
        "description": "Total XP earned",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 42000
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
| `user.displayName` | `string` | Steam persona name |
| `user.thumbUrl` | `string` | Steam avatar URL |
| `user.linkedAccounts` | `array` | Shows Steam as linked provider with Steam ID |
| `accessToken` | `string` | JWT access token for authentication |
| `entityToken` | `string` | Token for refreshing access token |
| `createdAccount` | `boolean` | False for login |
| `currencies` | `array` | User's currency balances |
| `progression` | `array` | User's progression markers |

---

## Request Examples

### Example 1: Basic Steam Login
**Request:**
```json
{
  "steamTicket": "140000001234567890abcdef...",
  "identity": "your-steam-app-id"
}
```

### Example 2: Login with Player Data
**Request:**
```json
{
  "steamTicket": "140000001234567890abcdef...",
  "identity": "your-steam-app-id",
  "includePlayerData": true,
  "includeEquipItem": true
}
```

---

## Notes

- User must have previously signed up with Steam
- `steamTicket` is obtained from the Steamworks SDK `GetAuthSessionTicket`
- `identity` is your Steam App ID used for ticket verification
- Steam does not provide email addresses; users may need to add email separately
- Steam authentication must be configured in the project settings
- The Steam ID (64-bit) is used to identify the user

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| User not found | No account linked with this Steam ID |
| Invalid ticket | The Steam authentication ticket is invalid |
| Ticket expired | The Steam ticket has expired |
| Steam auth not configured | Steam authentication not set up for this project |
| Ticket verification failed | Steam Web API rejected the ticket |

---

## Source Files

- **DTO**: `src/users/dto/login-with-steam.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
