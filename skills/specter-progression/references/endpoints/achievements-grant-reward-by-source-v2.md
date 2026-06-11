# V2 API: `client/achievements/grant-reward-by-source`

**Endpoint:** `POST /v2/client/achievements/grant-reward-by-source`

**Authentication:** User Auth Guard Required

---

## Description

Grants rewards to the authenticated user based on source definitions. This API fetches pending rewards configured for the specified sources (tasks, tournaments, levels, etc.) and grants them to the user.

---

## Request DTO Structure

### Main Request Body: `GrantRewardBySourceV2Dto`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sources` | `Source[]` | Yes | Array of source objects to grant rewards from |

### Source Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `string` | Yes | Source ID (task ID, tournament ID, etc.) |
| `type` | `enum` | Yes | One of: `task`, `task_group`, `level`, `tournament`, `instant_battle`, `leaderboard`, `battlepass` |
| `instanceId` | `string (UUID)` | No | Instance ID for recurring sources |
| `meta` | `object` | No | Custom metadata |
| `bypassLockCondition` | `boolean` | No | Bypass lock conditions |
| `bypassLimitedEdition` | `boolean` | No | Bypass limited edition restrictions |
| `specterParams` | `object` | No | Specter-specific parameters |
| `customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response (200)
```json
{
  "status": "success",
  "code": 200,
  "message": "Rewards granted by source successfully",
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
  "message": "Rewards by source partially granted successfully",
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
        "source": {
          "id": "task-123",
          "type": "task",
          "instanceId": null
        },
        "itemsFailed": [
          {
            "id": "item-123",
            "amount": 1,
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

### Example 1: Grant Rewards from a Single Task
**Request:**
```json
{
  "sources": [
    {
      "id": "task-123",
      "type": "task"
    }
  ]
}
```
**Effect:** Grants all pending rewards configured for task-123.

---

### Example 2: Grant Rewards from Multiple Sources
**Request:**
```json
{
  "sources": [
    {
      "id": "task-123",
      "type": "task"
    },
    {
      "id": "tournament-weekly",
      "type": "tournament",
      "instanceId": "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      "id": "level-5",
      "type": "level"
    }
  ]
}
```
**Effect:** Grants rewards from task, tournament instance, and level sources.

---

### Example 3: Grant with Bypass Flags
**Request:**
```json
{
  "sources": [
    {
      "id": "battlepass-season1",
      "type": "battlepass",
      "bypassLockCondition": true,
      "bypassLimitedEdition": true
    }
  ]
}
```
**Effect:** Grants battlepass rewards bypassing lock and limited edition restrictions.

---

### Example 4: Grant with Custom Metadata
**Request:**
```json
{
  "sources": [
    {
      "id": "leaderboard-daily",
      "type": "leaderboard",
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
| No pending rewards | No rewards to grant |

---

## Source Files

- **DTO**: `src/task/dtos/grant-reward-by-source.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:1249-1282`
- **Service**: `src/task/task.service.ts:22905`
