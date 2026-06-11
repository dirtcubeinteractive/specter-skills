---
name: specter-competitions
description: >-
  Specter competitions — leaderboards (rankings, results, intervals), tournaments (enter, entry
  fees, attempts, post scores, rankings, results), instant battles, real-money (RMG) competitions
  with prize pools, prize distribution, and live-ops schedules. Use for any "leaderboard",
  "tournament", "ranked event", "weekly rankings", "prize distribution" or "instant battle"
  feature built on Specter.
---

# Specter Competitions — leaderboards, tournaments, instant battles

Base URL and headers: see the `specter` skill. Leaderboards/competitions are configured and
scheduled in the dashboard; the game enters players, posts scores, and reads results.

## Leaderboards

Configured with a **source** (what ranks players), an **interval** (daily / weekly / monthly /
custom schedule — each run is an *instance*), and optional **prize distribution rules**.

| Endpoint | Auth | Purpose |
|---|---|---|
| `get-leaderboards` | api-key | Catalog + config (interval, prizes) |
| `leaderboards/get-rankings` | Bearer | Top-N rankings for an instance (paginated) |
| `leaderboards/get-results` | Bearer | Player-centric results (my rank, around-me) |
| `liveops/get-leaderboard-schedule-history` | api-key | Past instances/windows |

Scores typically flow in from match results or events per the leaderboard's source config.
When an interval ends, a background job computes final rankings and **distributes prizes
asynchronously** — results and wallet credits land minutes after the window closes, not
instantly. Build "season ended, rewards incoming" UI states.

## Tournaments

Time-boxed competitions with entry control and prize pools:

```
get-tournaments / app/get-tournaments        → discover (api-key)
competitions/check-attempts                  → can this player (still) enter?
competitions/enter                           → join (Bearer); RMG: competitions/enter-rmg-competition
                                               (debits entry fee from real-money wallet)
competitions/get-current-prize-pool          → live prize pool (RMG/pooled prizes)
competitions/post-score-to-tournament        → submit score after each attempt/run
competitions/get-tournament-rankings         → live standings
competitions/get-tournament-results          → final results + prizes after close
player/me/get-tournament-history             → player's past tournaments
```

Entry may be limited by attempts (`check-attempts` before showing the "Play" button), entry fees
(virtual or real currency), and schedule windows. Prize distribution after close is async — same
guidance as leaderboards.

## Instant battles

Lightweight head-to-head/small-group competitions resolved immediately on completion:
`get-instant-battles` (catalog), `competitions/get-instantbattle-results`,
`player/me/get-instant-battle-history`.

## Choosing the right primitive

| Need | Use |
|---|---|
| Persistent ranked list, periodic rewards | Leaderboard with interval + prizes |
| Event with explicit entry, attempts, entry fee, prize pool | Tournament |
| Quick wager/duel between a few players | Instant battle |
| Skill rating that gates matchmaking | Progression marker / level system (specter-progression) — not a leaderboard |

## Full endpoint details

All 22 endpoint DTOs and response examples: [references/endpoints-index.md](references/endpoints-index.md)
