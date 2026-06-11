# V2 API: `client/matchmaking/cancel-match`

**Endpoint:** `POST /v2/client/matchmaking/cancel-match`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (none) | - | - | No request body required |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Match cancelled successfully",
  "data": [],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Empty array on success |

---

## Request Examples

### Example 1: Cancel Matchmaking
**Request:**
```json
{}
```

---

## Notes

- Removes the authenticated user from the matchmaking queue
- Can be called at any time while in the queue
- If the user is not in a queue, the operation completes silently
- For clearing all queues, use `matchmaking/clear-all-queues` instead

---

## Source Files

- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
