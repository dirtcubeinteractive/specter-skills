# V2 API: `client/app/get-time-series`

**Endpoint:** `POST /v2/client/app/get-time-series`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `taskGroupIds` | `string[]` | Filter time series by specific task group IDs |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `includeInactiveTasks` | `boolean` | Include inactive tasks in nested tasks (default: false) |
| `scheduleStatuses` | `string[]` | Filter by schedule status |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `includeTags` | `string[]` | Filter time series by tag names |

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Time Series List",
  "data": {
    "timeSeries": [...],
    "totalCount": 10,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each time series returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "time-series-123",
  "name": "7-Day Login Streak",
  "description": "Log in for 7 consecutive days",
  "iconUrl": "https://cdn.example.com/time-series-icon.png",
  "taskGroupType": "time_series",
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
    "streakType": "consecutive",
    "maxDays": 7
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
    "resetOnMiss": true,
    "gracePeriodHours": 0,
    "claimWindowHours": 24
  }
}
```

---

### `attributes: ["rewardDetails"]`
Adds time series completion reward information:
```json
{
  ...base fields...,
  "rewardDetails": {
    "currencies": [
      {
        "uuid": "currency-uuid",
        "id": "currency-123",
        "name": "Premium Gems",
        "iconUrl": "https://cdn.example.com/gems-icon.png",
        "quantity": 100
      }
    ],
    "items": [],
    "bundles": [
      {
        "uuid": "bundle-uuid",
        "id": "bundle-123",
        "name": "7-Day Reward Bundle",
        "iconUrl": "https://cdn.example.com/bundle-icon.png",
        "quantity": 1
      }
    ],
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
  "tags": ["daily", "streak", "login"]
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
    "firstInstanceEndDate": "2025-12-31T23:59:59.000Z",
    "intervalUnit": "weekly",
    "intervalLength": 1,
    "occurrences": 52,
    "isRecurring": true,
    "currentInstanceSchedule": {
      "status": "in progress",
      "instanceStartDate": "2025-12-01T00:00:00.000Z",
      "instanceEndDate": "2025-12-07T23:59:59.000Z"
    }
  }
}
```

---

### `attributes: ["tasks"]`
Adds nested tasks array (daily tasks in time series):
```json
{
  ...base fields...,
  "tasks": [
    {
      "uuid": "task-uuid-1",
      "id": "task-123",
      "name": "Day 1",
      "description": "Login on Day 1",
      "iconUrl": "https://cdn.example.com/day1-icon.png",
      "sortingOrder": 1,
      "event": {
        "id": "event-uuid",
        "name": "login"
      },
      "rewardDetails": {
        "currencies": [{"id": "...", "name": "Gold", "quantity": 100}],
        "items": [],
        "bundles": [],
        "progressionPoints": []
      }
    },
    {
      "uuid": "task-uuid-2",
      "id": "task-456",
      "name": "Day 2",
      "description": "Login on Day 2",
      "iconUrl": "https://cdn.example.com/day2-icon.png",
      "sortingOrder": 2,
      "event": {
        "id": "event-uuid",
        "name": "login"
      },
      "rewardDetails": {
        "currencies": [{"id": "...", "name": "Gold", "quantity": 150}],
        "items": [],
        "bundles": [],
        "progressionPoints": []
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
  "id": "time-series-123",
  "name": "7-Day Login Streak",
  "description": "Log in for 7 consecutive days",
  "iconUrl": "https://cdn.example.com/time-series-icon.png",
  "taskGroupType": "time_series",
  "sortingOrder": 1,
  "meta": {"streakType": "consecutive"},
  "rewardDetails": {
    "currencies": [...],
    "items": [],
    "bundles": [...],
    "progressionPoints": []
  },
  "tags": ["daily", "streak"],
  "schedule": {...},
  "tasks": [...]
}
```

---

## How Filters Affect Response

### `taskGroupIds` Filter
Returns only time series with the specified task group IDs.

**Request:**
```json
{
  "taskGroupIds": ["time-series-123", "time-series-456"]
}
```
**Effect:** Response contains only time series where `taskGroupId` matches.

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
**Effect:** Tasks array includes both active and inactive daily tasks.

**Default:** false

---

### `scheduleStatuses` Filter
Filters time series by their schedule status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress"]
}
```
**Effect:** Returns only time series with matching schedule status.

---

### `includeTags` Filter
Filters time series that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["streak", "daily"]
}
```
**Effect:** Returns time series tagged with "streak" OR "daily".

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
**Effect:** Returns first 10 time series. Results are ordered by `updated_at DESC`.

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
**Response:** First 10 time series with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["meta", "businessLogic", "rewardDetails", "linkedRewardDetails", "tags", "schedule", "tasks", "unlockConditions"]
}
```
**Response:** First 10 time series with ALL optional fields.

---

### Example 3: Active Login Streak with Daily Rewards
**Request:**
```json
{
  "includeTags": ["login", "streak"],
  "scheduleStatuses": ["in progress"],
  "attributes": ["tags", "tasks", "rewardDetails", "schedule"]
}
```
**Response:** Active login streak time series with daily task rewards and schedule.

---

## Source Files

- **DTO**: `src/task/dtos/get-client-time-series.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts`
- **Service**: `src/task/task.service.ts`
