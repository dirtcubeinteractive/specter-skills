# Admin API: `leaderboard/get`

**Endpoint:** `POST /v1/leaderboard/get`

**Tag:** Leaderboards

**Summary:** Get leaderboards

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetLeaderboardDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["lb-uuid-1","lb-uuid-2"]` | Array of leaderboard IDs to filter by |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `weekly` | Search keyword to filter by name |
| `sourceTypeId` | number | — | e.g. `1` | Filter by source type ID |
| `leaderboardOutcomeTypeMasterId` | number | — | e.g. `1` | Filter by leaderboard outcome type master ID |
| `isRecurring` | boolean | — | e.g. `true` | Filter by recurring status |
| `isPrizeConfigured` | boolean | — | e.g. `true` | Filter by prize configuration status |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `desc` | Sort order (asc or desc) |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get leaderboards for |
| `status` | string[] | — | e.g. `["active","scheduled"]` | Filter by status |
| `recurrenceFrequency` | number | — | e.g. `7` | Filter by recurrence frequency |
| `intervalUnitId` | number | — | e.g. `1` | Filter by interval unit ID |
| `startDate` | string | — | e.g. `2024-01-01` | Filter by start date |
| `endDate` | string | — | e.g. `2024-12-31` | Filter by end date |
| `scheduleType` | string | — | `normal` \| `recurring` | Filter by schedule type |
| `instanceStatus` | string[] | — | e.g. `["live","upcoming"]` | Filter by instance status |
| `showArchived` | boolean | — | e.g. `false` | Whether to include archived leaderboards |

