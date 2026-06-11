# V2 API: `client/friends/accept-request`

**Endpoint:** `POST /v2/client/friends/accept-request`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `friendId` | `string` | Yes | The user ID of the player whose friend request to accept |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Friend request accepted successfully",
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
**Effect:** Accepts the pending friend request from player-123. Both users become friends.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| Friend ID not provided | Validation error |
| User not found | User not found |
| No pending request | No pending friend request from this user |
| Already friends | Already friends with this user |

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:15-21`
- **Controller**: `src/friends/friends.controller.ts:38-56`
- **Service**: `src/friends/friends.service.ts`
