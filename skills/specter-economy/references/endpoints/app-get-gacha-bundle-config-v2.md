# V2 API: `client/app/get-gacha-bundle-config`

**Endpoint:** `POST /v2/client/app/get-gacha-bundle-config`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bundleId` | `string` | **Yes** | The gacha bundle ID to get configuration for |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Gacha Bundle Config list",
  "data": {
    "contents": {
      "items": [
        {
          "uuid": "item-uuid-1",
          "id": "legendary-sword",
          "name": "Legendary Sword",
          "description": "A powerful legendary weapon",
          "iconUrl": "https://cdn.example.com/sword.png",
          "rarity": {
            "id": "rarity-uuid",
            "name": "Legendary"
          },
          "probability": 1.0,
          "minQuantity": 1,
          "maxQuantity": 1
        },
        {
          "uuid": "item-uuid-2",
          "id": "epic-armor",
          "name": "Epic Armor",
          "description": "Strong protective armor",
          "iconUrl": "https://cdn.example.com/armor.png",
          "rarity": {
            "id": "rarity-uuid-2",
            "name": "Epic"
          },
          "probability": 5.0,
          "minQuantity": 1,
          "maxQuantity": 1
        }
      ]
    },
    "rarityProbabilities": [
      {
        "rarity": {
          "id": "rarity-uuid",
          "name": "Legendary"
        },
        "probability": 1.0
      },
      {
        "rarity": {
          "id": "rarity-uuid-2",
          "name": "Epic"
        },
        "probability": 5.0
      },
      {
        "rarity": {
          "id": "rarity-uuid-3",
          "name": "Rare"
        },
        "probability": 15.0
      },
      {
        "rarity": {
          "id": "rarity-uuid-4",
          "name": "Common"
        },
        "probability": 79.0
      }
    ],
    "pitySystem": {
      "type": "counter",
      "counterThreshold": 50,
      "rateIncrement": 0.5,
      "baseRateMultiplier": 1.0,
      "maxRateMultiplier": 2.0,
      "milestoneInterval": 10,
      "guaranteedRarity": "legendary"
    },
    "drawsPerOpen": 1
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `contents` | `object` | Object containing gacha contents |
| `contents.items` | `array` | Array of items that can be drawn |
| `contents.items[].uuid` | `string` | Unique identifier (internal ID) |
| `contents.items[].id` | `string` | Item ID (client-facing) |
| `contents.items[].name` | `string` | Item display name |
| `contents.items[].description` | `string` | Item description |
| `contents.items[].iconUrl` | `string` | URL to item icon |
| `contents.items[].rarity` | `object` | Rarity info `{ id, name }` or null |
| `contents.items[].probability` | `number` | Drop probability percentage |
| `contents.items[].minQuantity` | `number` | Minimum quantity when drawn |
| `contents.items[].maxQuantity` | `number` | Maximum quantity when drawn |
| `rarityProbabilities` | `array` | Array of rarity probability configurations |
| `rarityProbabilities[].rarity` | `object` | Rarity info `{ id, name }` or null |
| `rarityProbabilities[].probability` | `number` | Base probability for this rarity |
| `pitySystem` | `object` | Pity system configuration |
| `pitySystem.type` | `string` | Type of pity system |
| `pitySystem.counterThreshold` | `number` | Number of draws before pity triggers |
| `pitySystem.rateIncrement` | `number` | Rate increment per draw |
| `pitySystem.baseRateMultiplier` | `number` | Base rate multiplier |
| `pitySystem.maxRateMultiplier` | `number` | Maximum rate multiplier |
| `pitySystem.milestoneInterval` | `number` | Milestone interval for pity |
| `pitySystem.guaranteedRarity` | `string` | Guaranteed rarity after threshold |
| `drawsPerOpen` | `number` | Number of draws per bundle open |

---

## Request/Response Examples

### Example 1: Get Gacha Bundle Configuration
**Request:**
```json
{
  "bundleId": "mystery-box"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Gacha Bundle Config list",
  "data": {
    "contents": {
      "items": [
        {
          "uuid": "item-uuid-1",
          "id": "legendary-sword",
          "name": "Legendary Sword",
          "description": "A powerful legendary weapon",
          "iconUrl": "https://cdn.example.com/sword.png",
          "rarity": {
            "id": "rarity-uuid",
            "name": "Legendary"
          },
          "probability": 1.0,
          "minQuantity": 1,
          "maxQuantity": 1
        },
        {
          "uuid": "item-uuid-2",
          "id": "common-potion",
          "name": "Health Potion",
          "description": "Restores health",
          "iconUrl": "https://cdn.example.com/potion.png",
          "rarity": {
            "id": "rarity-uuid-4",
            "name": "Common"
          },
          "probability": 50.0,
          "minQuantity": 1,
          "maxQuantity": 5
        }
      ]
    },
    "rarityProbabilities": [
      {
        "rarity": {
          "id": "rarity-uuid",
          "name": "Legendary"
        },
        "probability": 1.0
      },
      {
        "rarity": {
          "id": "rarity-uuid-4",
          "name": "Common"
        },
        "probability": 79.0
      }
    ],
    "pitySystem": {
      "type": "counter",
      "counterThreshold": 50,
      "rateIncrement": 0.5,
      "baseRateMultiplier": 1.0,
      "maxRateMultiplier": 2.0,
      "milestoneInterval": 10,
      "guaranteedRarity": "legendary"
    },
    "drawsPerOpen": 1
  },
  "errors": []
}
```

---

## Notes

- Only gacha bundles can use this endpoint - regular bundles will return an error
- The `contents.items` array contains all items that can potentially be drawn
- `rarityProbabilities` defines the base probability for each rarity tier
- The `pitySystem` configuration determines how the pity mechanic works
- Use `inventory/get-pity-status` endpoint to check a player's current pity progress

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Bundle not found | The specified bundleId does not exist |
| It is not gacha bundle | The specified bundle is not a gacha bundle |

---

## Source Files

- **DTO**: `src/inventory/dtos/get-client-gacha-bundle-config.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
