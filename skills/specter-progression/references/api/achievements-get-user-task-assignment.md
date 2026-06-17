# Client API (v2): `achievements/get-user-task-assignment`

**Endpoint:** `POST /v2/client/achievements/get-user-task-assignment`

**Tag:** Achievements

**Summary:** Get user task assignment history for a task group

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetUserTaskAssignmentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `taskGroupId` | string | ✅ | e.g. `019c2d3f-5f6f-7001-a927-12090a3e9e38` | The task group ID |
| `fromDate` | string | ✅ | e.g. `2024-03-14T00:00:00.000Z` | Start date for the history range (ISO format) |
| `toDate` | string | ✅ | e.g. `2024-03-21T00:00:00.000Z` | End date for the history range (ISO format) |
| `projectId` | string | ✅ | e.g. `019ac982-8a5c-7838-a448-ddbca93bd24d` | Project ID |
| `userId` | string | — | e.g. `019b358c-0949-7ff0-8efe-e799ffb27322` | User ID for user-specific assignment history (optional) |

