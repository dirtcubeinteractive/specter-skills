# specter-skills

Claude Skills **and** MCP server for [Specter](https://console.specterapp.xyz) — the game backend
platform. One package, two halves:

- **Skills** (knowledge) — Claude reads these and writes correct Specter integration code: player
  auth, economy, missions/achievements, leaderboards, tournaments, real-time multiplayer.
- **MCP server** (actions) — lets Claude *call* Specter directly: inspect a project, verify a
  setup, and (opt-in) create currencies/tasks. See [MCP server](#mcp-server) below.

## Install

### Via npm (once published)

```bash
# interactive — pick skills and target
npx specter-skills init

# everything, into this project's .claude/skills/
npx specter-skills install

# specific skills, globally for all your projects
npx specter-skills install specter specter-players --global

# for the Agent SDK or other harnesses
npx specter-skills install --dir ./skills
```

### Via GitHub (private access, current)

Until it's on npm, anyone with read access to the `dirtcubeinteractive/specter-skills` repo can
install straight from git — no registry needed (requires GitHub auth set up locally via SSH or
`gh auth login`). Same commands, with a `github:` prefix:

```bash
npx github:dirtcubeinteractive/specter-skills init
npx github:dirtcubeinteractive/specter-skills install
npx github:dirtcubeinteractive/specter-skills install specter specter-players --global
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

## MCP server

The same package ships an MCP server (`specter-mcp`) that lets Claude inspect and configure a
Specter backend directly — "what currencies does my project have?", "is my setup working?",
"create a gems currency and a daily quest". The skills teach Claude the API; the MCP server lets
it act on the API.

Add to your MCP host config (e.g. Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "specter": {
      "command": "npx",
      "args": ["-y", "-p", "specter-skills", "specter-mcp"],
      "env": {
        "SPECTER_API_KEY": "<your client api-key>",
        "SPECTER_ENV": "staging"
      }
    }
  }
}
```

**Tools** — read-only (always on): `specter_verify_setup`, `specter_list_currencies`,
`specter_list_items`, `specter_list_tasks`, `specter_list_leaderboards`. Mutating (opt-in via
`SPECTER_ALLOW_MUTATIONS=true` + admin creds): `specter_create_currency`, `specter_create_task` —
these change live game config, so they're annotated non-read-only and the host confirms first.

Mutation env (verified against production): `SPECTER_ADMIN_URL` (default
`https://admin.specterapp.xyz/v1`), `SPECTER_MEMBER_EMAIL`, `SPECTER_MEMBER_PASSWORD`,
`SPECTER_PROJECT_ID`. Point mutations at a **staging** project first.

## Maintenance (Specter team)

- Endpoint references are **generated** — `npm run generate` regenerates
  `skills/*/references/endpoints{,/-index}.md` from `gamestarz_dashboard_backend/docs/api/`
  (override source with `SPECTER_DOCS_DIR`). Unmapped endpoint docs fail the build.
- `npm run lint:secrets` (also runs on `prepublishOnly`) blocks secrets and internal hostnames
  from being published.
- Hand-written content lives in each skill's `SKILL.md` and non-generated `references/*.md`.

### Publishing to npm

The package is publish-ready (the secret linter gates `prepublishOnly`). When ready to go public:

```bash
npm run generate          # ensure references are current
npm publish --access public
```

The `files` allowlist in `package.json` ships `bin/`, `skills/`, `mcp/src/`, and `README.md`
(generator/lint `scripts/` and `node_modules/` are excluded). Skills and the MCP server publish
together as the single `specter-skills` package. After publishing, drop the `github:` prefix from
the install commands above.
