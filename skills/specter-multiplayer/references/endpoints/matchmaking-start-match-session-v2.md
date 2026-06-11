# V2 API: `client/matchmaking/start-match-session`

**Endpoint:** `POST /v2/client/matchmaking/start-match-session`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchSessionId` | `string` | No* | Existing match session ID to start |
| `matchId` | `string` | No* | Match ID to create and start a new session |
| `competitionId` | `string` | No | Competition ID if this is a competition match |
| `userInfo` | `UserInfo[]` | **Yes** | Array of users participating in the match (min 1) |
| `meta` | `object` | No | Additional metadata for the session |

*Either `matchSessionId` (to start existing) OR `matchId` (to create and start) must be provided.

### UserInfo Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | User ID |
| `entryId` | `string` | No | Competition entry ID (required if competitionId is provided) |
| `specterParams` | `object` | No | System parameters for task validation |
| `customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Successfully started match session",
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
| `matchSessionId` | `string` | Unique identifier for the match session |
| `slotId` | `string` | Slot ID (returned for instant battle competitions) |

---

## Request Examples

### Example 1: Start Existing Session
**Request:**
```json
{
  "matchSessionId": "match-session-uuid-12345",
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

### Example 2: Create and Start Session
**Request:**
```json
{
  "matchId": "battle-royale-1v1",
  "userInfo": [
    {
      "id": "user-uuid-1",
      "specterParams": {
        "skillLevel": "intermediate"
      },
      "customParams": {
        "loadout": "default"
      }
    },
    {
      "id": "user-uuid-2"
    }
  ],
  "meta": {
    "serverRegion": "us-east"
  }
}
```

---

## Notes

- This endpoint is typically called by the matchmaking system (not by players)
- Either starts an existing session or creates a new one and starts it
- Triggers `match_session_started` task validation for each user
- For competition matches, all users must have valid entry IDs

---

## Source Files

- **DTO**: `src/match-session/dto/start-match-session.dto.ts`
- **Controller**: `src/match-session/match-session.controller.ts`
- **Service**: `src/match-session/match-session.service.ts`
