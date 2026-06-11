# V2 API: `client/matchmaking/get-queue-status`

**Endpoint:** `POST /v2/client/matchmaking/get-queue-status`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| (none) | - | - | No request body required |

---

## Response Structure

### Success Response (In Queue)
```json
{
  "status": "success",
  "code": 200,
  "message": "Queue status fetched successfully",
  "data": {
    "queueStatus": {
      "position": 3,
      "estimatedTime": 45,
      "playersInQueue": 12
    }
  },
  "errors": []
}
```

### Success Response (Not In Queue)
```json
{
  "status": "success",
  "code": 200,
  "message": "Queue status fetched successfully",
  "data": {
    "queueStatus": "Not in queue"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.queueStatus` | `object \| string` | Queue information object or "Not in queue" string |
| `queueStatus.position` | `number` | Current position in the queue |
| `queueStatus.estimatedTime` | `number` | Estimated wait time in seconds |
| `queueStatus.playersInQueue` | `number` | Total number of players currently in the queue |

---

## Request/Response Examples

### Example 1: Player In Queue
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Queue status fetched successfully",
  "data": {
    "queueStatus": {
      "position": 5,
      "estimatedTime": 55,
      "playersInQueue": 20
    }
  },
  "errors": []
}
```

### Example 2: Player Not In Queue
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Queue status fetched successfully",
  "data": {
    "queueStatus": "Not in queue"
  },
  "errors": []
}
```

### Example 3: First In Queue
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Queue status fetched successfully",
  "data": {
    "queueStatus": {
      "position": 1,
      "estimatedTime": 30,
      "playersInQueue": 8
    }
  },
  "errors": []
}
```

---

## Notes

- Returns the current matchmaking queue status for the authenticated player
- If the player is not in any queue, returns "Not in queue" string
- `estimatedTime` is calculated based on queue position (minimum 30 seconds, plus 5 seconds per position)
- `playersInQueue` shows the total number of players in the same queue
- Use this endpoint to poll for queue updates or display wait time to the player

---

## Source Files

- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
