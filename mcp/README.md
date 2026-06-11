# @specterapp/mcp

A Model Context Protocol (MCP) server for [Specter](https://console.specterapp.xyz). It lets
Claude **inspect and configure** your game backend directly — "what currencies does my project
have?", "is my setup working?", "create a gems currency and a daily quest" — instead of only
writing integration code.

Pairs with the Specter Claude Skills (`npx specter-skills init`): the skills teach Claude the
API; this server lets Claude *act on* it.

## Tools

**Read-only (always available):**
- `specter_verify_setup` — smoke-test the project (api-key, project, currencies, wallets, tasks)
- `specter_list_currencies`, `specter_list_items`, `specter_list_tasks`, `specter_list_leaderboards`

**Mutating (opt-in — `SPECTER_ALLOW_MUTATIONS=true` + admin creds):**
- `specter_create_currency`, `specter_create_task`

Mutating tools are annotated non-read-only so MCP hosts gate them behind user confirmation. They
hit the admin API and change live game configuration — point them at a **staging** project first.

## Configure

In your MCP host config (e.g. Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "specter": {
      "command": "npx",
      "args": ["-y", "@specterapp/mcp"],
      "env": {
        "SPECTER_API_KEY": "<your client api-key>",
        "SPECTER_ENV": "staging"
      }
    }
  }
}
```

To enable the create-* tools, also set:

```json
"SPECTER_ALLOW_MUTATIONS": "true",
"SPECTER_ADMIN_URL": "https://admin.specterapp.xyz/v1",
"SPECTER_MEMBER_EMAIL": "you@studio.com",
"SPECTER_MEMBER_PASSWORD": "...",
"SPECTER_PROJECT_ID": "<projectId>"
```

| Env var | Required | Default | Purpose |
|---|---|---|---|
| `SPECTER_API_KEY` | ✅ | — | Client api-key (read tools + test player) |
| `SPECTER_ENV` | — | `staging` | `staging` or `production` |
| `SPECTER_ALLOW_MUTATIONS` | — | `false` | `true` enables create-* tools |
| `SPECTER_ADMIN_URL` | for mutations | — | Admin API base URL |
| `SPECTER_MEMBER_EMAIL` / `_PASSWORD` | for mutations | — | Dashboard member login |
| `SPECTER_PROJECT_ID` | for mutations | — | Default project for admin calls |

## Notes

- Admin defaults are verified against the production deployment: base URL
  `https://admin.specterapp.xyz/v1`, sign-in at `member/sign-in` with `{ email, password }`,
  member token returned as `data.authToken`. Override `SPECTER_ADMIN_URL` for staging/other envs.
- The server creates one reusable test player (`customId: "specter-mcp-test-player"`) for the
  wallet check in `specter_verify_setup`.
