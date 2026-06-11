# V2 API: `client/liveops/get-competition-schedule-history`

**Endpoint:** `POST /v2/client/liveops/get-competition-schedule-history`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | **Yes** | The competition ID to get schedule history for |
| `limit` | `number` | No | Number of results to return |
| `offset` | `number` | No | Pagination offset |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Competition Schedule Details",
  "data": {
    "scheduleInstances": [
      {
        "id": "instance-uuid-1",
        "competitionId": "weekly-tournament",
        "status": "completed",
        "startDate": "2024-01-01T00:00:00.000Z",
        "endDate": "2024-01-07T23:59:59.000Z",
        "participantCount": 150,
        "results": {
          "winner": "user-uuid",
          "totalPrizeDistributed": 10000
        }
      },
      {
        "id": "instance-uuid-2",
        "competitionId": "weekly-tournament",
        "status": "in progress",
        "startDate": "2024-01-08T00:00:00.000Z",
        "endDate": "2024-01-14T23:59:59.000Z",
        "participantCount": 200,
        "results": null
      }
    ],
    "totalCount": 10
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `scheduleInstances` | `array` | Array of schedule instance objects |
| `scheduleInstances[].id` | `string` | Unique identifier for the schedule instance |
| `scheduleInstances[].competitionId` | `string` | Competition ID |
| `scheduleInstances[].status` | `string` | Instance status (yet to start, in progress, in review, completed, etc.) |
| `scheduleInstances[].startDate` | `string` | ISO timestamp when the instance starts |
| `scheduleInstances[].endDate` | `string` | ISO timestamp when the instance ends |
| `scheduleInstances[].participantCount` | `number` | Number of participants in this instance |
| `scheduleInstances[].results` | `object` | Results of the instance (if completed) |
| `totalCount` | `number` | Total number of schedule instances |

---

## Request Examples

### Example 1: Get All Instances for a Competition
**Request:**
```json
{
  "competitionId": "weekly-tournament"
}
```

### Example 2: Get Recent Instances with Pagination
**Request:**
```json
{
  "competitionId": "weekly-tournament",
  "limit": 5,
  "offset": 0
}
```

---

## Notes

- Returns the schedule history for a specific competition
- Shows all instances including past, current, and upcoming
- Useful for displaying tournament history and results
- Status values: "yet to start", "in progress", "in review", "completed", "stopped", "failed"

---

## Source Files

- **DTO**: `src/live-ops/dtos/get-competition-schedule-history.v2.dto.ts`
- **Controller**: `src/live-ops/live-ops.controller.ts`
- **Service**: `src/live-ops/live-ops.service.ts`
