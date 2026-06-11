# V2 API: `client/achievements/grant-rewards`

**Endpoint:** `POST /v2/client/achievements/grant-rewards`

**Authentication:** User Auth Guard Required

---

## Description

Grants rewards to the authenticated user. This API allows granting rewards from various sources (tasks, levels, tournaments, etc.) with full control over what items, bundles, currencies, and progression markers to grant.

---

## Request DTO Structure

### Main Request Body: `GrantRewardDto`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `rewardDetails` | `RewardDetails[]` | Yes | Array of reward details to grant |

### RewardDetails Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `source` | `Source` | No | Source of the reward (task, level, tournament, etc.) |
| `rewards` | `Rewards` | No | Rewards to grant |
| `meta` | `object` | No | Custom metadata |
| `bypassLockCondition` | `boolean` | No | Bypass lock conditions |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition restrictions |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### Source Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Source ID |
| `type` | `enum` | Yes | One of: `task`, `task_group`, `level`, `tournament`, `instant_battle`, `leaderboard` |
| `instanceId` | `string (UUID)` | No | Instance ID for recurring sources |

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
| `id` | `string` | Yes | Currency ID |
| `amount` | `number` | Yes | Amount to grant |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

### ProgressionMarker Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Progression marker ID |
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
  "message": "Rewards Granted successfully",
  "errors": [],
  "data": {
    "items": [
      {
        "uuid": "item-uuid",
        "id": "item-123",
        "name": "Reward Box",
        "description": "Contains random rewards",
        "iconUrl": "https://cdn.example.com/item.png",
        "amount": 1
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
        "amount": 500
      }
    ],
    "progressionMarkers": [
      {
        "uuid": "marker-uuid",
        "id": "player-xp",
        "name": "Experience",
        "description": "Player experience points",
        "iconUrl": "https://cdn.example.com/xp.png",
        "amount": 100
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
  "message": "Rewards partially granted successfully.",
  "errors": [],
  "data": {
    "items": [],
    "bundles": [],
    "currencies": [
      {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "amount": 500
      }
    ],
    "progressionMarkers": [],
    "failedRewards": [
      {
        "id": "item-123",
        "amount": 1,
        "message": "Item is not added to collection",
        "reason": "ITEM_NOT_IN_COLLECTION",
        "code": 1053
      }
    ]
  }
}
```

---

## Request Examples

### Example 1: Grant Task Rewards
**Request:**
```json
{
  "rewardDetails": [
    {
      "source": {
        "id": "task-123",
        "type": "task"
      },
      "rewards": {
        "currencies": [
          {"id": "gold-coins", "amount": 500}
        ],
        "items": [
          {"id": "item-123", "amount": 1}
        ]
      }
    }
  ]
}
```
**Effect:** Grants 500 gold coins and 1 item from task-123 source.

---

### Example 2: Grant Rewards from Multiple Sources
**Request:**
```json
{
  "rewardDetails": [
    {
      "source": {
        "id": "task-123",
        "type": "task"
      },
      "rewards": {
        "currencies": [
          {"id": "gold-coins", "amount": 500}
        ]
      }
    },
    {
      "source": {
        "id": "level-5",
        "type": "level"
      },
      "rewards": {
        "items": [
          {"id": "level-reward-box", "amount": 1}
        ],
        "progressionMarkers": [
          {"id": "player-xp", "amount": 100}
        ]
      }
    }
  ]
}
```
**Effect:** Grants rewards from both task and level sources.

---

### Example 3: Grant with Bypass Flags
**Request:**
```json
{
  "rewardDetails": [
    {
      "source": {
        "id": "tournament-weekly",
        "type": "tournament",
        "instanceId": "550e8400-e29b-41d4-a716-446655440000"
      },
      "rewards": {
        "items": [
          {
            "id": "limited-edition-trophy",
            "amount": 1,
            "bypassLimitedEdition": true
          }
        ]
      },
      "bypassLockCondition": true
    }
  ]
}
```
**Effect:** Grants limited edition trophy bypassing edition and lock restrictions.

---

### Example 4: Grant with Custom Metadata
**Request:**
```json
{
  "rewardDetails": [
    {
      "source": {
        "id": "leaderboard-daily",
        "type": "leaderboard"
      },
      "rewards": {
        "currencies": [
          {"id": "premium-gems", "amount": 100}
        ],
        "bundles": [
          {"id": "winner-bundle", "amount": 1}
        ]
      },
      "meta": {
        "rank": 1,
        "season": "winter-2024"
      },
      "customParams": {
        "grantReason": "leaderboard_winner"
      }
    }
  ]
}
```
**Effect:** Grants leaderboard rewards with custom tracking metadata.

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

### Failed Reward Object (207 response only)

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | ID of the reward that failed |
| `amount` | `number` | Amount that was attempted |
| `message` | `string` | Human-readable error message |
| `reason` | `string` | Error reason code |
| `code` | `number` | Numeric error code |

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

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| rewardDetails not provided | Validation error |
| rewardDetails empty array | Validation error |
| Invalid source type | Invalid source type |
| Item not found | Item not found |
| Currency not found | Currency not found |
| Item not in collection | Item is not added to collection |

---

## Source Files

- **DTO**: `src/task/dtos/grant-reward.dto.ts`
- **Controller**: `src/task/task.controller.ts:1214-1247`
- **Service**: `src/task/task.service.ts:7455-10989`
