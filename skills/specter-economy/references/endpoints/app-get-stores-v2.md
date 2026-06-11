# V2 API: `client/app/get-stores`

**Endpoint:** `POST /v2/client/app/get-stores`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `storeIds` | `string[]` | No | Array of store IDs to filter by |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Number of stores to return (default: 10) |
| `search` | `string` | No | Search keyword for store names |
| `includeTags` | `string[]` | No | Filter stores that have these tags |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `unlockConditions` | Unlock requirements | `unlockConditions: { unlockItem, unlockBundle, unlockLevel }` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Stores list",
  "data": {
    "stores": [
      {
        "uuid": "store-internal-uuid",
        "id": "main-shop",
        "name": "Main Shop",
        "description": "The main in-game shop",
        "iconUrl": "https://cdn.example.com/shop.png",
        "platforms": [
          {
            "id": 1,
            "name": "iOS"
          },
          {
            "id": 2,
            "name": "Android"
          }
        ],
        "locations": [
          {
            "id": 1,
            "name": "Lobby"
          }
        ],
        "categoriesCount": 5
      }
    ],
    "totalCount": 3,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data.stores` | `array` | Array of store objects |
| `stores[].uuid` | `string` | Unique identifier (internal ID) |
| `stores[].id` | `string` | Store ID (client-facing) |
| `stores[].name` | `string` | Store display name |
| `stores[].description` | `string` | Store description |
| `stores[].iconUrl` | `string` | URL to store icon |
| `stores[].platforms` | `array` | Supported platforms `[{ id, name }]` |
| `stores[].locations` | `array` | Store locations `[{ id, name }]` |
| `stores[].categoriesCount` | `number` | Number of categories in the store |
| `totalCount` | `number` | Total number of stores in the project |
| `lastUpdate` | `string` | Timestamp of last store update |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `stores[].meta` | `object` | `"meta"` | Custom metadata object |
| `stores[].tags` | `array` | `"tags"` | Array of tag names |
| `stores[].unlockConditions` | `object` | `"unlockConditions"` | Unlock conditions |
| `stores[].unlockConditions.unlockItem` | `array` | `"unlockConditions"` | Items required `[{ uuid, id, name }]` |
| `stores[].unlockConditions.unlockBundle` | `array` | `"unlockConditions"` | Bundles required `[{ uuid, id, name }]` |
| `stores[].unlockConditions.unlockLevel` | `array` | `"unlockConditions"` | Level requirements `[{ lockedLevelNo, unlockProgressionSystem }]` |

---

## Request/Response Examples

### Example 1: Basic Request (no attributes)
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Stores list",
  "data": {
    "stores": [
      {
        "uuid": "store-uuid-1",
        "id": "main-shop",
        "name": "Main Shop",
        "description": "The main in-game shop",
        "iconUrl": "https://cdn.example.com/shop.png",
        "platforms": [
          {
            "id": 1,
            "name": "iOS"
          },
          {
            "id": 2,
            "name": "Android"
          }
        ],
        "locations": [
          {
            "id": 1,
            "name": "Lobby"
          }
        ],
        "categoriesCount": 5
      }
    ],
    "totalCount": 3,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 2: With Meta and Tags Attributes
**Request:**
```json
{
  "attributes": ["meta", "tags"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Stores list",
  "data": {
    "stores": [
      {
        "uuid": "store-uuid-1",
        "id": "main-shop",
        "name": "Main Shop",
        "description": "The main in-game shop",
        "iconUrl": "https://cdn.example.com/shop.png",
        "platforms": [
          {
            "id": 1,
            "name": "iOS"
          }
        ],
        "locations": [
          {
            "id": 1,
            "name": "Lobby"
          }
        ],
        "categoriesCount": 5,
        "meta": {
          "tier": "premium",
          "featured": true
        },
        "tags": ["main", "featured", "premium"]
      }
    ],
    "totalCount": 3,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: With Unlock Conditions Attribute
**Request:**
```json
{
  "attributes": ["unlockConditions"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Stores list",
  "data": {
    "stores": [
      {
        "uuid": "store-uuid-1",
        "id": "premium-shop",
        "name": "Premium Shop",
        "description": "Exclusive premium store",
        "iconUrl": "https://cdn.example.com/premium-shop.png",
        "platforms": [],
        "locations": [],
        "categoriesCount": 3,
        "unlockConditions": {
          "unlockItem": [],
          "unlockBundle": [],
          "unlockLevel": [
            {
              "lockedLevelNo": 10,
              "unlockProgressionSystem": {
                "id": "player-level",
                "levelName": "Player Level"
              }
            }
          ]
        }
      }
    ],
    "totalCount": 3,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 4: Filter by Store IDs with Tags
**Request:**
```json
{
  "storeIds": ["main-shop", "event-shop"],
  "includeTags": ["featured"],
  "attributes": ["tags"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Stores list",
  "data": {
    "stores": [
      {
        "uuid": "store-uuid-1",
        "id": "main-shop",
        "name": "Main Shop",
        "description": "The main in-game shop",
        "iconUrl": "https://cdn.example.com/shop.png",
        "platforms": [
          {
            "id": 1,
            "name": "iOS"
          }
        ],
        "locations": [],
        "categoriesCount": 5,
        "tags": ["featured", "main"]
      }
    ],
    "totalCount": 3,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Notes

- Returns stores wrapped in `data.stores` with `totalCount` and `lastUpdate`
- Each store includes `platforms` and `locations` arrays by default
- `categoriesCount` shows how many categories are in each store
- Use `includeTags` to filter stores that have specific tags
- Use `attributes` to control which additional fields are included

---

## Source Files

- **DTO**: `src/inventory/dtos/get-client-store.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
