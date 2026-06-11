# V2 API: `client/competitions/get-tournament-results`

**Endpoint:** `POST /v2/client/competitions/get-tournament-results`

**Authentication:** User Auth Guard Required

---

## Description

Retrieves the final results of a completed tournament competition. Unlike rankings (which show current standings), results show final standings with reward details for each participant.

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
  "message": "Tournament result list",
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
        },
        "rewardDetails": {
          "currencies": [
            {
              "uuid": "currency-uuid",
              "id": "gold-coins",
              "name": "Gold Coins",
              "amount": 500
            }
          ],
          "items": [],
          "bundles": [],
          "progressionMarkers": []
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
  "message": "Tournament result list",
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
        },
        "rewardDetails": {
          "currencies": [{"id": "gold-coins", "amount": 500}],
          "items": [],
          "bundles": [],
          "progressionMarkers": []
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
        },
        "rewardDetails": {
          "currencies": [{"id": "gold-coins", "amount": 5000}],
          "items": [{"id": "trophy-gold", "amount": 1}],
          "bundles": [],
          "progressionMarkers": []
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
        },
        "rewardDetails": {
          "currencies": [{"id": "gold-coins", "amount": 3000}],
          "items": [{"id": "trophy-silver", "amount": 1}],
          "bundles": [],
          "progressionMarkers": []
        }
      }
    ],
    "totalRanks": 50
  },
  "errors": []
}
```

### No Rewards Response
When a player didn't receive any rewards:
```json
{
  "currentPlayerRanks": [
    {
      "rank": 50,
      "score": 100,
      "entryId": "entry-uuid",
      "playerDetails": {...},
      "rewardDetails": null
    }
  ]
}
```

---

## Request Examples

### Example 1: Basic Results (Current Player Only)
**Request:**
```json
{
  "competitionId": "tournament-123",
  "instanceId": "instance-uuid"
}
```
**Effect:** Returns competition details and current player's result with rewards.

---

### Example 2: With All Results
**Request:**
```json
{
  "competitionId": "tournament-123",
  "instanceId": "instance-uuid",
  "attributes": ["rankings", "totalRanks"]
}
```
**Effect:** Returns all participants' results with reward details.

---

### Example 3: Paginated Results
**Request:**
```json
{
  "competitionId": "tournament-123",
  "instanceId": "instance-uuid",
  "attributes": ["rankings"],
  "offset": 0,
  "limit": 10
}
```
**Effect:** Returns first 10 results.

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
| `currentPlayerRanks` | `ResultEntry[]` | Current user's result info |

### Conditional Fields (Based on Attributes)

| Field | Type | Condition | Description |
|-------|------|-----------|-------------|
| `rankings` | `ResultEntry[]` | `"rankings"` in attributes | All participants' results (paginated) |
| `totalRanks` | `number` | `"totalRanks"` in attributes | Total number of ranked players |

### ResultEntry Object

| Field | Type | Description |
|-------|------|-------------|
| `rank` | `number` | Player's final rank position |
| `score` | `number` | Player's final score |
| `entryId` | `string` | Competition entry ID |
| `playerDetails` | `object` | Player information |
| `playerDetails.uuid` | `string` | User UUID |
| `playerDetails.id` | `string` | User ID |
| `playerDetails.firstName` | `string` | User first name |
| `playerDetails.username` | `string` | User username |
| `playerDetails.lastName` | `string` | User last name |
| `playerDetails.displayName` | `string` | User display name |
| `playerDetails.thumbUrl` | `string` | User profile thumbnail URL |
| `rewardDetails` | `object \| null` | Rewards won based on rank (null if no rewards) |

### RewardDetails Object

| Field | Type | Description |
|-------|------|-------------|
| `currencies` | `array` | Currencies won |
| `items` | `array` | Items won |
| `bundles` | `array` | Bundles won |
| `progressionMarkers` | `array` | Progression markers won |

---

## Difference from Rankings

| Aspect | Rankings | Results |
|--------|----------|---------|
| **When to use** | During active tournament | After tournament ends |
| **Includes rewards** | No | Yes (`rewardDetails`) |
| **Data freshness** | Real-time standings | Final standings |

---

## Supported Attributes

| Attribute | Description |
|-----------|-------------|
| `rankings` | Include all participants' results in response |
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

- **DTO**: `src/competitions/dtos/get-tournament-result.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts:824-845`
- **Service**: `src/competitions/competitions.service.ts:5232-5453`
