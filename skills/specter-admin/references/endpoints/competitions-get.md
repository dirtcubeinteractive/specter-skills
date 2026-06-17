# Admin API: `competitions/get`

**Endpoint:** `POST /v1/competitions/get`

**Tag:** Competitions

**Summary:** Get competitions

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `FilterCompetitionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `competitionFormatTypeMasterId` | number | ✅ | e.g. `1` | Competition format type ID (1=Tournament, 2=Instant Battle) |
| `ids` | string[] | — | e.g. `["comp-uuid-1","comp-uuid-2"]` | Filter by specific competition IDs |
| `sourceTypeId` | number | — | e.g. `1` | Filter by source type ID |
| `minPlayerStart` | number | — | e.g. `2` | Minimum players range start |
| `minPlayerEnd` | number | — | e.g. `10` | Minimum players range end |
| `maxPlayerStart` | number | — | e.g. `10` | Maximum players range start |
| `maxPlayerEnd` | number | — | e.g. `100` | Maximum players range end |
| `maxEntryAllowed` | number | — | e.g. `1` | Filter by max entry allowed |
| `maxAttemptAllowed` | number | — | e.g. `3` | Filter by max attempts allowed |
| `priceType` | string | — | `RMG` \| `virtual currency` \| `IAP` | Filter by entry price type |
| `isEntryPriced` | boolean | — | e.g. `true` | Filter competitions with entry price |
| `isPrizeConfigured` | boolean | — | e.g. `true` | Filter competitions with prize configured |
| `status` | string[] | — | e.g. `["active","scheduled"]` | Filter by competition status |
| `recurrenceFrequency` | number | — | e.g. `1` | Filter by recurrence frequency |
| `intervalUnitId` | number | — | e.g. `1` | Filter by interval unit ID |
| `startDate` | string | — | e.g. `2024-01-01T00:00:00Z` | Filter by start date |
| `endDate` | string | — | e.g. `2024-12-31T23:59:59Z` | Filter by end date |
| `scheduleType` | string | — | `normal` \| `recurring` | Filter by schedule type |
| `instanceStatus` | string[] | — | e.g. `["running","completed"]` | Filter by instance status |
| `isLocked` | boolean | — | e.g. `false` | Filter locked competitions |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `battle` | Search keyword |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | `ASC` \| `DESC` | Sort order |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID to filter competitions |
| `showArchived` | boolean | — | e.g. `false` | Include archived competitions |

