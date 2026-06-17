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
| `currencies/add` | Create currency | **required:** `projectId`, `name`, `currencyId` (slug), `type` (`virtual` \| `real`). **optional:** `description`, `code`, `rarityId`, `iconUrl`, `tags`, `meta` |
| `currencies/edit` | Update | `id`, `projectId`, … |
| `currencies/get` | List → `data.currenciesDetails[]` (each has integer `id`, slug `currencyId`, `type`) | `projectId`, `pageNo`, `pageSize` |
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
| `task/create` | Create task/achievement (see verified shape below) | `projectId`, `name`, `taskId`, `customEventId` (the event's **UUID**, not its slug), `rewardClaim`, `businessLogic`, `config`, `rewardDetails`, `linkedRewardDetails`, `levelDetails` |
| `task/edit`, `task/get` | Update / list → `data.tasks[]` | |
| `task/delete` ⚠ | Soft-delete task | `id`, `projectId` |
| `task-group/create` | Mission / step-series / time-series | `projectId`, `name`, `taskGroupId`, `typeId` (1=mission, 2=step series, 3=time series), `taskDetails[]`, `rewardDetails`, `noOfMissionsPerCycle` |
| `task-group/edit`, `task-group/get` | Update / list | |
| `task-group/delete` ⚠ | Soft-delete group | `id`, `projectId` |
| `task/schedule`, `task/stop` | Activate / stop a task | `taskId`, `startDate`, `endDate`, `recurrence` |
| `task-group/schedule`, `task-group/stop` | Activate / stop a group | `taskGroupId`, dates, `cycleType` |
| `admin/rewards/grant` | Grant rewards to a user directly | `userId`, `rewardDetails` |

### Verified `task/create` request shape

A task tied to a custom event, granting currency, recurring daily. All of the
fields below are required by the controller (it reads `.length` on the arrays —
omitting `levelDetails` / `linkedRewardDetails` throws), so send the full shape:

```json
{
  "projectId": "<uuid>",
  "name": "Daily Streak Reward",
  "taskId": "daily_streak_reward",
  "rewardClaim": "on-claim",              // "automatic" | "on-claim"
  "rewardClaimOption": null,
  "customEventId": "<event UUID>",         // the event's id, NOT its slug — resolve via app-event/get/custom
  "config": [],
  "businessLogic": null,                    // null = no condition, completes on first event fire. (An empty {"all":[]} would be FILTERED OUT and never complete — use null.)
  "rewardDetails": [ { "currencyId": 1245, "quantity": 50 } ],  // currencyId = the currency's INTEGER id (from currencies/get), not the slug
  "linkedRewardDetails": [],
  "levelDetails": [],
  "isLinkedReward": false,
  "isLinkedRewardSameAsGeneralRewards": false,
  "isRecurring": true,                     // for recurrence, also send:
  "intervalUnitId": 1,                     // 1=day, 2=week, 3=month, 4=year, 7=minute, 8=hour
  "recurrenceFrequency": 1
}
```

Item/bundle/marker rewards use the same `rewardDetails[]` entries with `itemId` /
`bundleId` / `rewardSetId` (UUIDs) or `progressionMarkerId` (INTEGER) instead of `currencyId`.

> **Interval units (recurrence)** — `intervalUnitId` (task/group scheduling) and
> `stageIntervalUnitId` (time-series) share one table (`leaderboardIntervals` seed):
> **1=day, 2=week, 3=month, 4=year, 5=all_time, 6=custom, 7=minute, 8=hour.**

### Achievements — the four types

There are four achievement shapes across two endpoints. A **single task** is `task/create`
(above). **Mission / step-series / time-series** are all `task-group/create`, differing by
`typeId` and a few type-specific fields. All four share the same controller-enforced scaffolding
(present-but-empty arrays; `.length` is read). **Critical:** group-level `config` is `{}` (object),
but each inner `taskDetails[].config` is `[]` (array) — same as a single task. Each inner task
needs exactly one of `customEventId` / `defaultEventId`.

```jsonc
// task-group/create — common envelope
{
  "projectId": "<uuid>", "name": "...", "taskGroupId": "<slug>",
  "typeId": 1,                       // 1=mission, 2=step-series, 3=time-series
  "rewardClaim": "on-claim",         // group default, inherited by tasks
  "config": {},                       // OBJECT at group level
  "rewardDetails": [ { "currencyId": 1245, "quantity": 500 } ],  // group bonus (may be [])
  "levelDetails": [], "linkedRewardDetails": [],
  "isLinkedRewardSameAsGeneralRewards": false,
  "taskDetails": [
    {
      "name": "...", "taskId": "<slug>", "rewardClaim": "on-claim",
      "customEventId": "<event UUID>",       // OR "defaultEventId"
      "config": [],                            // ARRAY at task level
      "businessLogic": null,                  // null = complete on fire; or {all:[{fact:<event param>,...}]}
      "rewardDetails": [ { "currencyId": 1245, "quantity": 100 } ],
      "linkedRewardDetails": [], "isLinkedReward": false,
      "sortingOrder": 1
    }
  ]
  // + type-specific fields below
}
```

| Type | `typeId` | Extra fields |
|---|---|---|
| **Mission** (rotating pool) | 1 | `noOfMissionsPerCycle` (int, how many of the pool are active per cycle), `missionSequenceOrder` (`random` \| `sequence`, default `random`) |
| **Step series** (sequential) | 2 | none — `taskDetails[].sortingOrder` (1,2,3…) defines the unlock order |
| **Time series** (streak) | 3 | `stageLength` (int window count, e.g. 7), `stageIntervalUnitId` (int, the interval map above — e.g. 1 for days), `seriesResetMiss` (bool), `seriesResetEnd` (bool) |

**Lifecycle:** `*/create` returns `status: created` — NOT live. Activate via `task/schedule`
(`{taskId, startDate?, endDate?, scheduleType:'normal'|'recurring', intervalUnitId?,
recurrenceFrequency?, recurrenceCount?, timezone?}`) or `task-group/schedule` (`{taskGroupId, …}`).
`task/stop` / `task-group/stop` (`{taskId}`/`{taskGroupId}`) halt; `task/delete` /
`task-group/delete` (`{projectId, ids:[…]}`) soft-delete.

**The completion rule (`businessLogic` + `config`) — the "Rule Engine".** A task completes when
its trigger event fires AND its rule passes. The dashboard "Rule Engine" maps onto the API's
`businessLogic` (json-rules-engine): combine conditions on the event's **parameters** —
**States** (categorical: operators `is` / `is not`) and **Statistics** (numeric: `=`, `>`, `<`,
`>=`, `<=`) — with **AND → `all`**, **OR → `any`**, and arbitrary nesting. `{"all":[]}` means "no
extra condition — complete as soon as the event fires once". Example: *score ≥ 1000 AND (state is
Werewolf OR state is Vampire)* → `{"all":[{...score ≥ 1000...},{"any":[{...Werewolf...},{...Vampire...}]}]}`.
Conceptual walkthrough + parameter setup: specter-progression
`references/manual/engage__achievements__tasks__task-rule-engine.md` and
`…__build__events__event-parameters.md`.

## Custom events (`app-events.controller`)

| Endpoint | Purpose | Key fields |
|---|---|---|
| `app-event/add/custom` | Create a custom event | `projectId`, `name`, `eventId` (slug), params |
| `app-event/get/custom` | List custom events → `data.appEventDetails[]` (each has `id` = UUID, `eventId` = slug, `name`) | `projectId`, `pageNo`, `pageSize` |
| `app-event/get/default` | List default events | `projectId` |

> To set a task's `customEventId`, list events with `app-event/get/custom` and use
> the matching entry's **`id`** (UUID) — the dashboard "event id" you see is the
> slug (`eventId`), which is NOT what `task/create` wants.

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
