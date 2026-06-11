# V2 API: `client/app/get-store-categories`

**Endpoint:** `POST /v2/client/app/get-store-categories`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `storeId` | `string` | **Yes** | The store ID to get categories from |
| `categoryIds` | `string[]` | No | Array of category IDs to filter by |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Number of categories to return (default: 10) |
| `search` | `string` | No | Search keyword for category names |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Category list",
  "data": {
    "storeCategories": [
      {
        "uuid": "category-internal-uuid",
        "id": "weapons",
        "name": "Weapons",
        "description": "All weapons available for purchase",
        "iconUrl": "https://cdn.example.com/weapons-category.png",
        "isDefault": false,
        "contentsCount": 25
      }
    ],
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.storeCategories` | `array` | Array of category objects |
| `storeCategories[].uuid` | `string` | Unique identifier (internal ID) |
| `storeCategories[].id` | `string` | Category ID (client-facing) |
| `storeCategories[].name` | `string` | Category display name |
| `storeCategories[].description` | `string` | Category description |
| `storeCategories[].iconUrl` | `string` | URL to category icon |
| `storeCategories[].isDefault` | `boolean` | Whether this is the default category |
| `storeCategories[].contentsCount` | `number` | Number of contents (items/bundles) in category |
| `lastUpdate` | `string` | Timestamp of last category update |

---

## Request/Response Examples

### Example 1: Get All Categories for a Store
**Request:**
```json
{
  "storeId": "main-shop"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Category list",
  "data": {
    "storeCategories": [
      {
        "uuid": "category-uuid-1",
        "id": "weapons",
        "name": "Weapons",
        "description": "All weapons available for purchase",
        "iconUrl": "https://cdn.example.com/weapons-category.png",
        "isDefault": false,
        "contentsCount": 25
      },
      {
        "uuid": "category-uuid-2",
        "id": "armor",
        "name": "Armor",
        "description": "Protective gear and armor sets",
        "iconUrl": "https://cdn.example.com/armor-category.png",
        "isDefault": false,
        "contentsCount": 15
      },
      {
        "uuid": "category-uuid-3",
        "id": "featured",
        "name": "Featured",
        "description": "Featured items and bundles",
        "iconUrl": "https://cdn.example.com/featured-category.png",
        "isDefault": true,
        "contentsCount": 10
      }
    ],
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 2: Get Categories with Pagination
**Request:**
```json
{
  "storeId": "main-shop",
  "offset": 0,
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Category list",
  "data": {
    "storeCategories": [
      {
        "uuid": "category-uuid-1",
        "id": "weapons",
        "name": "Weapons",
        "description": "All weapons available for purchase",
        "iconUrl": "https://cdn.example.com/weapons-category.png",
        "isDefault": false,
        "contentsCount": 25
      }
    ],
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: Get Specific Categories by IDs
**Request:**
```json
{
  "storeId": "main-shop",
  "categoryIds": ["weapons", "armor"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Category list",
  "data": {
    "storeCategories": [
      {
        "uuid": "category-uuid-1",
        "id": "weapons",
        "name": "Weapons",
        "description": "All weapons available for purchase",
        "iconUrl": "https://cdn.example.com/weapons-category.png",
        "isDefault": false,
        "contentsCount": 25
      },
      {
        "uuid": "category-uuid-2",
        "id": "armor",
        "name": "Armor",
        "description": "Protective gear and armor sets",
        "iconUrl": "https://cdn.example.com/armor-category.png",
        "isDefault": false,
        "contentsCount": 15
      }
    ],
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 4: Search Categories
**Request:**
```json
{
  "storeId": "main-shop",
  "search": "weapon",
  "limit": 5
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Category list",
  "data": {
    "storeCategories": [
      {
        "uuid": "category-uuid-1",
        "id": "weapons",
        "name": "Weapons",
        "description": "All weapons available for purchase",
        "iconUrl": "https://cdn.example.com/weapons-category.png",
        "isDefault": false,
        "contentsCount": 25
      }
    ],
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Store not found | The specified storeId does not exist |

---

## Notes

- Returns categories wrapped in `data.storeCategories` with `lastUpdate`
- `contentsCount` shows total items and bundles in the category
- `isDefault` indicates if this is the default/featured category
- Use `get-store-category-contents` to retrieve actual items/bundles in a category

---

## Source Files

- **DTO**: `src/inventory/dtos/get-store-categories.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
