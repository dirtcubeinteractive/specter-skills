# Admin API: `leaderboard/update`

**Endpoint:** `POST /v1/leaderboard/update`

**Tag:** Leaderboards

**Summary:** Update leaderboard

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateLeaderboardDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `lb-uuid-12345` | Internal database ID of the leaderboard to update |
| `leaderboardId` | string | — | e.g. `weekly-highscore-lb-v2` | Updated custom unique identifier |
| `name` | string | — | e.g. `Weekly High Score Updated` | Updated display name |
| `description` | string | — | e.g. `Updated leaderboard description` | Updated description |
| `iconUrl` | string | — | e.g. `https://example.com/new-icon.png` | Updated icon URL |
| `leaderboardOutcomeDetails` | any[] | — |  | Updated leaderboard outcome configuration |
| `gameId` | string | — | e.g. `game-uuid-12345` | Updated game ID |
| `active` | boolean | — | e.g. `true` | Whether the leaderboard is active |
| `archive` | boolean | — | e.g. `false` | Whether the leaderboard is archived |
| `meta` | object | — | e.g. `{"category":"competitive"}` | Updated custom metadata |
| `tags` | string[] | — | e.g. `["weekly","updated"]` | Updated tags |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `matchId` | string | — | e.g. `match-uuid-12345` | Updated match ID |
| `leaderboardOutcomeTypeMasterId` | number | — | e.g. `1` | Updated leaderboard outcome type master ID |
| `sourceTypeId` | number | — | e.g. `1` | Updated source type ID |
| `customStatisticId` | string | — | e.g. `stat-uuid-12345` | Updated custom statistic ID |
| `defaultStatisticId` | string | — | e.g. `default-stat-uuid` | Updated default statistic ID |
| `prizeDistributionRule` | PrizeDistributionRuleDto[] | — | see below | Updated prize distribution rules |


### Nested object: `PrizeDistributionRuleDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `startRank` | number | ✅ | e.g. `1` | Starting rank for this prize tier |
| `endRank` | number | — | e.g. `3` | Ending rank for this prize tier |
| `rewards` | any[] | — |  | Array of rewards for this tier |
