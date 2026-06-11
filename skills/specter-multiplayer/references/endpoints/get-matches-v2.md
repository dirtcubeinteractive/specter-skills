# V2 API: `client/app/get-matches`

**Endpoint:** `POST /v2/client/app/get-matches`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `matchIds` | `string[]` | Filter matches by specific match IDs |
| `gameIds` | `string[]` | Filter matches by game IDs (cannot use with matchIds) |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `search` | `string` | Search matches by name (case-insensitive) |
| `includeTags` | `string[]` | Filter matches by tag names |

**Important:** You cannot use both `matchIds` and `gameIds` in the same request. Use one or the other.

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Matches",
  "data": {
    "matches": [...],
    "totalCount": 25,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each match returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "match-123",
  "name": "1v1 Duel",
  "description": "Quick 1v1 match",
  "iconUrl": "https://cdn.example.com/match-icon.png",
  "game": {
    "uuid": "game-uuid",
    "id": "game-123",
    "name": "Game Name",
    "description": "Game description",
    "iconUrl": "https://cdn.example.com/game-icon.png"
  },
  "minPlayers": 2,
  "maxPlayers": 2,
  "formatType": {
    "id": "format-uuid",
    "name": "Versus"
  },
  "outcomeType": {
    "id": "outcome-uuid",
    "name": "Win/Lose"
  },
  "winCondition": {
    "id": "condition-uuid",
    "name": "Higher Score"
  }
}
```

---

## How Each Attribute Changes Response

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "customField1": "value1",
    "customField2": 123
  }
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["ranked", "competitive", "pvp"]
}
```

---

### `attributes: ["leaderboards"]`
Adds associated leaderboards array:
```json
{
  ...base fields...,
  "leaderboards": [
    {
      "uuid": "leaderboard-uuid-1",
      "id": "leaderboard-123",
      "name": "Weekly Leaderboard",
      "description": "Top players this week",
      "iconUrl": "https://cdn.example.com/leaderboard-icon.png"
    },
    {
      "uuid": "leaderboard-uuid-2",
      "id": "leaderboard-456",
      "name": "All-Time Best",
      "description": "Best scores ever",
      "iconUrl": "https://cdn.example.com/leaderboard-icon2.png"
    }
  ]
}
```

---

### `attributes: ["competitions"]`
Adds associated competitions array:
```json
{
  ...base fields...,
  "competitions": [
    {
      "uuid": "competition-uuid-1",
      "id": "competition-123",
      "name": "Summer Tournament",
      "description": "Annual summer championship",
      "iconUrl": "https://cdn.example.com/competition-icon.png"
    }
  ]
}
```

---

### `attributes: ["config"]`
Adds match configuration object with matchmaking settings:
```json
{
  ...base fields...,
  "config": {
    "matchmaking": {
      "enabled": true,
      "mode": "ranked"
    },
    "runtime": {
      "timeout": 300,
      "maxDuration": 600
    },
    "skill": {
      "enabled": true,
      "algorithm": "elo"
    },
    "queue": {
      "maxWaitTime": 60,
      "priorityEnabled": true
    },
    "priority": {
      "vipBoost": 1.5
    },
    "party": {
      "enabled": true,
      "maxSize": 4
    },
    "team": {
      "size": 2,
      "balanced": true
    },
    "orchestration": {
      "serverType": "dedicated"
    },
    "crossRegionEnabled": true,
    "regions": [
      {
        "id": "region-uuid-1",
        "name": "US East",
        "code": "us-east-1"
      },
      {
        "id": "region-uuid-2",
        "name": "EU West",
        "code": "eu-west-1"
      }
    ]
  }
}
```

---

## Combining Multiple Attributes

### Request
```json
{
  "attributes": ["tags", "leaderboards", "config"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "match-123",
  "name": "1v1 Duel",
  "description": "Quick 1v1 match",
  "iconUrl": "https://cdn.example.com/match-icon.png",
  "game": {
    "uuid": "game-uuid",
    "id": "game-123",
    "name": "Game Name",
    "description": "Game description",
    "iconUrl": "https://cdn.example.com/game-icon.png"
  },
  "minPlayers": 2,
  "maxPlayers": 2,
  "formatType": {"id": "...", "name": "Versus"},
  "outcomeType": {"id": "...", "name": "Win/Lose"},
  "winCondition": {"id": "...", "name": "Higher Score"},
  "tags": ["ranked", "competitive"],
  "leaderboards": [
    {
      "uuid": "leaderboard-uuid",
      "id": "leaderboard-123",
      "name": "Weekly Leaderboard",
      "description": "Top players",
      "iconUrl": "https://..."
    }
  ],
  "config": {
    "matchmaking": {...},
    "runtime": {...},
    "skill": {...},
    "queue": {...},
    "priority": {...},
    "party": {...},
    "team": {...},
    "orchestration": {...},
    "crossRegionEnabled": true,
    "regions": [...]
  }
}
```

---

## How Filters Affect Response

### `matchIds` Filter
Returns only matches with the specified IDs.

**Request:**
```json
{
  "matchIds": ["match-123", "match-456"]
}
```
**Effect:** Response contains only matches where `matchId` matches one of the provided IDs.

---

### `gameIds` Filter
Returns matches belonging to the specified games.

**Request:**
```json
{
  "gameIds": ["game-123", "game-456"]
}
```
**Effect:** Response contains only matches associated with the specified games.

**Note:** Cannot be used together with `matchIds`. Use one or the other.

---

### `search` Filter
Filters matches by name (case-insensitive partial match).

**Request:**
```json
{
  "search": "duel"
}
```
**Effect:** Returns matches where name contains "duel" (e.g., "1v1 Duel", "Duel Arena").

---

### `includeTags` Filter
Filters matches that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["ranked", "competitive"]
}
```
**Effect:** Returns matches tagged with "ranked" OR "competitive".

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 10,
  "limit": 5
}
```
**Effect:** Skips first 10 matches, returns next 5 matches. Results are ordered by `updated_at DESC`.

**Defaults:**
- `offset`: 0
- `limit`: 10

---

## Combining Filters and Attributes

### Request
```json
{
  "gameIds": ["game-123"],
  "search": "tournament",
  "includeTags": ["ranked"],
  "attributes": ["tags", "leaderboards"],
  "offset": 0,
  "limit": 10
}
```

### Effect
1. Filters to matches for game-123
2. Filters to matches with "tournament" in name
3. Filters to matches with "ranked" tag
4. Returns first 10 results
5. Each match includes base fields + tags + leaderboards

---

## Complete Request/Response Examples

### Example 1: Minimal Request
**Request:**
```json
{}
```
**Response:** First 10 matches with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["meta", "tags", "leaderboards", "competitions", "config"]
}
```
**Response:** First 10 matches with ALL optional fields included.

---

### Example 3: Specific Match with Config
**Request:**
```json
{
  "matchIds": ["match-123"],
  "attributes": ["config"]
}
```
**Response:** Only match-123 with full configuration data.

---

## Source Files

- **DTO**: `src/matches/dtos/get-client-matches.v2.dto.ts`
- **Controller**: `src/matches/matches.controller.ts:208-250`
- **Service**: `src/matches/matches.service.ts:735-961`
