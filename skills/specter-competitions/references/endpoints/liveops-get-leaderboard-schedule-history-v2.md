# V2 API: `client/liveops/get-leaderboard-schedule-history`

**Endpoint:** `POST /v2/client/liveops/get-leaderboard-schedule-history`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leaderboardId` | `string` | **Yes** | The leaderboard ID to get schedule history for |
| `limit` | `number` | No | Number of instances to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Leaderboard Schedule Details",
  "data": {
    "firstInstanceStartDate": "2024-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2024-01-07T23:59:59.000Z",
    "intervalUnit": "weekly",
    "intervalLength": 1,
    "occurrences": 52,
    "isRecurring": true,
    "leaderboard": {
      "uuid": "leaderboard-internal-uuid",
      "id": "weekly-high-scores",
      "name": "Weekly High Scores",
      "description": "Compete for the top spot each week",
      "iconUrl": "https://cdn.example.com/leaderboard.png"
    },
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid-1",
      "status": "in progress",
      "instanceStartDate": "2024-01-08T00:00:00.000Z",
      "instanceEndDate": "2024-01-14T23:59:59.000Z"
    },
    "instances": [
      {
        "instanceId": "instance-uuid-1",
        "status": "in progress",
        "instanceStartDate": "2024-01-08T00:00:00.000Z",
        "instanceEndDate": "2024-01-14T23:59:59.000Z"
      },
      {
        "instanceId": "instance-uuid-2",
        "status": "completed",
        "instanceStartDate": "2024-01-01T00:00:00.000Z",
        "instanceEndDate": "2024-01-07T23:59:59.000Z"
      }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.firstInstanceStartDate` | `string` | ISO timestamp of the first instance start |
| `data.firstInstanceEndDate` | `string` | ISO timestamp of the first instance end |
| `data.intervalUnit` | `string` | Interval unit (daily, weekly, monthly, etc.) or null |
| `data.intervalLength` | `number` | Recurrence frequency or null |
| `data.occurrences` | `number` | Total number of occurrences or null |
| `data.isRecurring` | `boolean` | Whether the schedule is recurring |
| `data.leaderboard` | `object` | Leaderboard details |
| `leaderboard.uuid` | `string` | Leaderboard internal unique identifier |
| `leaderboard.id` | `string` | Leaderboard ID (client-facing) |
| `leaderboard.name` | `string` | Leaderboard display name |
| `leaderboard.description` | `string` | Leaderboard description |
| `leaderboard.iconUrl` | `string` | URL to leaderboard icon |
| `data.currentInstanceSchedule` | `object` | Current/most recent instance details or null |
| `currentInstanceSchedule.instanceId` | `string` | Instance unique identifier |
| `currentInstanceSchedule.status` | `string` | Instance status |
| `currentInstanceSchedule.instanceStartDate` | `string` | ISO timestamp of instance start |
| `currentInstanceSchedule.instanceEndDate` | `string` | ISO timestamp of instance end |
| `data.instances` | `array` | Array of schedule instance objects (paginated) |

---

## Request/Response Examples

### Example 1: Get Schedule History for a Leaderboard
**Request:**
```json
{
  "leaderboardId": "weekly-high-scores"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Leaderboard Schedule Details",
  "data": {
    "firstInstanceStartDate": "2024-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2024-01-07T23:59:59.000Z",
    "intervalUnit": "weekly",
    "intervalLength": 1,
    "occurrences": 52,
    "isRecurring": true,
    "leaderboard": {
      "uuid": "leaderboard-uuid-1",
      "id": "weekly-high-scores",
      "name": "Weekly High Scores",
      "description": "Compete for the top spot each week",
      "iconUrl": "https://cdn.example.com/leaderboard.png"
    },
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid-1",
      "status": "in progress",
      "instanceStartDate": "2024-01-08T00:00:00.000Z",
      "instanceEndDate": "2024-01-14T23:59:59.000Z"
    },
    "instances": [
      {
        "instanceId": "instance-uuid-1",
        "status": "in progress",
        "instanceStartDate": "2024-01-08T00:00:00.000Z",
        "instanceEndDate": "2024-01-14T23:59:59.000Z"
      },
      {
        "instanceId": "instance-uuid-2",
        "status": "completed",
        "instanceStartDate": "2024-01-01T00:00:00.000Z",
        "instanceEndDate": "2024-01-07T23:59:59.000Z"
      }
    ]
  },
  "errors": []
}
```

### Example 2: Get Schedule History with Pagination
**Request:**
```json
{
  "leaderboardId": "weekly-high-scores",
  "limit": 5,
  "offset": 0
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Leaderboard Schedule Details",
  "data": {
    "firstInstanceStartDate": "2024-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2024-01-07T23:59:59.000Z",
    "intervalUnit": "weekly",
    "intervalLength": 1,
    "occurrences": 52,
    "isRecurring": true,
    "leaderboard": {
      "uuid": "leaderboard-uuid-1",
      "id": "weekly-high-scores",
      "name": "Weekly High Scores",
      "description": "Compete for the top spot each week",
      "iconUrl": "https://cdn.example.com/leaderboard.png"
    },
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid-1",
      "status": "in progress",
      "instanceStartDate": "2024-01-08T00:00:00.000Z",
      "instanceEndDate": "2024-01-14T23:59:59.000Z"
    },
    "instances": [
      {
        "instanceId": "instance-uuid-1",
        "status": "in progress",
        "instanceStartDate": "2024-01-08T00:00:00.000Z",
        "instanceEndDate": "2024-01-14T23:59:59.000Z"
      }
    ]
  },
  "errors": []
}
```

### Example 3: Non-Recurring Schedule
**Request:**
```json
{
  "leaderboardId": "one-time-event"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Leaderboard Schedule Details",
  "data": {
    "firstInstanceStartDate": "2024-06-01T00:00:00.000Z",
    "firstInstanceEndDate": "2024-06-30T23:59:59.000Z",
    "intervalUnit": null,
    "intervalLength": null,
    "occurrences": null,
    "isRecurring": false,
    "leaderboard": {
      "uuid": "leaderboard-uuid-2",
      "id": "one-time-event",
      "name": "Summer Championship",
      "description": "A one-time summer event",
      "iconUrl": "https://cdn.example.com/summer.png"
    },
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid-10",
      "status": "completed",
      "instanceStartDate": "2024-06-01T00:00:00.000Z",
      "instanceEndDate": "2024-06-30T23:59:59.000Z"
    },
    "instances": [
      {
        "instanceId": "instance-uuid-10",
        "status": "completed",
        "instanceStartDate": "2024-06-01T00:00:00.000Z",
        "instanceEndDate": "2024-06-30T23:59:59.000Z"
      }
    ]
  },
  "errors": []
}
```

---

## Notes

- Returns the schedule history for a specific leaderboard
- `currentInstanceSchedule` shows the most recent instance (current or latest)
- `instances` array is paginated and ordered by startDate descending
- Status values: "yet to start", "in progress", "in review", "completed", "stopped", "failed"
- `isRecurring` is true when scheduleType is "recurring"

---

## Error Scenarios

| Error | Description | Error Code |
|-------|-------------|------------|
| Leaderboard not found | The specified leaderboardId does not exist | 1026 |
| Schedule not found | No schedule exists for this leaderboard | 1026 |

---

## Source Files

- **DTO**: `src/live-ops/dtos/get-leaderboard-schedule-history.v2.dto.ts`
- **Controller**: `src/live-ops/live-ops.controller.ts`
- **Service**: `src/live-ops/live-ops.service.ts`
