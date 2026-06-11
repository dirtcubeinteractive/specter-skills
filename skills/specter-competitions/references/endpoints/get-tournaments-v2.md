# V2 API: `client/app/get-tournaments`

**Endpoint:** `POST /v2/client/app/get-tournaments`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `competitionIds` | `string[]` | Filter tournaments by specific competition IDs |
| `matchIds` | `string[]` | Filter tournaments by match IDs |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `scheduleStatuses` | `string[]` | Filter by schedule status (default: "in progress") |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `search` | `string` | Search tournaments by name (case-insensitive) |
| `includeTags` | `string[]` | Filter tournaments by tag names |

**Note:** Only one of `competitionIds`, `matchIds` should be used at a time.

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "tournaments": [...],
    "totalCount": 25,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each tournament returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "tournament-123",
  "name": "Weekly Championship",
  "description": "Compete for the top spot",
  "iconUrl": "https://cdn.example.com/tournament-icon.png",
  "config": {
    "minPlayers": 8,
    "maxPlayers": 64,
    "maxEntryAllowed": 1,
    "maxAttemptAllowed": 3
  },
  "type": {
    "id": "type-uuid",
    "name": "Tournament"
  },
  "sourceType": {
    "id": "source-uuid",
    "name": "match"
  },
  "rankingMethod": {
    "id": "ranking-uuid",
    "name": "high_score"
  },
  "match": {
    "uuid": "match-uuid",
    "id": "match-123",
    "name": "1v1 Duel",
    "description": "Quick match",
    "iconUrl": "https://cdn.example.com/match-icon.png",
    "winCondition": {
      "id": "condition-uuid",
      "name": "Higher Score"
    },
    "outcomeType": {
      "id": "outcome-uuid",
      "name": "Win/Lose"
    }
  }
}
```

---

## How Each Attribute Changes Response

### `attributes: ["schedule"]`
Adds schedule details with current instance information:
```json
{
  ...base fields...,
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2025-01-01T23:59:59.000Z",
    "intervalUnit": "daily",
    "intervalLength": 1,
    "occurrences": 365,
    "isRecurring": true,
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid",
      "status": "in progress",
      "instanceStartDate": "2025-12-01T00:00:00.000Z",
      "instanceEndDate": "2025-12-01T23:59:59.000Z"
    }
  }
}
```

---

### `attributes: ["prizeDistribution"]`
Adds prize distribution rules:
```json
{
  ...base fields...,
  "prizeDistribution": {
    "rules": [
      {"rank": 1, "percentage": 50},
      {"rank": 2, "percentage": 30},
      {"rank": 3, "percentage": 20}
    ]
  }
}
```

---

### `attributes: ["entryFees"]`
Adds entry fee information with currency details:
```json
{
  ...base fields...,
  "entryFees": [
    {
      "priceType": "fixed",
      "price": 100,
      "discount": 0,
      "bonusCashAllowance": 50,
      "hostingFee": 10,
      "hostingFeeType": "percentage",
      "currencyDetails": {
        "uuid": "currency-uuid",
        "id": "currency-123",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold-icon.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        },
        "code": "GLD",
        "type": "soft"
      }
    }
  ]
}
```

---

### `attributes: ["unlockConditions"]`
Adds unlock requirements for the tournament:
```json
{
  ...base fields...,
  "unlockConditions": [
    {
      "lockedLevelNo": 5,
      "unlockItem": {
        "uuid": "item-uuid",
        "id": "item-123",
        "name": "VIP Pass"
      },
      "unlockBundle": {
        "uuid": "bundle-uuid",
        "id": "bundle-123",
        "name": "Premium Bundle"
      },
      "unlockProgressionSystem": {
        "uuid": "level-uuid",
        "id": "level-system-123",
        "name": "Player Level"
      }
    }
  ]
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["featured", "competitive", "daily"]
}
```

---

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "customField1": "value1",
    "tournamentTier": "gold"
  }
}
```

---

## Combining Multiple Attributes

### Request
```json
{
  "attributes": ["schedule", "entryFees", "tags", "prizeDistribution"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "tournament-123",
  "name": "Weekly Championship",
  "description": "Compete for the top spot",
  "iconUrl": "https://cdn.example.com/tournament-icon.png",
  "config": {
    "minPlayers": 8,
    "maxPlayers": 64,
    "maxEntryAllowed": 1,
    "maxAttemptAllowed": 3
  },
  "type": {"id": "...", "name": "Tournament"},
  "sourceType": {"id": "...", "name": "match"},
  "rankingMethod": {"id": "...", "name": "high_score"},
  "match": {...},
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2025-01-01T23:59:59.000Z",
    "intervalUnit": "daily",
    "intervalLength": 1,
    "occurrences": 365,
    "isRecurring": true,
    "currentInstanceSchedule": {...}
  },
  "entryFees": [...],
  "prizeDistribution": {
    "rules": [...]
  },
  "tags": ["featured", "competitive"]
}
```

---

## How Filters Affect Response

### `competitionIds` Filter
Returns only tournaments with the specified competition IDs.

**Request:**
```json
{
  "competitionIds": ["tournament-123", "tournament-456"]
}
```
**Effect:** Response contains only tournaments where `competitionId` matches one of the provided IDs.

---

### `matchIds` Filter
Returns tournaments associated with the specified matches.

**Request:**
```json
{
  "matchIds": ["match-123", "match-456"]
}
```
**Effect:** Response contains only tournaments linked to the specified matches.

---

### `search` Filter
Filters tournaments by name (case-insensitive partial match).

**Request:**
```json
{
  "search": "championship"
}
```
**Effect:** Returns tournaments where name contains "championship".

---

### `scheduleStatuses` Filter
Filters tournaments by their current schedule instance status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress", "upcoming"]
}
```
**Effect:** Returns tournaments with schedule instances in specified statuses.

**Default:** "in progress"

---

### `includeTags` Filter
Filters tournaments that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["featured", "daily"]
}
```
**Effect:** Returns tournaments tagged with "featured" OR "daily".

**Note:** Requires `"tags"` in attributes array for tag filtering to work.

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 0,
  "limit": 20
}
```
**Effect:** Returns first 20 tournaments. Results are ordered by `updated_at DESC`.

**Defaults:**
- `offset`: 0
- `limit`: 10

---

## Complete Request/Response Examples

### Example 1: Minimal Request
**Request:**
```json
{}
```
**Response:** First 10 tournaments with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["schedule", "prizeDistribution", "entryFees", "unlockConditions", "tags", "meta"]
}
```
**Response:** First 10 tournaments with ALL optional fields included.

---

### Example 3: Active Tournaments with Entry Fees
**Request:**
```json
{
  "scheduleStatuses": ["in progress"],
  "attributes": ["schedule", "entryFees"],
  "limit": 5
}
```
**Response:** First 5 active tournaments with schedule and entry fee information.

---

## Source Files

- **DTO**: `src/competitions/dtos/get-client-tournaments.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts:1223-1732`
