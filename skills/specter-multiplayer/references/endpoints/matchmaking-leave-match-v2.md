# V2 API: `client/matchmaking/leave-match`

**Endpoint:** `POST /v2/client/matchmaking/leave-match`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchSessionId` | `string` | **Yes** | The match session ID to leave |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Match left successfully",
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

### Example 1: Leave an Active Match
**Request:**
```json
{
  "matchSessionId": "match-session-uuid-12345"
}
```

---

## Notes

- Used to leave an active match session
- The player is removed from the match session
- Other players in the match are notified
- This may trigger penalties in ranked matches (depending on game configuration)
- Different from `cancel-match` which is used before a match session is created

---

## Source Files

- **DTO**: `src/matchmaking/dto/leave-match.dto.ts`
- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
