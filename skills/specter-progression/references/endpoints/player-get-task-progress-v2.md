# V2 API: `client/player/get-task-progress`

**Endpoint:** `POST /v2/client/player/get-task-progress`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | User ID of the player to fetch task progress for |
| `taskIds` | `string[]` | No | Filter by specific task IDs (mutually exclusive with `status`) |
| `status` | `string` | No | Filter by task status (e.g., "completed", "pending") (mutually exclusive with `taskIds`) |
| `scheduleStatuses` | `string[]` | No | Filter by schedule status (default: `["in progress"]`) |
| `includeTaskGroupTasks` | `boolean` | No | Include tasks belonging to task groups (default: `false` — standalone tasks only) |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

**Validation rule:** `taskIds` and `status` cannot both be provided in the same request (`IsTaskIdOrStatusPresent` validator). Provide neither, or exactly one.

---

## Response Structure

**Request:**
```json
{
  "userId": "player-123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My Task progress list",
  "errors": [],
  "data": {
    "taskProgresses": [
      {
        "uuid": "ec9ef0e1-6fe9-4c47-bace-2ac93d331caa",
        "id": "tsk_ftue_03",
        "name": "Ftue Reached Play Central",
        "event": {
          "id": "82b90f9d-a492-41b0-ae3d-54f820f2bad2",
          "name": "On Guidance Step"
        },
        "progress": []
      }
    ],
    "totalCount": 23
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.taskProgresses` | `array` | Array of task progress objects for the specified player |
| `taskProgresses[].uuid` | `string` | Task unique identifier (internal ID) |
| `taskProgresses[].id` | `string` | Task ID (client-facing) |
| `taskProgresses[].name` | `string` | Task display name |
| `taskProgresses[].event` | `object` | Event powering the task: `{ id, name }` (default or custom event) |
| `taskProgresses[].progress` | `array` | Aggregated progress records from the event collection for the player (empty if no progress yet) |
| `taskProgresses[].taskGroupId` | `string` | Only present when the task belongs to a task group |
| `data.totalCount` | `number` | Total count of active tasks in the project (standalone only unless `includeTaskGroupTasks` is true) |

---

## Notes

- Same behavior as `client/player/me/get-task-progress`, except the target player is specified by `userId` instead of being resolved from the bearer token.
- The caller still authenticates with their own bearer token.

---

## Source Files

- **DTO**: `src/task/dtos/get-others-task-progress.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts` (`getOthersTaskProgressV2`)
- **Service**: `src/task/task.service.ts` (`getTaskProgressV2`)
