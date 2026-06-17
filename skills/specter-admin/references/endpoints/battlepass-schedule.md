# Admin API: `battlepass/schedule`

**Endpoint:** `POST /v1/battlepass/schedule`

**Tag:** Battlepass

**Summary:** Schedule battlepass

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ScheduleBattlepassDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `battlepassId` | string | ✅ | e.g. `bp-uuid-12345` | Battlepass ID to schedule |
| `startDate` | string | — | e.g. `2024-06-01T00:00:00Z` | Start date for the battlepass (ISO 8601 format) |
| `endDate` | string | — | e.g. `2024-08-31T23:59:59Z` | End date for the battlepass (ISO 8601 format) |
| `timezone` | string | — | e.g. `America/New_York` | Timezone for the schedule |

