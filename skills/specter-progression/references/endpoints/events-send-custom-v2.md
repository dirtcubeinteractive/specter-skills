# V2 API: `client/events/send-custom`

**Endpoint:** `POST /v2/client/events/send-custom`

**Authentication:** User Auth Guard Required

---

## Description

Sends a custom event that can trigger task progress, analytics, or other game logic. Custom events allow game-specific actions to be tracked and processed. Unlike V1, this version validates that the event exists before processing.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `eventId` | `string` | Yes | The ID of the custom event to fire |
| `specterParams` | `object` | No | Default/specter parameters for the event |
| `customParams` | `object` | No | Custom parameters specific to the event |
| `userId` | `string` | No | Fire the event for another user (defaults to the authenticated user) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Custom Event Send Successfully",
  "data": {},
  "errors": []
}
```

### Event Not Found Response
```json
{
  "status": "error",
  "code": 404,
  "message": "Event not found",
  "errorCode": 1119,
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Event
**Request:**
```json
{
  "eventId": "tutorial_complete"
}
```
**Effect:** Fires the `tutorial_complete` event that may trigger related tasks.

---

### Example 2: Event with Specter Params
**Request:**
```json
{
  "eventId": "level_complete",
  "specterParams": {
    "levelId": 15,
    "difficulty": "hard"
  }
}
```
**Effect:** Fires event with specter parameters for matching.

---

### Example 3: Event with Custom Params
**Request:**
```json
{
  "eventId": "level_complete",
  "specterParams": {
    "levelId": 15
  },
  "customParams": {
    "score": 5000,
    "stars": 3,
    "timeSpent": 120,
    "perfectRun": true
  }
}
```
**Effect:** Fires event with both specter and custom parameters for detailed task matching.

---

### Example 4: Purchase Event
**Request:**
```json
{
  "eventId": "item_purchased",
  "customParams": {
    "itemId": "sword-001",
    "quantity": 1,
    "price": 500,
    "currency": "gold"
  }
}
```
**Effect:** Tracks a purchase event for analytics and task triggers.

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | `string` | Always `"success"` on successful event send |
| `code` | `number` | HTTP status code (201 on success) |
| `message` | `string` | `"Custom Event Send Successfully"` |
| `data` | `object` | Empty object `{}` on success |
| `errors` | `array` | Empty array on success |

---

## V1 vs V2 Differences

| Aspect | V1 | V2 |
|--------|----|----|
| **Event validation** | No - sends event even if not found | Yes - throws 404 if not found |
| **Error code** | N/A | 1119 when event not found |
| **Response code** | 201 | 201 |

---

## Side Effects

- May trigger task progress for tasks listening to this event
- May update analytics/telemetry data
- May trigger webhooks if configured
- Calls `taskValidationInit` with task type `'custom-event'`

---

## Error Cases

| Scenario | Error Code | Error Message |
|----------|------------|---------------|
| eventId not provided | - | Validation error |
| Event not found | 1119 | Event not found |
| Invalid request body | - | Validation error |

---

## Source Files

- **DTO**: `src/users/dto/fire-custom-event.dto.ts`
- **Controller**: `src/users/users.controller.ts:506-559`
- **Service**: `src/task/task.service.ts:18157-18161` (getCustomEventByEventId)
