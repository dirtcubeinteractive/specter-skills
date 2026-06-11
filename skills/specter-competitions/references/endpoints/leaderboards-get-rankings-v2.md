# V2 API: `client/leaderboards/get-rankings`

**Endpoint:** `POST /v2/client/leaderboards/get-rankings`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leaderboardId` | `string` | Yes | The leaderboard ID to get rankings for |
| `instanceId` | `string` | Yes | The schedule instance ID |
| `attributes` | `string[]` | No | Select which optional attributes to include |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Leaderboard Rankings list",
  "data": {
    "rankings": [
      {
        "rank": 1,
        "player": {
          "uuid": "user-uuid-1",
          "userId": "player-123",
          "displayName": "Top Player",
          "iconUrl": "https://cdn.example.com/avatar1.png"
        },
        "score": 50000,
        "entriesCount": 150
      },
      {
        "rank": 2,
        "player": {
          "uuid": "user-uuid-2",
          "userId": "player-456",
          "displayName": "Second Place",
          "iconUrl": "https://cdn.example.com/avatar2.png"
        },
        "score": 48000,
        "entriesCount": 145
      }
    ],
    "totalCount": 500,
    "myRank": {
      "rank": 25,
      "score": 35000
    }
  },
  "errors": []
}
```

---

## How Attributes Affect Response

### `attributes: ["prizeInfo"]`
Adds prize information for each rank:
```json
{
  ...ranking fields...,
  "prizeInfo": {
    "currencies": [{"id": "...", "name": "Gold", "quantity": 1000}],
    "items": [],
    "bundles": []
  }
}
```

---

## Request Examples

### Example 1: Basic Rankings
**Request:**
```json
{
  "leaderboardId": "leaderboard-123",
  "instanceId": "instance-uuid"
}
```
**Effect:** Returns top 10 rankings for the leaderboard instance.

---

### Example 2: With Pagination
**Request:**
```json
{
  "leaderboardId": "leaderboard-123",
  "instanceId": "instance-uuid",
  "offset": 50,
  "limit": 25
}
```
**Effect:** Returns rankings 51-75.

---

### Example 3: With Attributes
**Request:**
```json
{
  "leaderboardId": "leaderboard-123",
  "instanceId": "instance-uuid",
  "attributes": ["prizeInfo"],
  "limit": 10
}
```
**Effect:** Returns top 10 with prize information.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| leaderboardId not provided | Validation error |
| instanceId not provided | Validation error |
| Leaderboard not found | Leaderboard not found |
| Instance not found | Instance not found |

---

## Source Files

- **DTO**: `src/leaderboard/dto/get-leaderboard-rankings.v2.dto.ts`
- **Controller**: `src/leaderboard/leaderboard.controller.ts:504-529`
- **Service**: `src/leaderboard/leaderboard.service.ts`
