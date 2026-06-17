# Changelog

All notable changes to `specter-skills`. This package ships **Claude Skills** (knowledge) + an
**MCP server** (`specter-mcp`) for the Specter game backend.

## 0.11.0

- **FIX (mission / step-series / time-series completion):** inner `taskDetails[]` now carry
  `projectId`. The backend filters inner tasks by `projectId` in `getFilteredTaskIds`; without it the
  inner task was stored with an empty `projectId`, never matched a fired event, and the group never
  completed (standalone single tasks were unaffected — their `projectId` is top-level). Verified the
  full loop end-to-end on staging: create mission → schedule → enroll → fire event → pending reward →
  `grant-reward-by-source` → completed.
- **FIX (task completion):** create-task tools default `businessLogic` to `null` instead of
  `{"all":[]}`. An empty `{"all":[]}` has no matching `fact`, so such tasks never completed; `null`
  means "no condition → complete on first event fire". Verified end-to-end on staging.

- **Package metadata** — added `repository`, `homepage`, `bugs`, `author`; wired `npm test`
  (offline syntax + secret-lint) and `npm run verify` (live integration smoke-test).
- **Dedicated `specter_create_match`** (friendly format/outcome enums + game resolver). Battle pass
  and level systems remain callable via the generic create tools + `specter_admin_call`.
- **Reward flow tools** — `specter_get_reward_history` (pending/claimable) and `specter_claim_reward`
  (grant-reward-by-source). Docs: task completion + reward-claim reference.

## 0.10.0

- **Real-time multiplayer (Socket.io) contract** — full reference (`specter-multiplayer`): the
  handshake auth, namespaces (`/`, `/notifications`), all gateways, every client↔server event with
  payloads, and room conventions. Sourced from the multiplayer server (not in any REST/OpenAPI).
- **Curated client API** — 110 endpoints with human-written descriptions + parameter `enumValues`
  (the `attributes` you can request on v2 reads), distributed across the client skills.
- **Escape hatches** — `specter_admin_call` / `specter_client_call` make *any* `/v1` admin or
  `/v2/client` endpoint reachable, using the bundled references for the shape.
- **Task completion rules** — `completion: {param, op, value, mode, count}` on all create-task tools
  builds the coupled `config[]` + `businessLogic` correctly (cumulative / one-shot / streak).
- **Reward flow** — `specter_get_reward_history` (pending/claimable) + `specter_claim_reward`
  (grant-reward-by-source) for the on-claim task reward lifecycle.

## 0.9.0

- **Edit tools** — `specter_edit_currency`, `specter_edit_task` (scalar fields), and a generic
  `specter_update_entity` by id for the long tail.

## 0.8.0

- **Economy** — `specter_create_currency_conversion` and `specter_create_currency_policy`
  (balance-limits / decay / earning-caps).
- **Default-injection** on the generic create tools (item/bundle/store/leaderboard/competition/
  marker) so controller-required empty arrays don't 500; corrected competition format-type +
  leaderboard required fields.

## 0.7.0

- **Client (v2) API** — DTO-level references for all 169 client endpoints with per-endpoint auth,
  routed across the client skills.
- **Client/runtime tools** — `specter_get_player_state`, `specter_send_event`,
  `specter_test_achievement` (act as a sandbox test player to verify config).
- **Client codegen** — `specter_generate_client_code` (JS + Unity C#) wired with the project's real
  api-key + slugs. Unity SDK getting-started pages bundled.

## 0.6.0

- **Achievements suite** — `specter_create_task` plus `specter_create_mission` /
  `_step_series` / `_time_series` (the four types), with `specter_schedule_achievement` /
  `_stop_achievement` / `_delete_achievement` and `specter_create_event`. Kind-routed reward/id
  resolvers; verified `INTERVAL_UNIT` mapping.
- **User manual** — 96 conceptual pages bundled and distributed to the matching skills.

## 0.5.0

- Read tools moved to the admin gateway (work right after browser sign-in; no client api-key).
- Added `specter_list_events`; `specter_create_currency` exposes `type`; `specter_create_task`
  resolves event/currency slugs and fills the required scaffolding.
- **Admin API** — generated DTO-level references for all 215 admin endpoints.

## 0.4.1

- Initial release: 7 Claude Skills + the `specter-mcp` MCP server, browser-based sign-in,
  auto project detection, secret-lint publish gate.
