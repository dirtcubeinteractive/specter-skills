# V2 API: `client/player/get-profile`

**Endpoint:** `POST /v2/client/player/get-profile`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to get profile for |
| `username` | `string` | No | Alternative: find by username |
| `email` | `string` | No | Alternative: find by email |
| `attributes` | `string[]` | No | Select which optional attributes to include in response |

**Note:** You must provide at least one of `userId`, `username`, or `email`.

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Profile data",
  "data": {
    "uuid": "user-uuid",
    "userId": "player-123",
    "displayName": "PlayerOne",
    "username": "playerone",
    "iconUrl": "https://cdn.example.com/avatar.png",
    "createdAt": "2025-01-01T00:00:00.000Z"
  },
  "errors": []
}
```

---

## How Each Attribute Changes Response

### `attributes: ["meta"]`
Adds custom metadata:
```json
{
  ...base fields...,
  "meta": {
    "level": 25,
    "bio": "Competitive gamer"
  }
}
```

---

### `attributes: ["wallet"]`
Adds wallet/currency balances:
```json
{
  ...base fields...,
  "wallet": {
    "currencies": [
      {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "balance": 5000
      }
    ]
  }
}
```

---

### `attributes: ["progression"]`
Adds progression/level information:
```json
{
  ...base fields...,
  "progression": [
    {
      "uuid": "level-uuid",
      "id": "player-level",
      "name": "Player Level",
      "currentLevel": 25,
      "currentXp": 7500,
      "xpToNextLevel": 10000
    }
  ]
}
```

---

### `attributes: ["stats"]`
Adds player statistics:
```json
{
  ...base fields...,
  "stats": {
    "gamesPlayed": 150,
    "gamesWon": 85,
    "winRate": 56.7
  }
}
```

---

## Request Examples

### Example 1: By User ID
**Request:**
```json
{
  "userId": "player-123"
}
```
**Effect:** Returns basic profile for player-123.

---

### Example 2: By Username with Attributes
**Request:**
```json
{
  "username": "playerone",
  "attributes": ["wallet", "progression"]
}
```
**Effect:** Returns profile found by username with wallet and progression.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| No identifier provided | User ID, username, or email required |
| User not found | User not found |

---

## Source Files

- **DTO**: `src/users/dto/get-user-profile.v2.dto.ts`
- **Controller**: `src/users/users.controller.ts:2121-2152`
- **Service**: `src/users/users.service.ts`
