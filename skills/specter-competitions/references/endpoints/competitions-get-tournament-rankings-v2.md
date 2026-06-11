# V2 API: `client/competitions/get-tournament-rankings`

**Endpoint:** `POST /v2/client/competitions/get-tournament-rankings`

**Authentication:** User Auth Guard Required

---

## Description

Retrieves the current rankings/leaderboard for a tournament competition. Returns competition details, the current player's rank, and optionally all participants' rankings.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | Yes | The tournament competition ID |
| `instanceId` | `string` | Yes | The schedule instance ID |
| `attributes` | `string[]` | No | Optional attributes to include: `"rankings"`, `"totalRanks"` |
| `offset` | `number` | No | Pagination offset for rankings |
| `limit` | `number` | No | Pagination limit for rankings |

---

## Response Structure

### Success Response (Base)
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament rankings list",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "id": "tournament-123",
    "name": "Weekly Championship",
    "description": "Compete for the top spot",
    "iconUrl": "https://cdn.example.com/icon.png",
    "currentPlayerRanks": [
      {
        "rank": 5,
        "score": 8500,
        "entryId": "entry-uuid-123",
        "playerDetails": {
          "uuid": "user-uuid-123",
          "id": "user-123",
          "firstName": "John",
          "username": "john_doe",
          "lastName": "Doe",
          "displayName": "JohnDoe",
          "thumbUrl": "https://cdn.example.com/avatar.jpg"
        }
      }
    ]
  },
  "errors": []
}
```

### Success Response (With Rankings Attribute)
When `attributes` includes `"rankings"` and `"totalRanks"`:
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament rankings list",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "id": "tournament-123",
    "name": "Weekly Championship",
    "description": "Compete for the top spot",
    "iconUrl": "https://cdn.example.com/icon.png",
    "currentPlayerRanks": [
      {
        "rank": 5,
        "score": 8500,
        "entryId": "entry-uuid-123",
        "playerDetails": {
          "uuid": "user-uuid-123",
          "id": "user-123",
          "firstName": "John",
          "username": "john_doe",
          "lastName": "Doe",
          "displayName": "JohnDoe",
          "thumbUrl": "https://cdn.example.com/avatar.jpg"
        }
      }
    ],
    "rankings": [
      {
        "rank": 1,
        "score": 15000,
        "entryId": "entry-uuid-001",
        "playerDetails": {
          "uuid": "user-uuid-001",
          "id": "user-001",
          "firstName": "Alice",
          "username": "alice_champ",
          "lastName": "Smith",
          "displayName": "AliceChamp",
          "thumbUrl": "https://cdn.example.com/avatar1.jpg"
        }
      },
      {
        "rank": 2,
        "score": 12500,
        "entryId": "entry-uuid-002",
        "playerDetails": {
          "uuid": "user-uuid-002",
          "id": "user-002",
          "firstName": "Bob",
          "username": "bob_player",
          "lastName": "Jones",
          "displayName": "BobPlayer",
          "thumbUrl": "https://cdn.example.com/avatar2.jpg"
        }
      }
    ],
    "totalRanks": 50
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Rankings (Current Player Only)
**Request:**
```json
{
  "competitionId": "tournament-123",
  "instanceId": "instance-uuid"
}
```
**Effect:** Returns competition details and current player's ranking only.

---

### Example 2: With All Rankings
**Request:**
```json
{
  "competitionId": "tournament-123",
  "instanceId": "instance-uuid",
  "attributes": ["rankings", "totalRanks"]
}
```
**Effect:** Returns competition details, current player's ranking, all rankings, and total count.

---

### Example 3: Paginated Rankings
**Request:**
```json
{
  "competitionId": "tournament-123",
  "instanceId": "instance-uuid",
  "attributes": ["rankings"],
  "offset": 10,
  "limit": 20
}
```
**Effect:** Returns rankings 11-30.

---

## Response Fields

### Base Response Fields (Always Included)

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Competition UUID |
| `id` | `string` | Competition ID |
| `name` | `string` | Competition name |
| `description` | `string` | Competition description |
| `iconUrl` | `string` | Competition icon URL |
| `currentPlayerRanks` | `RankEntry[]` | Current user's ranking info |

### Conditional Fields (Based on Attributes)

| Field | Type | Condition | Description |
|-------|------|-----------|-------------|
| `rankings` | `RankEntry[]` | `"rankings"` in attributes | All participants' rankings (paginated) |
| `totalRanks` | `number` | `"totalRanks"` in attributes | Total number of ranked players |

### RankEntry Object

| Field | Type | Description |
|-------|------|-------------|
| `rank` | `number` | Player's rank position (uses DENSE_RANK) |
| `score` | `number` | Player's score |
| `entryId` | `string` | Competition entry ID |
| `playerDetails` | `object` | Player information |
| `playerDetails.uuid` | `string` | User UUID |
| `playerDetails.id` | `string` | User ID |
| `playerDetails.firstName` | `string` | User first name |
| `playerDetails.username` | `string` | User username |
| `playerDetails.lastName` | `string` | User last name |
| `playerDetails.displayName` | `string` | User display name |
| `playerDetails.thumbUrl` | `string` | User profile thumbnail URL |

---

## Ranking Order

The ranking order is determined by the leaderboard outcome type:
- **Time Trial**: Ascending order (lower score = better rank)
- **Other Types**: Descending order (higher score = better rank)

---

## Supported Attributes

| Attribute | Description |
|-----------|-------------|
| `rankings` | Include all participants' rankings in response |
| `totalRanks` | Include total count of ranked players |

---

## Error Cases

| Scenario | Error Code | Error Message |
|----------|------------|---------------|
| competitionId not provided | - | Validation error |
| instanceId not provided | - | Validation error |
| Competition not found | 1069 | Competition not found |
| Not a tournament | 1069 | Invalid competition format |

---

## Source Files

- **DTO**: `src/competitions/dtos/get-tournament-ranking.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts:798-822`
- **Service**: `src/competitions/competitions.service.ts:5019-5229`
