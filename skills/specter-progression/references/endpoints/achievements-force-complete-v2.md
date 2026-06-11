# V2 API: `client/achievements/force-complete`

**Endpoint:** `POST /v2/client/achievements/force-complete`

**Authentication:** User Auth Guard Required

---

## Description

Force completes a task/achievement for the authenticated user. This bypasses normal completion criteria and immediately marks the task as complete.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `taskIds` | `string[]` | Yes | Array containing exactly 1 task ID (min size: 1, max size: 1) |
| `getRewardDataInResponse` | `boolean` | No | If true, includes full reward details in response |
| `customParams` | `object` | No | Custom parameters for task validation |

---

## Response Structure

### Success Response (with `getRewardDataInResponse: true`)
```json
{
  "status": "success",
  "code": 200,
  "message": "Force Complete Task List",
  "errors": [],
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "id": "task-123",
      "name": "Daily Login",
      "description": "Log in to receive rewards",
      "iconUrl": "https://cdn.example.com/task-icon.png",
      "taskGroupDetails": {
        "uuid": "group-uuid",
        "id": "taskgroup-123",
        "name": "Daily Challenges",
        "description": "Complete daily tasks",
        "iconUrl": "https://cdn.example.com/group-icon.png",
        "taskGroupType": "mission"
      },
      "rewardDetails": {
        "items": [
          {
            "uuid": "item-uuid",
            "id": "item-123",
            "name": "Reward Box",
            "description": "Contains random rewards",
            "iconUrl": "https://cdn.example.com/item.png",
            "rarity": {
              "id": "rarity-uuid",
              "name": "Common"
            },
            "amount": 1
          }
        ],
        "bundles": [],
        "currencies": [
          {
            "uuid": "currency-uuid",
            "id": "gold-coins",
            "name": "Gold Coins",
            "description": "In-game currency",
            "iconUrl": "https://cdn.example.com/gold.png",
            "rarity": null,
            "code": "GLD",
            "type": "soft",
            "amount": 500
          }
        ],
        "progressionMarkers": [
          {
            "uuid": "marker-uuid",
            "id": "player-xp",
            "name": "Experience",
            "description": "Player experience points",
            "iconUrl": "https://cdn.example.com/xp.png",
            "amount": 100
          }
        ]
      }
    }
  ]
}
```

### Success Response (with `getRewardDataInResponse: false` or omitted)
Base fields are still returned, but `rewardDetails` is **not included**:
```json
{
  "status": "success",
  "code": 200,
  "message": "Force Complete Task List",
  "errors": [],
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "id": "task-123",
      "name": "Daily Login",
      "description": "Log in to receive rewards",
      "iconUrl": "https://cdn.example.com/task-icon.png",
      "taskGroupDetails": {
        "uuid": "group-uuid",
        "id": "taskgroup-123",
        "name": "Daily Challenges",
        "description": "Complete daily tasks",
        "iconUrl": "https://cdn.example.com/group-icon.png",
        "taskGroupType": "mission"
      }
    }
  ]
}
```
**Note:** The `rewardDetails` key is NOT present in this response.

### Already Completed Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Task is already completed",
  "errors": [],
  "data": []
}
```

### Task Group Already Completed Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Task Group is already completed",
  "errors": [],
  "data": []
}
```

---

## Request Examples

### Example 1: Basic Force Complete
**Request:**
```json
{
  "taskIds": ["task-123"]
}
```
**Effect:** Marks task-123 as completed. Returns task data with base fields (no `rewardDetails`).

---

### Example 2: Force Complete with Reward Data
**Request:**
```json
{
  "taskIds": ["task-123"],
  "getRewardDataInResponse": true
}
```
**Effect:** Marks task-123 as completed and returns full task and reward details.

---

### Example 3: With Custom Params
**Request:**
```json
{
  "taskIds": ["task-123"],
  "getRewardDataInResponse": true,
  "customParams": {
    "source": "admin_grant",
    "reason": "compensation"
  }
}
```
**Effect:** Marks task as completed with custom parameters for tracking.

---

## Response Fields

### Task Object (always returned on success)

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Database UUID of the task |
| `id` | `string` | Task ID |
| `name` | `string` | Task name |
| `description` | `string` | Task description |
| `iconUrl` | `string` | Task icon URL |
| `taskGroupDetails` | `object \| null` | Task group info if task belongs to a group |
| `rewardDetails` | `object` | **Only included when `getRewardDataInResponse: true`** |

### Reward Details Object (only when `getRewardDataInResponse: true`)

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | Inventory items granted |
| `bundles` | `array` | Inventory bundles granted |
| `currencies` | `array` | Currencies granted |
| `progressionMarkers` | `array` | Progression points/XP granted |

---

## Possible Messages

| Message | Meaning |
|---------|---------|
| `"Force Complete Task List"` | Task successfully completed |
| `"Task is already completed"` | Task was already completed before |
| `"Task Group is already completed"` | Task's group is already completed |

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| taskIds not provided | Validation error |
| taskIds empty array | Array must contain at least 1 element |
| taskIds more than 1 element | Array must contain at most 1 element |
| Task not found | Task not found |
| Task not in progress | Task must be in progress status |

---

## Source Files

- **DTO**: `src/task/dtos/force-complete-task.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:954-989`
- **Service**: `src/task/task.service.ts:13093-13389`
