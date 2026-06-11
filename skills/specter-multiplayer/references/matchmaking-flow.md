# Matchmaking flow — details & edge cases

## Sequence

1. **Connect socket** (auth handshake) — do this before queueing so no events are missed.
2. **Join queue**: REST `POST /v2/client/matchmaking/find-match` with the match configuration id
   and region. The queue lives server-side (per match config + region); MMR comes from the
   player's configured progression marker.
3. **While queued**: `queue:status` events carry position and estimated wait. The engine scans
   queues continuously and forms matches by MMR balance and team rules.
4. **Ready check**: `match:found` arrives with `acceptTimeout` (default ~15s). Show accept UI.
   Emit `matchmaking:accept-match { matchId: pendingMatchId }`.
   - Any decline or timeout → `match:cancelled`; accepting players are returned to the queue
     (with priority), the decliner is removed.
5. **Confirmation**: when everyone accepts → `match:confirmed { sessionId }` — a match session
   is created on the Specter API automatically.
6. **Server assignment**: `match:server-ready` delivers `{ ip, port, connectionToken }`. The
   game client connects to that game server; the server validates the `connectionToken`.
7. **Play**: score updates via `match:update-score`; everyone receives
   `match:leaderboard-update`.
8. **End**: the game server (or host client) calls REST `end-match-session` with results →
   `match:ended` to all; results flow into leaderboards/tasks/progression automatically.

## Edge cases to handle

| Case | Signal | Expected client behavior |
|---|---|---|
| App backgrounded during ready check | `match:reconnect` on reconnect | Re-show accept UI with remaining time |
| Disconnect mid-match | `match:player-disconnected` (others); `match:rejoined` (self on return) | Show "reconnecting" for that player; resync state from `match:rejoined` |
| Player never returns | `match:player-abandoned` after grace period | Continue without them / forfeit rules |
| Queue too long | `queue:timeout` | Tell the player, offer requeue |
| Cancel while queued | REST `matchmaking/cancel-match` or WS `matchmaking:cancel-match` | Confirm removal via response/`queue` events |
| Stale queue state on app restart | REST `matchmaking/get-queue-status` | Restore or clear queue UI |

## REST endpoints involved

`matchmaking/find-match`, `matchmaking/cancel-match`, `matchmaking/get-queue-status`,
`matchmaking/accept-match`, `matchmaking/decline-match`, `matchmaking/leave-match`,
`matchmaking/server-ready`, `matchmaking/create-match-session`,
`matchmaking/start-match-session`, `matchmaking/end-match-session` — full DTOs in
[endpoints-index.md](endpoints-index.md).

REST accept/decline mirror the WS events — use WS when the socket is healthy, REST as fallback.
