# specter-skills

Claude Skills for [Specter](https://console.specterapp.xyz) — the game backend platform.
Install these skills and Claude (Claude Code, Agent SDK) can correctly integrate Specter into
your game: player auth, economy, missions/achievements, leaderboards, tournaments and real-time
multiplayer.

## Install

> **Private access (current):** this package is not yet on npm. Anyone with read access to the
> `dirtcubeinteractive/specter-skills` GitHub repo can install it straight from git — no registry
> needed (requires GitHub auth set up locally via SSH or `gh auth login`):
>
> ```bash
> # interactive — pick skills and target
> npx github:dirtcubeinteractive/specter-skills init
>
> # everything, into this project's .claude/skills/
> npx github:dirtcubeinteractive/specter-skills install
> ```
>
> Once published to npm, the same commands work without the `github:` prefix
> (`npx specter-skills init`).

```bash
# everything, into this project's .claude/skills/
npx github:dirtcubeinteractive/specter-skills install

# specific skills, globally for all your projects
npx github:dirtcubeinteractive/specter-skills install specter specter-players --global

# for the Agent SDK or other harnesses
npx github:dirtcubeinteractive/specter-skills install --dir ./skills
```

Then just ask Claude things like *"Add Specter email login and a gem currency to my Unity game"*
— the right skill activates automatically.

## Skills

| Skill | Covers |
|---|---|
| `specter` | Platform overview, auth model, base URLs, response envelope, errors — the entry point |
| `specter-players` | Signup/login (8 methods), tokens, account linking, profiles, player data, friends |
| `specter-economy` | Currencies, wallets, items, bundles, stores, purchases, inventory, gacha/pity, RMG |
| `specter-progression` | Tasks/missions/achievements, task rule design, custom events, battle pass, levels |
| `specter-competitions` | Leaderboards, tournaments, instant battles, prize distribution, schedules |
| `specter-multiplayer` | Matchmaking, parties, match sessions, full Socket.io event contract |
| `specter-admin` | Configure the game via admin APIs: projects, currencies, items, tasks, live-ops, members |

## Maintenance (Specter team)

- Endpoint references are **generated** — `npm run generate` regenerates
  `skills/*/references/endpoints{,/-index}.md` from `gamestarz_dashboard_backend/docs/api/`
  (override source with `SPECTER_DOCS_DIR`). Unmapped endpoint docs fail the build.
- `npm run lint:secrets` (also runs on `prepublishOnly`) blocks secrets and internal hostnames
  from being published.
- Hand-written content lives in each skill's `SKILL.md` and non-generated `references/*.md`.
