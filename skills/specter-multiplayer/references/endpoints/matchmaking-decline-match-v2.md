# V2 API: `client/matchmaking/decline-match`

**Endpoint:** `POST /v2/client/matchmaking/decline-match`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pendingMatchId` | `string` | **Yes** | The pending match ID to decline |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Match declined successfully",
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

## Request Examples

### Example 1: Decline a Pending Match
**Request:**
```json
{
  "pendingMatchId": "pending-match-uuid-12345"
}
```

---

## Notes

- Called when a player doesn't want to join a found match
- Declining cancels the match for all players in that pending match
- Other players are returned to the matchmaking queue
- The declining player is removed from the queue

---

## Source Files

- **DTO**: `src/matchmaking/dto/accept-match.dto.ts`
- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
