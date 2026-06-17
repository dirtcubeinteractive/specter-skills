# Admin API: `live-ops/schedule`

**Endpoint:** `POST /v1/live-ops/schedule`

**Tag:** Live Ops

**Summary:** Schedule live ops

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ScheduleLiveOpsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `scheduledId` | string | — | e.g. `schedule-001` | Custom schedule identifier |
| `id` | string | — | e.g. `1` | Internal ID for updates |
| `projectId` | string | — | e.g. `proj-uuid-12345` | Project ID |
| `startDate` | string | — | e.g. `2024-01-15T10:00:00.000Z` | Start date of the live ops event |
| `endDate` | string | — | e.g. `2024-01-22T10:00:00.000Z` | End date of the live ops event |
| `categoryId` | number | — | e.g. `1` | Category ID for the live ops event |
| `recurrenceCount` | number | — | e.g. `4` | Number of times to recur |
| `scheduleType` | string | — | e.g. `recurring` | Type of schedule (normal or recurring) |
| `intervalUnitId` | number | — | e.g. `3` | Interval unit ID (1=hourly, 2=daily, 3=weekly, 4=monthly) |
| `recurrenceFrequency` | number | — | e.g. `1` | Frequency of recurrence |
| `offset` | number | — | e.g. `30` | Offset in minutes for prize distribution |
| `archive` | boolean | — | e.g. `false` | Whether the schedule is archived |
| `meta` | object | — | e.g. `{"priority":"high"}` | Custom metadata |
| `tags` | string[] | — | e.g. `["weekly","tournament"]` | Tags for categorization |
| `competitionId` | string | — | e.g. `comp-uuid-12345` | Competition ID to schedule |
| `leaderboardId` | string | — | e.g. `lb-uuid-12345` | Leaderboard ID to schedule |
| `timezone` | string | — | e.g. `UTC` | Timezone for the schedule |

