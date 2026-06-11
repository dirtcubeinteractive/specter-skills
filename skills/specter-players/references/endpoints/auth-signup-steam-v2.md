# V2 API: `client/auth/signup-steam`

**Endpoint:** `POST /v2/client/auth/signup-steam`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `steamTicket` | `string` | **Yes** | Steam authentication ticket from Steamworks SDK |
| `identity` | `string` | **Yes** | Steam identity/app ID for verification |
| `referralCode` | `string` | No | Referral code from another user |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |
| `meta` | `object` | No | Custom metadata to store with user |
| `specterParams` | `object` | No | Additional Specter parameters |
| `customParams` | `object` | No | Custom parameters for events |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "User Signed Up with Steam",
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
| `user.displayName` | `string` | Steam persona name |
| `user.thumbUrl` | `string` | Steam avatar URL |
| `user.linkedAccounts` | `array` | Shows Steam as linked provider with Steam ID |
| `accessToken` | `string` | JWT access token for authentication |
| `entityToken` | `string` | Token for refreshing access token |
| `createdAccount` | `boolean` | True for signup |
| `currencies` | `array` | Initial currency balances |
| `progression` | `array` | Initial progression markers |

---

## Request Examples

### Example 1: Basic Steam Signup
**Request:**
```json
{
  "steamTicket": "140000001234567890abcdef...",
  "identity": "your-steam-app-id"
}
```

### Example 2: Signup with Referral Code
**Request:**
```json
{
  "steamTicket": "140000001234567890abcdef...",
  "identity": "your-steam-app-id",
  "referralCode": "REF456XYZ"
}
```

### Example 3: Signup with Custom Metadata
**Request:**
```json
{
  "steamTicket": "140000001234567890abcdef...",
  "identity": "your-steam-app-id",
  "meta": {
    "platform": "steam",
    "region": "EU"
  },
  "customParams": {
    "source": "steam_launch"
  }
}
```

---

## Notes

- Creates a new user account linked to a Steam account
- `steamTicket` is obtained from the Steamworks SDK `GetAuthSessionTicket`
- `identity` is your Steam App ID used for ticket verification
- Steam profile info (persona name, avatar) is fetched automatically
- Steam does not provide email addresses; users may need to add email separately
- Steam authentication must be configured in the project settings
- If account already exists with this Steam ID, returns error

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account already exists | A user with this Steam ID already exists |
| Invalid ticket | The Steam authentication ticket is invalid |
| Ticket expired | The Steam ticket has expired |
| Steam auth not configured | Steam authentication not set up for this project |
| Ticket verification failed | Steam Web API rejected the ticket |
| Invalid referral code | The referral code doesn't exist |

---

## Source Files

- **DTO**: `src/users/dto/signup-with-steam.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
