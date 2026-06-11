# V2 API: `client/achievements/grant-reward-single`

**Endpoint:** `POST /v2/client/achievements/grant-reward-single`

**Authentication:** User Auth Guard Required

---

## Description

Grants a single reward of a specific type to the authenticated user. This is the simplest reward granting endpoint, designed for granting one item, bundle, currency, or progression marker at a time.

---

## Request DTO Structure

### Main Request Body: `GrantRewardSingleV2Dto`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `enum` | Yes | Reward type: `item`, `bundle`, `currency`, `progressionMarker` |
| `id` | `string` | Yes | ID of the reward to grant |
| `amount` | `number` | No | Amount to grant (defaults to 1) |
| `collectionId` | `string` | No | Collection ID (for items/bundles) |
| `stackId` | `string` | No | Stack ID (for items/bundles) |
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
  "message": "Reward granted successfully",
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
    "currencies": [],
    "progressionMarkers": []
  }
}
```

### Partial Success Response (207)
When the reward fails to grant:
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Reward partially granted successfully",
  "errors": [],
  "data": {
    "items": [],
    "bundles": [],
    "currencies": [],
    "progressionMarkers": [],
    "failedRewards": [
      {
        "source": {
          "id": null,
          "type": "custom",
          "instanceId": "single-request-uuid"
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

### Example 1: Grant a Single Item
**Request:**
```json
{
  "type": "item",
  "id": "item-123",
  "amount": 1
}
```
**Effect:** Grants 1 item with ID "item-123" to the user.

---

### Example 2: Grant a Bundle
**Request:**
```json
{
  "type": "bundle",
  "id": "starter-bundle",
  "amount": 1
}
```
**Effect:** Grants 1 starter bundle to the user.

---

### Example 3: Grant Currency
**Request:**
```json
{
  "type": "currency",
  "id": "gold-coins",
  "amount": 500
}
```
**Effect:** Grants 500 gold coins to the user.

---

### Example 4: Grant Progression Marker
**Request:**
```json
{
  "type": "progressionMarker",
  "id": "player-xp",
  "amount": 100
}
```
**Effect:** Grants 100 XP to the user.

---

### Example 5: Grant Item to Specific Collection
**Request:**
```json
{
  "type": "item",
  "id": "rare-sword",
  "amount": 1,
  "collectionId": "weapons-collection",
  "stackId": "stack-001"
}
```
**Effect:** Grants the item to a specific collection and stack.

---

### Example 6: Grant Limited Edition Item with Bypass
**Request:**
```json
{
  "type": "item",
  "id": "limited-skin",
  "amount": 1,
  "bypassLockCondition": true,
  "bypassLimitedEdition": true
}
```
**Effect:** Grants a limited edition item bypassing all restrictions.

---

### Example 7: Grant with Custom Metadata
**Request:**
```json
{
  "type": "currency",
  "id": "premium-gems",
  "amount": 100,
  "meta": {
    "grantReason": "referral_bonus",
    "referrerId": "user-456"
  },
  "customParams": {
    "source": "referral_system"
  }
}
```
**Effect:** Grants currency with custom tracking metadata.

---

## Response Fields

### Success Data Object

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | Inventory items that were granted (populated if type is "item") |
| `bundles` | `array` | Inventory bundles that were granted (populated if type is "bundle") |
| `currencies` | `array` | Currencies that were granted (populated if type is "currency") |
| `progressionMarkers` | `array` | Progression markers that were granted (populated if type is "progressionMarker") |
| `failedRewards` | `array` | **Only in 207 response** - reward that failed to grant |

---

## Reward Type Enum

| Value | Description |
|-------|-------------|
| `item` | Grant an inventory item |
| `bundle` | Grant an inventory bundle |
| `currency` | Grant a currency |
| `progressionMarker` | Grant a progression marker/XP |

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| type not provided | Validation error |
| id not provided | Validation error |
| Invalid type value | Invalid reward type |
| Item not found | Item not found |
| Bundle not found | Bundle not found |
| Currency not found | Currency not found |
| Progression marker not found | Progression marker not found |
| Item not in collection | Item is not added to collection |

---

## Source Files

- **DTO**: `src/task/dtos/grant-reward-single.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts:1354-1387`
- **Service**: `src/task/task.service.ts:26794`
