# V2 API: `client/app/get-bundles`

**Endpoint:** `POST /v2/client/app/get-bundles`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bundleIds` | `string[]` | No | Array of bundle IDs to filter by |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `isGacha` | `boolean` | No | Filter by gacha bundle status |
| `offset` | `number` | No | Pagination offset |
| `limit` | `number` | No | Number of bundles to return (default: 10) |
| `search` | `string` | No | Search keyword for bundle names |
| `includeTags` | `string[]` | No | Filter bundles that have these tags |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `properties` | Bundle properties | `properties: { isConsumable, isEquippable, isTradable, isStackable, isLocked, ... }` |
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `contents` | Bundle contents | `contents: { items: [], bundles: [], currencies: [] }` |
| `prices` | Pricing information | `prices: [{ priceType, price, currencyDetails, ... }]` |
| `unlockConditions` | Unlock requirements | `unlockConditions: { unlockItem, unlockBundle, unlockLevel }` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "bundle-uuid-123",
      "id": "starter-pack",
      "name": "Starter Pack",
      "description": "Perfect pack for new players",
      "iconUrl": "https://cdn.example.com/starter-pack.png",
      "isGacha": false,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      }
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of bundle objects |
| `[].uuid` | `string` | Unique identifier (internal ID) |
| `[].id` | `string` | Bundle ID (client-facing) |
| `[].name` | `string` | Bundle display name |
| `[].description` | `string` | Bundle description |
| `[].iconUrl` | `string` | URL to bundle icon |
| `[].isGacha` | `boolean` | Whether this is a gacha bundle |
| `[].rarity` | `object` | Rarity info `{ id, name }` |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `[].properties` | `object` | `"properties"` | Bundle properties object |
| `[].properties.isConsumable` | `boolean` | `"properties"` | Can be consumed |
| `[].properties.isEquippable` | `boolean` | `"properties"` | Can be equipped |
| `[].properties.isTradable` | `boolean` | `"properties"` | Can be traded |
| `[].properties.isStackable` | `boolean` | `"properties"` | Can be stacked |
| `[].properties.isLocked` | `boolean` | `"properties"` | Is locked |
| `[].properties.stackCapacity` | `number` | `"properties"` | Max stack size |
| `[].properties.maxCollectionInstance` | `number` | `"properties"` | Max instances in collection |
| `[].properties.limitedQuantity` | `number` | `"properties"` | Total limited quantity |
| `[].properties.remainingQuantity` | `number` | `"properties"` | Remaining quantity available |
| `[].properties.consumeByUses` | `number` | `"properties"` | Uses before consumed |
| `[].properties.consumeByTime` | `number` | `"properties"` | Time before consumed |
| `[].properties.consumeByTimeFormat` | `string` | `"properties"` | Time format for consumption |
| `[].meta` | `object` | `"meta"` | Custom metadata |
| `[].tags` | `array` | `"tags"` | Array of tag names |
| `[].contents` | `object` | `"contents"` | Bundle contents |
| `[].contents.items` | `array` | `"contents"` | Items in bundle `[{ uuid, id, name, description, iconUrl, rarity, quantity }]` |
| `[].contents.bundles` | `array` | `"contents"` | Bundles in bundle `[{ uuid, id, name, description, iconUrl, rarity, quantity }]` |
| `[].contents.currencies` | `array` | `"contents"` | Currencies in bundle `[{ uuid, id, name, description, iconUrl, rarity, quantity }]` |
| `[].prices` | `array` | `"prices"` | Array of price objects |
| `[].prices[].priceType` | `string` | `"prices"` | Type of price |
| `[].prices[].price` | `number` | `"prices"` | Price amount |
| `[].prices[].productId` | `string` | `"prices"` | Product ID for IAP |
| `[].prices[].discount` | `number` | `"prices"` | Discount amount |
| `[].prices[].bonusCashAllowance` | `number` | `"prices"` | Bonus cash allowance |
| `[].prices[].currencyDetails` | `object` | `"prices"` | In-game currency `{ uuid, id, name, description, iconUrl, rarity, code, type }` |
| `[].prices[].realWorldCurrency` | `object` | `"prices"` | Real currency `{ uuid, id, countryName, name, code, symbol }` |
| `[].unlockConditions` | `object` | `"unlockConditions"` | Unlock conditions |
| `[].unlockConditions.unlockItem` | `array` | `"unlockConditions"` | Items to unlock `[{ id, name }]` |
| `[].unlockConditions.unlockBundle` | `array` | `"unlockConditions"` | Bundles to unlock `[{ id, name }]` |
| `[].unlockConditions.unlockLevel` | `array` | `"unlockConditions"` | Level requirements `[{ lockedLevelNo, unlockProgressionSystem: { id, levelName } }]` |

---

## Request/Response Examples

### Example 1: Basic Request (no attributes)
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "bundle-uuid-123",
      "id": "starter-pack",
      "name": "Starter Pack",
      "description": "Perfect pack for new players",
      "iconUrl": "https://cdn.example.com/starter-pack.png",
      "isGacha": false,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      }
    }
  ],
  "errors": []
}
```

### Example 2: With Properties Attribute
**Request:**
```json
{
  "attributes": ["properties"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "bundle-uuid-123",
      "id": "starter-pack",
      "name": "Starter Pack",
      "description": "Perfect pack for new players",
      "iconUrl": "https://cdn.example.com/starter-pack.png",
      "isGacha": false,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      },
      "properties": {
        "isConsumable": true,
        "isEquippable": false,
        "isTradable": false,
        "isStackable": true,
        "isLocked": false,
        "stackCapacity": 99,
        "maxCollectionInstance": 1,
        "limitedQuantity": 1000,
        "remainingQuantity": 850,
        "consumeByUses": null,
        "consumeByTime": null,
        "consumeByTimeFormat": null
      }
    }
  ],
  "errors": []
}
```

### Example 3: With Contents Attribute
**Request:**
```json
{
  "attributes": ["contents"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "bundle-uuid-123",
      "id": "starter-pack",
      "name": "Starter Pack",
      "description": "Perfect pack for new players",
      "iconUrl": "https://cdn.example.com/starter-pack.png",
      "isGacha": false,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      },
      "contents": {
        "items": [
          {
            "uuid": "item-uuid-1",
            "id": "sword-01",
            "name": "Iron Sword",
            "description": "A basic sword",
            "iconUrl": "https://cdn.example.com/sword.png",
            "rarity": { "id": "rarity-uuid", "name": "Common" },
            "quantity": 1
          }
        ],
        "bundles": [],
        "currencies": [
          {
            "uuid": "currency-uuid-1",
            "id": "gold-coins",
            "name": "Gold Coins",
            "description": "In-game currency",
            "iconUrl": "https://cdn.example.com/gold.png",
            "rarity": null,
            "quantity": 500
          }
        ]
      }
    }
  ],
  "errors": []
}
```

### Example 4: With Prices Attribute
**Request:**
```json
{
  "attributes": ["prices"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "bundle-uuid-123",
      "id": "starter-pack",
      "name": "Starter Pack",
      "description": "Perfect pack for new players",
      "iconUrl": "https://cdn.example.com/starter-pack.png",
      "isGacha": false,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      },
      "prices": [
        {
          "priceType": "virtual",
          "price": 50,
          "productId": null,
          "discount": 0,
          "bonusCashAllowance": 0,
          "currencyDetails": {
            "uuid": "currency-uuid",
            "id": "gems",
            "name": "Gems",
            "description": "Premium currency",
            "iconUrl": "https://cdn.example.com/gems.png",
            "rarity": null,
            "code": "GEM",
            "type": "premium"
          },
          "realWorldCurrency": null
        }
      ]
    }
  ],
  "errors": []
}
```

### Example 5: With Unlock Conditions Attribute
**Request:**
```json
{
  "attributes": ["unlockConditions"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "bundle-uuid-123",
      "id": "starter-pack",
      "name": "Starter Pack",
      "description": "Perfect pack for new players",
      "iconUrl": "https://cdn.example.com/starter-pack.png",
      "isGacha": false,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      },
      "unlockConditions": {
        "unlockItem": [
          {
            "id": "key-item-uuid",
            "name": "Unlock Key"
          }
        ],
        "unlockBundle": [],
        "unlockLevel": [
          {
            "lockedLevelNo": 5,
            "unlockProgressionSystem": {
              "id": "level-system-uuid",
              "levelName": "Player Level"
            }
          }
        ]
      }
    }
  ],
  "errors": []
}
```

### Example 6: Get Gacha Bundles with Tags
**Request:**
```json
{
  "isGacha": true,
  "attributes": ["tags", "contents"],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundles list",
  "data": [
    {
      "uuid": "gacha-uuid-123",
      "id": "mystery-box",
      "name": "Mystery Box",
      "description": "Open for random rewards",
      "iconUrl": "https://cdn.example.com/mystery-box.png",
      "isGacha": true,
      "rarity": {
        "id": "rarity-uuid",
        "name": "Rare"
      },
      "tags": ["gacha", "limited", "featured"],
      "contents": {
        "items": [
          {
            "uuid": "item-uuid-1",
            "id": "rare-sword",
            "name": "Rare Sword",
            "description": "A rare weapon",
            "iconUrl": "https://cdn.example.com/rare-sword.png",
            "rarity": { "id": "rarity-uuid", "name": "Rare" },
            "quantity": 1
          }
        ],
        "bundles": [],
        "currencies": []
      }
    }
  ],
  "errors": []
}
```

---

## Notes

- By default, only non-gacha bundles are returned. Use `isGacha: true` to get gacha bundles
- Use `includeTags` to filter bundles that have specific tags
- Use `attributes` to control which additional fields are included in the response
- Search is case-insensitive and matches bundle names

---

## Source Files

- **DTO**: `src/inventory/dtos/get-client-bundles.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
