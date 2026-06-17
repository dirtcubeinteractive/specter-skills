# Admin API: `task-group/get`

**Endpoint:** `POST /v1/task-group/get`

**Tag:** Achievements

**Summary:** Get task groups

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetTaskGroupAdminDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | ✅ | e.g. `[]` | Array of task group IDs to filter by (empty array for all) |
| `type` | string | — | e.g. `mission` | Task group type name filter |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get task groups for |
| `search` | string | — | e.g. `weekly` | Search query for task group name |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Number of results to return |
| `typeId` | number | ✅ | e.g. `1` | Task group type ID (1=Mission, 2=Step Series, 3=Time Series) |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `DESC` | Sort order (ASC or DESC) |
| `status` | string[] | — | e.g. `["active","inactive"]` | Filter by task group status |
| `instanceStatus` | string[] | — | e.g. `["in progress","yet to start"]` | Filter by instance status |
| `recurrenceFrequency` | number | — | e.g. `1` | Recurrence frequency for recurring task groups |
| `intervalUnitId` | number | — | e.g. `1` | Interval unit ID for recurrence |
| `startDate` | string | — | e.g. `2024-01-01T00:00:00.000Z` | Filter by start date (ISO 8601 format) |
| `endDate` | string | — | e.g. `2024-12-31T23:59:59.000Z` | Filter by end date (ISO 8601 format) |
| `scheduleType` | string | — | `normal` \| `recurring` | Schedule type filter |
| `showArchived` | boolean | — | e.g. `false` | Include archived task groups |

