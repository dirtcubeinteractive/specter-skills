# V2 API: `client/app/get-instant-battles`

**Endpoint:** `POST /v2/client/app/get-instant-battles`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `competitionIds` | `string[]` | Filter instant battles by specific competition IDs |
| `matchIds` | `string[]` | Filter instant battles by match IDs |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `scheduleStatuses` | `string[]` | Filter by schedule status (default: "in progress") |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `search` | `string` | Search instant battles by name (case-insensitive) |
| `includeTags` | `string[]` | Filter instant battles by tag names |

**Note:** Only one of `competitionIds`, `matchIds` should be used at a time.

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Instant Battles",
  "data": {
    "instantBattles": [...],
    "totalCount": 15,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each instant battle returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "instant-battle-123",
  "name": "Quick Match Challenge",
  "description": "Fast-paced 1v1 battle",
  "iconUrl": "https://cdn.example.com/battle-icon.png",
  "config": {
    "minPlayers": 2,
    "maxPlayers": 2,
    "maxEntryAllowed": 5,
    "maxAttemptAllowed": 1
  },
  "type": {
    "id": "type-uuid",
    "name": "Instant Battle"
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
    "firstInstanceEndDate": "2025-12-31T23:59:59.000Z",
    "intervalUnit": null,
    "intervalLength": null,
    "occurrences": null,
    "isRecurring": false,
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid",
      "status": "in progress",
      "instanceStartDate": "2025-01-01T00:00:00.000Z",
      "instanceEndDate": "2025-12-31T23:59:59.000Z"
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
      {"rank": 1, "percentage": 100}
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
      "price": 50,
      "discount": 0,
      "bonusCashAllowance": 25,
      "hostingFee": 5,
      "hostingFeeType": "percentage",
      "currencyDetails": {
        "uuid": "currency-uuid",
        "id": "currency-123",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold-icon.png",
        "rarity": null,
        "code": "GLD",
        "type": "soft"
      }
    }
  ]
}
```

---

### `attributes: ["unlockConditions"]`
Adds unlock requirements for the instant battle:
```json
{
  ...base fields...,
  "unlockConditions": [
    {
      "lockedLevelNo": 3,
      "unlockItem": {
        "uuid": "item-uuid",
        "id": "item-123",
        "name": "Battle Pass"
      },
      "unlockBundle": {
        "uuid": "bundle-uuid",
        "id": "bundle-123",
        "name": "Starter Pack"
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
  "tags": ["quick", "pvp", "casual"]
}
```

---

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "matchDuration": 60,
    "difficulty": "medium"
  }
}
```

---

## Combining Multiple Attributes

### Request
```json
{
  "attributes": ["schedule", "entryFees", "tags"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "instant-battle-123",
  "name": "Quick Match Challenge",
  "description": "Fast-paced 1v1 battle",
  "iconUrl": "https://cdn.example.com/battle-icon.png",
  "config": {
    "minPlayers": 2,
    "maxPlayers": 2,
    "maxEntryAllowed": 5,
    "maxAttemptAllowed": 1
  },
  "type": {"id": "...", "name": "Instant Battle"},
  "sourceType": {"id": "...", "name": "match"},
  "rankingMethod": {"id": "...", "name": "high_score"},
  "match": {...},
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2025-12-31T23:59:59.000Z",
    "intervalUnit": null,
    "intervalLength": null,
    "occurrences": null,
    "isRecurring": false,
    "currentInstanceSchedule": {...}
  },
  "entryFees": [...],
  "tags": ["quick", "pvp"]
}
```

---

## How Filters Affect Response

### `competitionIds` Filter
Returns only instant battles with the specified competition IDs.

**Request:**
```json
{
  "competitionIds": ["instant-battle-123", "instant-battle-456"]
}
```
**Effect:** Response contains only instant battles where `competitionId` matches.

---

### `matchIds` Filter
Returns instant battles associated with the specified matches.

**Request:**
```json
{
  "matchIds": ["match-123", "match-456"]
}
```
**Effect:** Response contains only instant battles linked to the specified matches.

---

### `search` Filter
Filters instant battles by name (case-insensitive partial match).

**Request:**
```json
{
  "search": "quick"
}
```
**Effect:** Returns instant battles where name contains "quick".

---

### `scheduleStatuses` Filter
Filters instant battles by their current schedule instance status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress"]
}
```
**Effect:** Returns instant battles with schedule instances in "in progress" status.

**Default:** "in progress"

---

### `includeTags` Filter
Filters instant battles that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["pvp", "quick"]
}
```
**Effect:** Returns instant battles tagged with "pvp" OR "quick".

**Note:** Requires `"tags"` in attributes array for tag filtering to work.

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 5,
  "limit": 10
}
```
**Effect:** Skips first 5 instant battles, returns next 10. Results are ordered by `updated_at DESC`.

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
**Response:** First 10 instant battles with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["schedule", "prizeDistribution", "entryFees", "unlockConditions", "tags", "meta"]
}
```
**Response:** First 10 instant battles with ALL optional fields included.

---

### Example 3: Active Battles for Specific Match
**Request:**
```json
{
  "matchIds": ["match-123"],
  "scheduleStatuses": ["in progress"],
  "attributes": ["entryFees", "schedule"]
}
```
**Response:** Active instant battles for match-123 with entry fees and schedule data.

---

## Source Files

- **DTO**: `src/competitions/dtos/get-client-instant-battles.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts:1734+`
