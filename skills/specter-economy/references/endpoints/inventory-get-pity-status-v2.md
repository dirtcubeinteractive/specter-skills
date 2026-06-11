# V2 API: `client/inventory/get-pity-status`

**Endpoint:** `POST /v2/client/inventory/get-pity-status`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `bundleId` | `string` | Yes | The gacha bundle ID to get pity status for |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Gacha pity status retrieved successfully",
  "data": {
    "type": "mixed",
    "guaranteedRarity": "Legendary",
    "totalPulls": 45,
    "lastHighRarityPullAt": 30,
    "lastOpenedAt": "2024-01-15T10:30:00.000Z",
    "rarityProbabilities": [
      {
        "rarity": "Common",
        "baseRate": 60.00,
        "currentRate": 55.00
      },
      {
        "rarity": "Rare",
        "baseRate": 30.00,
        "currentRate": 33.00
      },
      {
        "rarity": "Legendary",
        "baseRate": 10.00,
        "currentRate": 12.00
      }
    ],
    "rate": {
      "baseMultiplier": 1.0,
      "currentMultiplier": 1.5,
      "maxMultiplier": 3.0,
      "increment": 0.1
    },
    "counter": {
      "current": 15,
      "threshold": 100
    },
    "milestone": {
      "pullsSinceLastMilestone": 5,
      "interval": 10
    }
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `type` | `string` | Pity system type: "rate", "counter", "milestone", or "mixed" |
| `guaranteedRarity` | `string` | The rarity guaranteed by pity system |
| `totalPulls` | `number` | Total number of pulls on this bundle |
| `lastHighRarityPullAt` | `number` | Pull number when last high rarity was obtained |
| `lastOpenedAt` | `string` | Timestamp of last bundle open |
| `rarityProbabilities` | `array` | Current probability rates per rarity |
| `rate.baseMultiplier` | `number` | Starting rate multiplier |
| `rate.currentMultiplier` | `number` | Current rate multiplier (increases with pity) |
| `rate.maxMultiplier` | `number` | Maximum rate multiplier cap |
| `rate.increment` | `number` | Rate increment per pull |
| `counter.current` | `number` | Current counter value |
| `counter.threshold` | `number` | Pulls needed to guarantee drop |
| `milestone.pullsSinceLastMilestone` | `number` | Pulls since last milestone reward |
| `milestone.interval` | `number` | Pulls between milestone rewards |

---

## Request Examples

### Example: Get Pity Status
**Request:**
```json
{
  "bundleId": "premium-gacha"
}
```

---

## Notes

- The response structure varies based on the pity system type:
  - `rate`: Includes `rate` and `rarityProbabilities` fields
  - `counter`: Includes `counter` field
  - `milestone`: Includes `milestone` field
  - `mixed`: Includes all applicable fields
- Pity status is tracked per user per bundle
- Returns 404 if pity status hasn't been initialized (user hasn't pulled yet)

---

## Source Files

- **DTO**: `src/user-inventory/dto/get-pity-status.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
