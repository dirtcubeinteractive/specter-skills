# specter-skills

[![npm version](https://img.shields.io/npm/v/specter-skills.svg)](https://www.npmjs.com/package/specter-skills)
[![node](https://img.shields.io/node/v/specter-skills.svg)](https://www.npmjs.com/package/specter-skills)
[![license](https://img.shields.io/badge/license-UNLICENSED-lightgrey.svg)](#)

> **Build your game backend by talking to Claude.**

`specter-skills` teaches Claude everything about [Specter](https://console.specterapp.xyz) — the
game backend platform — so you can add player accounts, an in-game economy, daily quests,
leaderboards, tournaments, battle passes, and real-time multiplayer to your game in plain English,
and get **correct, working code** plus the ability to **configure your backend without ever
opening the dashboard**.

No SDK to learn. No API docs to read. Install it, then ask.

```
You:    "Add Specter to my game — silent login, a coins wallet, and a daily
         quest 'play 3 matches' that rewards 100 coins."
Claude: ...writes the integration code, sets up the quest in your backend, done.
```

---

## Contents

- [What's inside](#whats-inside)
- [Quickstart](#quickstart)
- [Installation](#installation)
- [The skills](#the-skills)
- [The MCP server](#the-mcp-server) · [Setup](#setup) · [Sign in](#signing-in-no-password-needed) · [Tools](#tools) · [Configuration](#configuration)
- [Things to ask Claude](#things-to-ask-claude)
- [Checking the version & updating](#checking-the-version--updating)
- [Requirements](#requirements)
- [Troubleshooting](#troubleshooting)

---

## What's inside

This one package ships **two halves of the same product**:

| | What it is | What it does |
|---|---|---|
| 🧠 **Skills** | Knowledge Claude reads | Claude writes correct Specter integration code — right endpoints, headers, response handling, and all the platform's gotchas baked in. |
| 🛠️ **MCP server** | A tool Claude can run | Claude *acts on* your backend — inspect a project, verify your setup, and create currencies, items, tasks, leaderboards, battle passes, and more, **straight from chat**. |

Skills work in **Claude Code**, **Claude Desktop**, the **Claude Agent SDK**, and any other
skills-aware host. The MCP server works in any MCP-compatible host (Claude Desktop, Claude Code, …).

---

## Quickstart

**1. Install the skills** in your game project:

```bash
npx specter-skills init
```

**2. Get your API key** from [console.specterapp.xyz](https://console.specterapp.xyz)
(Project → API Keys).

**3. Ask Claude** to build something:

> *"Add Specter email login and a gem currency to my Unity game."*

The right skill activates automatically and Claude writes the integration. That's it.

> 💡 Want Claude to also **set up the backend for you** (create currencies, quests, leaderboards)?
> Add the [MCP server](#the-mcp-server) and ask *"create a gems currency and a daily login quest in
> my Specter project."*

---

## Installation

```bash
# Interactive — choose skills and where to install them
npx specter-skills init

# Install everything into this project's .claude/skills/
npx specter-skills install

# Install specific skills
npx specter-skills install specter specter-economy

# Install globally (available in all your projects)
npx specter-skills install --global

# Install into a custom directory (Agent SDK / other hosts)
npx specter-skills install --dir ./skills
```

| Command | What it does |
|---|---|
| `npx specter-skills init` | Interactive: pick skills + target (project or global) |
| `npx specter-skills install [names…]` | Install named skills (default: all). Flags: `--global`, `--dir <path>` |
| `npx specter-skills update` | Re-install your skills at the latest version |
| `npx specter-skills list` | Show which skills are available and which you have installed |

Skills are copied into `.claude/skills/` (project) or `~/.claude/skills/` (global). They're plain
files you can commit to your repo.

---

## The skills

| Skill | What it covers |
|---|---|
| **`specter`** | Start here — platform overview, the auth model, base URLs, the response envelope, and every error code. |
| **`specter-players`** | Sign-up & login (email, username, silent device ID, Google, Apple, Steam, Discord, Facebook), tokens, account linking, player profiles & custom data, friends. |
| **`specter-economy`** | Currencies & wallets, items, bundles, stores & purchases, inventory, gacha / loot boxes with pity, and real-money gaming (deposits / withdrawals). |
| **`specter-progression`** | Tasks, missions, achievements, daily quests & streaks, **task-rule design**, custom events, battle passes, XP & level systems. |
| **`specter-competitions`** | Leaderboards, tournaments, instant battles, prize distribution, and schedules. |
| **`specter-multiplayer`** | Skill-based matchmaking, parties, match sessions, and the full real-time Socket.io event contract. |
| **`specter-admin`** | Configure the game via admin APIs — projects, currencies, items, tasks, live-ops, members. Used by the MCP server to set things up for you. |

Each skill has a concise guide plus **per-endpoint references** (request fields, response examples)
generated directly from Specter's API, and ready-to-paste **JavaScript / Unity** examples where
useful — so the code Claude writes stays accurate.

---

## The MCP server

The same package ships an MCP server, `specter-mcp`, that lets Claude **inspect and configure** a
Specter backend directly. The skills teach Claude the API; the MCP server lets it *use* the API.

> *"What currencies does my project have?"* · *"Is my setup working?"* · *"Create a gems currency
> and a daily quest that rewards 100 coins."*

### Setup

**The easy way** — `npx specter-skills init` offers to set this up for you (it writes the config,
no JSON editing). Or run it any time:

```bash
# Claude Desktop
npx specter-skills mcp

# Claude Code (registers it for all your projects)
npx specter-skills mcp --code
```

Then restart your MCP host and the `specter` tools appear. (Claude Desktop and Claude Code are
different apps with separate configs — pick the one you actually use.)

<details>
<summary>Manual setup (if you prefer to edit the config yourself)</summary>

Add to your MCP host config (e.g. Claude Desktop's `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "specter": {
      "command": "npx",
      "args": ["-y", "-p", "specter-skills", "specter-mcp"],
      "env": {
        "SPECTER_ENV": "staging",
        "SPECTER_ALLOW_MUTATIONS": "true"
      }
    }
  }
}
```
</details>

Read-only tools work immediately; creating things needs a one-time
[sign-in](#signing-in-no-password-needed) — no api-key or project ID to configure.

### Signing in (no password needed)

To **create** anything, Claude needs to act as you — so you authorize it once through your browser.
The first time it's needed, Claude runs the `specter_login` tool (or run it yourself in a terminal):

```bash
npx -y -p specter-skills specter-mcp login
```

What happens:

1. Your browser opens the Specter dashboard.
2. You sign in **however you normally do** — email/password, **Google**, or **Apple**.
3. You approve a consent screen ("Allow specter-mcp to manage your projects").
4. Done — a revocable token is saved locally (`~/.specter/credentials.json`). You stay signed in.

**Your password and social credentials never touch the tool or Claude.** Revoke access anytime
from the dashboard. Manage the session with `specter-mcp whoami` and `specter-mcp logout`.

> ℹ️ Run `specter-mcp` commands from any folder **except** the `specter-skills` source folder
> itself (npx gets confused there).

### Tools

**Read-only** — always available, safe to run:

| Tool | Purpose |
|---|---|
| `specter_verify_setup` | Smoke-test the project: auth, currencies, events, tasks |
| `specter_list_currencies` · `_items` · `_bundles` · `_stores` | Inspect economy content |
| `specter_list_events` | List custom events (with their ids) that trigger tasks |
| `specter_list_tasks` · `_leaderboards` · `_tournaments` · `_battlepasses` | Inspect progression & competitions |
| `specter_list_progression_systems` · `_markers` | Inspect level systems & markers |

> Read tools use your browser sign-in (run `specter_login` once) — no separate api-key to configure.

**Client / runtime** — act as a sandboxed test player to exercise the game-facing `/v2/client` API and **prove your config works**:

| Tool | Purpose |
|---|---|
| `specter_get_player_state` | Read the test player's tasks, wallet, and inventory |
| `specter_send_event` | Fire a custom event (the same call your game makes) to trigger achievements |
| `specter_test_achievement` | End-to-end: read status → fire the event → re-read → report whether the task progressed |
| `specter_get_reward_history` · `specter_claim_reward` | List pending rewards, and claim on-claim task rewards (grant-reward-by-source) |
| `specter_generate_client_code` | Generate ready-to-paste game code (JS or Unity C#) wired with your real api-key + event slug |

**Mutating** — opt-in (`SPECTER_ALLOW_MUTATIONS=true`), gated behind your confirmation:

| Tool | Creates / does |
|---|---|
| `specter_create_currency` · `_item` · `_bundle` · `_store` | Economy content |
| `specter_create_currency_conversion` · `_currency_policy` | Exchange rates + balance/decay/earning-cap policies |
| `specter_create_event` | A custom event that triggers achievements |
| **`specter_create_task`** | A single-objective achievement |
| **`specter_create_mission`** · **`_step_series`** · **`_time_series`** | The 3 grouped achievement types (pool / sequential / streak) |
| **`specter_schedule_achievement`** · **`_stop_achievement`** · **`_delete_achievement`** | Activate / halt / delete an achievement (the create→schedule two-step) |
| `specter_create_battlepass` · `_level_system` · `_progression_marker` | Progression content |
| `specter_create_match` | Multiplayer match template (format / outcome / game) |
| `specter_create_leaderboard` · `_competition` | Competitions |
| `specter_edit_currency` · `_edit_task` · `_update_entity` | Edit existing entities (rename, retune, disable, …) |
| `specter_schedule_liveops` | Schedule a leaderboard / competition live |
| `specter_grant_reward` | Grant items / currencies to a player |
| `specter_admin_call` · `specter_client_call` | **Escape hatches** — call *any* `/v1` admin or `/v2/client` endpoint that lacks a dedicated tool (match config, members, games, reward-sets, tags, friends, purchases, …), using the bundled API references for the shape |
| `specter_login` | Browser sign-in (above) |

The achievement tools resolve friendly names for you — pass `event` as an event slug/name,
`rewards` as `[{currency:"gems", quantity:50}]` (or `item`/`bundle`/`marker`), and the tool
resolves them to the right ids. Creating an achievement does **not** make it live — call
`specter_schedule_achievement` to activate it.

Mutating tools change **live game configuration**, so they're flagged non-read-only and your MCP
host asks for confirmation before each one. **Point them at a staging project first.**

Your **project is auto-detected** from your sign-in — there's no project ID to look up. (Only set
`SPECTER_PROJECT_ID` if your organisation has several projects and you want to pin one.)

### Configuration

All configuration is via env vars in your MCP host config:

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `SPECTER_ENV` | — | `staging` | `staging` or `production` |
| `SPECTER_ALLOW_MUTATIONS` | — | `false` | `true` enables the create / mutate tools |
| `SPECTER_API_KEY` | optional | — | Client api-key. **Not needed after sign-in** — the dev key from your login is reused. Set it only if you want read tools to work before signing in. |
| `SPECTER_PROJECT_ID` | optional | — | Auto-discovered from your sign-in. Only set it if your organisation has multiple projects and you want to pin one. |
| `SPECTER_ADMIN_TOKEN` | optional | — | For CI / non-interactive use instead of browser sign-in |

---

## Things to ask Claude

Once installed, just describe what you want — the right skill (and MCP tool) kicks in automatically:

- *"Add silent device login and a coins wallet to my game."*
- *"Set up a daily quest: play 5 matches → reward 200 coins. Create it in my Specter project and
  give me the client code."*
- *"Create a premium gem currency and a starter store that sells a 'Sword' item for 100 gems."*
- *"Add a weekly leaderboard with top-10 prize distribution."*
- *"Build a battle pass with 30 tiers."*
- *"Add skill-based matchmaking with parties — show me the WebSocket events to handle."*
- *"Why am I getting a 429 from Specter?"*
- *"Is my Specter project set up correctly?"*

---

## Checking the version & updating

```bash
# Latest version published on npm
npm view specter-skills version

# Which skills you have installed (and their versions)
npx specter-skills list

# Update your installed skills to the latest
npx specter-skills update
```

> `npx` caches packages for ~24h. If `update` pulls an old version, force the latest with
> `npx specter-skills@latest update`. The MCP server (`npx … specter-mcp`) always fetches the
> latest published version the same way.

---

## Requirements

- **Node.js 18+**
- A **Specter project + API key** ([console.specterapp.xyz](https://console.specterapp.xyz))
- A **skills-aware Claude host** (Claude Code, Claude Desktop, or the Agent SDK) for the skills;
  an **MCP-compatible host** for the server

---

## Troubleshooting

| Symptom | Fix |
|---|---|
| `specter-mcp: command not found` | Run it from a folder **other than** the `specter-skills` source folder (e.g. `cd ~` first). |
| `No api-key available` | Set `SPECTER_API_KEY`, or run `specter-mcp login` (its dev key is then reused). |
| `Multiple projects` on a create tool | Tell Claude which project (it's auto-detected when you have one). |
| Create tools don't appear | Set `SPECTER_ALLOW_MUTATIONS=true` and restart your MCP host. |
| Browser login times out | Re-run `specter-mcp login`; if the browser didn't open, use the printed URL. |
| Skills don't activate | Confirm they're installed (`npx specter-skills list`) and your host loads `.claude/skills/`. |
| 401 / 402 / 429 from the API | See the `specter` skill's error reference (auth, billing, rate limits). |

---

## Links

- 🎮 Dashboard: [console.specterapp.xyz](https://console.specterapp.xyz)
- 📦 npm: [npmjs.com/package/specter-skills](https://www.npmjs.com/package/specter-skills)

---

<details>
<summary><b>Maintenance (Specter team)</b></summary>

- **Endpoint references are generated.** `npm run generate` regenerates
  `skills/*/references/endpoints{,/-index}.md` from `gamestarz_dashboard_backend/docs/api/`
  (override the source dir with `SPECTER_DOCS_DIR`). Unmapped endpoint docs fail the build, so the
  skills can't silently drift from the API.
- **Secret linter.** `npm run lint:secrets` (also runs on `prepublishOnly`) blocks secrets and
  internal hostnames from being published.
- Hand-written content lives in each skill's `SKILL.md` and the non-generated `references/*.md`.
  The MCP server lives in `mcp/src/`.

### Releasing

```bash
npm version patch        # or minor / major
npm run generate         # refresh references
npm publish --access public
```

The `files` allowlist ships `bin/`, `skills/`, `mcp/src/*.mjs`, and `README.md`. Skills and the
MCP server publish together as the single `specter-skills` package.

</details>
