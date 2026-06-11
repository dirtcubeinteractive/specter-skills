# V2 API: `client/matches/create-session`

**Endpoint:** `POST /v2/client/matches/create-session`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchId` | `string` | **Yes** | The match ID to create a session for |
| `userInfo` | `UserInfo[]` | **Yes** | Array of users participating in the match (min 1) |
| `competitionId` | `string` | No | Competition ID if this is a competition match |

### UserInfo Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | User ID |
| `entryId` | `string` | No | Competition entry ID (required if competitionId is provided) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Match session successfully created",
  "data": {
    "matchSessionId": "match-session-uuid-12345",
    "slotId": "slot-uuid-67890"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `matchSessionId` | `string` | Unique identifier for the created match session |
| `slotId` | `string` | Slot ID (returned for instant battle competitions only) |

---

## Request Examples

### Example 1: Create Session for Regular Match
**Request:**
```json
{
  "matchId": "battle-royale-1v1",
  "userInfo": [
    {
      "id": "user-uuid-1"
    },
    {
      "id": "user-uuid-2"
    }
  ]
}
```

### Example 2: Create Session for Competition Match
**Request:**
```json
{
  "matchId": "tournament-match",
  "competitionId": "tournament-2024",
  "userInfo": [
    {
      "id": "user-uuid-1",
      "entryId": "entry-uuid-1"
    },
    {
      "id": "user-uuid-2",
      "entryId": "entry-uuid-2"
    }
  ]
}
```

---

## Validation Rules

- If `competitionId` is provided, all users must have `entryId`
- If any user has `entryId`, `competitionId` must be provided
- All users in `userInfo` must exist in the system

---

## Notes

- Creates a match session in "created" state
- Use `matches/start-session` to start the match
- Use `matches/end-session` to record results and end the match
- For instant battle competitions, a `slotId` is returned

---

## Source Files

- **DTO**: `src/match-session/dto/get-match-session.dto.ts`
- **Controller**: `src/match-session/match-session.controller.ts`
- **Service**: `src/match-session/match-session.service.ts`
