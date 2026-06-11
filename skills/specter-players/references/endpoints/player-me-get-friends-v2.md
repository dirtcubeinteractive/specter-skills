# V2 API: `client/player/me/get-friends`

**Endpoint:** `POST /v2/client/player/me/get-friends`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `includeOnlineStatus` | `boolean` | Include online status of friends |
| `search` | `string` | Search friends by name (case-insensitive) |
| `limit` | `number` | Pagination limit (default: 10) |
| `offset` | `number` | Pagination offset (default: 0) |

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
        "iconUrl": "https://cdn.example.com/avatar1.png",
        "isOnline": true,
        "friendSince": "2025-01-15T10:30:00.000Z"
      },
      {
        "uuid": "friend-uuid-2",
        "userId": "player-456",
        "displayName": "Player Two",
        "iconUrl": "https://cdn.example.com/avatar2.png",
        "isOnline": false,
        "friendSince": "2025-02-20T14:45:00.000Z"
      }
    ],
    "totalCount": 25
  },
  "errors": []
}
```

*Note: `isOnline` is only included when `includeOnlineStatus: true`.*

---

## Request Examples

### Example 1: Basic Request
**Request:**
```json
{}
```
**Effect:** Returns first 10 friends with basic info.

---

### Example 2: With Online Status
**Request:**
```json
{
  "includeOnlineStatus": true
}
```
**Effect:** Returns friends with their online/offline status.

---

### Example 3: Search Friends
**Request:**
```json
{
  "search": "john",
  "limit": 20,
  "offset": 0
}
```
**Effect:** Returns first 20 friends whose name contains "john".

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:53-69`
- **Controller**: `src/friends/friends.controller.ts:117-135`
- **Service**: `src/friends/friends.service.ts`
