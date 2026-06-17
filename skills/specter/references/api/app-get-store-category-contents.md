# Client API (v2): `app/get-store-category-contents`

**Endpoint:** `POST /v2/client/app/get-store-category-contents`

**Tag:** App

**Summary:** Get store category contents (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetStoreCategoryContentsV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `storeId` | string | ✅ | e.g. `store_001` | Store identifier |
| `categoryId` | string | — | e.g. `category_001` | Category identifier |
| `attributes` | string[] | — | e.g. `["name","description"]` | Attributes to include in response |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `offset` | number | — | e.g. `0` | Pagination offset |

