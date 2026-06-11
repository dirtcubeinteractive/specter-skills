# V2 API: `client/auth/signup-custom`

**Endpoint:** `POST /v2/client/auth/signup-custom`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customId` | `string` | **Yes** | Custom identifier (e.g., device ID, platform ID) |
| `referralCode` | `string` | No | Referral code for tracking |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |
| `specterParams` | `object` | No | Default/specter parameters for the signup event |
| `customParams` | `object` | No | Custom parameters for events |
| `meta` | `object` | No | Additional metadata to store on the account |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "User Signed Up Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": null,
      "displayName": null,
      "firstName": null,
      "lastName": null,
      "hash": "abc123hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "customId",
          "userId": "device-12345-abcde"
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
| `user.uuid` | `string` | Unique identifier (internal ID) |
| `user.id` | `string` | User ID (same as uuid) |
| `user.email` | `string` | User's email (null for custom signup) |
| `user.displayName` | `string` | User's display name |
| `user.firstName` | `string` | User's first name |
| `user.lastName` | `string` | User's last name |
| `user.hash` | `string` | User hash |
| `user.username` | `string` | User's username (null for custom signup) |
| `user.birthdate` | `string` | User's birthdate |
| `user.thumbUrl` | `string` | URL to user's avatar |
| `user.meta` | `object` | Custom metadata |
| `user.tags` | `array` | Array of tag names |
| `user.linkedAccounts` | `array` | Linked auth providers `[{ authProvider, userId }]` |
| `user.referralCode` | `string` | User's referral code |
| `user.isKycComplete` | `boolean` | KYC completion status |
| `user.EquippedItems` | `array` | Equipped items (if `includeEquipItem` is true) |
| `accessToken` | `string` | JWT access token for authentication |
| `entityToken` | `string` | Entity token for token refresh |
| `createdAccount` | `boolean` | Always true for signup |
| `playerData` | `object` | Player data (if `includePlayerData` is true) |
| `currencies` | `array` | User's currency balances (initial balances for new account) |
| `progression` | `array` | User's progression marker values |

---

## Request/Response Examples

### Example 1: Device ID Signup
**Request:**
```json
{
  "customId": "device-12345-abcde"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User Signed Up Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "email": null,
      "displayName": null,
      "firstName": null,
      "lastName": null,
      "hash": "abc123hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "customId",
          "userId": "device-12345-abcde"
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
      }
    ],
    "progression": []
  },
  "errors": []
}
```

### Example 2: Platform ID Signup with Referral
**Request:**
```json
{
  "customId": "steam-7654321",
  "referralCode": "GAMER2024"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User Signed Up Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid-2",
      "id": "user-uuid-2",
      "email": null,
      "displayName": null,
      "firstName": null,
      "lastName": null,
      "hash": "def456hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "customId",
          "userId": "steam-7654321"
        }
      ],
      "referralCode": "REF456DEF",
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
        "amount": 150
      }
    ],
    "progression": []
  },
  "errors": []
}
```

### Example 3: Signup with Full Options
**Request:**
```json
{
  "customId": "epic-user-abc123",
  "includePlayerData": true,
  "includeEquipItem": true,
  "specterParams": {
    "platform": "epic_games",
    "region": "us-east"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User Signed Up Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid-3",
      "id": "user-uuid-3",
      "email": null,
      "displayName": null,
      "firstName": null,
      "lastName": null,
      "hash": "ghi789hash",
      "username": null,
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [
        {
          "authProvider": "customId",
          "userId": "epic-user-abc123"
        }
      ],
      "referralCode": "REF789GHI",
      "isKycComplete": false,
      "EquippedItems": []
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "entityToken": "entity-token-string",
    "createdAccount": true,
    "playerData": null,
    "currencies": [],
    "progression": []
  },
  "errors": []
}
```

---

## Notes

- Creates a new user account with a custom identifier (no password required)
- Ideal for device-based authentication or third-party platform integration
- Triggers the `player_signed_up_with_custom_id` event for task validation
- `accessToken` should be used for subsequent authenticated API calls
- `entityToken` is used to refresh the access token when it expires
- `createdAccount` is always true for signup
- Custom ID must be unique within the project
- The custom ID is stored in `linkedAccounts` with `authProvider: "customId"`

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Custom ID already exists | A user with this custom ID already exists in the project |
| Invalid custom ID | The custom ID format is invalid |

---

## Source Files

- **DTO**: `src/users/dto/signup-with-customId.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
