# Client API (v2): `app/get-battlepasses`

**Endpoint:** `POST /v2/client/app/get-battlepasses`

**Tag:** App

**Summary:** Get battlepasses

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetMasterBattlepassesV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `battlepassIds` | string[] | — | e.g. `["summer-pass-2024","winter-pass-2024"]` | Array of battlepass IDs to filter by |
| `attributes` | string[] | — | e.g. `["name","description","status"]` | Specific attributes to include in response |
| `scheduleStatuses` | string[] | — | e.g. `["in progress","yet to start"]` | Filter by schedule statuses |
| `includeTags` | string[] | — | e.g. `["seasonal","premium"]` | Filter by tags (include battlepasses with these tags) |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |

