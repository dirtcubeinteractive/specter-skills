# Admin API: `bundle/update`

**Endpoint:** `POST /v1/bundle/update`

**Tag:** Inventory

**Summary:** Update bundle

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateBundlesDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `bundles` | UpdateBundleDto[] | ✅ | see below | Array of bundles to update |


### Nested object: `UpdateBundleDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Bundle ID |
| `name` | string | — | e.g. `Legendary Chest` | Bundle name |
| `description` | string | — | e.g. `A chest containing legendary items` | Bundle description |
| `iconUrl` | string | — | e.g. `https://example.com/icon.png` | Icon URL for the bundle |
| `bundleImageUrl` | string | — | e.g. `https://example.com/bundle.png` | Bundle image URL |
| `isConsumable` | boolean | — | e.g. `true` | Whether the bundle is consumable |
| `isEquippable` | boolean | — | e.g. `false` | Whether the bundle is equippable |
| `isTradable` | boolean | — | e.g. `true` | Whether the bundle is tradable |
| `isStackable` | boolean | — | e.g. `true` | Whether the bundle is stackable |
| `stackCapacity` | number | — | e.g. `99` | Stack capacity for the bundle |
| `isRentable` | boolean | — | e.g. `false` | Whether the bundle is rentable |
| `quantity` | number | — | e.g. `100` | Quantity of the bundle |
| `typeId` | string | — | e.g. `type_001` | Type ID for the bundle |
| `isLocked` | boolean | — | e.g. `false` | Whether the bundle is locked |
| `isManual` | boolean | — | e.g. `false` | Whether the bundle is manual |
| `consumeByUses` | number | — | e.g. `5` | Number of uses before consumed |
| `maxCollectionInstance` | number | — | e.g. `10` | Maximum collection instances |
| `consumeByTime` | number | — | e.g. `3600` | Time until consumed |
| `consumeByTimeFormat` | string | — | e.g. `seconds` | Format for consume by time |
| `unlockOperator` | string | — | e.g. `AND` | Unlock operator |
| `meta` | object | — | e.g. `{"key":"value"}` | Metadata object for additional bundle information |
| `tags` | string[] | — | e.g. `["legendary","rare"]` | Tags for the bundle |
| `isGacha` | boolean | — | e.g. `true` | Whether the bundle is a gacha |
| `drawsPerOpen` | number | — | e.g. `10` | Number of draws per open |
| `pitySystemType` | string | — | `none` \| `counter` \| `rate` \| `milestone` \| `mixed` | Pity system type |
| `counterThreshold` | number | — | e.g. `90` | Counter threshold for pity system |
| `rateIncrement` | number | — | e.g. `0.05` | Rate increment for pity system |
| `baseRateMultiplier` | number | — | e.g. `1` | Base rate multiplier |
| `maxRateMultiplier` | number | — | e.g. `2` | Maximum rate multiplier |
| `milestoneInterval` | number | — | e.g. `10` | Milestone interval for pity system |
| `guaranteedRarity` | string | — | e.g. `legendary` | Guaranteed rarity |
| `rarityId` | number | — | e.g. `5` | Rarity ID |
| `rewardUnlockCondition` | RewardUnlockCondition[] | — | see below | Reward unlock conditions |
| `bundleContent` | BundleContentsDto[] | — | see below | Bundle contents |
| `bundlePrices` | CreateContentPriceDto[] | — | see below | Bundle prices |
| `bundleRarityProbabilities` | BundleRarityProbabilityDto[] | — | see below | Bundle rarity probabilities |
| `active` | boolean | — | e.g. `true` | Whether the bundle is active |
| `archive` | boolean | — | e.g. `false` | Whether the bundle is archived |
