# Parties — lobby & party-queue integration

A party is a persistent group (leader + members) that can chat, ready-check, and enter
matchmaking together.

## Lifecycle (REST + WS mirror)

1. `party-create` (Bearer) → returns party with invite code; creator becomes leader. WS:
   `party:created`.
2. Invite: `party-invite` → invitee gets WS `party:inviteReceived` →
   `party-accept-invite` / `party-decline-invite`. Or join by code: `party-join`.
3. Manage: `party-kick` (leader), `party-transfer-leader`, `party-update-settings` (size,
   privacy, ready-check requirement), `party-leave`. Each action broadcasts a `party:*` event to
   members.
4. State on demand: `player/me/get-party-details` (REST) or `party:get-state` (WS).

## Queueing as a party

When the leader starts matchmaking, all members enter the queue together and the matchmaker
keeps the party on the same team. Members see `party:queueStatusChange { inQueue, queueInfo }`
and then the normal `match:found` ready-check flow individually — every member must accept.

Two engine-level strategies exist (configured per match type):

- **Individual queueing** — each member queued with their own MMR, tagged with `partyId`;
  matcher reunites them. Flexible team sizes.
- **Party-unit queueing** — the party queued as one unit with average MMR. Strict team-based
  modes.

The game client doesn't choose this — it follows the same events either way.

## Private matches

For ready-checked private/custom games: members set `party:ready-status { ready: true }`; leader
emits `party:start-private-match { partyId, matchDetailId, region, projectId }` → standard
`match:confirmed` → `match:server-ready` flow, skipping public queue.

## UX rules of thumb

- Drive ALL party UI from `party:*` events, not from REST responses — other members' actions
  arrive only via WS.
- Handle `party:disbanded` and `party:kicked` at any time (return to main menu).
- Re-fetch `party:get-state` after socket reconnect.
