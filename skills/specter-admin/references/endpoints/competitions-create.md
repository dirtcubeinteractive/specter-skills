# Admin API: `competitions/create`

**Endpoint:** `POST /v1/competitions/create`

**Tag:** Competitions

**Summary:** Create competition

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateCompetitionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `competitionId` | string | ✅ | e.g. `comp-weekly-battle-001` | Unique competition identifier |
| `name` | string | ✅ | e.g. `Weekly Battle Royale` | Competition display name |
| `description` | string | — | e.g. `A weekly competition where players compete fo…` | Competition description |
| `minPlayers` | number | — | e.g. `2` | Minimum number of players required |
| `maxPlayers` | number | — | e.g. `100` | Maximum number of players allowed |
| `maxEntryAllowed` | number | — | e.g. `1` | Maximum entries allowed per player |
| `maxAttemptAllowed` | number | — | e.g. `3` | Maximum attempts allowed per entry |
| `sourceTypeId` | number | — | e.g. `1` | Source type ID |
| `numberOfWinner` | number | — | e.g. `10` | Number of winners |
| `totalNumberOfSlot` | number | — | e.g. `100` | Total number of slots available |
| `hostingFeeType` | string | — | e.g. `percentage` | Hosting fee type |
| `prizeDistributionMode` | string | — | `fixed` \| `dynamic` | Prize distribution mode |
| `entryRule` | object | — | e.g. `[]` | Entry rules configuration |
| `gameId` | string | — | e.g. `game-uuid` | Game ID associated with this competition |
| `matchId` | string | — | e.g. `match-uuid` | Match ID for tournament-style competitions |
| `competitionFormatTypeMasterId` | number | ✅ | e.g. `1` | Competition format type ID (1=Tournament, 2=Instant Battle) |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID the competition belongs to |
| `isSpecialEvent` | boolean | ✅ | e.g. `false` | Whether this is a special event |
| `totalAmount` | number | — | e.g. `10000` | Total prize pool amount |
| `leaderboardOutcomeTypeMasterId` | number | — | e.g. `1` | Leaderboard outcome type ID |
| `leaderboardOutcomeDetails` | object | — | e.g. `[]` | Leaderboard outcome configuration details |
| `active` | boolean | — | e.g. `true` | Whether the competition is active |
| `archive` | boolean | — | e.g. `false` | Whether the competition is archived |
| `meta` | object | — | e.g. `{"customField":"value"}` | Custom metadata object |
| `tags` | string[] | — | e.g. `["featured","weekly"]` | Array of tag names |
| `competitionEntryPrices` | CompetitionEntryPriceDto[] | — | see below | Competition entry price configurations |
| `prizeDistributionRule` | prizeDistributionRule[] | — | see below | Prize distribution rules by rank |
| `rewardUnlockCondition` | string[] | — | e.g. `[]` | Reward unlock conditions |
| `schdule` | CreateScheduleDto[] | — | see below | Schedule configuration |


### Nested object: `CompetitionEntryPriceDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `priceType` | string | ✅ | `RMG` \| `virtual currency` \| `IAP` | Type of entry price |
| `competitionId` | string | — | e.g. `comp-12345-abcde` | Competition ID this price belongs to |
| `realWorldCurrencyId` | number | — | e.g. `1` | Real world currency ID for RMG type |
| `currencyId` | number | — | e.g. `1` | Virtual currency ID |
| `price` | number | ✅ | e.g. `100` | Entry price amount |
| `discount` | number | — | e.g. `10` | Discount percentage on entry price |
| `bonusCashAllowance` | number | — | e.g. `50` | Bonus cash allowance for entry |
| `hosting` | boolean | — | e.g. `false` | Whether hosting fee is enabled |
| `hostingFee` | number | — | e.g. `5` | Hosting fee amount |
| `hostingFeeType` | string | — | `percentage` \| `flat` | Type of hosting fee calculation |

### Nested object: `prizeDistributionRule`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `startRank` | number | ✅ | e.g. `1` | Starting rank for prize distribution |
| `endRank` | number | — | e.g. `3` | Ending rank for prize distribution |
| `rewards` | RewardDto[] | — | see below | Array of rewards for this rank range |

### Nested object: `CreateScheduleDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | — | e.g. `1` | Schedule ID (optional for creation) |
| `competitionId` | string | — | e.g. `comp-12345-abcde` | Competition ID this schedule belongs to |
| `projectId` | string | — | e.g. `proj-12345-abcde` | Project ID |
| `startDate` | string | — | e.g. `2024-01-01T00:00:00Z` | Schedule start date |
| `endDate` | string | — | e.g. `2024-01-31T23:59:59Z` | Schedule end date |
| `categoryId` | number | — | e.g. `1` | Category ID for the schedule |
| `scheduleType` | string | — | `normal` \| `recurring` | Type of schedule |
| `recurrenceFrequencyId` | number | — | e.g. `1` | Recurrence frequency ID for recurring schedules |
| `offset` | number | — | e.g. `0` | Time offset in minutes |
