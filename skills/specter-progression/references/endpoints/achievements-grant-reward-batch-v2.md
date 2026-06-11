# V2 API: `client/achievements/grant-reward-batch`

**Endpoint:** `POST /v2/client/achievements/grant-reward-batch`

**Authentication:** User Auth Guard Required

---

## Description

Grants multiple rewards of different types to the authenticated user in a single batch request. Unlike source-based APIs, this endpoint allows you to directly specify what rewards to grant without referencing a source.

---

## Request DTO Structure

### Main Request Body: `GrantRewardBatchV2Dto`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rewards` | `Rewards` | Yes | Object containing all reward types to grant |
| `meta` | `object` | No | Custom metadata |
| `bypassLockCondition` | `boolean` | No | Bypass lock conditions for all rewards |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition restrictions for all rewards |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### Rewards Object

| Field | Type | Description |
|-------|------|-------------|
| `items` | `Item[]` | Array of items to grant |
| `bundles` | `Bundle[]` | Array of bundles to grant |
| `currencies` | `Currency[]` | Array of currencies to grant |
| `progressionMarkers` | `ProgressionMarker[]` | Array of progression markers to grant |

### Item Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Item ID |
| `amount` | `number` | Yes | Amount to grant |
| `collectionId` | `string` | No | Collection ID |
| `stackId` | `string` | No | Stack ID |
| `bypassLockCondition` | `boolean` | No | Bypass lock condition for this item |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition for this item |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### Bundle Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Bundle ID |
| `amount` | `number` | Yes | Amount to grant |
| `collectionId` | `string` | No | Collection ID |
| `stackId` | `string` | No | Stack ID |
| `bypassLockCondition` | `boolean` | No | Bypass lock condition for this bundle |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition for this bundle |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### Currency Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `number` | Yes | Currency ID |
| `amount` | `number` | Yes | Amount to grant |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### ProgressionMarker Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `number` | Yes | Progression marker ID |
| `amount` | `number` | Yes | Amount to grant |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response (200)
```json
{
  "status": "success",
  "code": 200,
  "message": "Rewards granted in batch successfully",
  "errors": [],
  "data": {
    "items": [
      {
        "uuid": "item-uuid",
        "id": "item-123",
        "name": "Reward Box",
        "description": "Contains random rewards",
        "iconUrl": "https://cdn.example.com/item.png",
        "amount": 5
      },
      {
        "uuid": "item-uuid-2",
        "id": "item-456",
        "name": "Power Up",
        "description": "Temporary boost",
        "iconUrl": "https://cdn.example.com/powerup.png",
        "amount": 3
      }
    ],
    "bundles": [
      {
        "uuid": "bundle-uuid",
        "id": "starter-bundle",
        "name": "Starter Bundle",
        "description": "Everything you need to start",
        "iconUrl": "https://cdn.example.com/bundle.png",
        "amount": 1
      }
    ],
    "currencies": [
      {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png",
        "code": "GLD",
        "type": "soft",
        "amount": 1000
      }
    ],
    "progressionMarkers": [
      {
        "uuid": "marker-uuid",
        "id": "player-xp",
        "name": "Experience",
        "description": "Player experience points",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 500
      }
    ]
  }
}
```

### Partial Success Response (207)
When some rewards succeed and some fail:
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Rewards in batch partially granted successfully",
  "errors": [],
  "data": {
    "items": [],
    "bundles": [],
    "currencies": [
      {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "amount": 1000
      }
    ],
    "progressionMarkers": [],
    "failedRewards": [
      {
        "source": {
          "id": null,
          "type": "custom",
          "instanceId": "batch-request-uuid"
        },
        "itemsFailed": [
          {
            "id": "item-123",
            "amount": 5,
            "message": "Item is not added to collection",
            "reason": "ITEM_NOT_IN_COLLECTION",
            "code": 1053
          }
        ],
        "bundlesFailed": [],
        "currenciesFailed": [],
        "progressionMarkersFailed": []
      }
    ]
  }
}
```

---

## Request Examples

### Example 1: Grant Multiple Reward Types
**Request:**
```json
{
  "rewards": {
    "items": [
      {"id": "item-123", "amount": 5},
      {"id": "item-456", "amount": 3}
    ],
    "bundles": [
      {"id": "starter-bundle", "amount": 1}
    ],
    "currencies": [
      {"id": 1, "amount": 1000},
      {"id": 2, "amount": 50}
    ],
    "progressionMarkers": [
      {"id": 1, "amount": 500}
    ]
  }
}
```
**Effect:** Grants multiple items, a bundle, currencies, and progression markers in one call.

---

### Example 2: Grant with Global Bypass Flags
**Request:**
```json
{
  "rewards": {
    "items": [
      {"id": "limited-item", "amount": 1},
      {"id": "locked-item", "amount": 2}
    ]
  },
  "bypassLockCondition": true,
  "bypassLimitedEdition": true
}
```
**Effect:** Grants items bypassing all lock and limited edition restrictions.

---

### Example 3: Grant Items to Specific Collections
**Request:**
```json
{
  "rewards": {
    "items": [
      {
        "id": "rare-sword",
        "amount": 1,
        "collectionId": "weapons-collection",
        "stackId": "stack-001"
      },
      {
        "id": "epic-shield",
        "amount": 1,
        "collectionId": "armor-collection"
      }
    ]
  }
}
```
**Effect:** Grants items to specific inventory collections and stacks.

---

### Example 4: Grant with Custom Metadata
**Request:**
```json
{
  "rewards": {
    "currencies": [
      {"id": 1, "amount": 5000}
    ],
    "items": [
      {"id": "gift-box", "amount": 1}
    ]
  },
  "meta": {
    "grantReason": "daily_login_bonus",
    "dayStreak": 7
  },
  "customParams": {
    "source": "admin_grant",
    "adminId": "admin-123"
  }
}
```
**Effect:** Grants rewards with custom tracking metadata.

---

### Example 5: Grant Only Currencies
**Request:**
```json
{
  "rewards": {
    "currencies": [
      {"id": 1, "amount": 100},
      {"id": 2, "amount": 10}
    ]
  }
}
```
**Effect:** Grants only currencies without any items or bundles.

---

## Response Fields

### Success Data Object

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | Inventory items that were granted |
| `bundles` | `array` | Inventory bundles that were granted |
| `currencies` | `array` | Currencies that were granted |
| `progressionMarkers` | `array` | Progression markers that were granted |
| `failedRewards` | `array` | **Only in 207 response** - rewards that failed to grant |

### Failed Rewards Object (207 response only)

| Field | Type | Description |
|-------|------|-------------|
| `source` | `object` | Source info (type will be "custom" for batch) |
| `itemsFailed` | `array` | Items that failed to grant |
| `bundlesFailed` | `array` | Bundles that failed to grant |
| `currenciesFailed` | `array` | Currencies that failed to grant |
| `progressionMarkersFailed` | `array` | Progression markers that failed to grant |

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| rewards not provided | Validation error |
| rewards object empty | Validation error |
| Item not found | Item not found |
| Bundle not found | Bundle not found |
| Currency not found | Currency not found |
| Item not in collection | Item is not added to collection |

---

## Source Files

- **DTO**: `src/task/dtos/grant-reward-batch.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:1319-1352`
- **Service**: `src/task/task.service.ts:26534`
