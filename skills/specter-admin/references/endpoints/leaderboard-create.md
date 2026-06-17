# Admin API: `leaderboard/create`

**Endpoint:** `POST /v1/leaderboard/create`

**Tag:** Leaderboards

**Summary:** Create leaderboard

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateLeaderboardDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `leaderboardId` | string | ✅ | e.g. `weekly-highscore-lb` | Custom unique identifier for the leaderboard |
| `name` | string | — | e.g. `Weekly High Score` | Display name of the leaderboard |
| `description` | string | — | e.g. `Compete for the highest weekly score` | Description of the leaderboard |
| `iconUrl` | string | — | e.g. `https://example.com/icon.png` | URL for the leaderboard icon |
| `leaderboardOutcomeDetails` | any[] | ✅ |  | Leaderboard outcome configuration details |
| `gameId` | string | — | e.g. `game-uuid-12345` | Game ID this leaderboard belongs to |
| `prizeDistributionOffset` | number | — | e.g. `30` | Offset in minutes before prize distribution |
| `active` | boolean | — | e.g. `true` | Whether the leaderboard is active |
| `archive` | boolean | — | e.g. `false` | Whether the leaderboard is archived |
| `meta` | object | — | e.g. `{"category":"competitive"}` | Custom metadata for the leaderboard |
| `tags` | string[] | — | e.g. `["weekly","competitive"]` | Tags for categorization |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this leaderboard belongs to |
| `matchId` | string | — | e.g. `match-uuid-12345` | Match ID to associate with the leaderboard |
| `leaderboardOutcomeTypeMasterId` | number | — | e.g. `1` | Leaderboard outcome type master ID |
| `sourceTypeId` | number | — | e.g. `1` | Source type ID for the leaderboard |
| `competitionId` | string | — | e.g. `comp-uuid-12345` | Competition ID if part of a competition |
| `customStatisticId` | string | — | e.g. `stat-uuid-12345` | Custom statistic ID for scoring |
| `defaultStatisticId` | string | — | e.g. `default-stat-uuid` | Default statistic ID for scoring |
| `prizeDistributionRule` | PrizeDistributionRuleDto[] | — | see below | Prize distribution rules for rankings |


### Nested object: `PrizeDistributionRuleDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `startRank` | number | ✅ | e.g. `1` | Starting rank for this prize tier |
| `endRank` | number | — | e.g. `3` | Ending rank for this prize tier |
| `rewards` | any[] | — |  | Array of rewards for this tier |
