# V2 API: `client/friends/send-request`

**Endpoint:** `POST /v2/client/friends/send-request`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `friendId` | `string` | Yes | The user ID of the player to send friend request to |
| `message` | `string` | No | Optional message to include with the friend request |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Friend request sent successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Friend Request
**Request:**
```json
{
  "friendId": "player-123"
}
```
**Effect:** Sends a friend request to player-123 without a message.

---

### Example 2: Friend Request with Message
**Request:**
```json
{
  "friendId": "player-123",
  "message": "Hey! Let's play together!"
}
```
**Effect:** Sends a friend request to player-123 with a custom message.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| Friend ID not provided | Validation error |
| User not found | User not found |
| Already friends | Already friends with this user |
| Request already sent | Friend request already sent |
| Cannot add self | Cannot send friend request to yourself |

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:4-13`
- **Controller**: `src/friends/friends.controller.ts:18-36`
- **Service**: `src/friends/friends.service.ts`
