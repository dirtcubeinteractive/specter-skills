# V2 API: `client/player/get-collections`

**Endpoint:** `POST /v2/client/player/get-collections`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to get collections for |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Collections List",
  "data": {
    "collections": [
      "default",
      "weapons",
      "armor",
      "consumables"
    ],
    "totalCount": 4
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `collections` | `string[]` | Array of collection IDs the player has items in |
| `totalCount` | `number` | Total number of collections |

---

## Request Examples

### Example: Get Player's Collections
**Request:**
```json
{
  "userId": "player-123"
}
```

---

## Notes

- Returns only collection IDs where the specified player has at least one item
- Useful for viewing another player's inventory organization

---

## Source Files

- **DTO**: `src/user-inventory/dto/get-player-collections.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
