# V2 API: `client/player/me/get-progress`

**Endpoint:** `POST /v2/client/player/me/get-progress`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `progressionMarkerIds` | `string[]` | Yes | Array of progression marker IDs to retrieve (minimum 1) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My Progress",
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "id": "player-level",
      "name": "Player Level",
      "description": "Track player level progression",
      "iconUrl": "https://cdn.example.com/level-icon.png",
      "progressionMarkerAmount": 7500,
      "progressInfo": [
        {
          "progressionSystemId": "level-system-123",
          "currentLevelNo": 25,
          "previousLevelNo": 24,
          "amountToNextLevel": 2500
        }
      ]
    }
  ],
  "errors": []
}
```

**Note:** The `data` field is an array of progression marker objects, not wrapped in a `progress` property.

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Unique identifier for the progression marker |
| `id` | `string` | The progression marker ID |
| `name` | `string` | Display name of the progression marker |
| `description` | `string` | Description of the progression marker |
| `iconUrl` | `string` | URL to the progression marker icon |
| `progressionMarkerAmount` | `number` | Current amount/XP accumulated |
| `progressInfo` | `array` | Array of level progression details |
| `progressInfo[].progressionSystemId` | `string` | ID of the progression system |
| `progressInfo[].currentLevelNo` | `number` | Current level number |
| `progressInfo[].previousLevelNo` | `number` | Previous level number |
| `progressInfo[].amountToNextLevel` | `number` | Amount needed to reach next level |

---

## Request Examples

### Example 1: Get Single Progression
**Request:**
```json
{
  "progressionMarkerIds": ["player-level"]
}
```
**Effect:** Returns progress for the specified progression marker.

---

### Example 2: Get Multiple Progressions
**Request:**
```json
{
  "progressionMarkerIds": ["player-level", "battle-pass", "season-rank"]
}
```
**Effect:** Returns progress for all specified progression markers.

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My Progress",
  "data": [
    {
      "uuid": "uuid-1",
      "id": "player-level",
      "name": "Player Level",
      "description": "Track player level",
      "iconUrl": "https://cdn.example.com/level.png",
      "progressionMarkerAmount": 47500,
      "progressInfo": [
        {
          "progressionSystemId": "level-system",
          "currentLevelNo": 25,
          "previousLevelNo": 24,
          "amountToNextLevel": 2500
        }
      ]
    },
    {
      "uuid": "uuid-2",
      "id": "battle-pass",
      "name": "Battle Pass",
      "description": "Season battle pass",
      "iconUrl": "https://cdn.example.com/bp.png",
      "progressionMarkerAmount": 22750,
      "progressInfo": [
        {
          "progressionSystemId": "bp-system",
          "currentLevelNo": 45,
          "previousLevelNo": 44,
          "amountToNextLevel": 250
        }
      ]
    }
  ],
  "errors": []
}
```

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| progressionMarkerIds not provided | Validation error |
| Empty array | Array must contain at least 1 element |
| Invalid marker ID | Progression marker not found |

---

## Source Files

- **DTO**: `src/progression/dto/get-my-progress.v2.dto.ts`
- **Controller**: `src/progression/progression.controller.ts:230-251`
- **Service**: `src/progression/progression.service.ts:1656-1782`
