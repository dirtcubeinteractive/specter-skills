# V2 API: `client/matches/get-match-session-results`

**Endpoint:** `POST /v2/client/matches/get-match-session-results`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchSessionIds` | `string[]` | No | Array of match session IDs to filter |
| `competitionIds` | `string[]` | No | Array of competition IDs to filter |
| `matchIds` | `string[]` | No | Array of match IDs to filter |
| `gameIds` | `string[]` | No | Array of game IDs to filter |
| `offset` | `number` | No | Pagination offset |
| `limit` | `number` | No | Number of results to return |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Match Session Results",
  "data": {
    "matchSessions": [
      {
        "id": "match-session-uuid-12345",
        "matchId": "battle-royale-1v1",
        "gameId": "game-uuid",
        "gameName": "Battle Royale",
        "competitionId": null,
        "state": "ended",
        "startedAt": "2024-01-15T10:30:00.000Z",
        "endedAt": "2024-01-15T10:45:00.000Z",
        "results": [
          {
            "id": "user-uuid-1",
            "outcome": 100,
            "rank": 1,
            "prizes": [
              {
                "type": "currency",
                "id": "gold-coins",
                "amount": 500
              }
            ]
          },
          {
            "id": "user-uuid-2",
            "outcome": 85,
            "rank": 2,
            "prizes": [
              {
                "type": "currency",
                "id": "gold-coins",
                "amount": 250
              }
            ]
          }
        ]
      }
    ],
    "totalCount": 50
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `matchSessions` | `array` | Array of match session result objects |
| `matchSessions[].id` | `string` | Match session ID |
| `matchSessions[].matchId` | `string` | Match ID |
| `matchSessions[].gameId` | `string` | Game ID |
| `matchSessions[].gameName` | `string` | Game display name |
| `matchSessions[].competitionId` | `string \| null` | Competition ID if applicable |
| `matchSessions[].state` | `string` | Session state (created/started/ended) |
| `matchSessions[].startedAt` | `string` | ISO timestamp when session started |
| `matchSessions[].endedAt` | `string` | ISO timestamp when session ended |
| `matchSessions[].results` | `array` | Array of player results |
| `matchSessions[].results[].id` | `string` | User ID |
| `matchSessions[].results[].outcome` | `number` | Player's score/outcome |
| `matchSessions[].results[].rank` | `number` | Player's rank |
| `matchSessions[].results[].prizes` | `array` | Prizes awarded to player |
| `totalCount` | `number` | Total number of matching sessions |

---

## Request Examples

### Example 1: Get Results by Match Session IDs
**Request:**
```json
{
  "matchSessionIds": ["match-session-uuid-1", "match-session-uuid-2"]
}
```

### Example 2: Get Results for a Competition
**Request:**
```json
{
  "competitionIds": ["tournament-2024"],
  "offset": 0,
  "limit": 20
}
```

### Example 3: Get Results for a Game
**Request:**
```json
{
  "gameIds": ["battle-royale-game"],
  "offset": 0,
  "limit": 50
}
```

### Example 4: Get All Recent Results
**Request:**
```json
{
  "offset": 0,
  "limit": 10
}
```

---

## Notes

- Returns completed match session results for the authenticated player
- Can filter by multiple criteria simultaneously
- Results include prizes awarded (for competition matches)
- Pagination is recommended for large result sets

---

## Source Files

- **DTO**: `src/match-session/dto/get-match-session-result.dto.ts`
- **Controller**: `src/match-session/match-session.controller.ts`
- **Service**: `src/match-session/match-session.service.ts`
