# V2 API: `client/auth/signup-username`

**Endpoint:** `POST /v2/client/auth/signup-username`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | `string` | **Yes** | User's username |
| `password` | `string` | **Yes** | User's password |
| `referralCode` | `string` | No | Referral code for tracking |
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
    "createdAccount": true,
    "currencies": [
      {
        "uuid": "currency-uuid",
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

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `user` | `object` | User profile information |
| `user.uuid` | `string` | Unique identifier (internal ID) |
| `user.id` | `string` | User ID (same as uuid) |
| `user.email` | `string` | User's email (null for username signup) |
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
| `createdAccount` | `boolean` | Always true for signup |
| `playerData` | `object` | Player data (if `includePlayerData` is true) |
| `currencies` | `array` | User's currency balances (initial balances for new account) |
| `progression` | `array` | User's progression marker values |

---

## Request/Response Examples

### Example 1: Basic Username Signup
**Request:**
```json
{
  "username": "player123",
  "password": "SecurePassword123!"
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

### Example 2: Signup with Referral Code
**Request:**
```json
{
  "username": "player123",
  "password": "SecurePassword123!",
  "referralCode": "FRIEND2024"
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
      "username": "player123",
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [],
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

### Example 3: Signup with Player Data
**Request:**
```json
{
  "username": "player123",
  "password": "SecurePassword123!",
  "includePlayerData": true,
  "includeEquipItem": true
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
      "username": "player123",
      "birthdate": null,
      "thumbUrl": null,
      "meta": {},
      "tags": [],
      "linkedAccounts": [],
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

- Creates a new user account with username authentication
- Triggers the `player_signed_up_with_username` event for task validation
- `accessToken` should be used for subsequent authenticated API calls
- `entityToken` is used to refresh the access token when it expires
- `createdAccount` is always true for signup
- Username must be unique within the project
- Initial currency balances may be granted based on project configuration

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Username already exists | A user with this username already exists in the project |
| Invalid username | The username doesn't meet format requirements |
| Weak password | Password doesn't meet security requirements |

---

## Source Files

- **DTO**: `src/users/dto/signup-with-username.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
