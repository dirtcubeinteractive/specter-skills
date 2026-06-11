# V2 API: `client/auth/login-custom`

**Endpoint:** `POST /v2/client/auth/login-custom`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customId` | `string` | **Yes** | Custom identifier (e.g., device ID, platform ID) |
| `createAccount` | `boolean` | **Yes** | Create account if it doesn't exist |
| `includePlayerData` | `boolean` | No | Include player data in response (default: false) |
| `includeEquipItem` | `boolean` | No | Include equipped items in response (default: false) |
| `paramDetails` | `object` | No | Additional parameter details |
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
| `user.email` | `string` | User's email (null for custom auth) |
| `user.displayName` | `string` | User's display name |
| `user.firstName` | `string` | User's first name |
| `user.lastName` | `string` | User's last name |
| `user.hash` | `string` | User hash |
| `user.username` | `string` | User's username (null for custom auth) |
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

### Example 1: Device ID Login (Existing Account)
**Request:**
```json
{
  "customId": "device-12345-abcde",
  "createAccount": false
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
    "progression": []
  },
  "errors": []
}
```

### Example 2: Login or Create Account
**Request:**
```json
{
  "customId": "steam-7654321",
  "createAccount": true
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
        "amount": 100
      }
    ],
    "progression": []
  },
  "errors": []
}
```

### Example 3: Login with Player Data
**Request:**
```json
{
  "customId": "epic-user-abc123",
  "createAccount": true,
  "includePlayerData": true,
  "includeEquipItem": true,
  "paramDetails": {
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
  "message": "User Logged In Successfully",
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

- Authenticates a user with a custom identifier (no password required)
- Ideal for device-based authentication or third-party platform integration
- If `createAccount` is true, creates a new account if one doesn't exist
- Triggers the `player_logged_in_with_custom_id` event for task validation
- `accessToken` should be used for subsequent authenticated API calls
- `entityToken` is used to refresh the access token when it expires
- `createdAccount` indicates whether the account was just created

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Account not found | No account exists with this custom ID and createAccount is false |
| Account disabled | The user account has been disabled |
| Invalid custom ID | The custom ID format is invalid |

---

## Source Files

- **DTO**: `src/users/dto/login-with-custom-id.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
