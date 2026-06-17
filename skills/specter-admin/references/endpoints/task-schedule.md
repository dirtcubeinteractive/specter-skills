# Admin API: `task/schedule`

**Endpoint:** `POST /v1/task/schedule`

**Tag:** Achievements

**Summary:** Schedule task

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ScheduleTaskDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `taskId` | string | ✅ | e.g. `task-uuid-12345` | Task ID to schedule |
| `startDate` | string | — | e.g. `2024-01-15T10:00:00.000Z` | Start date/time for the task (ISO 8601 format) |
| `endDate` | string | — | e.g. `2024-01-31T23:59:59.000Z` | End date/time for the task (ISO 8601 format) |
| `recurrenceFrequency` | number | — | e.g. `1` | How often the task recurs (used with intervalUnitId) |
| `intervalUnitId` | number | — | e.g. `2` | Interval unit ID (1=hours, 2=days, 3=weeks, 4=months) |
| `recurrenceCount` | number | — | e.g. `10` | Number of times the task should recur |
| `scheduleType` | string | — | `normal` \| `recurring` | Type of schedule |
| `timezone` | string | — | e.g. `America/New_York` | Timezone for the schedule (IANA timezone) |

