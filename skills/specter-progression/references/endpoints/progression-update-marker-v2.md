# V2 API: `client/progression/update-marker`

**Endpoint:** `POST /v2/client/progression/update-marker`

**Authentication:** User Auth Guard Required

---

## Description

Updates a progression marker value for the authenticated user. Can be used to add or subtract from progression markers, triggering level-ups and rewards when applicable.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `progressionMarkerId` | `string` | Yes | The progression marker ID to update |
| `amount` | `number` | Yes | The value to add/subtract (must be positive) |
| `operation` | `string` | Yes | The operation to perform ("add" or "subtract") |
| `specterParams` | `object` | No | Specter parameters for the update |
| `customParams` | `object` | No | Custom parameters for the update |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Progression Marker Updated Successfully",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "id": "player-level",
    "name": "Player Level",
    "description": "Track player level progression",
    "iconUrl": "https://cdn.example.com/level-icon.png",
    "progressionMarkerAmount": 8000,
    "progressInfo": [
      {
        "progressionSystemId": "level-system-123",
        "currentLevelNo": 25,
        "previousLevelNo": 24,
        "amountToNextLevel": 2000,
        "levelUpOccurred": true
      }
    ]
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Add XP
**Request:**
```json
{
  "progressionMarkerId": "player-level",
  "amount": 500,
  "operation": "add"
}
```
**Effect:** Adds 500 XP to the player's level progression.

---

### Example 2: Subtract Points
**Request:**
```json
{
  "progressionMarkerId": "currency-points",
  "amount": 100,
  "operation": "subtract"
}
```
**Effect:** Subtracts 100 points from the progression marker.

---

### Example 3: With Custom Params
**Request:**
```json
{
  "progressionMarkerId": "battle-pass",
  "amount": 100,
  "operation": "add",
  "specterParams": {
    "source": "match_complete"
  },
  "customParams": {
    "matchId": "match-123"
  }
}
```
**Effect:** Adds 100 points to battle pass with tracking info for task validation.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| progressionMarkerId not provided | Validation error |
| amount not provided | Validation error |
| operation not provided | Validation error |
| amount not positive | Validation error |
| Marker not found | Progression marker not found |

---

## Source Files

- **DTO**: `src/progression/dto/update-progression-wallet.dto.ts`
- **Controller**: `src/progression/progression.controller.ts:80-123`
- **Service**: `src/progression/progression-wallet.service.ts`
