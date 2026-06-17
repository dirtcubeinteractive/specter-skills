# Specter real-time (Socket.io) API

The multiplayer features — matchmaking, parties, groups/chat, live match sessions, and
reward/online notifications — run over **Socket.io (WebSocket)**, NOT the REST API. None of this
is in the REST OpenAPI; this is the authoritative contract, reverse-engineered from the
`specter-multiplayer-server` gateways.

- **Endpoint:** the multiplayer server (e.g. `wss://multiplayer.specterapp.xyz`). It is a separate
  service from the REST API and is reached cross-cloud over its public host.
- **Transport:** Socket.io client (`socket.io-client`), `transports: ['websocket','polling']`.

## Connection & authentication

Auth is passed in the Socket.io **handshake `auth` object** (not headers, not query):

```js
import { io } from 'socket.io-client';

const socket = io('wss://multiplayer.specterapp.xyz', {
  auth: {
    token: '<player accessToken>',   // required — the JWT from auth/login-* (client) 
    apiKey: '<project api-key>',      // required — 64-hex project api-key
    type: 'client',                  // 'client' (default) or 'admin'
  },
  transports: ['websocket', 'polling'],
  reconnection: true,
});

socket.on('connect', () => { /* connected */ });
socket.on('connect_error', (e) => console.error(e.message));
```

The server validates the handshake and sets `socket.data = { userId, projectId, apiKey, authenticated }`
(for `client`, from the JWT's `userId`/`projectId`; for `admin`, from `sub`/`organisationId`).
**Connection is refused** (disconnect with a reason) if the token or api-key is missing, the
api-key isn't 64-hex, or the JWT is invalid.

## Namespaces

| Namespace | Gateways |
|---|---|
| `/` (default) | matchmaking, user-online, match, party, group |
| `/notifications` | notifications (rewards) — connect a **second** socket to this namespace |

## Rooms (targeted delivery)

| Room | Purpose |
|---|---|
| `user:<userId>` | direct-to-user (most events land here) |
| `user:<projectId>:<userId>` | project-scoped notifications (`/notifications`) |
| `queue:<queueId>` | everyone in a matchmaking queue |
| `match:<matchSessionId>` | everyone in a live match |
| `party:<partyId>` | a party's members |
| `group:<groupId>` | a group's members |

---

## Matchmaking

On connect the socket joins `user:<userId>`, is restored into its queue room if already queued,
gets any pending ready-check via `match:reconnect`, and receives an initial `queues:live-update`.

**Client → server**

| Event | Payload | Result |
|---|---|---|
| `matchmaking:queue-joined` | `{ queueId }` | ack `matchmaking:queue-joined`; joins `queue:<queueId>` (call after joining a queue via REST) |
| `matchmaking:accept-match` | `{ matchId }` | ack `match:accepted` `{ pendingMatchId, matchId }` |
| `matchmaking:decline-match` | `{ matchId }` | broadcasts `match:cancelled` |
| `matchmaking:cancel-match` | _(none)_ | ack `matchmaking:queue-left`; leaves the queue room |
| `admin:get-queues` | _(none)_ | ack `admin:queues-update` (admin sockets) |

**Server → client** (to `user:<userId>` unless noted)

| Event | Payload | When |
|---|---|---|
| `queues:live-update` | `{ [queueId]: QueueStatus }` | broadcast every ~5s |
| `match:found` | `{ pendingMatchId, matchId, matchName, players:[{userId,username,mmr,team}], acceptTimeout, region }` | a match is proposed → start accepting |
| `match:reconnect` | like `match:found` | on connect if a ready-check is pending |
| `match:accepted` | `{ pendingMatchId, matchId }` | you accepted |
| `match:playerStatus` | `{ pendingMatchId, matchId, acceptedCount, totalRequired, acceptedPlayers[], waitingPlayers[] }` | someone accepted/declined |
| `match:confirmed` | `{ pendingMatchId, matchId, sessionId, status, message }` | all accepted |
| `match:server-ready` | `{ sessionId, serverInfo:{ip,port,connectionToken}, matchName, region, players:[{userId,username,team}] }` | game server ready — connect to it |
| `match:cancelled` | `{ pendingMatchId, matchId, reason, decliningPlayer? }` | decline/timeout |
| `queue:joined` | `{ queueId, timestamp }` | added to queue |
| `queue:status` | `{ position, waitTime, estimatedTime }` | every ~3s while queued |
| `queue:timeout` | `{ reason, waitTime, maxWaitTime, timestamp }` | removed for timeout |
| `matchmaking:error` | `{ message }` | error |

## Online presence (user-online gateway)

No client events. On connect you're marked online and each friend (in their `user:<friendId>` room)
receives:

| Event | Payload |
|---|---|
| `friend:online` | `{ userId, status:'online', timestamp }` |

## Match session (in-game)

On connect, if you have an active session you auto-join `match:<matchSessionId>` and get
`match:rejoined` + a `match:leaderboard-update`.

**Client → server**

| Event | Payload | Result |
|---|---|---|
| `match:update-score` | `{ matchSessionId, score, metadata? }` | broadcasts `match:leaderboard-update` to the match room |
| `match:get-leaderboard` | `{ matchSessionId }` | ack `match:leaderboard` |
| `match:get-status` | `{ matchSessionId }` | ack `match:status` |
| `match:leave` | `{ matchSessionId, reason? }` | ack `match:left`; leaves the match room |

**Server → client**

| Event | Payload | When |
|---|---|---|
| `match:started` | `{ matchSessionId, matchName, players[], isTeamBased, numberOfTeams, timestamp }` | session starts |
| `match:rejoined` | `{ matchSessionId, status, players[], isTeamBased, numberOfTeams, startedAt }` | reconnect |
| `match:leaderboard-update` | `{ matchSessionId, individual:[{userId,score,metadata}], updatedBy, timestamp }` | after a score update |
| `match:leaderboard` | `{ matchSessionId, individual[], timestamp }` | reply to get-leaderboard |
| `match:status` | `{ matchSessionId, status, players:[{userId,username,connected,hasLeft}], isTeamBased, numberOfTeams, startedAt, endedAt? }` | reply to get-status |
| `match:ended` | `{ matchSessionId, results:[{userId,username,outcome,team}], finalLeaderboard[], finalTeamScores?, timestamp }` | session ends |
| `match:player-disconnected` / `-reconnected` / `-abandoned` / `-left` | `{ userId, username?, timestamp }` | connection lifecycle |
| `match:error` | `{ message, code }` | error |

## Party

On connect: joins `user:<userId>`, joins `party:<partyId>` if in a party, emits `party:current-state`
and `party:pending-invites`.

**Client → server**

| Event | Payload | Result |
|---|---|---|
| `party:get-state` | _(none)_ | ack `party:state-update` `{ currentParty, pendingInvites }` |
| `party:ready-status` | `{ ready }` | broadcasts `party:memberReadyStatus` (private parties) |
| `party:chat` | `{ message }` (1–200 chars) | broadcasts `party:chat-message` |
| `party:start-private-match` | `{ partyId, matchDetailId, projectId, region }` | leader only — bypasses the queue |

**Server → client** — to `user:<userId>`: `party:current-state`, `party:pending-invites`,
`party:state-update`, `party:created`, `party:inviteReceived` `{ invite, partyId, from, inviteCode }`,
`party:joined`, `party:left`, `party:kicked`, `party:error {message,code}`. To `party:<partyId>`:
`party:memberJoined`, `party:memberLeft`, `party:memberKicked`, `party:leaderChanged`,
`party:settingsChanged`, `party:stateChanged`, `party:queueStatusChange`, `party:chat-message`,
`party:disbanded`. (Party CRUD — create/invite/join/kick — is done over **REST**; these sockets
push the resulting state.)

## Group chat

**Client → server**

| Event | Payload | Result |
|---|---|---|
| `group:create` | `{ groupId, name?, maxMembers? }` (2–1000) | ack `group:created`; creator auto-joins |
| `group:join` | `{ groupId }` | ack `group:joined`; joins `group:<groupId>` |
| `group:leave` | `{ groupId }` | ack `group:left` |
| `group:delete` | `{ groupId }` | creator only; broadcasts `group:deleted` |
| `group:chat` | `{ groupId, message }` (1–500 chars) | broadcasts `group:chat-message` |

**Server → client** — `group:created`, `group:joined`, `group:left`, `group:error {message,code}`;
room events `group:member-joined`, `group:member-left`, `group:chat-message`
`{ groupId, userId, username, message, timestamp }`, `group:deleted`.

## Notifications (`/notifications` namespace)

Connect a second socket to `/notifications`. On connect you join `user:<projectId>:<userId>`. No
client events — the server pushes reward outcomes:

| Event | When |
|---|---|
| `reward.pending` | reward granted, pending |
| `reward.granted` | reward delivered |
| `reward.failed` | grant failed |

`RewardEvent` payload: `{ type, instanceId, rewardHistoryId, source:{kind,…}, rewardType, amount,
currencyId?, itemId?, bundleId?, rewardSetId?, progressionMarkerId?, status, mode:'server'|'client',
meta?, timestamp }`.

## REST side of match sessions

These pair with the sockets and are admin/client REST (not all are in the client OpenAPI):
`client/matchmaking/create-match-session` · `start-match-session` · `update-match-session` ·
`end-match-session`; `client/matches/create-session` · `start-session` · `update-session` ·
`end-session` · `update-mmr` · `get-session-details` · `get-match-session-results`. Typical flow:
join a queue (REST) → emit `matchmaking:queue-joined` → receive `match:found` → emit
`matchmaking:accept-match` → receive `match:server-ready` → connect → `match:update-score` →
`match:ended`.
