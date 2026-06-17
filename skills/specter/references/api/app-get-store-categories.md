# Client API (v2): `app/get-store-categories`

**Endpoint:** `POST /v2/client/app/get-store-categories`

**Tag:** App

**Summary:** Get store categories (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetStoreCategoriesV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `storeId` | string | ✅ | e.g. `store_001` | Store identifier |
| `categoryIds` | string[] | — | e.g. `["category_001","category_002"]` | Category identifiers to filter |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `weapons` | Search keyword |

