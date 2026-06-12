# specter-skills

[![npm version](https://img.shields.io/npm/v/specter-skills.svg)](https://www.npmjs.com/package/specter-skills)
[![node](https://img.shields.io/node/v/specter-skills.svg)](https://www.npmjs.com/package/specter-skills)

**Build your game backend by talking to Claude.** This package teaches Claude
[Specter](https://console.specterapp.xyz) — the game backend platform — so you can ask for player
auth, an in-game economy, daily quests, leaderboards, tournaments, or real-time multiplayer in
plain English and get correct, working integration code.

It ships two halves of the same product:

- 🧠 **Skills** *(knowledge)* — Claude reads these and writes correct Specter code: right
  endpoints, right headers, right response handling, with the platform's gotchas baked in.
- 🛠️ **MCP server** *(actions)* — lets Claude *call* Specter directly: inspect a project, verify a
  setup, even create currencies and tasks for you. See [MCP server](#mcp-server).

Works with **Claude Code**, **Claude Desktop**, the **Claude Agent SDK**, and any other
skills-aware harness.

---

## Quickstart

```bash
# in your game project
npx specter-skills init
```

Pick the skills (default: all), choose where to install them, done. Then open Claude and ask:

> *"Add Specter to my game: silent player login, a coins wallet, and a daily quest 'play 3
> matches' that rewards 100 coins."*

The right skills activate automatically and Claude writes the integration — no need to read API
docs yourself. All you need is a Specter project and its API key from
[console.specterapp.xyz](https://console.specterapp.xyz).

## Install

```bash
# interactive — pick skills and target
npx specter-skills init

# everything, into this project's .claude/skills/
npx specter-skills install

# specific skills, globally for all your projects
npx specter-skills install specter specter-players --global

# for the Agent SDK or other harnesses (any directory)
npx specter-skills install --dir ./skills
```

| Command | What it does |
|---|---|
| `init` | Interactive: choose skills + target (project or global) |
| `install [names…]` | Install named skills (default: all); `--global`, `--dir <path>` |
| `update` | Re-install the skills you already have to the latest version |
| `list` | Show available vs installed skills |

## Skills

| Skill | Covers |
|---|---|
| `specter` | Start here — platform overview, auth model, base URLs, response envelope, errors |
| `specter-players` | Sign-up/login (8 methods), tokens, account linking, profiles, player data, friends |
| `specter-economy` | Currencies, wallets, items, bundles, stores, purchases, inventory, gacha/pity, real-money |
| `specter-progression` | Tasks, missions, achievements, daily quests, task-rule design, battle pass, levels |
| `specter-competitions` | Leaderboards, tournaments, instant battles, prize distribution, schedules |
| `specter-multiplayer` | Matchmaking, parties, match sessions, full Socket.io event contract |
| `specter-admin` | Configure the game via admin APIs: projects, currencies, items, tasks, live-ops, members |

Each skill includes a concise `SKILL.md` plus per-endpoint references with request fields and
response examples, and (where useful) ready-to-paste JavaScript / Unity examples. Endpoint
references are generated directly from Specter's API docs, so they stay accurate.

## MCP server

The same package ships an MCP server (`specter-mcp`) so Claude can act on a Specter backend, not
just write code for it — *"what currencies does my project have?"*, *"is my setup working?"*,
*"create a gems currency and a daily quest"*.

Add to your MCP host config (e.g. Claude Desktop's `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "specter": {
      "command": "npx",
      "args": ["-y", "-p", "specter-skills", "specter-mcp"],
      "env": {
        "SPECTER_ENV": "staging",
        "SPECTER_API_KEY": "<optional — your client api-key>"
      }
    }
  }
}
```

**Tools**

| Tool | Type | Purpose |
|---|---|---|
| `specter_verify_setup` | read-only | Smoke-test the project: api-key, currencies, wallets, tasks |
| `specter_list_currencies` / `_items` / `_tasks` / `_leaderboards` | read-only | Inspect configured content |
| `specter_create_currency` / `specter_create_task` | **mutating** | Create game config (opt-in) |

Mutating tools are off unless you set `SPECTER_ALLOW_MUTATIONS=true`. They change live game
configuration, so they're flagged non-read-only and your MCP host asks for confirmation before
each call — point them at a **staging** project first.

`SPECTER_API_KEY` is **optional**: after `specter-mcp login`, the dev api-key from your sign-in is
cached and reused for both reads and admin calls, so you don't have to configure one. Set it only
if you want read tools to work before logging in.

### Admin sign-in (no password sharing)

Creating currencies/tasks needs a member (dashboard) sign-in. Instead of putting a password in
config — which doesn't even exist for Google/Apple sign-in members — `specter-mcp` uses a
**browser flow**: it opens the Specter dashboard, the member signs in there however they normally
do (email/password, **Google**, or **Apple**), approves a consent screen, and a revocable token
is handed back to the tool. The password/social credentials never touch the tool or Claude.

Trigger it either way:

- In chat, the first time Claude needs admin access it calls the `specter_login` tool → browser
  opens → you sign in → done.
- Or up front in a terminal: `npx -p specter-skills specter-mcp login` (also `logout`, `whoami`).

The token is cached in `~/.specter/credentials.json` (file mode `600`) and reused, so you only
sign in once. For CI / non-interactive use, set `SPECTER_ADMIN_TOKEN` instead.

Env: `SPECTER_ALLOW_MUTATIONS=true`, optional `SPECTER_ADMIN_URL`
(default `https://admin.specterapp.xyz/v1`), `SPECTER_DASHBOARD_URL`, `SPECTER_PROJECT_ID`.

> The browser flow needs a small dashboard/backend piece (`/authorize-tool` + a token-exchange
> endpoint) — see [`mcp/BACKEND_AUTH_SPEC.md`](mcp/BACKEND_AUTH_SPEC.md). Until that ships, set
> `SPECTER_ADMIN_TOKEN`, or (password members only) `SPECTER_MEMBER_EMAIL` + `SPECTER_MEMBER_PASSWORD`.

## Requirements

- Node.js 18+
- A Specter project + API key ([console.specterapp.xyz](https://console.specterapp.xyz))
- A skills-aware Claude host (Claude Code, Claude Desktop, or the Agent SDK)

---

<details>
<summary><b>Maintenance (Specter team)</b></summary>

- Endpoint references are **generated** — `npm run generate` regenerates
  `skills/*/references/endpoints{,/-index}.md` from `gamestarz_dashboard_backend/docs/api/`
  (override the source dir with `SPECTER_DOCS_DIR`). Unmapped endpoint docs fail the build, so the
  skills can't silently drift from the API.
- `npm run lint:secrets` (also runs on `prepublishOnly`) blocks secrets and internal hostnames
  from being published.
- Hand-written content lives in each skill's `SKILL.md` and the non-generated `references/*.md`.

### Releasing

```bash
npm version patch         # bump version
npm run generate          # refresh references
npm publish --access public
```

The `files` allowlist ships `bin/`, `skills/`, `mcp/src/`, and `README.md`; generator/lint
`scripts/` and `node_modules/` are excluded. Skills and the MCP server publish together as the
single `specter-skills` package.

</details>
