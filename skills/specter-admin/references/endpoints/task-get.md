# Admin API: `task/get`

**Endpoint:** `POST /v1/task/get`

**Tag:** Achievements

**Summary:** Get tasks

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetTaskDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["task-uuid-1","task-uuid-2"]` | Filter by specific task IDs |
| `type` | string | — | `static` \| `daily` | Filter by task type |
| `defaultEventIds` | string[] | — | e.g. `["event-uuid-1"]` | Filter by default event IDs |
| `customEventIds` | string[] | — | e.g. `["custom-event-uuid-1"]` | Filter by custom event IDs |
| `search` | string | — | e.g. `daily` | Search keyword |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID to filter tasks |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | `ASC` \| `DESC` | Sort order |
| `status` | string[] | — | e.g. `["active","scheduled"]` | Filter by task status |
| `recurrenceFrequency` | number | — | e.g. `1` | Filter by recurrence frequency |
| `intervalUnitId` | number | — | e.g. `1` | Filter by interval unit ID |
| `startDate` | string | — | e.g. `2024-01-01T00:00:00Z` | Filter by start date |
| `endDate` | string | — | e.g. `2024-12-31T23:59:59Z` | Filter by end date |
| `scheduleType` | string | — | `normal` \| `recurring` | Filter by schedule type |
| `instanceStatus` | string[] | — | e.g. `["running","completed"]` | Filter by instance status |
| `showArchived` | boolean | — | e.g. `false` | Include archived tasks |

