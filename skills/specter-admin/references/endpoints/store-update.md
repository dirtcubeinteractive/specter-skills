# Admin API: `store/update`

**Endpoint:** `POST /v1/store/update`

**Tag:** Inventory

**Summary:** Update store

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateStoresDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `stores` | UpdateStoreDto[] | ✅ | see below | Array of stores to update |


### Nested object: `UpdateStoreDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Store ID |
| `storeId` | string | — | e.g. `store_001` | Store identifier |
| `name` | string | — | e.g. `Premium Store` | Name of the store |
| `description` | string | — | e.g. `Store containing premium items` | Description of the store |
| `iconUrl` | string | — | e.g. `https://example.com/icons/store.png` | URL for the store icon |
| `storeImageUrl` | string | — | e.g. `https://example.com/images/store-banner.png` | URL for the store image |
| `gamePlatformMasterId` | number | — | e.g. `1` | Game platform master ID |
| `isLocked` | boolean | — | e.g. `false` | Whether the store is locked |
| `quantity` | number | — | e.g. `100` | Quantity available in store |
| `unlockOperator` | string | — | e.g. `AND` | Operator for unlock conditions |
| `meta` | object | — | e.g. `{"featured":true}` | Additional metadata for the store |
| `tags` | string[] | — | e.g. `["premium","seasonal"]` | Tags associated with the store |
| `active` | boolean | — | e.g. `true` | Whether the store is active |
| `archive` | boolean | — | e.g. `false` | Whether the store is archived |
| `storeCategories` | UpdateStoreCategoryDto[] | — | see below | Store categories |
| `rewardUnlockCondition` | RewardUnlockCondition[] | — | see below | Reward unlock conditions |
| `storePlatformIds` | number[] | — | e.g. `[1,2]` | Platform IDs where the store is available |
| `storeLocationIds` | number[] | — | e.g. `[1,2]` | Location IDs where the store is available |
