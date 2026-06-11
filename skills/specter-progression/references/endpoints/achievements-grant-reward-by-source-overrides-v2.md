# V2 API: `client/achievements/grant-reward-by-source-overrides`

**Endpoint:** `POST /v2/client/achievements/grant-reward-by-source-overrides`

**Authentication:** User Auth Guard Required

---

## Description

Grants rewards to the authenticated user from specified sources with custom overrides. Unlike `grant-reward-by-source`, this API allows you to override the default reward amounts and types configured for the source.

---

## Request DTO Structure

### Main Request Body: `GrantRewardBySourceOverridesV2Dto`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sources` | `Source[]` | Yes | Array of source objects with overrides |

### Source Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Source ID (task ID, tournament ID, etc.) |
| `type` | `enum` | Yes | One of: `task`, `task_group`, `level`, `tournament`, `instant_battle`, `leaderboard`, `battlepass` |
| `instanceId` | `string (UUID)` | No | Instance ID for recurring sources |
| `overrides` | `Overrides` | No | Custom reward overrides |
| `meta` | `object` | No | Custom metadata |
| `bypassLockCondition` | `boolean` | No | Bypass lock conditions |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition restrictions |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### Overrides Object

| Field | Type | Description |
|-------|------|-------------|
| `items` | `Item[]` | Array of items to grant (overrides source defaults) |
| `bundles` | `Bundle[]` | Array of bundles to grant (overrides source defaults) |
| `currencies` | `Currency[]` | Array of currencies to grant (overrides source defaults) |
| `progressionMarkers` | `ProgressionMarker[]` | Array of progression markers to grant (overrides source defaults) |

### Item/Bundle Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Item/Bundle ID |
| `amount` | `number` | Yes | Amount to grant |
| `collectionId` | `string` | No | Collection ID |
| `stackId` | `string` | No | Stack ID |
| `bypassLockCondition` | `boolean` | No | Bypass lock condition for this item |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition for this item |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### Currency/ProgressionMarker Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `number` | Yes | Currency/Progression marker ID |
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
  "message": "Rewards granted by source overrides successfully",
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
      }
    ],
    "bundles": [],
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
    "progressionMarkers": []
  }
}
```

### Partial Success Response (207)
When some rewards succeed and some fail:
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Rewards by source overrides partially granted successfully",
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
          "id": "task-123",
          "type": "task",
          "instanceId": null
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

### Example 1: Override Reward Amounts
**Request:**
```json
{
  "sources": [
    {
      "id": "task-123",
      "type": "task",
      "overrides": {
        "currencies": [
          {"id": 1, "amount": 1000}
        ],
        "items": [
          {"id": "item-123", "amount": 5}
        ]
      }
    }
  ]
}
```
**Effect:** Grants 1000 currency (id=1) and 5 items instead of the default amounts configured for task-123.

---

### Example 2: Multiple Sources with Different Overrides
**Request:**
```json
{
  "sources": [
    {
      "id": "task-123",
      "type": "task",
      "overrides": {
        "currencies": [
          {"id": 1, "amount": 500}
        ]
      }
    },
    {
      "id": "tournament-weekly",
      "type": "tournament",
      "instanceId": "550e8400-e29b-41d4-a716-446655440000",
      "overrides": {
        "items": [
          {"id": "trophy-gold", "amount": 1, "bypassLimitedEdition": true}
        ],
        "progressionMarkers": [
          {"id": 1, "amount": 500}
        ]
      }
    }
  ]
}
```
**Effect:** Grants custom reward amounts from both task and tournament sources.

---

### Example 3: Override with Collection and Stack
**Request:**
```json
{
  "sources": [
    {
      "id": "level-10",
      "type": "level",
      "overrides": {
        "items": [
          {
            "id": "rare-sword",
            "amount": 1,
            "collectionId": "weapons-collection",
            "stackId": "stack-001"
          }
        ],
        "bundles": [
          {
            "id": "starter-bundle",
            "amount": 1,
            "collectionId": "bundles-collection"
          }
        ]
      }
    }
  ]
}
```
**Effect:** Grants items and bundles to specific collections and stacks.

---

### Example 4: Override with Bypass Flags
**Request:**
```json
{
  "sources": [
    {
      "id": "battlepass-tier-50",
      "type": "battlepass",
      "bypassLockCondition": true,
      "overrides": {
        "items": [
          {
            "id": "limited-skin",
            "amount": 1,
            "bypassLimitedEdition": true
          }
        ]
      }
    }
  ]
}
```
**Effect:** Grants limited edition items bypassing all restrictions.

---

## Response Fields

### Success Data Object

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | Inventory items that were granted |
| `bundles` | `array` | Inventory bundles that were granted |
| `currencies` | `array` | Currencies that were granted |
| `progressionMarkers` | `array` | Progression markers that were granted |
| `failedRewards` | `array` | **Only in 207 response** - sources with failed rewards |

### Failed Rewards Object (207 response only)

| Field | Type | Description |
|-------|------|-------------|
| `source` | `object` | Source that had failures (id, type, instanceId) |
| `itemsFailed` | `array` | Items that failed to grant |
| `bundlesFailed` | `array` | Bundles that failed to grant |
| `currenciesFailed` | `array` | Currencies that failed to grant |
| `progressionMarkersFailed` | `array` | Progression markers that failed to grant |

---

## Source Type Enum

| Value | Description |
|-------|-------------|
| `task` | Reward from a task/achievement |
| `task_group` | Reward from a task group/mission |
| `level` | Reward from level progression |
| `tournament` | Reward from tournament completion |
| `instant_battle` | Reward from instant battle |
| `leaderboard` | Reward from leaderboard ranking |
| `battlepass` | Reward from battle pass |

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| sources not provided | Validation error |
| sources empty array | Validation error |
| Invalid source type | Invalid source type |
| Source not found | Source not found |
| Item not found | Item not found |
| Currency not found | Currency not found |

---

## Source Files

- **DTO**: `src/task/dtos/grant-reward-by-source-overrides.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:1284-1317`
- **Service**: `src/task/task.service.ts:26277`
