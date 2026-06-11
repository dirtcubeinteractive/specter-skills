# V2 API: `client/player/get-inventory`

**Endpoint:** `POST /v2/client/player/get-inventory`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to get inventory for |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |
| `search` | `string` | No | Search keyword |
| `sortField` | `string` | No | Field to sort by |
| `sortOrder` | `string` | No | Sort order (asc/desc) |
| `collectionId` | `string` | No | Filter by collection ID |
| `itemIds` | `string[]` | No | Filter by specific item IDs |
| `bundleIds` | `string[]` | No | Filter by specific bundle IDs |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Inventory data",
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
        "totalUsesAvailable": 10,
        "isEquipped": true,
        "quantity": 1,
        "collectionId": "weapons",
        "stackId": "default"
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
        "rarity": null,
        "totalUsesAvailable": 1,
        "isEquipped": false,
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "isOpened": false
      }
    ],
    "totalItemsCount": 25,
    "totalBundlesCount": 5
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | Array of items in player's inventory |
| `bundles` | `array` | Array of bundles in player's inventory |
| `totalItemsCount` | `number` | Total items count in inventory |
| `totalBundlesCount` | `number` | Total bundles count in inventory |
| `instanceId` | `string` | Unique inventory instance ID |
| `uuid` | `string` | Database UUID |
| `id` | `string` | Logical item/bundle ID |
| `rarity` | `object \| null` | Rarity tier info |
| `isOpened` | `boolean` | Whether bundle has been opened (bundles only) |

---

## Request Examples

### Example 1: Get Player's Inventory
**Request:**
```json
{
  "userId": "player-123"
}
```

### Example 2: Get Specific Items with Sorting
**Request:**
```json
{
  "userId": "player-123",
  "itemIds": ["sword-01", "shield-01"],
  "sortField": "name",
  "sortOrder": "asc",
  "limit": 20
}
```

### Example 3: Filter by Collection
**Request:**
```json
{
  "userId": "player-123",
  "collectionId": "weapons",
  "offset": 0,
  "limit": 10
}
```

---

## Source Files

- **DTO**: `src/user-inventory/dto/get-player-inventory.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
