# V2 API: `client/competition/get-entries`

**Endpoint:** `POST /v2/client/competition/get-entries`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | **Yes** | The competition ID (client-facing) |
| `instanceId` | `string` | **Yes** | The competition instance/slot ID |
| `offset` | `number` | No | Pagination offset for entries (default: 0) |
| `limit` | `number` | No | Pagination limit for entries (default: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "competition": [
      {
        "uuid": "competition-internal-uuid",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "totalEntries": 150,
        "entries": [
          {
            "entryId": "entry-uuid-1",
            "playerDetails": {
              "uuid": "player-uuid-1",
              "id": "player-uuid-1",
              "firstName": "John",
              "username": "player123",
              "lastName": "Doe",
              "displayName": "Player One",
              "thumbUrl": "https://cdn.example.com/avatar.png"
            }
          },
          {
            "entryId": "entry-uuid-2",
            "playerDetails": {
              "uuid": "player-uuid-2",
              "id": "player-uuid-2",
              "firstName": "Jane",
              "username": "player456",
              "lastName": "Smith",
              "displayName": "Player Two",
              "thumbUrl": "https://cdn.example.com/avatar2.png"
            }
          }
        ]
      }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.competition` | `array` | Array of competition objects |
| `competition[].uuid` | `string` | Competition internal unique identifier |
| `competition[].id` | `string` | Competition ID (client-facing) |
| `competition[].name` | `string` | Competition display name |
| `competition[].description` | `string` | Competition description |
| `competition[].iconUrl` | `string` | URL to competition icon |
| `competition[].totalEntries` | `number` | Total number of entries in this competition instance |
| `competition[].entries` | `array` | Array of entry objects (paginated) |
| `entries[].entryId` | `string` | Entry unique identifier |
| `entries[].playerDetails` | `object` | Player information |
| `playerDetails.uuid` | `string` | Player internal unique identifier |
| `playerDetails.id` | `string` | Player ID (same as uuid) |
| `playerDetails.firstName` | `string` | Player's first name |
| `playerDetails.username` | `string` | Player's username |
| `playerDetails.lastName` | `string` | Player's last name |
| `playerDetails.displayName` | `string` | Player's display name |
| `playerDetails.thumbUrl` | `string` | URL to player's avatar |

---

## Request/Response Examples

### Example 1: Get Competition Entries
**Request:**
```json
{
  "competitionId": "weekly-tournament",
  "instanceId": "instance-uuid-456"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "competition": [
      {
        "uuid": "competition-uuid-1",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "totalEntries": 150,
        "entries": [
          {
            "entryId": "entry-uuid-1",
            "playerDetails": {
              "uuid": "player-uuid-1",
              "id": "player-uuid-1",
              "firstName": "John",
              "username": "player123",
              "lastName": "Doe",
              "displayName": "Player One",
              "thumbUrl": "https://cdn.example.com/avatar.png"
            }
          },
          {
            "entryId": "entry-uuid-2",
            "playerDetails": {
              "uuid": "player-uuid-2",
              "id": "player-uuid-2",
              "firstName": "Jane",
              "username": "player456",
              "lastName": "Smith",
              "displayName": "Player Two",
              "thumbUrl": "https://cdn.example.com/avatar2.png"
            }
          }
        ]
      }
    ]
  },
  "errors": []
}
```

### Example 2: Get Entries with Pagination
**Request:**
```json
{
  "competitionId": "weekly-tournament",
  "instanceId": "instance-uuid-456",
  "offset": 0,
  "limit": 50
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "competition": [
      {
        "uuid": "competition-uuid-1",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "totalEntries": 150,
        "entries": [
          {
            "entryId": "entry-uuid-1",
            "playerDetails": {
              "uuid": "player-uuid-1",
              "id": "player-uuid-1",
              "firstName": "John",
              "username": "player123",
              "lastName": "Doe",
              "displayName": "Player One",
              "thumbUrl": "https://cdn.example.com/avatar.png"
            }
          }
        ]
      }
    ]
  },
  "errors": []
}
```

### Example 3: Empty Entries
**Request:**
```json
{
  "competitionId": "new-tournament",
  "instanceId": "instance-uuid-789"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "competition": []
  },
  "errors": []
}
```

---

## Notes

- Returns entries for tournament-type competitions (competitionFormatTypeMasterId = 2)
- `totalEntries` shows the total count of entries before pagination
- `entries` array is paginated based on `offset` and `limit`
- Each entry includes detailed player information
- Entries are ordered by most recently updated first

---

## Source Files

- **DTO**: `src/competitions/dtos/get-competition-entries.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
