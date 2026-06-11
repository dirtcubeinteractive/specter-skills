# V2 API: `client/inventory/equip-unequip`

**Endpoint:** `POST /v2/client/inventory/equip-unequip`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | `array` | Yes | Array of items to equip/unequip |
| `items[].instanceId` | `string` | Yes | The inventory instance ID of the item |
| `items[].id` | `string` | Yes | The item ID |
| `items[].collectionId` | `string` | No | Collection ID |
| `items[].shouldEquip` | `boolean` | Yes | True to equip, false to unequip |
| `items[].customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Item equipped or unequipped successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Equip an Item
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "sword-01",
      "shouldEquip": true
    }
  ]
}
```

### Example 2: Unequip an Item
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "sword-01",
      "shouldEquip": false
    }
  ]
}
```

### Example 3: Equip Multiple Items
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "helmet-01",
      "shouldEquip": true,
      "collectionId": "equipment"
    },
    {
      "instanceId": "inv-uuid-456",
      "id": "armor-01",
      "shouldEquip": true,
      "collectionId": "equipment"
    }
  ]
}
```

---

## Notes

- Items must be in the user's inventory to be equipped
- The `shouldEquip` field explicitly controls the action (true = equip, false = unequip)
- Multiple items can be processed in a single request

---

## Source Files

- **DTO**: `src/user-inventory/dto/equip-unequip-item.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
