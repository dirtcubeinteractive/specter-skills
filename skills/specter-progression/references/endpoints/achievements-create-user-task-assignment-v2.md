# V2 API: `client/achievements/create-user-task-assignment`

**Endpoint:** `POST /v2/client/achievements/create-user-task-assignment`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

The body is an inline object (no class-validator DTO); all fields are used by the service and should be provided.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | User ID (UUID) the assignment record belongs to |
| `taskId` | `string` | Yes | Task ID (internal UUID) |
| `taskGroupId` | `string` | Yes | Task group ID (internal UUID) |
| `cycleStartDate` | `string` | Yes | Cycle start date the assignment belongs to (ISO format) |

---

## Response Structure

**Request:**
```json
{
  "userId": "019b358c-0949-7ff0-8efe-e799ffb27322",
  "taskId": "1d3f8c50-5716-4637-8d75-c15f947abc03",
  "taskGroupId": "f3fb7752-2d58-4687-bb3a-f34f8b9dc91a",
  "cycleStartDate": "2024-03-14T00:00:00.000Z"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "User task assignment record created successfully",
  "errors": [],
  "data": {
    "id": "019c2d3f-5f6f-7001-a927-12090a3e9e38",
    "userId": "019b358c-0949-7ff0-8efe-e799ffb27322",
    "taskId": "1d3f8c50-5716-4637-8d75-c15f947abc03",
    "taskGroupId": "f3fb7752-2d58-4687-bb3a-f34f8b9dc91a",
    "cycleStartDate": "2024-03-14T00:00:00.000Z",
    "createdAt": "2024-03-14T10:30:00.000Z",
    "updatedAt": "2024-03-14T10:30:00.000Z"
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `object` | The created (or already existing) `UserTaskAssignment` record |
| `data.id` | `string` | Assignment record UUID |
| `data.userId` | `string` | User the assignment belongs to |
| `data.taskId` | `string` | Task (internal UUID) |
| `data.taskGroupId` | `string` | Task group (internal UUID) |
| `data.cycleStartDate` | `string` | Cycle start date for the assignment |
| `data.createdAt` / `data.updatedAt` | `string` | Record timestamps |

---

## Notes

- The service uses `findOrCreate` on the unique key (`taskGroupId`, `cycleStartDate`, `taskId`, `userId`) — calling this twice with the same payload is idempotent and returns the existing record.
- This records a task expiry/assignment for a user within a cycle; it is used by the cooldown-aware task rotation (`get-task-group-status-with-cooldown`).

---

## Source Files

- **DTO**: inline body type in `src/task/task.controller.ts` (`createUserTaskAssignment`)
- **Controller**: `src/task/task.controller.ts` (`createUserTaskAssignment`)
- **Service**: `src/task/task.service.ts` (`createUserTaskAssignment`)
- **Model**: `src/task/models/user-task-assignment.model.ts`
