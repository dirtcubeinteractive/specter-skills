# V2 API: `client/player/me/get-task-group-status-with-cooldown`

**Endpoint:** `POST /v2/client/player/me/get-task-group-status-with-cooldown`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `taskGroupIds` | `string[]` | Yes | Task group IDs (client-facing string IDs, e.g. `"daily_challenges"`) to fetch active tasks for |
| `cooldownDays` | `number` | No | Cooldown window in days for tasks the user let expire in previous cycles (default: 7) |
| `limit` | `number` | No | Number of tasks to assign/display per task group (default: 3) |
| `offset` | `number` | No | Offset into the user's active task list (default: 0) |

---

## Response Structure

**Request:**
```json
{
  "taskGroupIds": ["daily_challenges"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Active tasks retrieved successfully",
  "errors": [],
  "data": {
    "taskGroupStatuses": [
      {
        "uuid": "f3fb7752-2d58-4687-bb3a-f34f8b9dc91a",
        "id": "daily_challenges",
        "name": "Daily Challenges",
        "description": null,
        "iconUrl": null,
        "taskGroupType": "mission",
        "instanceId": null,
        "status": "pending",
        "tasks": [
          {
            "uuid": "1d3f8c50-5716-4637-8d75-c15f947abc03",
            "id": "tsk_daily_01",
            "name": "Play 1 game",
            "description": "Play any game",
            "iconUrl": null,
            "instanceId": null,
            "status": "pending"
          }
        ]
      }
    ]
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.taskGroupStatuses` | `array` | One entry per matched (active, `"in progress"`) task group |
| `taskGroupStatuses[].uuid` | `string` | Task group unique identifier (internal ID) |
| `taskGroupStatuses[].id` | `string` | Task group ID (client-facing) |
| `taskGroupStatuses[].name` | `string` | Task group display name |
| `taskGroupStatuses[].description` | `string \| null` | Task group description |
| `taskGroupStatuses[].iconUrl` | `string \| null` | URL to the task group icon |
| `taskGroupStatuses[].taskGroupType` | `string` | Task group type (e.g., `"mission"`) |
| `taskGroupStatuses[].instanceId` | `string \| null` | Task group status instance ID from TaskBus (null if no record) |
| `taskGroupStatuses[].status` | `string` | Task group status (defaults to `"pending"`) |
| `taskGroupStatuses[].tasks` | `array` | The user's currently assigned active tasks for this cycle |
| `tasks[].instanceId` | `string \| null` | Task status instance ID (null if no status record exists) |
| `tasks[].status` | `string` | Task status (defaults to `"pending"`) |

---

## Behavior Notes

- For each task group, the service maintains per-user task assignments per cycle:
  1. Tasks the user has **completed** are permanently excluded.
  2. Tasks that **expired** in previous cycles within the last `cooldownDays` are temporarily excluded (cooldown).
  3. Remaining slots (up to `limit`) are filled from the available pool using a seeded shuffle, so the selection is stable per user/cycle.
- If a task group has no active cycle (`currentStartDate` is null), it is returned with an empty `tasks` array.
- New assignments are persisted (`user_task_assignment` table) on each call as needed.

---

## Source Files

- **DTO**: `src/task/dtos/get-task-group-status-with-cooldown.dto.ts`
- **Controller**: `src/task/task.controller.ts` (`getTaskGroupStatusWithCooldown`)
- **Service**: `src/task/task.service.ts` (`getActiveTasks`)
