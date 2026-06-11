# V2 API: `client/player/get-match-history`

**Endpoint:** `POST /v2/client/player/get-match-history`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | ID of the player whose match history to fetch |
| `attributes` | `string[]` | No | Optional attributes to include in response. Available: `competition`, `playerDetails` |
| `matchSessionId` | `string` | No | Filter by a specific match session ID |
| `limit` | `number` | No | Number of match history entries to return |
| `offset` | `number` | No | Pagination offset |

---

## Response Structure

`data` is an **array** of match history entries for the requested player, ordered by `updated_at` descending. Same entry shape as `client/player/me/get-match-history`.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "match history",
  "data": [
    {
      "uuid": "match-uuid-123",
      "id": "match-01",
      "name": "Deathmatch",
      "description": "Classic deathmatch mode",
      "iconUrl": "https://cdn.example.com/match.png",
      "game": {
        "uuid": "game-uuid-123",
        "id": "game-01",
        "name": "Space Shooter",
        "description": "A fast-paced shooter",
        "iconUrl": "https://cdn.example.com/game.png"
      },
      "matchSessionId": "session-uuid-1",
      "playedAt": "2024-12-09T06:34:28.683Z",
      "score": 85
    }
  ],
  "errors": []
}
```

---

## How Each Attribute Changes Response

### `attributes: ["competition"]`
Adds the competition the match session belonged to (or `null`):
```json
{
  ...base fields...,
  "competition": {
    "uuid": "competition-uuid",
    "id": "comp-01",
    "name": "Weekly Tournament",
    "description": "Weekly tournament event",
    "iconUrl": "https://cdn.example.com/comp.png"
  }
}
```

### `attributes: ["playerDetails"]`
Adds all participants of the match session with their scores and ranks:
```json
{
  ...base fields...,
  "playerDetails": [
    {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "firstName": "John",
      "lastName": "Doe",
      "username": "johndoe",
      "displayName": "PlayerOne",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "score": 85,
      "rank": 2
    }
  ]
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data[].uuid` | `string` | Match unique identifier (internal ID) |
| `data[].id` | `string` | Match ID (client-facing) |
| `data[].name` | `string` | Match name |
| `data[].description` | `string` | Match description |
| `data[].iconUrl` | `string` | Match logo URL |
| `data[].game` | `object` | Game info `{ uuid, id, name, description, iconUrl }` |
| `data[].matchSessionId` | `string` | Match session ID |
| `data[].playedAt` | `string` | Timestamp when the session entry was created |
| `data[].score` | `number \| null` | The target player's outcome (score) from the session results |

---

## Request Examples

### Example 1: Basic Request
**Request:**
```json
{
  "userId": "player-123"
}
```
**Effect:** Returns the match history of player `player-123`.

### Example 2: With Player Details
**Request:**
```json
{
  "userId": "player-123",
  "attributes": ["playerDetails"],
  "limit": 5
}
```
**Effect:** Returns the latest 5 entries with all match participants included.

---

## Notes

- Shares the same service method (`getMatchHistoryV2`) as `client/player/me/get-match-history`; the only difference is the target user comes from `payload.userId` instead of the bearer token.

---

## Source Files

- **DTO**: `src/users/dto/get-other-match-history.dto.ts`
- **Controller**: `src/users/users.controller.ts:2785-2814`
- **Service**: `src/users/users.service.ts:8179-8336` (`getMatchHistoryV2`)
