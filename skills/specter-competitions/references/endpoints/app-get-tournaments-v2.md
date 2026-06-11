# V2 API: `client/app/get-tournaments`

**Endpoint:** `POST /v2/client/app/get-tournaments`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionIds` | `string[]` | No | Filter by specific competition IDs |
| `matchIds` | `string[]` | No | Filter by specific match IDs |
| `attributes` | `string[]` | No | Attributes to include in response |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `includeTags` | `string[]` | No | Filter tournaments by tags |
| `search` | `string` | No | Search keyword for name |
| `scheduleStatuses` | `string[]` | No | Filter by schedule statuses |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `schedule` | Schedule information | `schedule: { firstInstanceStartDate, currentInstanceSchedule, ... }` |
| `entryFees` | Entry fee details | `entryFees: [{ priceType, price, currencyDetails, ... }]` |
| `prizeDistribution` | Prize distribution rules | `prizeDistribution: { rules }` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `unlockConditions` | Unlock requirements | `unlockConditions: [{ unlockItem, unlockBundle, unlockProgressionSystem }]` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "tournaments": [
      {
        "uuid": "tournament-internal-uuid",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "config": {
          "minPlayers": 2,
          "maxPlayers": 100,
          "maxEntryAllowed": 1,
          "maxAttemptAllowed": 3
        },
        "type": {
          "id": 2,
          "name": "Tournament"
        },
        "sourceType": {
          "id": 1,
          "name": "Match"
        },
        "rankingMethod": {
          "id": 1,
          "name": "Score"
        },
        "match": {
          "uuid": "match-internal-uuid",
          "id": "battle-match",
          "name": "Battle Match",
          "description": "1v1 battle",
          "iconUrl": "https://cdn.example.com/match.png",
          "winCondition": {
            "id": 1,
            "name": "Highest Score"
          },
          "outcomeType": {
            "id": 1,
            "name": "Score"
          }
        }
      }
    ],
    "totalCount": 15,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data.tournaments` | `array` | Array of tournament objects |
| `tournaments[].uuid` | `string` | Unique identifier (internal ID) |
| `tournaments[].id` | `string` | Tournament ID (client-facing) |
| `tournaments[].name` | `string` | Tournament display name |
| `tournaments[].description` | `string` | Tournament description |
| `tournaments[].iconUrl` | `string` | URL to tournament icon |
| `tournaments[].config` | `object` | Tournament configuration |
| `tournaments[].config.minPlayers` | `number` | Minimum players required |
| `tournaments[].config.maxPlayers` | `number` | Maximum players allowed |
| `tournaments[].config.maxEntryAllowed` | `number` | Maximum entries per player |
| `tournaments[].config.maxAttemptAllowed` | `number` | Maximum attempts per entry |
| `tournaments[].type` | `object` | Competition type `{ id, name }` |
| `tournaments[].sourceType` | `object` | Leaderboard source type `{ id, name }` |
| `tournaments[].rankingMethod` | `object` | Ranking method `{ id, name }` |
| `tournaments[].match` | `object` | Associated match details |
| `tournaments[].match.uuid` | `string` | Match internal ID |
| `tournaments[].match.id` | `string` | Match ID (client-facing) |
| `tournaments[].match.name` | `string` | Match name |
| `tournaments[].match.description` | `string` | Match description |
| `tournaments[].match.iconUrl` | `string` | Match icon URL |
| `tournaments[].match.winCondition` | `object` | Win condition `{ id, name }` |
| `tournaments[].match.outcomeType` | `object` | Outcome type `{ id, name }` |
| `totalCount` | `number` | Total number of tournaments |
| `lastUpdate` | `string` | Timestamp of last update |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `tournaments[].schedule` | `object` | `"schedule"` | Schedule information |
| `tournaments[].schedule.firstInstanceStartDate` | `string` | `"schedule"` | First instance start date |
| `tournaments[].schedule.firstInstanceEndDate` | `string` | `"schedule"` | First instance end date |
| `tournaments[].schedule.intervalUnit` | `string` | `"schedule"` | Interval unit (daily, weekly, etc.) |
| `tournaments[].schedule.intervalLength` | `number` | `"schedule"` | Recurrence frequency |
| `tournaments[].schedule.occurrences` | `number` | `"schedule"` | Total occurrences |
| `tournaments[].schedule.isRecurring` | `boolean` | `"schedule"` | Whether schedule is recurring |
| `tournaments[].schedule.currentInstanceSchedule` | `object` | `"schedule"` | Current instance details |
| `tournaments[].schedule.currentInstanceSchedule.instanceId` | `string` | `"schedule"` | Current instance ID |
| `tournaments[].schedule.currentInstanceSchedule.status` | `string` | `"schedule"` | Current status |
| `tournaments[].schedule.currentInstanceSchedule.instanceStartDate` | `string` | `"schedule"` | Current instance start |
| `tournaments[].schedule.currentInstanceSchedule.instanceEndDate` | `string` | `"schedule"` | Current instance end |
| `tournaments[].entryFees` | `array` | `"entryFees"` | Entry fee options |
| `tournaments[].entryFees[].priceType` | `string` | `"entryFees"` | Price type |
| `tournaments[].entryFees[].price` | `number` | `"entryFees"` | Entry price |
| `tournaments[].entryFees[].discount` | `number` | `"entryFees"` | Discount amount |
| `tournaments[].entryFees[].bonusCashAllowance` | `number` | `"entryFees"` | Bonus cash allowance |
| `tournaments[].entryFees[].hostingFee` | `number` | `"entryFees"` | Hosting fee |
| `tournaments[].entryFees[].hostingFeeType` | `string` | `"entryFees"` | Hosting fee type |
| `tournaments[].entryFees[].currencyDetails` | `object` | `"entryFees"` | Currency details |
| `tournaments[].prizeDistribution` | `object` | `"prizeDistribution"` | Prize distribution |
| `tournaments[].prizeDistribution.rules` | `object` | `"prizeDistribution"` | Distribution rules |
| `tournaments[].tags` | `array` | `"tags"` | Array of tag names |
| `tournaments[].unlockConditions` | `array` | `"unlockConditions"` | Unlock conditions |

---

## Request/Response Examples

### Example 1: Basic Request (no attributes)
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "tournaments": [
      {
        "uuid": "tournament-uuid-1",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "config": {
          "minPlayers": 2,
          "maxPlayers": 100,
          "maxEntryAllowed": 1,
          "maxAttemptAllowed": 3
        },
        "type": {
          "id": 2,
          "name": "Tournament"
        },
        "sourceType": {
          "id": 1,
          "name": "Match"
        },
        "rankingMethod": {
          "id": 1,
          "name": "Score"
        },
        "match": {
          "uuid": "match-uuid-1",
          "id": "battle-match",
          "name": "Battle Match",
          "description": "1v1 battle",
          "iconUrl": "https://cdn.example.com/match.png",
          "winCondition": {
            "id": 1,
            "name": "Highest Score"
          },
          "outcomeType": {
            "id": 1,
            "name": "Score"
          }
        }
      }
    ],
    "totalCount": 15,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 2: With Schedule Attribute
**Request:**
```json
{
  "attributes": ["schedule"],
  "scheduleStatuses": ["in progress"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "tournaments": [
      {
        "uuid": "tournament-uuid-1",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "config": {
          "minPlayers": 2,
          "maxPlayers": 100,
          "maxEntryAllowed": 1,
          "maxAttemptAllowed": 3
        },
        "type": {
          "id": 2,
          "name": "Tournament"
        },
        "sourceType": {
          "id": 1,
          "name": "Match"
        },
        "rankingMethod": {
          "id": 1,
          "name": "Score"
        },
        "match": null,
        "schedule": {
          "firstInstanceStartDate": "2024-01-15T00:00:00.000Z",
          "firstInstanceEndDate": "2024-01-21T23:59:59.000Z",
          "intervalUnit": "weekly",
          "intervalLength": 1,
          "occurrences": 52,
          "isRecurring": true,
          "currentInstanceSchedule": {
            "instanceId": "instance-uuid-1",
            "status": "in progress",
            "instanceStartDate": "2024-01-15T00:00:00.000Z",
            "instanceEndDate": "2024-01-21T23:59:59.000Z"
          }
        }
      }
    ],
    "totalCount": 15,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: With Entry Fees Attribute
**Request:**
```json
{
  "attributes": ["entryFees"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "tournaments": [
      {
        "uuid": "tournament-uuid-1",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "config": {
          "minPlayers": 2,
          "maxPlayers": 100,
          "maxEntryAllowed": 1,
          "maxAttemptAllowed": 3
        },
        "type": {
          "id": 2,
          "name": "Tournament"
        },
        "sourceType": {
          "id": 1,
          "name": "Match"
        },
        "rankingMethod": {
          "id": 1,
          "name": "Score"
        },
        "match": null,
        "entryFees": [
          {
            "priceType": "virtual",
            "price": 100,
            "discount": 0,
            "bonusCashAllowance": 0,
            "hostingFee": 10,
            "hostingFeeType": "percentage",
            "currencyDetails": {
              "uuid": "currency-uuid-1",
              "id": "gold-coins",
              "name": "Gold Coins",
              "description": "In-game currency",
              "iconUrl": "https://cdn.example.com/gold.png",
              "rarity": null,
              "code": "GLD",
              "type": "virtual"
            }
          }
        ]
      }
    ],
    "totalCount": 15,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 4: With Tags and Unlock Conditions
**Request:**
```json
{
  "attributes": ["tags", "unlockConditions"],
  "includeTags": ["featured"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Tournament list",
  "data": {
    "tournaments": [
      {
        "uuid": "tournament-uuid-1",
        "id": "weekly-tournament",
        "name": "Weekly Championship",
        "description": "Compete for weekly prizes",
        "iconUrl": "https://cdn.example.com/tournament.png",
        "config": {
          "minPlayers": 2,
          "maxPlayers": 100,
          "maxEntryAllowed": 1,
          "maxAttemptAllowed": 3
        },
        "type": {
          "id": 2,
          "name": "Tournament"
        },
        "sourceType": {
          "id": 1,
          "name": "Match"
        },
        "rankingMethod": {
          "id": 1,
          "name": "Score"
        },
        "match": null,
        "tags": ["featured", "weekly", "competitive"],
        "unlockConditions": [
          {
            "lockedLevelNo": 5,
            "unlockItem": {
              "uuid": null,
              "id": null,
              "name": null
            },
            "unlockBundle": {
              "uuid": null,
              "id": null,
              "name": null
            },
            "unlockProgressionSystem": {
              "uuid": "level-system-uuid",
              "id": "player-level",
              "name": "Player Level"
            }
          }
        ]
      }
    ],
    "totalCount": 15,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Notes

- Returns tournaments wrapped in `data.tournaments` with `totalCount` and `lastUpdate`
- Each tournament includes `config` with player limits and attempt settings
- `match` is null if no match is associated
- Use `schedule` attribute to get current instance information
- Use `includeTags` with `tags` attribute to filter by specific tags

---

## Source Files

- **DTO**: `src/competitions/dtos/get-client-tournaments.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
