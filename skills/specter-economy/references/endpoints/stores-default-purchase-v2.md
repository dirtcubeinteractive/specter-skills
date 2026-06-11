# V2 API: `client/stores/default-purchase`

**Endpoint:** `POST /v2/client/stores/default-purchase`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | `Item[]` | No* | Array of items to purchase |
| `bundles` | `Bundle[]` | No* | Array of bundles to purchase |

*At least one of `items` or `bundles` must be provided.

### Item Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | The item ID to purchase |
| `amount` | `number` | No | Quantity to purchase (positive number, default: 1) |
| `currencyId` | `string` | No | Currency to use for purchase |
| `realWorldCurrencyId` | `string` | No | Real-world currency ID for real money purchases |
| `storeId` | `string` | No | Store ID where item is being purchased |
| `collectionId` | `string` | No | Collection ID to add item to (default: "default") |
| `stackId` | `string` | No | Stack ID for stackable items (default: "default") |
| `customParams` | `object` | No | Custom parameters for the purchase |

### Bundle Object Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | **Yes** | The bundle ID to purchase |
| `amount` | `number` | No | Quantity to purchase (default: 1) |
| `currencyId` | `string` | No | Currency to use for purchase |
| `realWorldCurrencyId` | `string` | No | Real-world currency ID for real money purchases |
| `storeId` | `string` | No | Store ID where bundle is being purchased |
| `collectionId` | `string` | No | Collection ID to add bundle contents to |
| `stackId` | `string` | No | Stack ID for stackable contents |
| `customParams` | `object` | No | Custom parameters for the purchase |

---

## Response Structure

### Full Success Response (Code 200)
```json
{
  "status": "success",
  "code": 200,
  "message": "Purchase Successful",
  "data": {
    "items": [
      {
        "instanceId": "inventory-uuid-123",
        "uuid": "item-internal-uuid",
        "id": "sword-01",
        "name": "Steel Sword",
        "description": "A sturdy steel sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": 2,
          "name": "Rare"
        },
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "totalUsesAvailable": 10,
        "isEquipped": false
      }
    ],
    "bundles": [
      {
        "instanceId": "inventory-uuid-456",
        "uuid": "bundle-internal-uuid",
        "id": "starter-pack",
        "name": "Starter Pack",
        "description": "Everything you need to start",
        "iconUrl": "https://cdn.example.com/pack.png",
        "rarity": null,
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "totalUsesAvailable": null,
        "isEquipped": false
      }
    ]
  },
  "errors": []
}
```

### Partial Success Response (Code 207)
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Partially Purchase Successful",
  "data": {
    "items": [
      {
        "instanceId": "inventory-uuid-123",
        "uuid": "item-internal-uuid",
        "id": "sword-01",
        "name": "Steel Sword",
        "description": "A sturdy steel sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": null,
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "totalUsesAvailable": null,
        "isEquipped": false
      }
    ],
    "bundles": [],
    "itemsFailed": [
      {
        "id": "legendary-sword",
        "amount": 1,
        "collectionId": "default",
        "stackId": "default",
        "message": "Item is not added to collection",
        "reason": "Insufficient wallet balance",
        "code": 1041
      }
    ],
    "bundlesFailed": []
  },
  "errors": []
}
```

---

## Response Fields Explained

### Success Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.items` | `array` | Successfully purchased items |
| `data.bundles` | `array` | Successfully purchased bundles |
| `items[].instanceId` | `string` | Inventory instance UUID |
| `items[].uuid` | `string` | Item internal UUID |
| `items[].id` | `string` | Item ID (client-facing) |
| `items[].name` | `string` | Item name |
| `items[].description` | `string` | Item description |
| `items[].iconUrl` | `string` | Item icon URL |
| `items[].rarity` | `object \| null` | Rarity object with `id` and `name`, or null |
| `items[].quantity` | `number` | Quantity in inventory |
| `items[].collectionId` | `string` | Collection ID where item was added |
| `items[].stackId` | `string` | Stack ID where item was added |
| `items[].totalUsesAvailable` | `number \| null` | Remaining uses, or null if unlimited |
| `items[].isEquipped` | `boolean` | Whether item is equipped |
| `bundles[].instanceId` | `string` | Inventory instance UUID |
| `bundles[].uuid` | `string` | Bundle internal UUID |
| `bundles[].id` | `string` | Bundle ID (client-facing) |
| `bundles[].name` | `string` | Bundle name |
| `bundles[].description` | `string` | Bundle description |
| `bundles[].iconUrl` | `string` | Bundle icon URL |
| `bundles[].rarity` | `object \| null` | Rarity object with `id` and `name`, or null |
| `bundles[].quantity` | `number` | Quantity in inventory |
| `bundles[].collectionId` | `string` | Collection ID |
| `bundles[].stackId` | `string` | Stack ID |
| `bundles[].totalUsesAvailable` | `number \| null` | Remaining uses |
| `bundles[].isEquipped` | `boolean` | Whether equipped |

### Failure Fields (Partial Success)

| Field | Type | Description |
|-------|------|-------------|
| `data.itemsFailed` | `array` | Items that failed to purchase |
| `data.bundlesFailed` | `array` | Bundles that failed to purchase |
| `itemsFailed[].id` | `string` | Item ID that failed |
| `itemsFailed[].amount` | `number` | Requested quantity |
| `itemsFailed[].collectionId` | `string` | Target collection ID |
| `itemsFailed[].stackId` | `string` | Target stack ID |
| `itemsFailed[].message` | `string` | Error message |
| `itemsFailed[].reason` | `string` | Reason for failure |
| `itemsFailed[].code` | `number` | Error code |

---

## Request/Response Examples

### Example 1: Purchase Single Item
**Request:**
```json
{
  "items": [
    {
      "id": "sword-01",
      "amount": 1,
      "currencyId": "gold-coins",
      "storeId": "main-shop"
    }
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Purchase Successful",
  "data": {
    "items": [
      {
        "instanceId": "inv-uuid-123",
        "uuid": "item-uuid-456",
        "id": "sword-01",
        "name": "Steel Sword",
        "description": "A sturdy steel sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": 2,
          "name": "Rare"
        },
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "totalUsesAvailable": null,
        "isEquipped": false
      }
    ],
    "bundles": []
  },
  "errors": []
}
```

### Example 2: Purchase Bundle
**Request:**
```json
{
  "bundles": [
    {
      "id": "starter-pack",
      "amount": 1,
      "currencyId": "gems",
      "storeId": "main-shop"
    }
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Purchase Successful",
  "data": {
    "items": [],
    "bundles": [
      {
        "instanceId": "inv-uuid-789",
        "uuid": "bundle-uuid-abc",
        "id": "starter-pack",
        "name": "Starter Pack",
        "description": "Everything you need",
        "iconUrl": "https://cdn.example.com/pack.png",
        "rarity": null,
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "totalUsesAvailable": null,
        "isEquipped": false
      }
    ]
  },
  "errors": []
}
```

### Example 3: Partial Failure
**Request:**
```json
{
  "items": [
    {
      "id": "sword-01",
      "currencyId": "gold-coins"
    },
    {
      "id": "legendary-armor",
      "currencyId": "gold-coins"
    }
  ]
}
```

**Response:**
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Partially Purchase Successful",
  "data": {
    "items": [
      {
        "instanceId": "inv-uuid-123",
        "uuid": "item-uuid-456",
        "id": "sword-01",
        "name": "Steel Sword",
        "description": "A sturdy steel sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": null,
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "totalUsesAvailable": null,
        "isEquipped": false
      }
    ],
    "bundles": [],
    "itemsFailed": [
      {
        "id": "legendary-armor",
        "amount": 1,
        "collectionId": "default",
        "stackId": "default",
        "message": "Item is not added to collection",
        "reason": "Insufficient wallet balance",
        "code": 1041
      }
    ],
    "bundlesFailed": []
  },
  "errors": []
}
```

---

## Error Codes

| Code | Reason |
|------|--------|
| 1031 | Item not found |
| 1041 | Currency not found / Insufficient wallet balance |
| 1064 | Item is out of stock |

---

## Notes

- Uses the **default price** configured for items/bundles
- For custom pricing, use `stores/custom-purchase` endpoint instead
- Supports both virtual currency and real-world currency purchases
- Creates wallet transactions for debit
- Items/bundles are added to user inventory upon successful purchase
- Triggers task validation for "item_purchased" event

---

## Source Files

- **DTO**: `src/inventory/dtos/default-purchase.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
