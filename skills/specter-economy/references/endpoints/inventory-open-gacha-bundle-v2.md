# V2 API: `client/inventory/open-gacha-bundle`

**Endpoint:** `POST /v2/client/inventory/open-gacha-bundle`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `instanceId` | `string` | Yes | The inventory instance ID of the gacha bundle |
| `id` | `string` | Yes | The gacha bundle ID |
| `collectionId` | `string` | No | Collection ID to add contents to |
| `stackId` | `string` | No | Stack ID for the contents |
| `specterParams` | `object` | No | System parameters |
| `customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Bundle opened successfully",
  "data": {
    "items": [
      {
        "instanceId": "inv-uuid-123",
        "uuid": "item-db-uuid",
        "id": "rare-sword",
        "name": "Rare Sword",
        "description": "A rare weapon",
        "iconUrl": "https://cdn.example.com/rare-sword.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Rare"
        },
        "quantity": 1,
        "collectionId": "default",
        "stackId": "default",
        "isEquipped": false,
        "totalUsesAvailable": 50
      }
    ],
    "pityInfo": {
      "totalPulls": 15,
      "counter": 5,
      "lastHighRarityPullAt": 10
    }
  },
  "errors": []
}
```

### Partial Success Response (207)
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Gacha Bundle partially opened successfully.",
  "data": {
    "items": [],
    "itemsFailed": [
      {
        "id": "rare-sword",
        "message": "Item is not added to collection",
        "reason": "Collection stack full"
      }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `items` | `array` | Items received from the gacha pull |
| `pityInfo` | `object` | Updated pity status after the pull |
| `itemsFailed` | `array` | Items that failed to be added (in partial success) |

---

## Request Examples

### Example: Open a Gacha Bundle
**Request:**
```json
{
  "instanceId": "inv-uuid-789",
  "id": "premium-gacha",
  "collectionId": "gacha-rewards"
}
```

---

## Notes

- This endpoint is specifically for gacha bundles with random item drops
- Uses the pity system to track pulls and guarantee rare drops
- The bundle must be marked as `isGacha: true` in the system
- Pity tracker is created automatically on first pull

---

## Source Files

- **DTO**: `src/user-inventory/dto/open-gacha-bundle.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
