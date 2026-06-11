# JavaScript — events, quest status, claim

Assumes the `specter()` helper + login from specter-players `examples/javascript.md`.

```js
// Send gameplay events — these drive ALL task/quest/battlepass progress.
// Send incremental values (the engine aggregates), batched to respect rate limits.
let pending = 0, flushTimer = null;
export function trackClicks(n = 1) {
  pending += n;
  flushTimer ??= setTimeout(flush, 3000);
}
async function flush() {
  const clicks = pending; pending = 0; flushTimer = null;
  if (clicks > 0)
    await specter("events/send-custom", { eventId: "cookie_clicked", customParams: { clicks } });
}

// Quest screen: status + numeric progress (poll on screen-open, not per-frame)
export async function getQuests(taskIds) {
  const [status, progress] = await Promise.all([
    specter("player/me/get-task-status", { taskIds }),
    specter("player/me/get-task-progress", { taskIds }),
  ]);
  return { status, progress };
}

// Claim button (on-claim reward mode): server resolves the configured reward
export const claim = (taskId, instanceId) =>
  specter("achievements/grant-reward-by-source", {
    sources: [{ id: taskId, type: "task", ...(instanceId && { instanceId }) }],
  });

// Battle pass screen
export const getBattlepass = (battlepassId) =>
  specter("battlepass/get-tier-list", { battlepassId });
export const claimTier = (battlepassId, tierNo) =>
  specter("battlepass/unlock-battlepass-tier", { battlepassId, tierNo });

// Award XP after a match (progression marker)
export const addXp = (amount) =>
  specter("progression/update-marker", { markerId: "xp", amount, operation: "add" });
```

Completion is asynchronous (event → queue → rules engine). After `flush()`, expect
`get-task-status` to flip within a few seconds — show a spinner or re-poll on quest-screen open.
