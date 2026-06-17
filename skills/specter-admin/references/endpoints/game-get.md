# Admin API: `game/get`

**Endpoint:** `POST /v1/game/get`

**Tag:** Games

**Summary:** Get games

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetGameDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["game-uuid-1","game-uuid-2"]` | Filter by specific game IDs |
| `isGameScreenOrientationLandscape` | boolean | — | e.g. `true` | Filter by screen orientation |
| `isDefault` | boolean | — | e.g. `false` | Filter by default games |
| `genres` | string[] | — | e.g. `["puzzle","action"]` | Filter by genre names |
| `platforms` | string[] | — | e.g. `["Android","iOS"]` | Filter by platform names |
| `locations` | string[] | — | e.g. `["US","IN"]` | Filter by location codes |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `puzzle` | Search keyword |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | `ASC` \| `DESC` | Sort order |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID to filter games |
| `showArchived` | boolean | — | e.g. `false` | Include archived games |

