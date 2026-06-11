# V2 API: `client/app/get-tasks`

**Endpoint:** `POST /v2/client/app/get-tasks`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `taskIds` | `string[]` | Filter tasks by specific task IDs |
| `includeTaskGroupTasks` | `boolean` | Include tasks that belong to task groups (default: false) |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `scheduleStatuses` | `string[]` | Filter by schedule status |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `includeTags` | `string[]` | Filter tasks by tag names |

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get all tasks",
  "data": {
    "tasks": [...],
    "totalCount": 50,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each task returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "task-123",
  "name": "Daily Login",
  "description": "Log in to receive rewards",
  "iconUrl": "https://cdn.example.com/task-icon.png",
  "sortingOrder": 1,
  "event": {
    "id": "event-uuid",
    "name": "login"
  },
  "taskGroupDetails": null
}
```

*Note: `taskGroupDetails` is populated only if task belongs to a group and `includeTaskGroupTasks` is true.*

---

## How Each Attribute Changes Response

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "customField1": "value1",
    "difficulty": "easy"
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
    "resetOnComplete": true,
    "maxCompletions": 5,
    "cooldownHours": 24
  }
}
```

---

### `attributes: ["rewardDetails"]`
Adds reward information for completing the task:
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
        "quantity": 100
      }
    ],
    "items": [
      {
        "uuid": "item-uuid",
        "id": "item-123",
        "name": "Reward Box",
        "iconUrl": "https://cdn.example.com/box-icon.png",
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
  "tags": ["daily", "login", "beginner"]
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
    "intervalUnit": "daily",
    "intervalLength": 1,
    "occurrences": 365,
    "isRecurring": true,
    "currentInstanceSchedule": {
      "status": "in progress",
      "instanceStartDate": "2025-12-01T00:00:00.000Z",
      "instanceEndDate": "2025-12-01T23:59:59.000Z"
    }
  }
}
```

---

### `attributes: ["parameters"]`
Adds task completion parameters:
```json
{
  ...base fields...,
  "parameters": [
    {
      "name": "loginCount",
      "targetValue": 1,
      "operator": ">=",
      "dataType": "integer",
      "mode": "incremental",
      "type": "counter"
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
        "lockedLevelNo": 5,
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
  "attributes": ["meta", "rewardDetails", "tags", "schedule"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "task-123",
  "name": "Daily Login",
  "description": "Log in to receive rewards",
  "iconUrl": "https://cdn.example.com/task-icon.png",
  "sortingOrder": 1,
  "event": {"id": "...", "name": "login"},
  "taskGroupDetails": null,
  "meta": {"difficulty": "easy"},
  "rewardDetails": {
    "currencies": [...],
    "items": [...],
    "bundles": [],
    "progressionPoints": []
  },
  "tags": ["daily", "login"],
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2025-12-31T23:59:59.000Z",
    "intervalUnit": "daily",
    "intervalLength": 1,
    "occurrences": 365,
    "isRecurring": true,
    "currentInstanceSchedule": {...}
  }
}
```

---

## How Filters Affect Response

### `taskIds` Filter
Returns only tasks with the specified IDs.

**Request:**
```json
{
  "taskIds": ["task-123", "task-456"]
}
```
**Effect:** Response contains only tasks where `taskId` matches.

---

### `includeTaskGroupTasks` Filter
Controls whether to include tasks that belong to task groups.

**Request:**
```json
{
  "includeTaskGroupTasks": true
}
```
**Effect:** Returns all tasks including those in missions/step-series/time-series.

**Request:**
```json
{
  "includeTaskGroupTasks": false
}
```
**Effect:** Returns only standalone tasks (not in any group).

**Default:** false

---

### `scheduleStatuses` Filter
Filters tasks by their schedule status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress"]
}
```
**Effect:** Returns only tasks with matching schedule status.

---

### `includeTags` Filter
Filters tasks that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["daily", "featured"]
}
```
**Effect:** Returns tasks tagged with "daily" OR "featured".

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
**Effect:** Returns first 20 tasks. Results are ordered by `updated_at DESC`.

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
**Response:** First 10 standalone tasks with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["meta", "businessLogic", "rewardDetails", "linkedRewardDetails", "tags", "schedule", "parameters", "unlockConditions"],
  "includeTaskGroupTasks": true
}
```
**Response:** First 10 tasks (including group tasks) with ALL optional fields.

---

### Example 3: Daily Tasks with Rewards
**Request:**
```json
{
  "includeTags": ["daily"],
  "attributes": ["tags", "rewardDetails", "schedule"],
  "scheduleStatuses": ["in progress"]
}
```
**Response:** Active daily tasks with reward and schedule information.

---

## Source Files

- **DTO**: `src/task/dtos/get-master-tasks.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:2365-2401`
- **Service**: `src/task/task.service.ts:19830-20113`
