# V2 API: `client/app/get-items`

**Endpoint:** `POST /v2/client/app/get-items`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `itemIds` | `string[]` | No | Array of item IDs to filter by |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `isLocked` | `boolean` | No | Filter by locked status |
| `isDefaultLoadout` | `boolean` | No | Filter by default loadout status |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Number of items to return (default: 10) |
| `search` | `string` | No | Search keyword for item names |
| `includeTags` | `string[]` | No | Filter items that have these tags |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `properties` | Item properties | `properties: { isConsumable, isEquippable, isTradable, isStackable, isLocked, ... }` |
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `prices` | Pricing information | `prices: [{ priceType, price, currencyDetails, ... }]` |
| `unlockConditions` | Unlock requirements | `unlockConditions: { unlockItem, unlockBundle, unlockLevel }` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Items list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-123",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        }
      }
    ],
    "totalCount": 150,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data.items` | `array` | Array of item objects |
| `items[].uuid` | `string` | Unique identifier (internal ID) |
| `items[].id` | `string` | Item ID (client-facing) |
| `items[].name` | `string` | Item display name |
| `items[].description` | `string` | Item description |
| `items[].iconUrl` | `string` | URL to item icon |
| `items[].rarity` | `object` | Rarity info `{ id, name }` |
| `totalCount` | `number` | Total number of items in the project |
| `lastUpdate` | `string` | Timestamp of last item update |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `items[].properties` | `object` | `"properties"` | Item properties object |
| `items[].properties.isConsumable` | `boolean` | `"properties"` | Can be consumed |
| `items[].properties.isEquippable` | `boolean` | `"properties"` | Can be equipped |
| `items[].properties.isTradable` | `boolean` | `"properties"` | Can be traded |
| `items[].properties.isStackable` | `boolean` | `"properties"` | Can be stacked |
| `items[].properties.isLocked` | `boolean` | `"properties"` | Is locked |
| `items[].properties.isDefaultLoadout` | `boolean` | `"properties"` | Is default loadout |
| `items[].properties.equippedByDefault` | `boolean` | `"properties"` | Equipped by default |
| `items[].properties.stackCapacity` | `number` | `"properties"` | Max stack size |
| `items[].properties.maxCollectionInstance` | `number` | `"properties"` | Max instances in collection |
| `items[].properties.limitedQuantity` | `number` | `"properties"` | Total limited quantity |
| `items[].properties.remainingQuantity` | `number` | `"properties"` | Remaining quantity available |
| `items[].properties.consumeByUses` | `number` | `"properties"` | Uses before consumed |
| `items[].properties.consumeByTime` | `number` | `"properties"` | Time before consumed |
| `items[].properties.consumeByTimeFormat` | `string` | `"properties"` | Time format for consumption |
| `items[].meta` | `object` | `"meta"` | Custom metadata |
| `items[].tags` | `array` | `"tags"` | Array of tag names |
| `items[].prices` | `array` | `"prices"` | Array of price objects |
| `items[].prices[].priceType` | `string` | `"prices"` | Type of price |
| `items[].prices[].price` | `number` | `"prices"` | Price amount |
| `items[].prices[].productId` | `string` | `"prices"` | Product ID for IAP |
| `items[].prices[].discount` | `number` | `"prices"` | Discount amount |
| `items[].prices[].bonusCashAllowance` | `number` | `"prices"` | Bonus cash allowance |
| `items[].prices[].currencyDetails` | `object` | `"prices"` | In-game currency details |
| `items[].prices[].realWorldCurrency` | `object` | `"prices"` | Real currency details |
| `items[].unlockConditions` | `object` | `"unlockConditions"` | Unlock conditions |
| `items[].unlockConditions.unlockItem` | `array` | `"unlockConditions"` | Items to unlock `[{ uuid, id, name }]` |
| `items[].unlockConditions.unlockBundle` | `array` | `"unlockConditions"` | Bundles to unlock `[{ uuid, id, name }]` |
| `items[].unlockConditions.unlockLevel` | `array` | `"unlockConditions"` | Level requirements `[{ lockedLevelNo, unlockProgressionSystem }]` |

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
  "message": "Items list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-123",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        }
      }
    ],
    "totalCount": 150,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
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
  "message": "Items list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-123",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        },
        "properties": {
          "isConsumable": false,
          "isEquippable": true,
          "isTradable": true,
          "isStackable": false,
          "isLocked": false,
          "isDefaultLoadout": true,
          "equippedByDefault": false,
          "stackCapacity": 1,
          "maxCollectionInstance": 1,
          "limitedQuantity": null,
          "remainingQuantity": null,
          "consumeByUses": null,
          "consumeByTime": null,
          "consumeByTimeFormat": null
        }
      }
    ],
    "totalCount": 150,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: With Prices Attribute
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
  "message": "Items list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-123",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        },
        "prices": [
          {
            "priceType": "virtual",
            "productId": null,
            "price": 100,
            "discount": 0,
            "bonusCashAllowance": 0,
            "currencyDetails": {
              "uuid": "currency-uuid",
              "id": "gold-coins",
              "name": "Gold Coins",
              "description": "In-game currency",
              "iconUrl": "https://cdn.example.com/gold.png",
              "rarity": null,
              "code": "GLD",
              "type": "virtual"
            },
            "realWorldCurrency": null
          }
        ]
      }
    ],
    "totalCount": 150,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 4: Filter by IDs with Tags
**Request:**
```json
{
  "itemIds": ["sword-01", "shield-02"],
  "attributes": ["tags"],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Items list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-123",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        },
        "tags": ["weapon", "melee", "starter"]
      }
    ],
    "totalCount": 150,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Notes

- Use `includeTags` to filter items that have specific tags
- Use `attributes` to control which additional fields are included in the response
- Search is case-insensitive and matches item names
- Response includes `totalCount` and `lastUpdate` for pagination purposes

---

## Source Files

- **DTO**: `src/inventory/dtos/get-client-items.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
