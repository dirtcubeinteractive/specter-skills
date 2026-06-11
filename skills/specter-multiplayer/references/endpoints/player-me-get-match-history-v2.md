# V2 API: `client/player/me/get-match-history`

**Endpoint:** `POST /v2/client/player/me/get-match-history`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `attributes` | `string[]` | No | Optional attributes to include in response. Available: `competition`, `playerDetails` |
| `matchSessionId` | `string` | No | Filter by a specific match session ID |
| `limit` | `number` | No | Number of match history entries to return |
| `offset` | `number` | No | Pagination offset |

---

## Response Structure

`data` is an **array** of match history entries for the authenticated user, ordered by `updated_at` descending.

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "My match history",
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
      "score": 100
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
      "score": 100,
      "rank": 1
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
| `data[].score` | `number \| null` | The user's outcome (score) from the session results |

---

## Request Examples

### Example 1: Basic Request
**Request:**
```json
{}
```
**Effect:** Returns the user's match history.

### Example 2: With All Attributes for a Single Session
**Request:**
```json
{
  "matchSessionId": "session-uuid-1",
  "attributes": ["competition", "playerDetails"]
}
```
**Effect:** Returns the entry for that session with competition info and all participants.

---

## Source Files

- **DTO**: `src/users/dto/get-my-match-history.dto.ts`
- **Controller**: `src/users/users.controller.ts:2757-2784`
- **Service**: `src/users/users.service.ts:8179-8336` (`getMatchHistoryV2`)
