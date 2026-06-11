# V2 API: `client/friends/remove`

**Endpoint:** `POST /v2/client/friends/remove`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `friendId` | `string` | Yes | The user ID of the friend to remove |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Friend removed successfully",
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
**Effect:** Removes player-123 from the current user's friends list.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| Friend ID not provided | Validation error |
| User not found | User not found |
| Not friends | You are not friends with this user |

---

## Source Files

- **DTO**: `src/friends/dto/friends.dto.ts:35-39`
- **Controller**: `src/friends/friends.controller.ts:98-116`
- **Service**: `src/friends/friends.service.ts`
