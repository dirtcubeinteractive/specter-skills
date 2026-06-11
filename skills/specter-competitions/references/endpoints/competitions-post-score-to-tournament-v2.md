# V2 API: `client/competitions/post-score-to-tournament`

**Endpoint:** `POST /v2/client/competitions/post-score-to-tournament`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | No | The competition ID (client-facing) |
| `entryId` | `string` | **Yes** | The entry ID for the score submission |
| `score` | `number` | **Yes** | The score to post |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Score post to tournament successfully",
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

## Request/Response Examples

### Example 1: Post Score to Tournament
**Request:**
```json
{
  "competitionId": "weekly-tournament",
  "entryId": "entry-uuid-123",
  "score": 15000
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Score post to tournament successfully",
  "data": [],
  "errors": []
}
```

### Example 2: Post Score without Competition ID
**Request:**
```json
{
  "entryId": "entry-uuid-456",
  "score": 25000
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Score post to tournament successfully",
  "data": [],
  "errors": []
}
```

---

## Notes

- Score is added to the tournament leaderboard
- Entry must be valid and belong to the authenticated user
- Entry must be within the competition time window
- Multiple score submissions may be allowed based on competition's `maxAttemptAllowed` setting
- Score is used for ranking players in the competition leaderboard

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Entry not found | The specified entryId does not exist |
| Entry expired | The competition instance has ended |
| Max attempts reached | User has exceeded the maximum allowed attempts |
| Invalid score | Score value is invalid |

---

## Source Files

- **DTO**: `src/leaderboard/dto/send-score-to-competition-leaderboard.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/leaderboard/leaderboard.service.ts`
