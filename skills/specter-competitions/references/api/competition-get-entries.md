# Client API (v2): `competition/get-entries`

**Endpoint:** `POST /v2/client/competition/get-entries`

**Tag:** Competition

**Summary:** Get competition entries

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `competitionIds` | string[] | — | e.g. `["1c24b596-4e71-4700-8f9f-c476863d7aef"]` | Competition IDs to filter |
| `offset` | number | — | e.g. `0` | Offset for pagination |
| `limit` | number | — | e.g. `10` | Limit for pagination |

