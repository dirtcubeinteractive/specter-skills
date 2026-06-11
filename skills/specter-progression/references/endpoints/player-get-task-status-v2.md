# V2 API: `client/player/get-task-status`

**Endpoint:** `POST /v2/client/player/get-task-status`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to get task status for |
| `taskIds` | `string[]` | No | Filter by specific task IDs |
| `status` | `string` | No | Filter by task completion status |
| `scheduleStatuses` | `string[]` | No | Filter by schedule status |
| `includeTaskGroupTasks` | `boolean` | No | Include tasks from task groups (default: false) |
| `includeInactiveTasks` | `boolean` | No | Include inactive tasks (default: false) |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Others Task Status List",
  "data": {
    "taskStatuses": [
      {
        "uuid": "status-uuid-1",
        "taskId": "task-123",
        "taskName": "Daily Login",
        "status": "completed",
        "progress": {
          "current": 1,
          "target": 1,
          "percentage": 100
        },
        "completedAt": "2025-12-01T10:30:00.000Z",
        "rewardsClaimed": true
      }
    ],
    "totalCount": 10
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Get Another Player's Task Status
**Request:**
```json
{
  "userId": "player-123"
}
```
**Effect:** Returns task status for player-123.

---

### Example 2: Filter by Completion Status
**Request:**
```json
{
  "userId": "player-123",
  "status": "completed"
}
```
**Effect:** Returns only completed tasks for player-123.

---

### Example 3: Get Specific Tasks with Groups
**Request:**
```json
{
  "userId": "player-123",
  "taskIds": ["task-123", "task-456"],
  "includeTaskGroupTasks": true
}
```
**Effect:** Returns status for specified tasks including group tasks.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| userId not provided | Validation error |
| User not found | User not found |

---

## Source Files

- **DTO**: `src/task/dtos/get-others-task-status.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:2549-2575`
- **Service**: `src/task/task.service.ts`
