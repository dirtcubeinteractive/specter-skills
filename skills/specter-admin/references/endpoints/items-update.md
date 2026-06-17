# Admin API: `items/update`

**Endpoint:** `POST /v1/items/update`

**Tag:** Inventory

**Summary:** Update items

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateItemsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `items` | UpdateItemDto[] | ✅ | see below | Array of items to update |


### Nested object: `UpdateItemDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Item ID |
| `itemId` | string | — | e.g. `item_001` | Item identifier |
| `name` | string | — | e.g. `Legendary Sword` | Name of the item |
| `isConsumable` | boolean | — | e.g. `true` | Whether the item is consumable |
| `isEquippable` | boolean | — | e.g. `true` | Whether the item is equippable |
| `isTradable` | boolean | — | e.g. `false` | Whether the item is tradable |
| `isStackable` | boolean | — | e.g. `true` | Whether the item is stackable |
| `isTimeStackable` | boolean | — | e.g. `false` | Whether the item is time stackable |
| `stackCapacity` | number | — | e.g. `99` | Maximum stack capacity |
| `isRentable` | boolean | — | e.g. `false` | Whether the item is rentable |
| `quantity` | number | — | e.g. `1` | Quantity of the item |
| `description` | string | — | e.g. `A powerful sword forged by ancient warriors` | Description of the item |
| `iconUrl` | string | — | e.g. `https://example.com/icons/sword.png` | URL for the item icon |
| `itemImageUrl` | string | — | e.g. `https://example.com/images/sword.png` | URL for the item image |
| `typeId` | string | — | e.g. `weapon` | Type ID of the item |
| `isLocked` | boolean | — | e.g. `false` | Whether the item is locked |
| `isDefaultLoadout` | boolean | — | e.g. `false` | Whether this item is part of default loadout |
| `equippedByDefault` | boolean | — | e.g. `false` | Whether the item is equipped by default |
| `consumeByUses` | number | — | e.g. `10` | Number of uses before consumption |
| `consumeByTime` | number | — | e.g. `3600` | Time duration before consumption |
| `consumeByTimeFormat` | string | — | e.g. `seconds` | Format for consume by time |
| `maxCollectionInstance` | number | — | e.g. `5` | Maximum collection instances allowed |
| `unlockOperator` | string | — | e.g. `AND` | Operator for unlock conditions |
| `meta` | object | ✅ | e.g. `{"power":100,"rarity":"legendary"}` | Additional metadata for the item |
| `tags` | string[] | — | e.g. `["melee","weapon","legendary"]` | Tags associated with the item |
| `rarityId` | number | — | e.g. `5` | Rarity ID of the item |
| `rewardUnlockCondition` | RewardUnlockCondition[] | — | see below | Reward unlock conditions |
| `itemPrices` | UpdateItemPriceDto[] | — | see below | Prices for the item |
| `active` | boolean | — | e.g. `true` | Whether the item is active |
| `archive` | boolean | — | e.g. `false` | Whether the item is archived |
