# V2 API: `client/achievements/get-user-task-assignment`

**Endpoint:** `POST /v2/client/achievements/get-user-task-assignment`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `taskGroupId` | `string` | Yes | The task group ID (internal UUID) |
| `fromDate` | `string` | Yes | Start date for the history range (ISO format) |
| `toDate` | `string` | Yes | End date for the history range (ISO format) |
| `projectId` | `string` | Yes | Project ID (required by DTO validation) |
| `userId` | `string` | No | User ID for user-specific assignment history; omit to get assignments across all users |

---

## Response Structure

**Request:**
```json
{
  "taskGroupId": "019c2d3f-5f6f-7001-a927-12090a3e9e38",
  "fromDate": "2024-03-14T00:00:00.000Z",
  "toDate": "2024-03-21T00:00:00.000Z",
  "projectId": "019ac982-8a5c-7838-a448-ddbca93bd24d",
  "userId": "019b358c-0949-7ff0-8efe-e799ffb27322"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "User task assignment history retrieved successfully",
  "errors": [],
  "data": {
    "taskGroupConfig": {
      "currentStartDate": "2024-03-14T00:00:00.000Z",
      "currentEndDate": "2024-03-21T00:00:00.000Z",
      "noOfMissionsPerCycle": 3
    },
    "expiredTasks": [
      {
        "cycleStartDate": "2024-03-14T00:00:00.000Z",
        "taskId": "1d3f8c50-5716-4637-8d75-c15f947abc03"
      }
    ]
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.taskGroupConfig` | `object` | Current cycle configuration of the task group |
| `taskGroupConfig.currentStartDate` | `string \| null` | Current cycle start date |
| `taskGroupConfig.currentEndDate` | `string \| null` | Current cycle end date |
| `taskGroupConfig.noOfMissionsPerCycle` | `number \| null` | Number of missions assigned per cycle |
| `data.expiredTasks` | `array` | Assignment/expiry records within the requested date range, ordered by `cycleStartDate` ascending |
| `expiredTasks[].cycleStartDate` | `string` | Cycle start date of the record |
| `expiredTasks[].taskId` | `string` | Task ID (internal UUID) |

---

## Notes

- When `userId` is provided, only that user's assignment history is returned; otherwise records for all users in the range are returned.

---

## Source Files

- **DTO**: `src/task/dtos/get-user-task-assignment.dto.ts`
- **Controller**: `src/task/task.controller.ts` (`getUserTaskAssignment`)
- **Service**: `src/task/task.service.ts` (`getUserTaskAssignment`)
- **Model**: `src/task/models/user-task-assignment.model.ts`
