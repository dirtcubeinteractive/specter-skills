# V2 API: `client/matchmaking/end-match-session`

**Endpoint:** `POST /v2/client/matchmaking/end-match-session`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchSessionId` | `string` | **Yes** | The match session ID to end |
| `userInfo` | `UserMatchOutcome[]` | **Yes** | Array of user outcomes (min 1) |
| `meta` | `object` | No | Additional metadata for the session |

### UserMatchOutcome Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | User ID |
| `outcome` | `number` | **Yes** | User's score/outcome (integer) |
| `entryId` | `string` | No | Competition entry ID |
| `teamId` | `string` | No | Team ID for team-based matches |
| `specterParams` | `object` | No | System parameters for task validation |
| `customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Successfully ended match session",
  "data": {
    "matchSessionId": "match-session-uuid-12345"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `matchSessionId` | `string` | The match session that was ended |

---

## Request Examples

### Example 1: End Session with Simple Outcomes
**Request:**
```json
{
  "matchSessionId": "match-session-uuid-12345",
  "userInfo": [
    {
      "id": "user-uuid-1",
      "outcome": 100
    },
    {
      "id": "user-uuid-2",
      "outcome": 85
    }
  ]
}
```

### Example 2: End Session with Full Details
**Request:**
```json
{
  "matchSessionId": "match-session-uuid-12345",
  "userInfo": [
    {
      "id": "user-uuid-1",
      "outcome": 100,
      "teamId": "team-red",
      "entryId": "entry-uuid-1",
      "specterParams": {
        "kills": 10,
        "deaths": 2
      },
      "customParams": {
        "mvp": true
      }
    },
    {
      "id": "user-uuid-2",
      "outcome": 85,
      "teamId": "team-blue",
      "entryId": "entry-uuid-2"
    }
  ],
  "meta": {
    "matchDuration": 1200,
    "mapId": "desert-arena"
  }
}
```

---

## Notes

- This endpoint is typically called by the matchmaking system (not by players)
- Ends the match session and records player outcomes
- For instant battles, automatically calculates and distributes prizes
- For tournaments, updates the competition leaderboard
- Triggers `match_session_ended` task validation for each user

---

## Source Files

- **DTO**: `src/match-session/dto/end-match-session.dto.ts`
- **Controller**: `src/match-session/match-session.controller.ts`
- **Service**: `src/match-session/match-session.service.ts`
