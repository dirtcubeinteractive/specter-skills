# Dashboard setup walkthrough — creating a working task

Tasks are configured at https://console.specterapp.xyz. The game can only complete tasks that
are fully wired up there. Example: a daily quest **"Click 100 times → 50 coins"**.

1. **Create the event** (Engage → Events, or App Events): add a custom event, e.g. id
   `cookie_clicked`. Add a **numeric parameter** to it, e.g. `clicks`. The event `id` here is
   exactly what the game sends as `eventId` in `events/send-custom`, and the parameter name is
   the key inside `customParams`. Careful: API responses (e.g. `get-tasks`) show events with a
   UUID `id` — that UUID is NOT what `send-custom` wants; use the dashboard slug.
2. **Create the task** (Engage → Achievements/Tasks): pick the event as trigger, set the
   parameter rule — aggregation `sum` of `clicks`, condition `greaterThanInclusive 100`.
3. **Make it daily**: mark the task recurring with a daily schedule window. Each day is a new
   *instance* (`instanceId` in `player/me/get-task-status`).
4. **Attach the reward**: 50 × your `coins` currency. Choose the claim mode — **on-claim**
   (player presses a Claim button → game calls `achievements/grant-reward-by-source`) or
   automatic on completion.
5. **Publish/schedule** the task so it's live in the environment your api-key targets — a task
   configured in dev is invisible to a production key.

## Verify end-to-end (staging)

```bash
# send enough events to satisfy the rule
curl -X POST $BASE/events/send-custom -H "api-key: $KEY" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" -d '{"eventId":"cookie_clicked","customParams":{"clicks":100}}'

# a few seconds later, status should be completed
curl -X POST $BASE/player/me/get-task-status -H "api-key: $KEY" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" -d '{"taskIds":["daily-click-100"]}'

# claim (on-claim mode)
curl -X POST $BASE/achievements/grant-reward-by-source -H "api-key: $KEY" -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"sources":[{"id":"daily-click-100","type":"task","instanceId":"<from status>"}]}'
```

If status never flips: check the event parameter name matches the rule's fact exactly, the
values are numbers (not strings), and the task's schedule window is currently active.
