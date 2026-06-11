# V2 API: `client/player/get-progress`

**Endpoint:** `POST /v2/client/player/get-progress`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `progressionMarkerIds` | `string[]` | Yes | Array of progression marker IDs to retrieve (minimum 1) |
| `userId` | `string` | Yes | The user ID of the player to get progress for |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Progress",
  "data": {
    "progress": [
      {
        "uuid": "progress-uuid-1",
        "markerId": "level-system-123",
        "name": "Player Level",
        "currentLevel": 15,
        "currentXp": 3500,
        "xpToNextLevel": 5000,
        "totalXp": 23500
      }
    ]
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Get Another Player's Progress
**Request:**
```json
{
  "userId": "player-123",
  "progressionMarkerIds": ["level-system-123"]
}
```
**Effect:** Returns progress for player-123's specified progression marker.

---

### Example 2: Get Multiple Progressions
**Request:**
```json
{
  "userId": "player-123",
  "progressionMarkerIds": ["level-system-123", "battle-pass"]
}
```
**Effect:** Returns progress for multiple progression markers.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| userId not provided | Validation error |
| progressionMarkerIds not provided | Validation error |
| Empty array | Array must contain at least 1 element |
| User not found | User not found |
| Invalid marker ID | Progression marker not found |

---

## Source Files

- **DTO**: `src/progression/dto/get-player-progress.v2.dto.ts`
- **Controller**: `src/progression/progression.controller.ts:253-276`
- **Service**: `src/progression/progression-wallet.service.ts`
