# Task rule semantics (how Specter evaluates task completion)

Specter's task engine evaluates rules with **json-rules-engine** against facts computed from the
player's event history. Understanding this is the key to designing tasks that fire correctly.

## Inputs

When the game calls `events/send-custom`, the event's `customParams` become the raw data. A task
attached to that event defines:

1. **Parameters** — how to turn event history into facts:

```jsonc
{
  "parameterName": "score",      // field from customParams
  "paramType": "aggregation",    // "aggregation" or "streak_validation"
  "operator": "sum",             // aggregation operator over matching events
  "noOfRecords": 5               // streak only: how many recent events must qualify
}
```

- `aggregation` → fact = aggregate (e.g. sum) of the field across the player's events in the
  task's active window. Powers "collect 1000 coins total".
- `streak_validation` → looks at the **last N events**; the fact passes only if *all N* satisfy
  the business-logic condition. Powers "win 5 matches in a row". One non-qualifying event resets
  the streak.

2. **Business logic** — conditions over those facts:

```json
{
  "all": [
    { "fact": "score", "operator": "greaterThanInclusive", "value": 100 },
    { "fact": "playtime", "operator": "greaterThan", "value": 3600000 }
  ],
  "any": [
    { "fact": "kills", "operator": "equal", "value": 10 }
  ]
}
```

- `all` = AND, `any` = OR (a rule may use either or both).
- Operators: `equal`, `notEqual`, `greaterThan`, `greaterThanInclusive`, `lessThan`,
  `lessThanInclusive`.

3. **Optional level gating** — minimum level in a level system before the task can complete:

```json
"levelSystemLevelDetails": [{ "levelSystemId": "<uuid>", "level": 3 }]
```

## Completion behavior

| Task config | On rule pass |
|---|---|
| One-time | Marked `completed` (or `reward_claimed` if auto mode); won't fire again this cycle |
| Recurring | Completes, then resets for the next cycle window |
| In a task group | Group tasks complete in `sorting_order`; group reward only when **all** members complete |

State machine: `yetToStart → inProgress → completed → reward_claimed`.

Tasks **without parameters** complete on the first qualifying event (availability check only) —
use for simple milestones ("finish the tutorial").

## Design guidance

- Name event parameters exactly as referenced in rule `fact`s — a typo means the fact is
  missing and the rule never passes (silently).
- Send numeric values as numbers, not strings; operators compare numerically.
- For cumulative tasks, send incremental amounts per event (the engine aggregates); don't send
  running totals.
- For streaks, emit one event per attempt — including failures — or the "last N" window won't
  reflect breaks in the streak.
- Validation latency is seconds (queue → rules engine → reward grant). UI should poll
  `player/me/get-task-status` on screen-open, not per-frame.
- Test rules end-to-end in staging by sending events and watching completion via
  `player/me/get-task-status`. Aggregated fact values (numeric progress) are exposed by
  `/v1/client/tasks/get-progress` only — useful while debugging rules even if your game
  otherwise uses v2.
