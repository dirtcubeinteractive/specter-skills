# Admin API: `competition/delete`

**Endpoint:** `POST /v1/competition/delete`

**Tag:** Competition

**Summary:** Delete competition

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteCompetitionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | ✅ | e.g. `["comp-weekly-battle-001","comp-daily-challen…` | Array of competition IDs to delete |

