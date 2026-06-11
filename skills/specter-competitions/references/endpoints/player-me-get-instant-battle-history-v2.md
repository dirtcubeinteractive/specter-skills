# V2 API: `client/player/me/get-instant-battle-history`

**Endpoint:** `POST /v2/client/player/me/get-instant-battle-history`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionIds` | `string[]` | No | Filter by specific competition IDs |
| `scheduleStatuses` | `string[]` | No | Filter by schedule statuses (default: "in progress") |
| `attributes` | `string[]` | No | Additional attributes to include: "config", "match", "type", "sourceType" |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My InstantBattle list",
  "data": [
    {
      "uuid": "competition-internal-uuid",
      "id": "quick-match",
      "name": "Quick Match",
      "description": "Fast-paced instant battles",
      "iconUrl": "https://cdn.example.com/quick-match.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 2,
          "maxAttemptAllowed": 3,
          "maxEntryAllowed": 1,
          "status": "played",
          "score": 4500,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-15T23:59:59.000Z",
            "status": "in progress"
          }
        }
      ]
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of instant battle competition objects |
| `data[].uuid` | `string` | Competition internal unique identifier |
| `data[].id` | `string` | Competition ID (client-facing) |
| `data[].name` | `string` | Competition display name |
| `data[].description` | `string` | Competition description |
| `data[].iconUrl` | `string` | URL to competition icon |
| `data[].entryDetails` | `array` | Array of user's entry details |
| `entryDetails[].entryId` | `string` | Entry unique identifier |
| `entryDetails[].numberOfAttemptsLeft` | `number \| null` | Remaining attempts (null if unlimited) |
| `entryDetails[].maxAttemptAllowed` | `number \| null` | Maximum attempts allowed (null if unlimited) |
| `entryDetails[].maxEntryAllowed` | `number \| null` | Maximum entries allowed (null if unlimited) |
| `entryDetails[].status` | `string` | Entry status: "entered", "played", or "completed" |
| `entryDetails[].score` | `number \| null` | User's score (null if not played) |
| `entryDetails[].instanceSchedule` | `object` | Instance schedule details |
| `instanceSchedule.instanceId` | `string` | Instance unique identifier |
| `instanceSchedule.instanceStartDate` | `string` | ISO timestamp of instance start |
| `instanceSchedule.instanceEndDate` | `string` | ISO timestamp of instance end |
| `instanceSchedule.status` | `string` | Instance status |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `data[].config` | `object` | `"config"` | Competition configuration |
| `config.minPlayers` | `number` | `"config"` | Minimum players required |
| `config.maxPlayers` | `number` | `"config"` | Maximum players allowed |
| `data[].match` | `object` | `"match"` | Associated match details |
| `match.uuid` | `string` | `"match"` | Match internal ID |
| `match.id` | `string` | `"match"` | Match ID (client-facing) |
| `match.name` | `string` | `"match"` | Match name |
| `match.description` | `string` | `"match"` | Match description |
| `match.iconUrl` | `string` | `"match"` | Match icon URL |
| `match.minPlayers` | `number` | `"match"` | Match minimum players |
| `match.maxPlayers` | `number` | `"match"` | Match maximum players |
| `match.winCondition` | `object` | `"match"` | Win condition `{ id, name }` |
| `match.game` | `object` | `"match"` | Game `{ uuid, id }` |
| `match.formatType` | `object` | `"match"` | Format type `{ id, name }` |
| `match.outcomeType` | `object` | `"match"` | Outcome type `{ id, name }` |
| `data[].type` | `object` | `"type"` | Competition type `{ id, name }` |
| `data[].sourceType` | `object` | `"sourceType"` | Source type `{ id, name }` |

---

## Request/Response Examples

### Example 1: Get All Instant Battle History
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My InstantBattle list",
  "data": [
    {
      "uuid": "competition-uuid-1",
      "id": "quick-match",
      "name": "Quick Match",
      "description": "Fast-paced instant battles",
      "iconUrl": "https://cdn.example.com/quick-match.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 2,
          "maxAttemptAllowed": 3,
          "maxEntryAllowed": 1,
          "status": "played",
          "score": 4500,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-15T23:59:59.000Z",
            "status": "in progress"
          }
        }
      ]
    }
  ],
  "errors": []
}
```

### Example 2: Filter by Competition with Match Details
**Request:**
```json
{
  "competitionIds": ["quick-match"],
  "attributes": ["match", "config"],
  "limit": 20
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My InstantBattle list",
  "data": [
    {
      "uuid": "competition-uuid-1",
      "id": "quick-match",
      "name": "Quick Match",
      "description": "Fast-paced instant battles",
      "iconUrl": "https://cdn.example.com/quick-match.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 0,
          "maxAttemptAllowed": 3,
          "maxEntryAllowed": 1,
          "status": "completed",
          "score": 5200,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-15T23:59:59.000Z",
            "status": "in progress"
          }
        }
      ],
      "config": {
        "minPlayers": 2,
        "maxPlayers": 2
      },
      "match": {
        "uuid": "match-uuid-1",
        "id": "battle-1v1",
        "name": "1v1 Battle",
        "description": "Head-to-head battle",
        "iconUrl": "https://cdn.example.com/battle.png",
        "minPlayers": 2,
        "maxPlayers": 2,
        "winCondition": {
          "id": 1,
          "name": "Highest Score"
        },
        "game": {
          "uuid": "game-uuid-1",
          "id": "puzzle-game"
        },
        "formatType": {
          "id": 2,
          "name": "Multiplayer"
        },
        "outcomeType": {
          "id": 1,
          "name": "Score"
        }
      }
    }
  ],
  "errors": []
}
```

### Example 3: Filter by Schedule Status
**Request:**
```json
{
  "scheduleStatuses": ["completed"],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My InstantBattle list",
  "data": [
    {
      "uuid": "competition-uuid-1",
      "id": "quick-match",
      "name": "Quick Match",
      "description": "Fast-paced instant battles",
      "iconUrl": "https://cdn.example.com/quick-match.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": null,
          "maxAttemptAllowed": null,
          "maxEntryAllowed": 5,
          "status": "entered",
          "score": null,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-14T00:00:00.000Z",
            "instanceEndDate": "2024-01-14T23:59:59.000Z",
            "status": "completed"
          }
        }
      ]
    }
  ],
  "errors": []
}
```

### Example 4: No History (Empty Response)
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My InstantBattle list",
  "data": [],
  "errors": []
}
```

---

## Notes

- Returns instant battle history for the authenticated user (competitionFormatTypeMasterId = 3)
- Only returns competitions where the user has entry details
- `status` values: "entered" (not played), "played" (has attempts remaining), "completed" (all attempts used)
- `numberOfAttemptsLeft` is null when unlimited attempts are allowed
- Results are ordered by most recently updated competition first
- Use `attributes` to include additional details like match, config, type, or sourceType

---

## Source Files

- **DTO**: `src/competitions/dtos/get-my-instant-battle.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
