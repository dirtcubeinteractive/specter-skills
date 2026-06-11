# V2 API: `client/player/me/get-time-series-progress`

**Endpoint:** `POST /v2/client/player/me/get-time-series-progress`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `taskGroupIds` | `string[]` | No | Filter by specific time-series task group IDs (internal UUIDs) |
| `scheduleStatuses` | `string[]` | No | Filter by schedule status (default: `"in progress"`) |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

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
  "message": "Time series progress data",
  "errors": [],
  "data": {
    "timeSeriesProgresses": [
      {
        "uuid": "9254a03c-4039-4499-a6bb-71e2174ff446",
        "id": "tgrp_login_streak",
        "name": "7-Day Login Streak",
        "description": "Log in every day to keep your streak",
        "iconUrl": null,
        "currentTask": {
          "uuid": "f99ce5f6-74d4-4126-876b-3bef92bd48e1",
          "id": "tsk_login_streak_03",
          "name": "Day 3 Login",
          "description": null,
          "iconUrl": null,
          "instanceId": "06f7cae7-e0fb-4b6d-86c3-edaefdb789be",
          "status": "in_progress"
        }
      }
    ],
    "totalCount": 5
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.timeSeriesProgresses` | `array` | One entry per time-series task group |
| `timeSeriesProgresses[].uuid` | `string` | Task group unique identifier (internal ID) |
| `timeSeriesProgresses[].id` | `string` | Task group ID (client-facing) |
| `timeSeriesProgresses[].name` | `string` | Task group display name |
| `timeSeriesProgresses[].description` | `string \| null` | Task group description |
| `timeSeriesProgresses[].iconUrl` | `string \| null` | URL to the task group icon |
| `timeSeriesProgresses[].currentTask` | `object \| null` | The user's current stage in the series (null if the series ended) |
| `currentTask.instanceId` | `string \| null` | Latest time-series progress record ID (null if no progress yet) |
| `currentTask.status` | `string` | `"in_progress"` or `"completed"` (mirrors the series status) |
| `data.totalCount` | `number` | Total count of active time-series task groups in the project |

---

## Behavior Notes

- Only time-series task groups (`typeId = 3`) are returned. Without `scheduleStatuses`, only groups with status `"in progress"` are included.
- `currentTask` is resolved from the user's latest stage record: completed middle stage → next stage; missed stage → next stage or restart depending on the series reset configuration; completed last stage → series `completed` (or restarts from stage 1 if the series allows reset on end).
- Task status for time-series tasks is derived from the series progress, not from TaskBus.

---

## Source Files

- **DTO**: `src/task/dtos/get-time-series-progress.dto.ts` (`GetMyTimeSeriesProgressDto`)
- **Controller**: `src/task/task.controller.ts` (`getMyTimeSeriesProgress`)
- **Service**: `src/task/task.service.ts` (`getTimeSeriesProgress`)
