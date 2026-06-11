# V2 API: `client/player/get-task-group-status`

**Endpoint:** `POST /v2/client/player/get-task-group-status`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | User ID of the player to fetch task group status for |
| `taskGroupIds` | `string[]` | No | Filter by specific task group IDs (mutually exclusive with `taskGroupTypes`) |
| `taskGroupTypes` | `string[]` | No | Filter by task group types, e.g. `["mission", "step_series", "time_series"]` (mutually exclusive with `taskGroupIds`) |
| `attributes` | `string[]` | No | Additional fields to include, e.g. `["tasks"]` to include nested task statuses |
| `scheduleStatuses` | `string[]` | No | Filter by schedule status (e.g., `["in progress"]`) |
| `includeInactiveTasks` | `boolean` | No | Include inactive tasks within the groups |
| `tags` | `string[]` | No | Filter task groups by tags |
| `limit` | `number` | No | Pagination limit |
| `offset` | `number` | No | Pagination offset |

**Validation rule:** `taskGroupIds` and `taskGroupTypes` cannot both be provided in the same request (`IsTaskGroupIdsOrTaskGroupTypesPresent` validator). Provide neither, or exactly one.

---

## Response Structure

**Request:**
```json
{
  "userId": "player-123",
  "attributes": ["tasks"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Others Task Group Status List",
  "errors": [],
  "data": {
    "taskGroupStatuses": [
      {
        "uuid": "f3fb7752-2d58-4687-bb3a-f34f8b9dc91a",
        "id": "tgrp_00100",
        "name": "Daily Missions Common",
        "description": null,
        "iconUrl": null,
        "taskGroupType": "mission",
        "tasks": [
          {
            "uuid": "1d3f8c50-5716-4637-8d75-c15f947abc03",
            "id": "tsk_tgrp_00100_00029",
            "name": "Use a full body skin",
            "description": "Equip a full body skin for your avatar!",
            "iconUrl": null,
            "instanceId": null,
            "status": "pending"
          }
        ],
        "instanceId": null,
        "status": "pending"
      }
    ]
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.taskGroupStatuses` | `array` | Array of task group status objects for the specified player |
| `taskGroupStatuses[].uuid` | `string` | Task group unique identifier (internal ID) |
| `taskGroupStatuses[].id` | `string` | Task group ID (client-facing) |
| `taskGroupStatuses[].name` | `string` | Task group display name |
| `taskGroupStatuses[].description` | `string \| null` | Task group description |
| `taskGroupStatuses[].iconUrl` | `string \| null` | URL to the task group icon |
| `taskGroupStatuses[].taskGroupType` | `string` | Type: `"mission"`, `"step_series"`, or `"time_series"` |
| `taskGroupStatuses[].tasks` | `array` | Nested task statuses (included with `attributes: ["tasks"]`) |
| `taskGroupStatuses[].instanceId` | `string \| null` | Task group status instance ID (null if no status record exists) |
| `taskGroupStatuses[].status` | `string` | Task group status (defaults to `"pending"` if no record) |

---

## Notes

- Same behavior as `client/player/me/get-task-group-status`, except the target player is specified by `userId` instead of being resolved from the bearer token.

---

## Source Files

- **DTO**: `src/task/dtos/get-others-task-group-status.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts` (`getOthersTaskGroupStatusV2`)
- **Service**: `src/task/task.service.ts` (`getTaskGroupStatusV2`)
- **Swagger**: `src/task/task.swagger.ts` (`GetPlayerTaskGroupStatusV2SuccessResponse`)
