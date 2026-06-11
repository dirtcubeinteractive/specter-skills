# V2 API: `client/app/get-step-series`

**Endpoint:** `POST /v2/client/app/get-step-series`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `taskGroupIds` | `string[]` | Filter step series by specific task group IDs |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `includeInactiveTasks` | `boolean` | Include inactive tasks in nested tasks (default: false) |
| `scheduleStatuses` | `string[]` | Filter by schedule status |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `includeTags` | `string[]` | Filter step series by tag names |

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Step Series List",
  "data": {
    "stepSeries": [...],
    "totalCount": 15,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each step series returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "step-series-123",
  "name": "Beginner Journey",
  "description": "Complete tasks in sequence to earn rewards",
  "iconUrl": "https://cdn.example.com/step-series-icon.png",
  "taskGroupType": "step_series",
  "sortingOrder": 1
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
    "difficulty": "beginner",
    "estimatedTime": "30 minutes"
  }
}
```

---

### `attributes: ["businessLogic"]`
Adds business logic configuration:
```json
{
  ...base fields...,
  "businessLogic": {
    "completionMode": "sequential",
    "allowSkip": false
  }
}
```

---

### `attributes: ["rewardDetails"]`
Adds step series completion reward information:
```json
{
  ...base fields...,
  "rewardDetails": {
    "currencies": [
      {
        "uuid": "currency-uuid",
        "id": "currency-123",
        "name": "Gold Coins",
        "iconUrl": "https://cdn.example.com/gold-icon.png",
        "quantity": 1000
      }
    ],
    "items": [
      {
        "uuid": "item-uuid",
        "id": "item-123",
        "name": "Completion Badge",
        "iconUrl": "https://cdn.example.com/badge-icon.png",
        "quantity": 1
      }
    ],
    "bundles": [],
    "progressionPoints": []
  }
}
```

---

### `attributes: ["linkedRewardDetails"]`
Adds linked reward sources:
```json
{
  ...base fields...,
  "linkedRewardDetails": {
    "linkedCurrencies": [...],
    "linkedItems": [...],
    "linkedBundles": [...],
    "linkedProgressionPoints": [...]
  }
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["tutorial", "beginner", "onboarding"]
}
```

---

### `attributes: ["schedule"]`
Adds schedule information:
```json
{
  ...base fields...,
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": null,
    "intervalUnit": null,
    "intervalLength": null,
    "occurrences": null,
    "isRecurring": false,
    "currentInstanceSchedule": {
      "status": "in progress",
      "instanceStartDate": "2025-01-01T00:00:00.000Z",
      "instanceEndDate": null
    }
  }
}
```

---

### `attributes: ["tasks"]`
Adds nested tasks array (sequential steps):
```json
{
  ...base fields...,
  "tasks": [
    {
      "uuid": "task-uuid-1",
      "id": "task-123",
      "name": "Step 1: Create Profile",
      "description": "Set up your player profile",
      "iconUrl": "https://cdn.example.com/step1-icon.png",
      "sortingOrder": 1,
      "event": {
        "id": "event-uuid",
        "name": "profile_complete"
      }
    },
    {
      "uuid": "task-uuid-2",
      "id": "task-456",
      "name": "Step 2: First Game",
      "description": "Play your first game",
      "iconUrl": "https://cdn.example.com/step2-icon.png",
      "sortingOrder": 2,
      "event": {
        "id": "event-uuid",
        "name": "game_complete"
      }
    },
    {
      "uuid": "task-uuid-3",
      "id": "task-789",
      "name": "Step 3: First Win",
      "description": "Win your first match",
      "iconUrl": "https://cdn.example.com/step3-icon.png",
      "sortingOrder": 3,
      "event": {
        "id": "event-uuid",
        "name": "match_won"
      }
    }
  ]
}
```

---

### `attributes: ["unlockConditions"]`
Adds unlock requirements:
```json
{
  ...base fields...,
  "unlockConditions": {
    "unlockLevel": [
      {
        "lockedLevelNo": 1,
        "unlockProgressionSystem": {
          "uuid": "level-uuid",
          "id": "level-system-123",
          "name": "Player Level"
        }
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
  "attributes": ["meta", "rewardDetails", "tags", "schedule", "tasks"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "step-series-123",
  "name": "Beginner Journey",
  "description": "Complete tasks in sequence",
  "iconUrl": "https://cdn.example.com/step-series-icon.png",
  "taskGroupType": "step_series",
  "sortingOrder": 1,
  "meta": {"difficulty": "beginner"},
  "rewardDetails": {
    "currencies": [...],
    "items": [...],
    "bundles": [],
    "progressionPoints": []
  },
  "tags": ["tutorial", "beginner"],
  "schedule": {...},
  "tasks": [...]
}
```

---

## How Filters Affect Response

### `taskGroupIds` Filter
Returns only step series with the specified task group IDs.

**Request:**
```json
{
  "taskGroupIds": ["step-series-123", "step-series-456"]
}
```
**Effect:** Response contains only step series where `taskGroupId` matches.

---

### `includeInactiveTasks` Filter
Controls whether to include inactive tasks in the tasks array.

**Request:**
```json
{
  "includeInactiveTasks": true,
  "attributes": ["tasks"]
}
```
**Effect:** Tasks array includes both active and inactive steps.

**Default:** false

---

### `scheduleStatuses` Filter
Filters step series by their schedule status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress"]
}
```
**Effect:** Returns only step series with matching schedule status.

---

### `includeTags` Filter
Filters step series that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["tutorial", "featured"]
}
```
**Effect:** Returns step series tagged with "tutorial" OR "featured".

**Note:** Requires `"tags"` in attributes array for tag filtering to work.

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 0,
  "limit": 10
}
```
**Effect:** Returns first 10 step series. Results are ordered by `updated_at DESC`.

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
**Response:** First 10 step series with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["meta", "businessLogic", "rewardDetails", "linkedRewardDetails", "tags", "schedule", "tasks", "unlockConditions"]
}
```
**Response:** First 10 step series with ALL optional fields.

---

### Example 3: Active Tutorial Step Series
**Request:**
```json
{
  "includeTags": ["tutorial"],
  "scheduleStatuses": ["in progress"],
  "attributes": ["tags", "tasks", "rewardDetails"]
}
```
**Response:** Active tutorial step series with sequential tasks and rewards.

---

## Source Files

- **DTO**: `src/task/dtos/get-client-step-series.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:2444-2483`
- **Service**: `src/task/task.service.ts`
