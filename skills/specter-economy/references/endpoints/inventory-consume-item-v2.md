# V2 API: `client/inventory/consume-item`

**Endpoint:** `POST /v2/client/inventory/consume-item`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `items` | `array` | Yes | Array of items to consume |
| `items[].instanceId` | `string` | Yes | The inventory instance ID of the item |
| `items[].id` | `string` | Yes | The item ID |
| `items[].amount` | `number` | No | Amount to consume |
| `items[].collectionId` | `string` | No | Collection ID |
| `items[].customParams` | `object` | No | Custom parameters |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Item consumed successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Consume a Single Item
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "health-potion",
      "amount": 1
    }
  ]
}
```

### Example 2: Consume Multiple Items
**Request:**
```json
{
  "items": [
    {
      "instanceId": "inv-uuid-123",
      "id": "health-potion",
      "amount": 2,
      "collectionId": "consumables"
    },
    {
      "instanceId": "inv-uuid-456",
      "id": "mana-potion",
      "amount": 1
    }
  ]
}
```

---

## Notes

- Consuming an item reduces its uses or quantity
- Items must be in the user's inventory
- If the item has `totalUsesAvailable`, consumption reduces that count
- If uses reach 0, the item may be removed from inventory

---

## Source Files

- **DTO**: `src/user-inventory/dto/consume-item.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
