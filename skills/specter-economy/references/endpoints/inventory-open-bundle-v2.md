# V2 API: `client/inventory/open-bundle`

**Endpoint:** `POST /v2/client/inventory/open-bundle`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `instanceId` | `string` | Yes | The inventory instance ID of the bundle |
| `id` | `string` | Yes | The bundle ID |
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
    "bundles": [],
    "currencies": []
  },
  "errors": []
}
```

### Partial Success Response (207)
```json
{
  "status": "multi-status",
  "code": 207,
  "message": "Bundle partially opened successfully.",
  "data": {
    "items": [],
    "bundles": [],
    "currencies": [],
    "itemsFailed": [
      {
        "id": "sword-01",
        "amount": 1,
        "collectionId": "weapons",
        "stackId": "default",
        "message": "Item is not added to collection",
        "reason": "Collection stack full for this item.",
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
| `items` | `array` | Items received from the bundle |
| `bundles` | `array` | Nested bundles received |
| `currencies` | `array` | Currencies received |
| `itemsFailed` | `array` | Items that failed to be added |
| `bundlesFailed` | `array` | Bundles that failed to be added |

---

## Request Examples

### Example: Open a Bundle
**Request:**
```json
{
  "instanceId": "inv-uuid-456",
  "id": "starter-pack",
  "collectionId": "rewards"
}
```

---

## Notes

- This endpoint is for regular bundles only, not gacha bundles
- Use `client/inventory/open-gacha-bundle` for gacha bundles
- The bundle must be in the user's inventory and not already opened

---

## Source Files

- **DTO**: `src/user-inventory/dto/open-bundle.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
