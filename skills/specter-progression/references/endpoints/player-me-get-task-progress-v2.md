# V2 API: `client/player/me/get-task-progress`

**Endpoint:** `POST /v2/client/player/me/get-task-progress`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
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
{}
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
| `data.taskProgresses` | `array` | Array of task progress objects |
| `taskProgresses[].uuid` | `string` | Task unique identifier (internal ID) |
| `taskProgresses[].id` | `string` | Task ID (client-facing) |
| `taskProgresses[].name` | `string` | Task display name |
| `taskProgresses[].event` | `object` | Event powering the task: `{ id, name }` (default or custom event) |
| `taskProgresses[].progress` | `array` | Aggregated progress records from the event collection for this user (empty if no progress yet) |
| `taskProgresses[].taskGroupId` | `string` | Only present when the task belongs to a task group |
| `data.totalCount` | `number` | Total count of active tasks in the project (standalone only unless `includeTaskGroupTasks` is true) |

---

## Notes

- Progress is aggregated per task from the underlying event collection (e.g., wallet updates, item purchases, match ends) based on the task's subscribed event.
- When `includeTaskGroupTasks` is `false` (default), only standalone tasks (no task group) are counted and returned.
- `status` filtering is applied after computing each task's current status from TaskBus (tasks with no record default to `"pending"`).

---

## Source Files

- **DTO**: `src/task/dtos/get-my-task-progress.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts` (`getMyTaskProgressV2`)
- **Service**: `src/task/task.service.ts` (`getTaskProgressV2`)
