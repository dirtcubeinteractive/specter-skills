# V2 API: `client/player/me/get-collections`

**Endpoint:** `POST /v2/client/player/me/get-collections`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | `number` | No | Pagination limit |
| `offset` | `number` | No | Pagination offset |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My Collections List",
  "data": {
    "collections": [
      "default",
      "weapons",
      "armor",
      "consumables",
      "quest-items"
    ],
    "totalCount": 5
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `collections` | `string[]` | Array of collection IDs the user has items in |
| `totalCount` | `number` | Total number of collections |

---

## Request Examples

### Example 1: Get All Collections
**Request:**
```json
{}
```

### Example 2: With Pagination
**Request:**
```json
{
  "limit": 10,
  "offset": 0
}
```

---

## Notes

- Returns only collection IDs where the user has at least one item
- Collections are user-defined groupings for organizing inventory items

---

## Source Files

- **DTO**: `src/user-inventory/dto/get-my-collections.v2.dto.ts`
- **Controller**: `src/user-inventory/user-inventory.controller.ts`
- **Service**: `src/user-inventory/user-inventory.service.ts`
