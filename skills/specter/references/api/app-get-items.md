# Client API (v2): `app/get-items`

**Endpoint:** `POST /v2/client/app/get-items`

**Tag:** App

**Summary:** Get items (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetClientItemsV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `itemIds` | string[] | — | e.g. `["item_001","item_002"]` | Item identifiers to filter |
| `attributes` | string[] | — | e.g. `["name","description"]` | Attributes to include in response |
| `isLocked` | boolean | — | e.g. `false` | Filter by locked status |
| `isDefaultLoadout` | boolean | — | e.g. `false` | Filter by default loadout status |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `sword` | Search keyword |
| `includeTags` | string[] | — | e.g. `["rare","weapon"]` | Tags to include in filter |

