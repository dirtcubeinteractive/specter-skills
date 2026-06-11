# V2 API: `client/inventory/add`

**Endpoint:** `POST /v2/client/inventory/add`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | `array` | No | Array of items to add (at least one of items or bundles required) |
| `items[].id` | `string` | Yes | The item ID to add |
| `items[].amount` | `number` | No | Amount to add (min: 1) |
| `items[].collectionId` | `string` | No | Collection ID to add item to |
| `items[].stackId` | `string` | No | Stack ID within the collection |
| `items[].customParams` | `object` | No | Custom parameters |
| `bundles` | `array` | No | Array of bundles to add |
| `bundles[].id` | `string` | Yes | The bundle ID to add |
| `bundles[].amount` | `number` | No | Amount to add (min: 1) |
| `bundles[].collectionId` | `string` | No | Collection ID to add bundle to |
| `bundles[].stackId` | `string` | No | Stack ID within the collection |
| `bundles[].customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Successfully added to User Inventory",
  "data": {
    "items": [
      {
        "instanceId": "inv-uuid-123",
        "uuid": "item-db-uuid",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        },
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "isEquipped": false,
        "totalUsesAvailable": 10
      }
    ],
    "bundles": [
      {
        "instanceId": "inv-uuid-456",
        "uuid": "bundle-db-uuid",
        "id": "starter-pack",
        "name": "Starter Pack",
        "description": "A starter bundle",
        "iconUrl": "https://cdn.example.com/bundle.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Rare"
        },
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "isEquipped": false,
        "totalUsesAvailable": 1
      }
    ]
  },
  "errors": []
}
```

### Partial Success Response (207)
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Partially added to User Inventory",
  "data": {
    "items": [],
    "bundles": [],
    "itemsFailed": [
      {
        "id": "sword-01",
        "amount": 5,
        "collectionId": "collection-1",
        "stackId": "stack-1",
        "message": "Item is not added to collection",
        "reason": "Collection stack full for this item. Create a new stack to add more of the same item.",
        "code": 1032
      }
    ],
    "bundlesFailed": []
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `instanceId` | `string` | Unique inventory instance ID |
| `uuid` | `string` | Database UUID of the item/bundle |
| `id` | `string` | Logical item/bundle ID |
| `name` | `string` | Display name |
| `description` | `string` | Item/bundle description |
| `iconUrl` | `string` | URL to icon image |
| `rarity` | `object \| null` | Rarity tier info |
| `quantity` | `number` | Quantity in inventory |
| `collectionId` | `string` | Collection ID |
| `stackId` | `string` | Stack ID |
| `isEquipped` | `boolean` | Whether item is equipped |
| `totalUsesAvailable` | `number` | Remaining uses |

---

## Request Examples

### Example 1: Add Items
**Request:**
```json
{
  "items": [
    {
      "id": "sword-01",
      "amount": 2,
      "collectionId": "weapons"
    }
  ]
}
```

### Example 2: Add Items and Bundles
**Request:**
```json
{
  "items": [
    {
      "id": "health-potion",
      "amount": 5
    }
  ],
  "bundles": [
    {
      "id": "starter-pack",
      "amount": 1
    }
  ]
}
```

---

## Source Files

- **DTO**: `src/user-inventory/dto/add-user-inventory.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
