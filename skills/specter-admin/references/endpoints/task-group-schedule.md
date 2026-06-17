# Admin API: `task-group/schedule`

**Endpoint:** `POST /v1/task-group/schedule`

**Tag:** Achievements

**Summary:** Schedule task group

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ScheduleTaskGroupDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `taskGroupId` | string | ✅ | e.g. `taskgroup-uuid-12345` | Task group ID to schedule |
| `startDate` | string | — | e.g. `2024-01-15T10:00:00.000Z` | Start date/time for the task group (ISO 8601 format) |
| `endDate` | string | — | e.g. `2024-01-31T23:59:59.000Z` | End date/time for the task group (ISO 8601 format) |
| `recurrenceFrequency` | number | — | e.g. `1` | How often the task group recurs (used with intervalUnitId) |
| `intervalUnitId` | number | — | e.g. `2` | Interval unit ID (1=hours, 2=days, 3=weeks, 4=months) |
| `recurrenceCount` | number | — | e.g. `10` | Number of times the task group should recur |
| `scheduleType` | string | — | `normal` \| `recurring` | Type of schedule |
| `timezone` | string | — | e.g. `America/New_York` | Timezone for the schedule (IANA timezone) |

