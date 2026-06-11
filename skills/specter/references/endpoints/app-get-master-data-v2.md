# V2 API: `client/app/get-master-data`

**Endpoint:** `POST /v2/client/app/get-master-data`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| - | - | - | No request body required |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Master data",
  "data": {
    "dataTypes": [
      { "id": 1, "name": "string" },
      { "id": 2, "name": "number" }
    ],
    "platforms": [
      { "id": 1, "name": "iOS" },
      { "id": 2, "name": "Android" }
    ],
    "itemTypes": [
      { "id": 1, "name": "weapon" },
      { "id": 2, "name": "armor" }
    ],
    "progressionSystemTypes": [
      { "id": 1, "name": "linear" },
      { "id": 2, "name": "branching" }
    ],
    "organisationTypes": [
      { "id": 1, "name": "studio" },
      { "id": 2, "name": "publisher" }
    ],
    "taskGroupTypes": [
      { "id": 1, "name": "daily" },
      { "id": 2, "name": "weekly" }
    ],
    "countries": [
      { "id": 1, "name": "United States", "code": "US" },
      { "id": 2, "name": "United Kingdom", "code": "GB" }
    ],
    "genres": [
      { "id": 1, "name": "Action" },
      { "id": 2, "name": "Puzzle" }
    ],
    "defaultEvents": [
      {
        "id": 1,
        "name": "level_complete",
        "category": "progression",
        "parameterDetails": [
          {
            "id": 1,
            "name": "level_id",
            "dataType": "string",
            "type": "required"
          }
        ]
      }
    ],
    "matchOutcomes": [
      { "id": 1, "name": "win" },
      { "id": 2, "name": "loss" }
    ],
    "matchFormats": [
      { "id": 1, "name": "1v1" },
      { "id": 2, "name": "team" }
    ],
    "matchWinningConditions": [
      { "id": 1, "name": "highest_score" },
      { "id": 2, "name": "first_to_reach" }
    ],
    "leaderboardOutcomes": [
      { "id": 1, "name": "rank" },
      { "id": 2, "name": "score" }
    ],
    "leaderboardIntervals": [
      { "id": 1, "name": "daily" },
      { "id": 2, "name": "weekly" }
    ],
    "leaderboardSourceTypes": [
      { "id": 1, "name": "match" },
      { "id": 2, "name": "tournament" }
    ],
    "defaultParameters": [
      { "id": 1, "name": "score", "type": "number" },
      { "id": 2, "name": "duration", "type": "number" }
    ],
    "competitionFormats": [
      { "id": 1, "name": "tournament" },
      { "id": 2, "name": "instant_battle" }
    ],
    "projectCategories": [
      { "id": 1, "name": "mobile" },
      { "id": 2, "name": "web" }
    ],
    "permissionIds": [
      { "id": 1, "name": "read" },
      { "id": 2, "name": "write" }
    ],
    "walletTransactionPurposes": [
      { "id": 1, "name": "purchase" },
      { "id": 2, "name": "reward" }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `dataTypes` | `array` | Available data types for custom attributes `[{ id, name }]` |
| `platforms` | `array` | Supported game platforms `[{ id, name }]` |
| `itemTypes` | `array` | Inventory item types `[{ id, name }]` |
| `progressionSystemTypes` | `array` | Types of progression systems `[{ id, name }]` |
| `organisationTypes` | `array` | Organisation types `[{ id, name }]` |
| `taskGroupTypes` | `array` | Task group types (daily, weekly, etc.) `[{ id, name }]` |
| `countries` | `array` | Country list with codes `[{ id, name, code }]` |
| `genres` | `array` | Game genres `[{ id, name }]` |
| `defaultEvents` | `array` | Default event definitions with parameters |
| `defaultEvents[].id` | `number` | Event ID |
| `defaultEvents[].name` | `string` | Event name |
| `defaultEvents[].category` | `string` | Event category |
| `defaultEvents[].parameterDetails` | `array` | Event parameters `[{ id, name, dataType, type }]` |
| `matchOutcomes` | `array` | Match outcome types `[{ id, name }]` |
| `matchFormats` | `array` | Match format types `[{ id, name }]` |
| `matchWinningConditions` | `array` | Match winning condition types `[{ id, name }]` |
| `leaderboardOutcomes` | `array` | Leaderboard outcome types `[{ id, name }]` |
| `leaderboardIntervals` | `array` | Leaderboard interval types `[{ id, name }]` |
| `leaderboardSourceTypes` | `array` | Leaderboard source types `[{ id, name }]` |
| `defaultParameters` | `array` | Default event parameters `[{ id, name, type }]` |
| `competitionFormats` | `array` | Competition format types `[{ id, name }]` |
| `projectCategories` | `array` | Project category types `[{ id, name }]` |
| `permissionIds` | `array` | Permission types `[{ id, name }]` |
| `walletTransactionPurposes` | `array` | Wallet transaction purpose types `[{ id, name }]` |

---

## Request/Response Examples

### Example 1: Get All Master Data
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Master data",
  "data": {
    "dataTypes": [
      { "id": 1, "name": "string" },
      { "id": 2, "name": "number" },
      { "id": 3, "name": "boolean" },
      { "id": 4, "name": "object" },
      { "id": 5, "name": "array" }
    ],
    "platforms": [
      { "id": 1, "name": "iOS" },
      { "id": 2, "name": "Android" },
      { "id": 3, "name": "Web" },
      { "id": 4, "name": "Windows" },
      { "id": 5, "name": "macOS" }
    ],
    "itemTypes": [
      { "id": 1, "name": "weapon" },
      { "id": 2, "name": "armor" },
      { "id": 3, "name": "consumable" },
      { "id": 4, "name": "cosmetic" }
    ],
    "progressionSystemTypes": [
      { "id": 1, "name": "linear" },
      { "id": 2, "name": "branching" }
    ],
    "organisationTypes": [
      { "id": 1, "name": "studio" },
      { "id": 2, "name": "publisher" }
    ],
    "taskGroupTypes": [
      { "id": 1, "name": "daily" },
      { "id": 2, "name": "weekly" },
      { "id": 3, "name": "monthly" },
      { "id": 4, "name": "seasonal" }
    ],
    "countries": [
      { "id": 1, "name": "United States", "code": "US" },
      { "id": 2, "name": "United Kingdom", "code": "GB" },
      { "id": 3, "name": "Canada", "code": "CA" },
      { "id": 4, "name": "Australia", "code": "AU" }
    ],
    "genres": [
      { "id": 1, "name": "Action" },
      { "id": 2, "name": "Puzzle" },
      { "id": 3, "name": "Sports" },
      { "id": 4, "name": "RPG" },
      { "id": 5, "name": "Strategy" }
    ],
    "defaultEvents": [
      {
        "id": 1,
        "name": "level_complete",
        "category": "progression",
        "parameterDetails": [
          {
            "id": 1,
            "name": "level_id",
            "dataType": "string",
            "type": "required"
          },
          {
            "id": 2,
            "name": "score",
            "dataType": "number",
            "type": "optional"
          }
        ]
      },
      {
        "id": 2,
        "name": "item_purchased",
        "category": "economy",
        "parameterDetails": [
          {
            "id": 3,
            "name": "item_id",
            "dataType": "string",
            "type": "required"
          },
          {
            "id": 4,
            "name": "price",
            "dataType": "number",
            "type": "required"
          }
        ]
      }
    ],
    "matchOutcomes": [
      { "id": 1, "name": "win" },
      { "id": 2, "name": "loss" },
      { "id": 3, "name": "draw" }
    ],
    "matchFormats": [
      { "id": 1, "name": "1v1" },
      { "id": 2, "name": "team" },
      { "id": 3, "name": "free_for_all" }
    ],
    "matchWinningConditions": [
      { "id": 1, "name": "highest_score" },
      { "id": 2, "name": "first_to_reach" },
      { "id": 3, "name": "last_standing" }
    ],
    "leaderboardOutcomes": [
      { "id": 1, "name": "rank" },
      { "id": 2, "name": "score" },
      { "id": 3, "name": "percentile" }
    ],
    "leaderboardIntervals": [
      { "id": 1, "name": "daily" },
      { "id": 2, "name": "weekly" },
      { "id": 3, "name": "monthly" },
      { "id": 4, "name": "all_time" }
    ],
    "leaderboardSourceTypes": [
      { "id": 1, "name": "match" },
      { "id": 2, "name": "tournament" },
      { "id": 3, "name": "custom" }
    ],
    "defaultParameters": [
      { "id": 1, "name": "score", "type": "number" },
      { "id": 2, "name": "duration", "type": "number" },
      { "id": 3, "name": "level", "type": "string" }
    ],
    "competitionFormats": [
      { "id": 1, "name": "tournament" },
      { "id": 2, "name": "instant_battle" },
      { "id": 3, "name": "league" }
    ],
    "projectCategories": [
      { "id": 1, "name": "mobile" },
      { "id": 2, "name": "web" },
      { "id": 3, "name": "desktop" },
      { "id": 4, "name": "console" }
    ],
    "permissionIds": [
      { "id": 1, "name": "read" },
      { "id": 2, "name": "write" },
      { "id": 3, "name": "delete" },
      { "id": 4, "name": "admin" }
    ],
    "walletTransactionPurposes": [
      { "id": 1, "name": "purchase" },
      { "id": 2, "name": "reward" },
      { "id": 3, "name": "refund" },
      { "id": 4, "name": "transfer" }
    ]
  },
  "errors": []
}
```

---

## Notes

- Returns all master/reference data used throughout the application
- Useful for populating dropdowns and validation
- This data is relatively static and can be cached
- All arrays contain objects with at least `id` and `name` fields
- `countries` array includes an additional `code` field
- `defaultEvents` includes nested `parameterDetails` with `dataType` and `type` fields
- `defaultParameters` includes a `type` field indicating the parameter's data type

---

## Source Files

- **Controller**: `src/app.controller.ts`
