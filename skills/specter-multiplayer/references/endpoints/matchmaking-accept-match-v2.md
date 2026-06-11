# V2 API: `client/matchmaking/accept-match`

**Endpoint:** `POST /v2/client/matchmaking/accept-match`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `pendingMatchId` | `string` | **Yes** | The pending match ID to accept |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Match accepted successfully",
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

### Example 1: Accept a Pending Match
**Request:**
```json
{
  "pendingMatchId": "pending-match-uuid-12345"
}
```

---

## Notes

- Called when a match is found and the player confirms they want to join
- All players in the match must accept for the match session to start
- If a player doesn't accept within the timeout, the match is cancelled
- After all players accept, a match session is automatically created

---

## Source Files

- **DTO**: `src/matchmaking/dto/accept-match.dto.ts`
- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
