# V2 API: `client/competitions/get-instantbattle-results`

**Endpoint:** `POST /v2/client/competitions/get-instantbattle-results`

**Authentication:** User Auth Guard Required

---

## Description

Retrieves the results of an instant battle competition for the authenticated user. Returns competition details, the current player's rankings, and optionally all participants' rankings.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | Yes | The instant battle competition ID |
| `entryId` | `string` | Yes | The entry ID to get results for |
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
  "message": "Instant battle result list",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "id": "instant-battle-123",
    "name": "Quick Battle Tournament",
    "description": "Fast-paced instant battle",
    "iconUrl": "https://cdn.example.com/icon.png",
    "currentPlayerRanks": [
      {
        "playerDetails": {
          "uuid": "user-uuid-123",
          "id": "user-123",
          "firstName": "John",
          "username": "john_doe",
          "lastName": "Doe",
          "displayName": "JohnDoe",
          "thumbUrl": "https://cdn.example.com/avatar.jpg"
        },
        "score": 1000,
        "rank": 1
      }
    ]
  },
  "errors": []
}
```

### Success Response (With Rankings Attribute)
When `attributes` includes `"rankings"`:
```json
{
  "status": "success",
  "code": 200,
  "message": "Instant battle result list",
  "data": {
    "uuid": "550e8400-e29b-41d4-a716-446655440000",
    "id": "instant-battle-123",
    "name": "Quick Battle Tournament",
    "description": "Fast-paced instant battle",
    "iconUrl": "https://cdn.example.com/icon.png",
    "currentPlayerRanks": [
      {
        "playerDetails": {
          "uuid": "user-uuid-123",
          "id": "user-123",
          "firstName": "John",
          "username": "john_doe",
          "lastName": "Doe",
          "displayName": "JohnDoe",
          "thumbUrl": "https://cdn.example.com/avatar.jpg"
        },
        "score": 1000,
        "rank": 1
      }
    ],
    "rankings": [
      {
        "playerDetails": {
          "uuid": "user-uuid-123",
          "id": "user-123",
          "firstName": "John",
          "username": "john_doe",
          "lastName": "Doe",
          "displayName": "JohnDoe",
          "thumbUrl": "https://cdn.example.com/avatar.jpg"
        },
        "score": 1000,
        "rank": 1
      },
      {
        "playerDetails": {
          "uuid": "user-uuid-456",
          "id": "user-456",
          "firstName": "Jane",
          "username": "jane_doe",
          "lastName": "Doe",
          "displayName": "JaneDoe",
          "thumbUrl": "https://cdn.example.com/avatar2.jpg"
        },
        "score": 950,
        "rank": 2
      }
    ],
    "totalRanks": 2
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Results
**Request:**
```json
{
  "competitionId": "instant-battle-123",
  "entryId": "entry-uuid"
}
```
**Effect:** Returns competition details and current player's rankings only.

---

### Example 2: With All Rankings
**Request:**
```json
{
  "competitionId": "instant-battle-123",
  "entryId": "entry-uuid",
  "attributes": ["rankings", "totalRanks"]
}
```
**Effect:** Returns competition details, current player's rankings, all participants' rankings, and total rank count.

---

### Example 3: Paginated Rankings
**Request:**
```json
{
  "competitionId": "instant-battle-123",
  "entryId": "entry-uuid",
  "attributes": ["rankings"],
  "offset": 0,
  "limit": 10
}
```
**Effect:** Returns first 10 rankings.

---

## Response Fields

### Base Response Fields (Always Included)

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Instant battle UUID |
| `id` | `string` | Instant battle competition ID |
| `name` | `string` | Instant battle name |
| `description` | `string` | Instant battle description |
| `iconUrl` | `string` | Instant battle icon URL |
| `currentPlayerRanks` | `PlayerResult[]` | Current user's results |

### Conditional Fields (Based on Attributes)

| Field | Type | Condition | Description |
|-------|------|-----------|-------------|
| `rankings` | `PlayerResult[]` | `"rankings"` in attributes | All participants' results |
| `totalRanks` | `number` | `"totalRanks"` in attributes | Total number of ranked players |

### PlayerResult Object

| Field | Type | Description |
|-------|------|-------------|
| `playerDetails` | `object` | Player information |
| `playerDetails.uuid` | `string` | User UUID |
| `playerDetails.id` | `string` | User ID |
| `playerDetails.firstName` | `string` | User first name |
| `playerDetails.username` | `string` | User username |
| `playerDetails.lastName` | `string` | User last name |
| `playerDetails.displayName` | `string` | User display name |
| `playerDetails.thumbUrl` | `string` | User profile thumbnail URL |
| `score` | `number` | Player's score/outcome |
| `rank` | `number` | Player's rank position |

---

## Supported Attributes

| Attribute | Description |
|-----------|-------------|
| `rankings` | Include all participants' rankings in response |
| `totalRanks` | Include total count of ranked players |

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| competitionId not provided | Validation error |
| entryId not provided | Validation error |
| Competition not found | Competition not found |
| Not an instant battle | Invalid competition type |
| Entry not found | Entry not found |

---

## Source Files

- **DTO**: `src/competitions/dtos/get-ib-result.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts:847-870`
- **Service**: `src/competitions/competitions.service.ts:5455-5536`
