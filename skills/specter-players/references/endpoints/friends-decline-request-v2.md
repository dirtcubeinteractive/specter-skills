# V2 API: `client/friends/decline-request`

**Endpoint:** `POST /v2/client/friends/decline-request`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `friendId` | `string` | Yes | The user ID of the player whose friend request to decline |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Friend request declined successfully",
  "data": [],
  "errors": []
}
```

---

## Request Example

**Request:**
```json
{
  "friendId": "player-123"
}
```
**Effect:** Declines the pending friend request from player-123.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| Friend ID not provided | Validation error |
| User not found | User not found |
| No pending request | No pending friend request from this user |

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:23-27`
- **Controller**: `src/friends/friends.controller.ts:58-76`
- **Service**: `src/friends/friends.service.ts`
