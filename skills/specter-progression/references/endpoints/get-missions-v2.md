# V2 API: `client/app/get-missions`

**Endpoint:** `POST /v2/client/app/get-missions`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `taskGroupIds` | `string[]` | Filter missions by specific task group IDs |
| `taskGroupTypes` | `string[]` | Filter missions by task group types |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `includeInactiveTasks` | `boolean` | Include inactive tasks in nested tasks (default: false) |
| `scheduleStatuses` | `string[]` | Filter by schedule status |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `includeTags` | `string[]` | Filter missions by tag names |

**Note:** Only one of `taskGroupIds` or `taskGroupTypes` should be used at a time.

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Mission List",
  "data": {
    "missions": [...],
    "totalCount": 20,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each mission returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "mission-123",
  "name": "Daily Challenges",
  "description": "Complete all daily tasks",
  "iconUrl": "https://cdn.example.com/mission-icon.png",
  "taskGroupType": "mission",
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
    "difficulty": "medium",
    "category": "daily"
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
    "completionMode": "all",
    "resetDaily": true
  }
}
```

---

### `attributes: ["rewardDetails"]`
Adds mission completion reward information:
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
        "quantity": 500
      }
    ],
    "items": [],
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
  "tags": ["daily", "featured", "beginner"]
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

### `attributes: ["tasks"]`
Adds nested tasks array with their details:
```json
{
  ...base fields...,
  "tasks": [
    {
      "uuid": "task-uuid-1",
      "id": "task-123",
      "name": "Login Today",
      "description": "Log in to the app",
      "iconUrl": "https://cdn.example.com/task1-icon.png",
      "sortingOrder": 1,
      "event": {
        "id": "event-uuid",
        "name": "login"
      }
    },
    {
      "uuid": "task-uuid-2",
      "id": "task-456",
      "name": "Play 3 Games",
      "description": "Complete 3 game sessions",
      "iconUrl": "https://cdn.example.com/task2-icon.png",
      "sortingOrder": 2,
      "event": {
        "id": "event-uuid",
        "name": "game_complete"
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
        "lockedLevelNo": 3,
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
  "id": "mission-123",
  "name": "Daily Challenges",
  "description": "Complete all daily tasks",
  "iconUrl": "https://cdn.example.com/mission-icon.png",
  "taskGroupType": "mission",
  "sortingOrder": 1,
  "meta": {"difficulty": "medium"},
  "rewardDetails": {
    "currencies": [...],
    "items": [],
    "bundles": [],
    "progressionPoints": []
  },
  "tags": ["daily", "featured"],
  "schedule": {...},
  "tasks": [...]
}
```

---

## How Filters Affect Response

### `taskGroupIds` Filter
Returns only missions with the specified task group IDs.

**Request:**
```json
{
  "taskGroupIds": ["mission-123", "mission-456"]
}
```
**Effect:** Response contains only missions where `taskGroupId` matches.

---

### `taskGroupTypes` Filter
Returns missions of the specified types.

**Request:**
```json
{
  "taskGroupTypes": ["daily_mission", "weekly_mission"]
}
```
**Effect:** Returns missions matching specified group types.

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
**Effect:** Tasks array includes both active and inactive tasks.

**Default:** false (only active tasks)

---

### `scheduleStatuses` Filter
Filters missions by their schedule status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress"]
}
```
**Effect:** Returns only missions with matching schedule status.

---

### `includeTags` Filter
Filters missions that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["daily", "featured"]
}
```
**Effect:** Returns missions tagged with "daily" OR "featured".

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
**Effect:** Returns first 10 missions. Results are ordered by `updated_at DESC`.

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
**Response:** First 10 missions with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["meta", "businessLogic", "rewardDetails", "linkedRewardDetails", "tags", "schedule", "tasks", "unlockConditions"]
}
```
**Response:** First 10 missions with ALL optional fields.

---

### Example 3: Active Daily Missions with Tasks
**Request:**
```json
{
  "includeTags": ["daily"],
  "scheduleStatuses": ["in progress"],
  "attributes": ["tags", "schedule", "tasks", "rewardDetails"]
}
```
**Response:** Active daily missions with tasks and reward information.

---

## Source Files

- **DTO**: `src/task/dtos/get-client-missions.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:2403-2442`
- **Service**: `src/task/task.service.ts`
