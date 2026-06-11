---
name: specter-multiplayer
description: >-
  Specter real-time multiplayer — skill-based matchmaking (find match, queue status, ready check,
  accept/decline), parties and party queues, match sessions (create, start, end, score updates,
  results), Socket.io WebSocket events, group chat, and real-time notifications. Use for any
  "matchmaking", "find match", "party/lobby system", "match session", "realtime multiplayer" or
  "websocket" feature built on Specter.
---

# Specter Multiplayer — matchmaking, parties, match sessions

Two surfaces work together:

1. **REST** (`https://api.specterapp.xyz/v2/client`, headers per the `specter` skill) — initiate
   actions: find match, create/start/end sessions, party CRUD.
2. **Socket.io WebSocket** (`https://multiplayer.specterapp.xyz`, staging:
   `https://staging.multiplayer.specterapp.xyz`) — receive real-time events: match found, ready
   check, server assignment, score updates, party state.

A correct integration connects the socket **first**, then triggers REST actions, and reacts to
socket events. Match configurations (team size, MMR rules, regions) are defined in the dashboard.

## Connecting

```ts
import { io } from "socket.io-client";

const socket = io("https://multiplayer.specterapp.xyz", {
  transports: ["websocket"],
  auth: {
    token: accessToken,   // same JWT from Specter login
    apiKey: API_KEY,      // same project api-key
    type: "client",
  },
});
```

Invalid/expired credentials reject the connection. On reconnect during an active flow the server
restores state (`match:reconnect`, `match:rejoined`).

## Matchmaking flow (the happy path)

```
REST  POST /matchmaking/find-match { matchId, region, ... }   → queued
WS    queue:joined / queue:status                              → show queue UI (position, wait)
WS    match:found { pendingMatchId, players, acceptTimeout }   → show ready check (~15s)
WS    matchmaking:accept-match { matchId } (emit)              → or decline
WS    match:playerStatus                                       → "3/4 accepted…"
WS    match:confirmed { sessionId }                            → all accepted
WS    match:server-ready { serverInfo: { ip, port, connectionToken } }
                                                               → connect to game server
```

Declines/timeouts emit `match:cancelled`; queue overstay emits `queue:timeout`. Cancel anytime
via REST `matchmaking/cancel-match` or WS `matchmaking:cancel-match`.

Full event tables with payloads: [references/ws-events.md](references/ws-events.md).
Detailed flow incl. edge cases: [references/matchmaking-flow.md](references/matchmaking-flow.md).

## Match sessions (scores & results)

Sessions track an actual game run — usable with or without matchmaking (e.g., async PvP):

- REST: `matchmaking/create-match-session` (or `matches/create-session`) → `.../start-match-session`
  → during play, WS `match:update-score { matchSessionId, score }` (broadcasts
  `match:leaderboard-update` to all participants) → `.../end-match-session` with results.
- Ending a session emits `match:ended` (final leaderboard) and feeds leaderboards/tasks
  (score events flow into the progression and competition systems automatically).
- Reads: `matches/get-match-session-results`, WS `match:get-status` / `match:get-leaderboard`.
- Disconnect handling is built in: `match:player-disconnected` / `-reconnected` / `-abandoned`.

## Parties (play with friends)

REST manages membership: `party-create`, `party-invite`, `party-accept-invite` /
`party-decline-invite`, `party-join` (by code), `party-leave`, `party-kick`,
`party-transfer-leader`, `party-update-settings`, `player/me/get-party-details`.

WS mirrors state in real time (`party:memberJoined`, `party:queueStatusChange`,
`party:chat-message`, …) and supports ready checks + private matches
(`party:start-private-match`). When a party queues, members enter matchmaking together and the
engine keeps them on the same side. Details: [references/parties.md](references/parties.md).

## Also available over WS

- **Group chat** rooms (`group:create/join/chat`…) — lightweight lobby/social channels.
- **Notifications namespace** (`/notifications`) — reward events (`reward.granted`, …) pushed
  per player; useful to refresh wallet/inventory UI when async grants land.

## Full endpoint details

REST endpoint DTOs (28): [references/endpoints-index.md](references/endpoints-index.md)
WS contract: [references/ws-events.md](references/ws-events.md)
