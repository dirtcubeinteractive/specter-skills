# Specter admin API — endpoint reference

All `POST`, `Authorization: Bearer <member JWT>` (from `member/sign-in`). Most take
`projectId`; list endpoints take `pageNo`, `pageSize`, `search`, `sortBy`, `filters`.
⚠ = destructive (archive/soft-delete) — confirm with the user before calling.

## Projects / apps / API keys (`project.controller`)

| Endpoint | Purpose | Key create/edit fields |
|---|---|---|
| `app/add` | Create project (also creates default game + api keys) | `organisationId`, `name`, `description`, `platformDetails`, `countryIds`, `genreIds`, `tags` |
| `app/get`, `app/get-master` | List projects for org | `organisationId`, paging |
| `app/edit`, `app/edit-master` | Update project | `id`, fields above |
| `app/delete` ⚠ | Archive project | `id`, `organisationId` |
| `app/api-key/create` | New client API key | `projectId`, `organisationId` |
| `app/edit-auth-config` / `app/get-auth-config` | OAuth/auth provider config | `projectId`, `authConfig` |
| `app/overview` | Project stats | `projectId` |

## Currencies (`currencies.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `currencies/add` | Create currency | `projectId`, `name`, `currencyId`, `currencyType` (soft/hard), `icon`, `exchangeRate` |
| `currencies/edit` | Update | `id`, `projectId`, … |
| `currencies/get` | List | paging |
| `currencies/get-world-currency` | Master real-world currency list | — |

## Items / bundles / stores (`inventory.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `items/add` | Create item | `projectId`, `name`, `itemId`, `rarity`, `properties` (consumable/equippable/…), `prices`, `unlockConditions` |
| `items/update`, `items/get` | Update / list | |
| `bundle/create` | Create bundle (set `isGacha` + `gachaProbabilities` for loot boxes) | `projectId`, `name`, `bundleId`, `contents`, `prices` |
| `bundle/update`, `bundle/get` | Update / list | |
| `store/create` | Create store | `projectId`, `name`, `storeId`, `categories`, `platformIds`, `locationIds` |
| `store/update`, `store/get` | Update / list | |

## Tasks / task groups / rewards (`task.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `task/create` | Create task/achievement | `projectId`, `name`, `taskId`, `defaultEventId` or `customEventId`, `businessLogic` (rule JSON), `config` (params/aggregation), `rewardDetails`, `levelDetails` |
| `task/edit`, `task/get` | Update / list | |
| `task/delete` ⚠ | Soft-delete task | `id`, `projectId` |
| `task-group/create` | Mission / step-series / time-series | `projectId`, `name`, `taskGroupId`, `typeId` (1=mission, 2=step series, 3=time series), `taskDetails[]`, `rewardDetails`, `noOfMissionsPerCycle` |
| `task-group/edit`, `task-group/get` | Update / list | |
| `task-group/delete` ⚠ | Soft-delete group | `id`, `projectId` |
| `task/schedule`, `task/stop` | Activate / stop a task | `taskId`, `startDate`, `endDate`, `recurrence` |
| `task-group/schedule`, `task-group/stop` | Activate / stop a group | `taskGroupId`, dates, `cycleType` |
| `admin/rewards/grant` | Grant rewards to a user directly | `userId`, `rewardDetails` |

## Battle pass (`battlepass.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `battlepass/create` | Create pass | `projectId`, `name`, `battlepassId`, `startDate`, `endDate`, `tiers[]` (rewards per tier, free/premium), `premiumCost` |
| `battlepass/update`, `battlepass/get` | Update / list | |
| `battlepass/schedule`, `battlepass/stop` | Activate / stop | `battlepassId`, dates, `recurrence` |

## Level systems / progression markers

| Endpoint | Purpose | Key fields |
|---|---|---|
| `level-system/create` | XP/rank system | `projectId`, `name`, `levelSystemId`, `maxLevel`, `levelDetails[]` (level, minXP, rewards) |
| `level-system/edit`, `level-system/get` | Update / list | |
| `progression-marker/create` | Named counter (XP, trophies) | `projectId`, `name`, `markerId`, `progressionValue`, `rewards` |
| `progression-marker/edit`, `progression-marker/get` | Update / list | |
| `progression-marker/delete` ⚠ | Soft-delete marker | `id`, `projectId` |

## Leaderboards (`leaderboard.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `leaderboard/create` | Create leaderboard | `projectId`, `name`, `leaderboardId`, `scoringType` (asc/desc), `resetFrequency`, `startDate`, `endDate`, `prizeDistribution` |
| `leaderboard/update`, `leaderboard/get` | Update / list | |
| `leaderboard/delete` ⚠ | Soft-delete | `id`, `projectId` |

## Competitions / tournaments (`competitions.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `competitions/create` | Tournament / instant battle | `projectId`, `name`, `competitionId`, `competitionFormatTypeMasterId` (1=tournament, 3=instant battle), dates, `entryFee`, `maxParticipants`, `prizePool`, `leaderboardId`, `matchConfig` |
| `competitions/update`, `competitions/get` | Update / list | |
| `competitions/delete` ⚠ | Soft-delete | `id`, `projectId` |

## Live-ops (`live-ops.controller`)

| Endpoint | Purpose |
|---|---|
| `live-ops/schedule` | Schedule competition/leaderboard (`competitionId`/`leaderboardId`, dates, `recurrence`, `intervalUnitId`) |
| `live-ops/reschedule` | Change dates of a schedule (`scheduleId`, new dates) |
| `live-ops/pause` / `live-ops/cancel` ⚠ | Pause / cancel a scheduled or active event |
| `live-ops/get` | List schedules |

## Games / matches (`games.controller`, `matches.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `game/add` | Create game | `projectId`, `name`, `gameId`, `gamePlatforms`, `gameGeo`, `gameGenre`, asset URLs |
| `game/update`, `game/get` | Update / list | |
| `match/add` | Match template for matchmaking | `projectId`, `name`, `matchId`, `gameId`, `teamSize`, `maxPlayers`, `matchmakingRules`, `runtimeConfig` |
| `match/update`, `match/get` | Update / list | |
| `match-config-template/create|update|get` | Reusable match config JSON | `projectId`, `configData` |

## Members / org (`member.controller`)

| Endpoint | Purpose |
|---|---|
| `member/sign-in` | Login → Bearer JWT (email + password) |
| `member/sign-up` | Create member + organisation |
| `member/get-details`, `member/update-details`, `member/update-password`, `member/logout` | Self-service |
| `member/invite/send`, `member/invite/accept`, `member/invite/get` | Team invitations (`email`, `organisationId`, `accessConfig`) |
| `member/get` | List org members |
| `member/access/update`, `member/add-access-config`, `member/update-access-config`, `member/get-access-config` | Per-project role access |
| `member/delete` ⚠ | Remove member from org |
