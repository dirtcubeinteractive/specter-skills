# V2 API: `client/leaderboards/get-results`

**Endpoint:** `POST /v2/client/leaderboards/get-results`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leaderboardId` | `string` | Yes | The leaderboard ID to get results for |
| `instanceId` | `string` | Yes | The schedule instance ID |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Leaderboard Results list",
  "data": {
    "results": [
      {
        "rank": 1,
        "player": {
          "uuid": "user-uuid-1",
          "userId": "player-123",
          "displayName": "Top Player",
          "iconUrl": "https://cdn.example.com/avatar1.png"
        },
        "score": 50000,
        "prizesWon": {
          "currencies": [
            {"id": "gold-coins", "name": "Gold Coins", "quantity": 10000}
          ],
          "items": [
            {"id": "trophy", "name": "Gold Trophy", "quantity": 1}
          ],
          "bundles": []
        },
        "prizesClaimed": true
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
        "prizesWon": {
          "currencies": [
            {"id": "gold-coins", "name": "Gold Coins", "quantity": 5000}
          ],
          "items": [
            {"id": "trophy", "name": "Silver Trophy", "quantity": 1}
          ],
          "bundles": []
        },
        "prizesClaimed": false
      }
    ],
    "totalCount": 500,
    "instanceStatus": "completed"
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Results
**Request:**
```json
{
  "leaderboardId": "leaderboard-123",
  "instanceId": "instance-uuid"
}
```
**Effect:** Returns top 10 final results for the completed leaderboard instance.

---

### Example 2: With Pagination
**Request:**
```json
{
  "leaderboardId": "leaderboard-123",
  "instanceId": "instance-uuid",
  "offset": 0,
  "limit": 100
}
```
**Effect:** Returns first 100 results.

---

## Difference from Rankings

- **Rankings**: Shows current standings during an active leaderboard period
- **Results**: Shows final standings after leaderboard period has ended with prize information

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| leaderboardId not provided | Validation error |
| instanceId not provided | Validation error |
| Leaderboard not found | Leaderboard not found |
| Instance not found | Instance not found |
| Leaderboard still active | Results not available yet |

---

## Source Files

- **DTO**: `src/leaderboard/dto/get-leaderboard-result.v2.dto.ts`
- **Controller**: `src/leaderboard/leaderboard.controller.ts:529-554`
- **Service**: `src/leaderboard/leaderboard.service.ts`
