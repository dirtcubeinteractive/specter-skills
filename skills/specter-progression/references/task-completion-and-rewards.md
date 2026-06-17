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

**Empty rule** (`config: []`, `businessLogic: {"all":[]}`) = complete on the **first** event fire
(a "do it once" task).

### Common patterns
| Intent | completion |
|---|---|
| Do it once (event fires) | `config: []`, `businessLogic: {"all":[]}` |
| Reach a total ("score ≥ 100") | `incrementalType:"cumulative"`, op `greaterThanInclusive`, `noOfRecords:"all"` |
| Do N times | `incrementalType:"cumulative"` (or `"streak"`), `value`/`noOfRecords` = N |
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

> **Enrollment note:** for step 4 to fire, the **player must be enrolled** in the scheduled task
> (the event subscribed for the project and a task instance/assignment active for that player) and
> task processing is queue-backed (slightly async). A freshly-logged-in sandbox player may not be
> enrolled, so completion won't trigger for them even though every call above is shape-correct.
