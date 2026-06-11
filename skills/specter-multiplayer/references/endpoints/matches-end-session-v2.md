# V2 API: `client/matches/end-session`

**Endpoint:** `POST /v2/client/matches/end-session`

**Authentication:** User Auth Guard Required

---

## Description

Ends a match session and submits the final score. This records the gameplay results and can trigger related achievements/tasks.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sessionId` | `string` | Yes | The session ID to end |
| `score` | `number` | Yes | The final score |
| `result` | `string` | No | Result outcome (e.g., "won", "lost", "draw") |
| `customParams` | `object` | No | Custom result parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Successfully ended match session",
  "data": {
    "matchSessionId": "session-uuid"
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Session End
**Request:**
```json
{
  "sessionId": "session-uuid",
  "score": 5000
}
```
**Effect:** Ends the session with the submitted score.

---

### Example 2: With Result and Custom Params
**Request:**
```json
{
  "sessionId": "session-uuid",
  "score": 5000,
  "result": "won",
  "customParams": {
    "enemiesDefeated": 25,
    "perfectRuns": 3,
    "bonusCollected": 500
  }
}
```
**Effect:** Ends session with detailed result data for analytics and achievements.

---

## Side Effects

- Updates leaderboard scores (if applicable)
- Triggers match-related tasks
- May grant rewards based on performance
- Updates player statistics

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| sessionId not provided | Validation error |
| score not provided | Validation error |
| Session not found | Session not found |
| Session already ended | Session already completed |
| Session expired | Session has timed out |

---

## Source Files

- **Controller**: `src/match-session/match-session.controller.ts:901-1062`
- **Service**: `src/match-session/match-session.service.ts`
