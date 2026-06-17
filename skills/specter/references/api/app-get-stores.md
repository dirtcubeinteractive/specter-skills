# Client API (v2): `app/get-stores`

**Endpoint:** `POST /v2/client/app/get-stores`

**Tag:** App

**Summary:** Get stores (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetClientStoreV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `storeIds` | string[] | — | e.g. `["store_001","store_002"]` | Store identifiers to filter |
| `attributes` | string[] | — | e.g. `["name","description"]` | Attributes to include in response |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `premium` | Search keyword |
| `includeTags` | string[] | — | e.g. `["featured","seasonal"]` | Tags to include in filter |

