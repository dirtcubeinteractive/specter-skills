# V2 API: `client/matches/start-session`

**Endpoint:** `POST /v2/client/matches/start-session`

**Authentication:** User Auth Guard Required

---

## Description

Starts a match session. This initiates gameplay for a match, recording the start time and preparing for score submission.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchId` | `string` | Yes | The match type ID |
| `sessionId` | `string` | No | Optional session ID (auto-generated if not provided) |
| `customParams` | `object` | No | Custom parameters for the session |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Successfully started match session",
  "data": {
    "matchSessionId": "session-uuid"
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Session Start
**Request:**
```json
{
  "matchId": "match-123"
}
```
**Effect:** Starts a new match session for the specified match type.

---

### Example 2: With Custom Params
**Request:**
```json
{
  "matchId": "match-123",
  "customParams": {
    "difficulty": "hard",
    "gameMode": "survival"
  }
}
```
**Effect:** Starts a session with custom game parameters.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| matchId not provided | Validation error |
| Match not found | Match not found |
| Match not active | Match is not active |
| Session already active | User already has an active session |

---

## Source Files

- **Controller**: `src/match-session/match-session.controller.ts:232-347`
- **Service**: `src/match-session/match-session.service.ts`
