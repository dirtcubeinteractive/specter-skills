# V2 API: `client/player/me/get-task-status`

**Endpoint:** `POST /v2/client/player/me/get-task-status`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `taskIds` | `string[]` | - | Filter by specific task IDs |
| `status` | `string` | - | Filter by task status (e.g., "completed", "pending") |
| `scheduleStatuses` | `string[]` | `["in progress"]` | Filter by schedule status |
| `includeTaskGroupTasks` | `boolean` | `false` | Include tasks from task groups (missions, step-series, time-series) |
| `includeInactiveTasks` | `boolean` | `false` | Include inactive tasks |
| `offset` | `number` | `0` | Pagination offset |
| `limit` | `number` | `10` | Pagination limit |

---

## How `includeTaskGroupTasks` Affects Response

### When `includeTaskGroupTasks: false` (Default)
- Only **standalone tasks** are returned (tasks not belonging to any task group)
- All returned tasks will have `taskGroupDetails: null`

### When `includeTaskGroupTasks: true`
- Both **standalone tasks** AND **task group tasks** are returned
- Standalone tasks have `taskGroupDetails: null`
- Task group tasks have `taskGroupDetails` populated with group information

---

## Response Structure

### Success Response (Without Task Group Tasks - Default)

**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get My Task Status List",
  "data": {
    "taskStatuses": [
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "id": "daily-login",
        "name": "Daily Login",
        "description": "Log in daily to earn rewards",
        "iconUrl": "https://cdn.example.com/login-icon.png",
        "instanceId": "instance-uuid-123",
        "status": "completed",
        "taskGroupDetails": null
      },
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440001",
        "id": "play-match",
        "name": "Play a Match",
        "description": "Play any match to earn XP",
        "iconUrl": "https://cdn.example.com/match-icon.png",
        "instanceId": null,
        "status": "pending",
        "taskGroupDetails": null
      }
    ]
  },
  "errors": []
}
```

---

### Success Response (With Task Group Tasks)

**Request:**
```json
{
  "includeTaskGroupTasks": true
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get My Task Status List",
  "data": {
    "taskStatuses": [
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440000",
        "id": "daily-login",
        "name": "Daily Login",
        "description": "Log in daily to earn rewards",
        "iconUrl": "https://cdn.example.com/login-icon.png",
        "instanceId": "instance-uuid-123",
        "status": "completed",
        "taskGroupDetails": null
      },
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440002",
        "id": "mission-task-1",
        "name": "Win 3 Matches",
        "description": "Win 3 matches to complete this mission task",
        "iconUrl": "https://cdn.example.com/win-icon.png",
        "instanceId": "instance-uuid-456",
        "status": "completed",
        "taskGroupDetails": {
          "uuid": "group-uuid-001",
          "id": "daily-missions",
          "name": "Daily Missions",
          "description": "Complete daily missions for rewards",
          "iconUrl": "https://cdn.example.com/mission-icon.png",
          "taskGroupType": "mission"
        }
      },
      {
        "uuid": "550e8400-e29b-41d4-a716-446655440003",
        "id": "step-series-task-1",
        "name": "Reach Level 5",
        "description": "First step: Reach level 5",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "instanceId": null,
        "status": "pending",
        "taskGroupDetails": {
          "uuid": "group-uuid-002",
          "id": "beginner-journey",
          "name": "Beginner Journey",
          "description": "Complete steps to become a pro",
          "iconUrl": "https://cdn.example.com/journey-icon.png",
          "taskGroupType": "step-series"
        }
      }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Unique identifier for the task |
| `id` | `string` | The task ID |
| `name` | `string` | Display name of the task |
| `description` | `string` | Description of the task |
| `iconUrl` | `string` | URL to the task icon |
| `instanceId` | `string \| null` | Task status instance ID (null if no status record exists) |
| `status` | `string` | Current status (defaults to "pending" if no record) |
| `taskGroupDetails` | `object \| null` | Task group info (null if standalone task) |

### taskGroupDetails Object

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Task group unique identifier |
| `id` | `string` | Task group ID |
| `name` | `string` | Task group name |
| `description` | `string` | Task group description |
| `iconUrl` | `string` | Task group icon URL |
| `taskGroupType` | `string` | Type: "mission", "step-series", or "time-series" |

---

## Request Examples

### Example 1: Get Standalone Tasks Only (Default)
**Request:**
```json
{}
```
**Effect:** Returns first 10 standalone tasks with "in progress" schedule status.

---

### Example 2: Include Task Group Tasks
**Request:**
```json
{
  "includeTaskGroupTasks": true,
  "limit": 20
}
```
**Effect:** Returns standalone tasks AND tasks within missions/step-series/time-series.

---

### Example 3: Filter by Status
**Request:**
```json
{
  "status": "completed",
  "includeTaskGroupTasks": true
}
```
**Effect:** Returns only completed tasks (both standalone and task group tasks).

---

### Example 4: Get Specific Tasks
**Request:**
```json
{
  "taskIds": ["daily-login", "mission-task-1", "play-match"]
}
```
**Effect:** Returns status for only the specified task IDs.

---

### Example 5: Include Inactive Tasks
**Request:**
```json
{
  "includeInactiveTasks": true,
  "includeTaskGroupTasks": true
}
```
**Effect:** Returns all tasks including those not available in current cycle.

---

## Source Files

- **DTO**: `src/task/dtos/get-my-task-status.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:2525-2548`
- **Service**: `src/task/task.service.ts:21820-21882`
