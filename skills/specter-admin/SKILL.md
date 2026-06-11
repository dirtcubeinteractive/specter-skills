---
name: specter-admin
description: >-
  Specter admin/dashboard APIs — configure your game programmatically: create projects and API
  keys, define currencies, items, bundles and stores, create tasks/achievements/missions and
  task groups, battle passes, level systems, leaderboards, competitions/tournaments, schedule
  live-ops events, configure matches, and manage team members. Use when setting up or changing
  game CONFIGURATION via API (as opposed to player-facing client calls), bulk content creation,
  or automating dashboard workflows.
---

# Specter Admin — configure your game via API

Everything the dashboard (https://console.specterapp.xyz) does, the admin API can do —
useful for bulk content import, IaC-style game config, and CI pipelines.

**This API mutates live game configuration.** Two standing rules when generating admin
integrations:
1. Always show the user what will be created/changed and get confirmation before calling
   mutating endpoints — especially `*/delete` (destructive, archive/soft-delete).
2. Run against a dev/staging project first; admin changes are immediately visible to clients
   using that project's api-key.

## Auth

Admin endpoints are **member**-scoped (a dashboard team member, not a player):

```
POST member/sign-in   { "email": "...", "password": "..." }   → Bearer JWT
```

All admin calls then send `Authorization: Bearer <token>`. Access is org-based with RBAC
(roles + per-project access via member access configs). Admin routes have **no `/client/`
prefix** and are versioned like client routes (v1 default; some have v2 variants).

## The standard setup workflow

Configuring a new game end-to-end, in dependency order:

```
1. app/add                    → project (returns default game + api keys)
2. currencies/add             → soft + hard currencies
3. items/add, bundle/create   → content
4. store/create               → storefront with categories
5. match/add                  → match templates (team size, matchmaking rules)  [if multiplayer]
6. level-system/create, progression-marker/create                              [if progression]
7. task/create, task-group/create        → achievements/missions (+ rewardDetails)
8. battlepass/create          → seasonal pass with tiers
9. leaderboard/create, competitions/create
10. live-ops/schedule         → activate scheduled content (tasks, competitions, battlepass)
11. member/invite/send        → team access
```

Most entities follow the same CRUD shape: `<entity>/add|create`, `<entity>/edit|update`,
`<entity>/get` (paginated: `projectId`, `pageNo`, `pageSize`, `search`), and sometimes
`<entity>/delete` (soft-delete). Nearly every request needs `projectId`.

## Live-ops scheduling

Content isn't live until scheduled. `task/schedule`, `task-group/schedule`,
`battlepass/schedule` take start/end dates + recurrence; competitions/leaderboards use
`live-ops/schedule` / `live-ops/reschedule` / `live-ops/pause` / `live-ops/cancel`.
Scheduling drives the instance cycles that client APIs report (`instanceId` in task status,
leaderboard intervals).

## Key cross-references

- Task `businessLogic` / `config` JSON uses the same rule semantics the client skill documents:
  see specter-progression `references/task-rules.md`.
- After admin changes, client catalog endpoints (`app/get-*`) reflect them immediately —
  but client-side caches (yours) won't.

## Full endpoint reference

Per-domain endpoint tables (projects, currencies, items/stores, tasks, battle pass, levels,
leaderboards, competitions, live-ops, games/matches, members):
[references/admin-endpoints.md](references/admin-endpoints.md)
