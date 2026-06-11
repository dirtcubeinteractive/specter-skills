# Specter multiplayer — Socket.io event contract

Namespace `/` unless noted. Connect with `auth: { token, apiKey, type: "client" }`.

## Matchmaking

### Client → server

| Event | Payload | Purpose |
|---|---|---|
| `matchmaking:cancel-match` | `{}` | Leave the queue |
| `matchmaking:accept-match` | `{ matchId }` | Accept ready check |
| `matchmaking:decline-match` | `{ matchId }` | Decline ready check |
| `matchmaking:queue-joined` | `{ queueId }` | Bind this socket to a queue joined via REST |

### Server → client

| Event | Payload | When |
|---|---|---|
| `queue:joined` | `{ queueId, timestamp }` | Added to queue |
| `queue:status` | `{ position, waitTime, matchId, region, playerCount, estimatedWaitTime }` | Queue updates |
| `queue:timeout` | `{ reason, waitTime, maxWaitTime, timestamp }` | Removed after max wait |
| `match:found` | `{ pendingMatchId, matchId, matchName, players: [{ userId, username, mmr, team? }], acceptTimeout, region }` | Ready check started |
| `match:playerStatus` | `{ pendingMatchId, matchId, acceptedCount, totalRequired, acceptedPlayers, waitingPlayers }` | Accept progress |
| `match:cancelled` | `{ pendingMatchId, matchId, reason, decliningPlayer? }` | Decline/timeout |
| `match:confirmed` | `{ pendingMatchId, matchId, sessionId, status, message }` | All accepted |
| `match:server-ready` | `{ sessionId, serverInfo: { ip, port, connectionToken }, matchName, region, players }` | Game server assigned — connect now |
| `match:reconnect` | `{ pendingMatchId, matchId, matchName, players, acceptTimeout, wasMissedNotification }` | Reconnected mid-ready-check |
| `matchmaking:error` | `{ message }` | Error |

## Match session

### Client → server

| Event | Payload |
|---|---|
| `match:update-score` | `{ matchSessionId, score, metadata? }` |
| `match:get-leaderboard` | `{ matchSessionId }` |
| `match:get-status` | `{ matchSessionId }` |
| `match:leave` | `{ matchSessionId, reason? }` |

### Server → client

| Event | Payload / when |
|---|---|
| `match:started` | `{ matchSessionId, matchName, players, isTeamBased, numberOfTeams, timestamp }` |
| `match:rejoined` | Session state after reconnect |
| `match:leaderboard-update` | `{ matchSessionId, individual: [...], updatedBy, timestamp }` — on any score update |
| `match:leaderboard` / `match:status` | Responses to the get-* requests |
| `match:ended` | `{ matchSessionId, results, finalLeaderboard, finalTeamScores?, timestamp }` |
| `match:player-disconnected` / `match:player-reconnected` / `match:player-abandoned` / `match:player-left` | `{ userId, username?, timestamp }` |
| `match:left` | `{ matchSessionId, success }` |
| `match:error` | `{ message, code }` |

## Party

### Client → server

| Event | Payload |
|---|---|
| `party:get-state` | `{}` — current party + pending invites |
| `party:ready-status` | `{ ready: boolean }` |
| `party:start-private-match` | `{ partyId, matchDetailId, region, projectId }` (leader only) |
| `party:chat` | `{ message }` |

### Server → client

| Event | When |
|---|---|
| `party:current-state` / `party:pending-invites` | On connect |
| `party:state-update` | Response to get-state |
| `party:created`, `party:joined`, `party:inviteReceived` | Membership events (self) |
| `party:memberJoined`, `party:memberLeft`, `party:memberKicked`, `party:leaderChanged` | Broadcast to party |
| `party:settingsChanged`, `party:stateChanged`, `party:queueStatusChange` | Party state |
| `party:memberReadyStatus` | `{ userId, ready }` |
| `party:chat-message` | `{ userId, message, timestamp, partyId }` |
| `party:left`, `party:kicked`, `party:disbanded` | Exit events |
| `party:error` | `{ message, code }` |

## Group chat

Client → server: `group:create { groupId, name, maxMembers }`, `group:join { groupId }`,
`group:leave`, `group:delete`, `group:chat { groupId, message }`.
Server → client: `group:created`, `group:joined`, `group:member-joined`, `group:member-left`,
`group:chat-message`, `group:deleted`, `group:left`, `group:error`.

## Notifications (namespace `/notifications`)

Connect with the same auth to namespace `/notifications`. Per-player push of async platform
events — notably reward lifecycle: `reward.pending`, `reward.granted`, `reward.failed`. Use to
refresh wallet/inventory/task UI when background grants complete instead of polling.
