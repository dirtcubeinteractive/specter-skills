# V2 API: `client/inventory/remove`

**Endpoint:** `POST /v2/client/inventory/remove`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | `array` | No | Array of items to remove (at least one of items or bundles required) |
| `items[].instanceId` | `string` | Yes | The inventory instance ID of the item |
| `items[].id` | `string` | Yes | The item ID |
| `items[].amount` | `number` | No | Amount to remove |
| `items[].collectionId` | `string` | No | Collection ID |
| `items[].customParams` | `object` | No | Custom parameters |
| `bundles` | `array` | No | Array of bundles to remove |
| `bundles[].instanceId` | `string` | Yes | The inventory instance ID of the bundle |
| `bundles[].id` | `string` | Yes | The bundle ID |
| `bundles[].amount` | `number` | No | Amount to remove |
| `bundles[].collectionId` | `string` | No | Collection ID |
| `bundles[].customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Successfully removed from inventory",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Remove Items
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "sword-01",
      "amount": 1
    }
  ]
}
```

### Example 2: Remove Items and Bundles
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "health-potion",
      "amount": 2,
      "collectionId": "consumables"
    }
  ],
  "bundles": [
    {
      "instanceId": "inv-uuid-456",
      "id": "starter-pack"
    }
  ]
}
```

---

## Source Files

- **DTO**: `src/user-inventory/dto/remove-user-inventory.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
