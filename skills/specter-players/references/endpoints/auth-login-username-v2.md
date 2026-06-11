# V2 API: `client/auth/login-username`

**Endpoint:** `POST /v2/client/auth/login-username`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | `string` | **Yes** | User's username |
| `password` | `string` | **Yes** | User's password |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |
| `customParams` | `object` | No | Custom parameters for events |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "User Logged In Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid",
      "id": "user-uuid",
      "email": null,
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "hash": "abc123hash",
      "username": "player123",
      "birthdate": "1990-01-15",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "meta": {},
      "tags": ["premium", "verified"],
      "linkedAccounts": [
        {
          "authProvider": "customId",
          "userId": "custom-id-123"
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
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png",
        "code": "GLD",
        "type": "virtual",
        "amount": 1000
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 5000
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
| `user.email` | `string` | User's email address |
| `user.displayName` | `string` | User's display name |
| `user.firstName` | `string` | User's first name |
| `user.lastName` | `string` | User's last name |
| `user.hash` | `string` | User hash |
| `user.username` | `string` | User's username |
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
| `createdAccount` | `boolean` | True if account was just created |
| `playerData` | `object` | Player data (if `includePlayerData` is true) |
| `currencies` | `array` | User's currency balances |
| `progression` | `array` | User's progression marker values |

---

## Request/Response Examples

### Example 1: Basic Username Login
**Request:**
```json
{
  "username": "player123",
  "password": "MyPassword123!"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User Logged In Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "email": null,
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "hash": "abc123hash",
      "username": "player123",
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [],
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
        "amount": 1000
      }
    ],
    "progression": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 5000
      }
    ]
  },
  "errors": []
}
```

### Example 2: Login with Player Data
**Request:**
```json
{
  "username": "player123",
  "password": "MyPassword123!",
  "includePlayerData": true
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User Logged In Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "email": null,
      "displayName": "Player One",
      "firstName": null,
      "lastName": null,
      "hash": "abc123hash",
      "username": "player123",
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [],
      "referralCode": "REF123ABC",
      "isKycComplete": false
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "entityToken": "entity-token-string",
    "createdAccount": false,
    "playerData": {
      "score": {
        "value": 1500,
        "permission": "public"
      },
      "level": {
        "value": 25,
        "permission": "public"
      }
    },
    "currencies": [],
    "progression": []
  },
  "errors": []
}
```

### Example 3: Login with Equipped Items
**Request:**
```json
{
  "username": "player123",
  "password": "MyPassword123!",
  "includeEquipItem": true
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "User Logged In Successfully",
  "data": {
    "user": {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "email": null,
      "displayName": "Player One",
      "firstName": null,
      "lastName": null,
      "hash": "abc123hash",
      "username": "player123",
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [],
      "referralCode": "REF123ABC",
      "isKycComplete": false,
      "EquippedItems": [
        {
          "instanceId": "inventory-uuid-1",
          "uuid": "item-uuid-1",
          "id": "sword-01",
          "name": "Iron Sword",
          "description": "A basic sword",
          "iconUrl": "https://cdn.example.com/sword.png",
          "rarity": {
            "id": "rarity-uuid",
            "name": "Common"
          },
          "collectionId": null,
          "stackId": null,
          "isEquipped": true,
          "totalUsesAvailable": null
        }
      ]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "entityToken": "entity-token-string",
    "createdAccount": false,
    "currencies": [],
    "progression": []
  },
  "errors": []
}
```

---

## Notes

- Authenticates a user with username and password
- Triggers the `player_logged_in_with_username` event for task validation
- `accessToken` should be used for subsequent authenticated API calls
- `entityToken` is used to refresh the access token when it expires
- `createdAccount` is always false for login (true for signup)
- `currencies` and `progression` arrays show current balances
- `linkedAccounts` shows all connected authentication providers

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Invalid credentials | Username or password is incorrect |
| Account not found | No account exists with this username |
| Account disabled | The user account has been disabled |

---

## Source Files

- **DTO**: `src/users/dto/login-with-username.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
