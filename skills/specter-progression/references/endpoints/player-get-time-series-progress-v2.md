# V2 API: `client/player/get-time-series-progress`

**Endpoint:** `POST /v2/client/player/get-time-series-progress`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` (UUID) | Yes | User ID of the player to fetch time-series progress for |
| `taskGroupIds` | `string[]` | No | Filter by specific time-series task group IDs (internal UUIDs) |
| `scheduleStatuses` | `string[]` | No | Filter by schedule status (default: `"in progress"`) |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

**Request:**
```json
{
  "userId": "019b358c-0949-7ff0-8efe-e799ffb27322"
}
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
| `timeSeriesProgresses[].currentTask` | `object \| null` | The player's current stage in the series (null if the series ended) |
| `currentTask.instanceId` | `string \| null` | Latest time-series progress record ID (null if no progress yet) |
| `currentTask.status` | `string` | `"in_progress"` or `"completed"` (mirrors the series status) |
| `data.totalCount` | `number` | Total count of active time-series task groups in the project |

---

## Notes

- Same behavior as `client/player/me/get-time-series-progress`, except the target player is specified by `userId` (must be a UUID) instead of being resolved from the bearer token.

---

## Source Files

- **DTO**: `src/task/dtos/get-time-series-progress.dto.ts` (`GetTimeSeriesProgressDto`)
- **Controller**: `src/task/task.controller.ts` (`getTimeSeriesProgress`)
- **Service**: `src/task/task.service.ts` (`getTimeSeriesProgress`)
- **Swagger**: `src/task/task.swagger.ts` (`GetPlayerTimeSeriesProgressV2Body`)
