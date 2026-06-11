# V2 API: `client/matchmaking/clear-all-queues`

**Endpoint:** `POST /v2/client/matchmaking/clear-all-queues`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (none) | - | - | No request body required |

---

## Response Structure

### Success Response (Queues Cleared)
```json
{
  "status": "success",
  "code": 200,
  "message": "Cleared from 3 queue(s) and 5 Redis keys",
  "data": {
    "clearedQueues": [
      "ranked-us-east",
      "casual-eu-west",
      "ranked-asia"
    ],
    "queueCount": 3,
    "additionalKeysCleared": 5
  },
  "errors": []
}
```

### Success Response (No Queues to Clear)
```json
{
  "status": "success",
  "code": 200,
  "message": "No queues to clear",
  "data": {
    "clearedQueues": [],
    "queueCount": 0,
    "additionalKeysCleared": 0
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `clearedQueues` | `array` | List of queue names the player was removed from |
| `queueCount` | `number` | Number of queues cleared |
| `additionalKeysCleared` | `number` | Number of additional Redis keys cleaned up |

---

## Request Examples

### Example 1: Clear All Queues
**Request:**
```json
{}
```

---

## Notes

- Removes the player from ALL matchmaking queues across all regions and modes
- Also cleans up any associated Redis keys for the player
- Useful for resetting matchmaking state completely
- Unlike `cancel-match`, this clears multiple queues simultaneously

---

## Source Files

- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
