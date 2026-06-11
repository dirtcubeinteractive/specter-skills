# V2 API: `client/player/me/get-pending-friend-requests`

**Endpoint:** `POST /v2/client/player/me/get-pending-friend-requests`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `limit` | `number` | Pagination limit (default: 10) |
| `offset` | `number` | Pagination offset (default: 0) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Pending friend requests fetched successfully",
  "data": {
    "requests": [
      {
        "uuid": "request-uuid-1",
        "fromUser": {
          "uuid": "user-uuid-1",
          "userId": "player-123",
          "displayName": "Player One",
          "iconUrl": "https://cdn.example.com/avatar1.png"
        },
        "message": "Let's play together!",
        "createdAt": "2025-12-01T10:30:00.000Z"
      },
      {
        "uuid": "request-uuid-2",
        "fromUser": {
          "uuid": "user-uuid-2",
          "userId": "player-456",
          "displayName": "Player Two",
          "iconUrl": "https://cdn.example.com/avatar2.png"
        },
        "message": null,
        "createdAt": "2025-12-02T14:45:00.000Z"
      }
    ],
    "totalCount": 5
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Request
**Request:**
```json
{}
```
**Effect:** Returns first 10 pending friend requests.

---

### Example 2: With Pagination
**Request:**
```json
{
  "limit": 5,
  "offset": 0
}
```
**Effect:** Returns first 5 pending friend requests.

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:71-80`
- **Controller**: `src/friends/friends.controller.ts:157-175`
- **Service**: `src/friends/friends.service.ts`
