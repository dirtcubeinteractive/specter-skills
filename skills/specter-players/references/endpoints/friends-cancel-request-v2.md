# V2 API: `client/friends/cancel-request`

**Endpoint:** `POST /v2/client/friends/cancel-request`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `friendId` | `string` | Yes | The user ID of the player to cancel the sent friend request for |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Friend request cancelled successfully",
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
**Effect:** Cancels the friend request that was previously sent to player-123.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| Friend ID not provided | Validation error |
| User not found | User not found |
| No sent request | No pending friend request sent to this user |

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:29-33`
- **Controller**: `src/friends/friends.controller.ts:78-96`
- **Service**: `src/friends/friends.service.ts`
