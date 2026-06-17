# Admin API: `battlepass/create`

**Endpoint:** `POST /v1/battlepass/create`

**Tag:** Battlepass

**Summary:** Create battlepass

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateBattlepassDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `battlepassId` | string | ✅ | e.g. `summer-pass-2024` | Unique identifier for the battlepass |
| `name` | string | ✅ | e.g. `Summer Battle Pass` | Display name of the battlepass |
| `description` | string | — | e.g. `Season 5 exclusive rewards and challenges` | Description of the battlepass |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this battlepass belongs to |
| `levelSystemId` | string | ✅ | e.g. `level-system-uuid` | Level system ID for progression tracking |
| `active` | boolean | — | e.g. `true` | Whether the battlepass is active |
| `archive` | boolean | — | e.g. `false` | Whether the battlepass is archived |
| `meta` | object | — | e.g. `{"theme":"summer","color":"#FFD700"}` | Custom metadata for the battlepass |
| `tags` | string[] | — | e.g. `["seasonal","premium"]` | Tags for categorization |
| `thumbnailUrls` | string[] | — | e.g. `["https://cdn.example.com/thumb1.png"]` | Thumbnail image URLs |
| `coverImageUrls` | string[] | — | e.g. `["https://cdn.example.com/cover1.png"]` | Cover image URLs |
| `bannerUrls` | string[] | — | e.g. `["https://cdn.example.com/banner1.png"]` | Banner image URLs |
| `rewardUnlockCondition` | RewardUnlockCondition[] | — | see below | Conditions for unlocking rewards |
| `tiers` | CreateBattlepassTierDto[] | — | see below | Array of battlepass tiers with rewards |


### Nested object: `RewardUnlockCondition`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | — | e.g. `123e4567-e89b-12d3-a456-426614174000` | Unlock condition ID |
| `lockedLevel` | number | — | e.g. `10` | Level at which the reward is locked |
| `bundleId` | string | — | e.g. `bundle_001` | Bundle ID for unlock condition |
| `unlockBundleId` | string | — | e.g. `unlock_bundle_001` | Bundle ID that unlocks this reward |
| `itemId` | string | — | e.g. `item_001` | Item ID for unlock condition |
| `unlockItemId` | string | — | e.g. `unlock_item_001` | Item ID that unlocks this reward |
| `unlockLevelSystemId` | string | — | e.g. `level_system_001` | Level system ID for unlock |
| `storeId` | string | — | e.g. `store_001` | Store ID for unlock condition |
| `competitionId` | string | — | e.g. `competition_001` | Competition ID for unlock condition |
| `archive` | boolean | — | e.g. `false` | Whether the unlock condition is archived |

### Nested object: `CreateBattlepassTierDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `Free Tier` | Name of the battlepass tier |
| `sortingOrder` | number | — | e.g. `1` | Sorting order for the tier |
| `tierLevels` | BattlepassTierLevelDto[] | — | see below | Array of tier levels with their rewards |
