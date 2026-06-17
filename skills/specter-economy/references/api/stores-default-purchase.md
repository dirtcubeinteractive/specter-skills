# Client API (v2): `stores/default-purchase`

**Endpoint:** `POST /v2/client/stores/default-purchase`

**Tag:** Stores

**Summary:** Default purchase (V2)

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `DefaultPurchaseV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `isItemOrBundlePresent` | boolean | — | e.g. `true` | Whether item or bundle is present in purchase |
| `items` | Item[] | — | see below | Items to purchase |
| `bundles` | Bundle[] | — | see below | Bundles to purchase |


### Nested object: `Item`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `isItemIdWithStoreIdPresent` | boolean | ✅ | e.g. `true` | Whether item ID with store ID is present |
| `id` | string | ✅ | e.g. `item_001` | Item identifier |
| `amount` | number | — | e.g. `1` | Amount of the item |
| `currencyId` | string | — | e.g. `currency_001` | Virtual currency identifier |
| `realWorldCurrencyId` | string | — | e.g. `USD` | Real world currency identifier |
| `storeId` | string | — | e.g. `store_001` | Store identifier |
| `collectionId` | string | — | e.g. `collection_001` | Collection identifier |
| `stackId` | string | — | e.g. `stack_001` | Stack identifier |
| `specterParams` | object | — | e.g. `{}` | Specter parameters |
| `customParams` | object | — | e.g. `{}` | Custom parameters |

### Nested object: `Bundle`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `bundle_001` | Bundle identifier |
| `amount` | number | — | e.g. `1` | Amount of the bundle |
| `currencyId` | string | — | e.g. `currency_001` | Virtual currency identifier |
| `realWorldCurrencyId` | string | — | e.g. `USD` | Real world currency identifier |
| `storeId` | string | — | e.g. `store_001` | Store identifier |
| `collectionId` | string | — | e.g. `collection_001` | Collection identifier |
| `stackId` | string | — | e.g. `stack_001` | Stack identifier |
| `specterParams` | object | — | e.g. `{}` | Specter parameters |
| `customParams` | object | — | e.g. `{}` | Custom parameters |
