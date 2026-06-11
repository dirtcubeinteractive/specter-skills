# V2 API: `client/player/get-friends`

**Endpoint:** `POST /v2/client/player/get-friends`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player whose friends to retrieve |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Friends list",
  "data": {
    "friends": [
      {
        "uuid": "friend-uuid-1",
        "userId": "player-123",
        "displayName": "Player One",
        "iconUrl": "https://cdn.example.com/avatar1.png"
      },
      {
        "uuid": "friend-uuid-2",
        "userId": "player-456",
        "displayName": "Player Two",
        "iconUrl": "https://cdn.example.com/avatar2.png"
      }
    ],
    "totalCount": 15
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Get Another Player's Friends
**Request:**
```json
{
  "userId": "player-789"
}
```
**Effect:** Returns first 10 friends of player-789.

---

### Example 2: With Pagination
**Request:**
```json
{
  "userId": "player-789",
  "limit": 20,
  "offset": 10
}
```
**Effect:** Returns friends 11-30 of player-789.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| User ID not provided | Validation error |
| User not found | User not found |

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:93-105`
- **Controller**: `src/friends/friends.controller.ts:137-155`
- **Service**: `src/friends/friends.service.ts`
