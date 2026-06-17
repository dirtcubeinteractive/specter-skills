# Task completion rules + the reward (claim) flow

Verified against the backend (`task.service.ts`, `user-event-details.service.ts`,
`task-parameters.service.ts`, `reward-history.model.ts`). This is the ground truth for **how a
task completes** and **how its reward is claimed** — for all four achievement types (single task,
mission, step-series, time-series; the rules live on each inner task too).

## 1. The completion rule — `config[]` + `businessLogic` (coupled)

A task completes when its trigger event fires AND its rule passes. The rule is expressed in **two
fields that must agree**:

- **`config[]`** — what actually drives completion (becomes the Mongo `TaskParameters.parameters[]`).
  Each element:
  ```jsonc
  {
    "parameterName": "score",          // = the event parameter name
    "operator": "greaterThanInclusive",// see operators below (case-sensitive)
    "value": 100,                       // target
    "incrementalType": "cumulative",   // "cumulative" (sum) | "one-shot" (single check) | "streak" (N consecutive)
    "noOfRecords": "all"               // window: "all", or N for streak / cumulative-window
  }
  ```
- **`businessLogic`** — the json-rules-engine mirror used for filtering:
  ```jsonc
  { "all": [ { "fact": "score", "operator": "greaterThanInclusive", "value": 100 } ] }
  ```
  (`all` = AND, `any` = OR, nestable. `fact` = the event parameter name.)

**Operators (exact, case-sensitive):** `equal`, `notEqual`, `greaterThan`,
`greaterThanInclusive`, `lessThan`, `lessThanInclusive`.

**Event binding:** when the game fires `events/send-custom { eventId, customParams|specterParams }`,
the param named by `parameterName`/`fact` is read from `customParams` or `specterParams` and checked
(cumulative sums across events; streak counts consecutive passes).

**⚠️ "Do it once" = `businessLogic: null`, NOT `{"all":[]}`.** The backend task filter
(`evaluateBusinessLogicFilter`) treats **`null` as "always include"** (the task completes on the
first event fire), but an **empty `{"all":[]}`** falls through to fact/value matching, finds no
`fact`, and **silently DROPS the task** — so it would *never* complete. (Verified live on staging:
`businessLogic: null` → completes + pending reward; `{"all":[]}` → filtered out, no reward.) For a
**conditional** rule, the `fact` must match a parameter the event actually sends, or the task is
likewise dropped.

### Common patterns
| Intent | completion |
|---|---|
| Do it once (event fires) | `config: []`, **`businessLogic: null`** |
| Reach a total ("score ≥ 100") | `config:[{parameterName:"score",operator:"greaterThanInclusive",value:100,incrementalType:"cumulative",noOfRecords:"all"}]` + `businessLogic:{all:[{fact:"score",operator:"greaterThanInclusive",value:100}]}` |
| Do N times | `incrementalType:"cumulative"` (or `"streak"`), `value`/`noOfRecords` = N (with the matching `fact`) |
| N-day streak | `incrementalType:"streak"`, `noOfRecords: 7`, e.g. `{fact:"login",operator:"equal",value:true}` |

> **MCP shortcut:** the `specter_create_task` / `_mission` / `_step_series` / `_time_series` tools
> accept a friendly `completion: {param, op:'>='|'='|…, value, mode:'cumulative'|'one-shot'|'streak',
> count?}` and build **both** `config[]` and `businessLogic` for you, correctly.

## 2. Reward grant modes

A task's `rewardClaim` decides how its reward is delivered when the task completes:

- **`automatic`** → granted immediately; a `RewardHistory` row is written with `status: completed`,
  `mode: server`.
- **`on-claim`** → a `RewardHistory` row is written with `status: pending`, `mode: client` — the
  **player/game must claim it** (this project keeps only on-claim live, so this is the default).

## 3. Seeing pending rewards — `player/me/get-reward-history`

`POST /v2/client/player/me/get-reward-history` (player-scoped). Filters: `status`
(`pending`|`completed`), `rewardGrant` (`client`|`server`), source-id arrays (`taskIds`,
`taskGroupIds`, `leaderboardIds`, …), `attributes: ['rewardDetails']`, `limit`/`offset`. Each row:
`{ instanceId, amount, status, rewardGrant, sourceType, sourceId, rewardDetails:{currencies,items,bundles,progressionMarkers} }`.
**Claimable = `status:'pending'` (and `rewardGrant:'client'`).**

## 4. Claiming — the `grant-reward*` endpoints

| Endpoint | Use | Body |
|---|---|---|
| **`achievements/grant-reward-by-source`** ← claim an on-claim task | fetch & grant a source's pending rewards; flips `pending→completed` | `{ sources:[{ id:<sourceId>, type, instanceId? }] }` |
| `achievements/grant-reward-by-source-overrides` | claim a source but with custom amounts | `{ sources:[{ id, type, overrides:{currencies,items,…}, instanceId? }] }` |
| `achievements/grant-reward-single` | grant one reward directly (not from pending) | `{ type:'item'|'bundle'|'currency'|'progressionMarker', id, amount? }` |
| `achievements/grant-reward-batch` | grant many directly | `{ rewards:{ items[], bundles[], currencies[], progressionMarkers[] } }` |
| `achievements/grant-rewards` (v1) | generic source-or-direct | `{ rewardDetails:[{ source?, rewards? }] }` |

`source.type` ∈ `task` · `task_group` · `level` · `tournament` · `instant_battle` · `leaderboard`
· `ugc_leaderboard` · `battlepass`. Responses return the granted
`{items,bundles,currencies,progressionMarkers}`; a partial failure returns HTTP 207 with
`failedRewards`. **404 "Rewards not found" (1118) = nothing pending for that source/player** (the
call shape was correct).

> **MCP shortcut:** `specter_get_reward_history { status:'pending' }` lists claimable rewards;
> `specter_claim_reward { source:<taskId>, type:'task' }` claims them (→ grant-reward-by-source).

## 5. The complete on-claim flow

```
1. Configure: create_task rewardClaim:'on-claim', completion:{param,op,value,mode}, rewards:[…]
2. Activate:  schedule the task (create ≠ live)
3. Runtime — game fires the trigger event with the param:
     events/send-custom { eventId, customParams:{ <param>: <value> } }
4. Task completes → RewardHistory row { status:'pending', mode:'client' }
5. Player sees it:  player/me/get-reward-history { status:'pending', rewardGrant:'client' }
6. Player claims:   achievements/grant-reward-by-source { sources:[{ id:<taskId>, type:'task' }] }
                    → reward lands in wallet/inventory; status → 'completed'
```

## 6. What it takes for step 4 to actually fire (the completion pipeline)

Completion is **server-side and asynchronous** — firing the event does not synchronously grant the
reward. When `events/send-custom` arrives, the backend (`taskValidationInit`) only proceeds if a
task passes **`getFilteredTaskIds`**, which requires ALL of:

- The task must be **live** (eligible) — `status` in the live state + `isAvailableForCurrentCycle:
  true`. **Schedule with NO `startDate`/`endDate` to go live immediately** (`live-ops.service.ts`:
  `if (!startDate && !endDate) → live now`). If you DO pass a `startDate`, the task sits at
  `yet to start` until a **BullMQ scheduler worker** flips it at that time. So for "live right now",
  call `specter_schedule_achievement` with just the ref and no dates. (Verified on staging: a
  no-date schedule moves the task's DB `status` from `created` to **`in progress`** with
  `isAvailableForCurrentCycle: true` — note `task/get` *displays* this live state as `"active"`,
  which is a presentation value, not the DB `taskStatus` enum.)
- `isAvailableForCurrentCycle: true`, `active: true`, `archive: false`
- `customEventId` (or `defaultEventId`) = the fired event
- **It must pass the businessLogic filter** (`evaluateBusinessLogicFilter`): `businessLogic: null`
  always passes; a rule passes only if a `fact` in it matches a key in the fired event's params
  (`customParams`/`specterParams`). **An empty `{"all":[]}` is DROPPED here** — the #1 reason a
  correctly-scheduled task "doesn't complete".
- **Mission-type groups (typeId 1) additionally** require a `UserTaskAssignment` row for the player
  (created via the *get-task-group-status-with-cooldown* client API).

If a task passes all of the above, the rule is evaluated and the `RewardHistory` row is written
(pending for on-claim) — then the player claims it via `grant-reward-by-source`.

**Verified end-to-end on staging:** task (`businessLogic: null`, on-claim) → schedule no-date (live)
→ `events/send-custom {n:1}` → reward appears as `pending` in `get-reward-history` within seconds →
`grant-reward-by-source` → wallet credited (0 → reward) and status flips to `completed`. The whole
loop works — the only thing that previously blocked it was defaulting `businessLogic` to `{"all":[]}`
instead of `null`.
