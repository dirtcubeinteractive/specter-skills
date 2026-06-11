# V2 API: `client/player/me/get-tournament-history`

**Endpoint:** `POST /v2/client/player/me/get-tournament-history`

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
  "message": "My Tournaments list",
  "data": [
    {
      "uuid": "competition-internal-uuid",
      "id": "weekly-tournament",
      "name": "Weekly Championship",
      "description": "Compete for weekly prizes",
      "iconUrl": "https://cdn.example.com/tournament.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 2,
          "status": "played",
          "score": 15000,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-21T23:59:59.000Z",
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
| `data` | `array` | Array of tournament competition objects |
| `data[].uuid` | `string` | Competition internal unique identifier |
| `data[].id` | `string` | Competition ID (client-facing) |
| `data[].name` | `string` | Competition display name |
| `data[].description` | `string` | Competition description |
| `data[].iconUrl` | `string` | URL to competition icon |
| `data[].entryDetails` | `array` | Array of user's entry details |
| `entryDetails[].entryId` | `string` | Entry unique identifier |
| `entryDetails[].numberOfAttemptsLeft` | `number \| null` | Remaining attempts (null if unlimited) |
| `entryDetails[].status` | `string` | Entry status: "entered", "played", or "completed" |
| `entryDetails[].score` | `number` | User's score (0 if not played) |
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
| `config.maxEntriesAllowed` | `number \| null` | `"config"` | Maximum entries allowed |
| `config.maxAttemptsAllowed` | `number \| null` | `"config"` | Maximum attempts allowed |
| `data[].match` | `object` | `"match"` | Associated match details |
| `match.uuid` | `string` | `"match"` | Match internal ID |
| `match.id` | `string` | `"match"` | Match ID (client-facing) |
| `match.name` | `string` | `"match"` | Match name |
| `match.description` | `string` | `"match"` | Match description |
| `match.iconUrl` | `string` | `"match"` | Match icon URL |
| `match.winCondition` | `object` | `"match"` | Win condition `{ id, name }` |
| `data[].type` | `object` | `"type"` | Competition type `{ id, name }` |
| `data[].sourceType` | `object` | `"sourceType"` | Source type `{ id, name }` |

---

## Request/Response Examples

### Example 1: Get All Tournament History
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My Tournaments list",
  "data": [
    {
      "uuid": "competition-uuid-1",
      "id": "weekly-tournament",
      "name": "Weekly Championship",
      "description": "Compete for weekly prizes",
      "iconUrl": "https://cdn.example.com/tournament.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 2,
          "status": "played",
          "score": 15000,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-21T23:59:59.000Z",
            "status": "in progress"
          }
        }
      ]
    }
  ],
  "errors": []
}
```

### Example 2: Filter by Status with Config
**Request:**
```json
{
  "scheduleStatuses": ["completed"],
  "attributes": ["config"],
  "limit": 20
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My Tournaments list",
  "data": [
    {
      "uuid": "competition-uuid-1",
      "id": "weekly-tournament",
      "name": "Weekly Championship",
      "description": "Compete for weekly prizes",
      "iconUrl": "https://cdn.example.com/tournament.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 0,
          "status": "completed",
          "score": 18500,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-08T00:00:00.000Z",
            "instanceEndDate": "2024-01-14T23:59:59.000Z",
            "status": "completed"
          }
        }
      ],
      "config": {
        "minPlayers": 10,
        "maxPlayers": 100,
        "maxEntriesAllowed": 1,
        "maxAttemptsAllowed": 3
      }
    }
  ],
  "errors": []
}
```

### Example 3: Get History with All Attributes
**Request:**
```json
{
  "attributes": ["config", "match", "type", "sourceType"],
  "limit": 5
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My Tournaments list",
  "data": [
    {
      "uuid": "competition-uuid-1",
      "id": "weekly-tournament",
      "name": "Weekly Championship",
      "description": "Compete for weekly prizes",
      "iconUrl": "https://cdn.example.com/tournament.png",
      "entryDetails": [
        {
          "entryId": "entry-uuid-123",
          "numberOfAttemptsLeft": 1,
          "status": "played",
          "score": 12000,
          "instanceSchedule": {
            "instanceId": "instance-uuid-456",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-21T23:59:59.000Z",
            "status": "in progress"
          }
        }
      ],
      "config": {
        "minPlayers": 10,
        "maxPlayers": 100,
        "maxEntriesAllowed": 1,
        "maxAttemptsAllowed": 3
      },
      "match": {
        "uuid": "match-uuid-1",
        "id": "puzzle-challenge",
        "name": "Puzzle Challenge",
        "description": "Solve puzzles for points",
        "iconUrl": "https://cdn.example.com/puzzle.png",
        "winCondition": {
          "id": 1,
          "name": "Highest Score"
        }
      },
      "type": {
        "id": 2,
        "name": "Tournament"
      },
      "sourceType": {
        "id": 1,
        "name": "Game"
      }
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
  "message": "My Tournaments list",
  "data": [],
  "errors": []
}
```

---

## Notes

- Returns tournament history for the authenticated user (competitionFormatTypeMasterId = 2)
- Only returns competitions where the user has entry details
- `status` values: "entered" (not played), "played" (has attempts remaining), "completed" (all attempts used)
- `numberOfAttemptsLeft` is null when unlimited attempts are allowed
- Results are ordered by most recently updated competition first
- Use `attributes` to include additional details like match, config, type, or sourceType

---

## Source Files

- **DTO**: `src/competitions/dtos/get-my-tournament.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
