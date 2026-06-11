# V2 API: `client/matchmaking/find-match`

**Endpoint:** `POST /v2/client/matchmaking/find-match`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchId` | `string` | **Yes** | The match ID to search for |
| `mode` | `string` | **Yes** | Matchmaking mode: "ranked", "casual", or "private" |
| `region` | `string` | **Yes** | Geographic region code for matchmaking |
| `partyId` | `string` | No | Party ID for group matchmaking |
| `preferPartyVsParty` | `boolean` | No | Prefer matching parties against parties |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Queued to match successfully",
  "data": {
    "queueId": "queue-uuid-12345"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.queueId` | `string` | Unique identifier for the queue entry |

---

## Request/Response Examples

### Example 1: Ranked Solo Match
**Request:**
```json
{
  "matchId": "battle-royale-1v1",
  "mode": "ranked",
  "region": "us-east"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "Queued to match successfully",
  "data": {
    "queueId": "queue-uuid-abc123"
  },
  "errors": []
}
```

### Example 2: Party Matchmaking
**Request:**
```json
{
  "matchId": "team-deathmatch",
  "mode": "casual",
  "region": "eu-west",
  "partyId": "party-uuid-12345",
  "preferPartyVsParty": true
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "Queued to match successfully",
  "data": {
    "queueId": "queue-uuid-def456"
  },
  "errors": []
}
```

### Example 3: Private Match
**Request:**
```json
{
  "matchId": "custom-game",
  "mode": "private",
  "region": "asia-pacific"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "Queued to match successfully",
  "data": {
    "queueId": "queue-uuid-ghi789"
  },
  "errors": []
}
```

---

## Notes

- The player is automatically added to the matchmaking queue
- The `queueId` returned can be used to track queue status
- Use `matchmaking/cancel-match` to leave the queue
- Use `matchmaking/get-queue-status` to check queue position
- When a match is found, players receive a notification (via WebSocket or polling)
- For ranked matches with skill-based matchmaking enabled, MMR is tracked per user per match
- Region must be one of the supported regions configured for the match

---

## Error Scenarios

| Error | Description | Error Code |
|-------|-------------|------------|
| Matchmaking disabled | Matchmaking is disabled for this match | 1015 |
| Region not supported | The specified region is not supported for this match | 1015 |
| Single player match | Cannot queue for single player match | 1015 |
| Team validation failed | Party size or queue capacity doesn't meet team requirements | 1015 |

---

## Source Files

- **DTO**: `src/matchmaking/dto/find-match.dto.ts`
- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
