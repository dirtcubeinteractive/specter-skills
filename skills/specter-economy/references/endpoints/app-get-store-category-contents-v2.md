# V2 API: `client/app/get-store-category-contents`

**Endpoint:** `POST /v2/client/app/get-store-category-contents`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `storeId` | `string` | **Yes** | The store ID to get contents from |
| `categoryId` | `string` | No | Category ID to filter contents |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `limit` | `number` | No | Number of contents to return (default: 50) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `bundles.contents` | Bundle contents details | `bundles[].contents: { items, bundles, currencies }` |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Contents list",
  "data": {
    "items": [
      {
        "uuid": "item-internal-uuid",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "quantity": 1,
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        },
        "prices": [
          {
            "priceType": "virtual",
            "price": 100,
            "discount": 0,
            "productId": null,
            "bonusCashAllowance": 0,
            "platform": null,
            "currencyDetails": {
              "uuid": "currency-uuid",
              "id": "gold-coins",
              "name": "Gold Coins",
              "description": "In-game currency",
              "iconUrl": "https://cdn.example.com/gold.png",
              "rarity": null,
              "code": "GLD",
              "type": "virtual"
            },
            "realWorldCurrency": null
          }
        ]
      }
    ],
    "bundles": [
      {
        "uuid": "bundle-internal-uuid",
        "id": "weapon-pack",
        "name": "Weapon Pack",
        "description": "A collection of weapons",
        "iconUrl": "https://cdn.example.com/weapon-pack.png",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Rare"
        },
        "quantity": 1,
        "prices": [
          {
            "priceType": "virtual",
            "price": 500,
            "discount": 10,
            "productId": null,
            "bonusCashAllowance": 0,
            "currencyDetails": {
              "uuid": "currency-uuid",
              "id": "gems",
              "name": "Gems",
              "description": "Premium currency",
              "iconUrl": "https://cdn.example.com/gems.png",
              "rarity": null,
              "code": "GEM",
              "type": "virtual"
            },
            "realWorldCurrency": null
          }
        ],
        "contents": null
      }
    ],
    "totalItemsCount": 25,
    "totalBundlesCount": 5,
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
| `data.items` | `array` | Array of item objects in the store/category |
| `items[].uuid` | `string` | Unique identifier (internal ID) |
| `items[].id` | `string` | Item ID (client-facing) |
| `items[].name` | `string` | Item display name |
| `items[].description` | `string` | Item description |
| `items[].iconUrl` | `string` | URL to item icon |
| `items[].quantity` | `number` | Quantity available |
| `items[].rarity` | `object` | Rarity info `{ id, name }` or null |
| `items[].prices` | `array` | Pricing information |
| `data.bundles` | `array` | Array of bundle objects |
| `bundles[].uuid` | `string` | Unique identifier (internal ID) |
| `bundles[].id` | `string` | Bundle ID (client-facing) |
| `bundles[].name` | `string` | Bundle display name |
| `bundles[].description` | `string` | Bundle description |
| `bundles[].iconUrl` | `string` | URL to bundle icon |
| `bundles[].rarity` | `object` | Rarity info `{ id, name }` or null |
| `bundles[].quantity` | `number` | Quantity available |
| `bundles[].prices` | `array` | Pricing information |
| `bundles[].contents` | `object` | Bundle contents (null unless `bundles.contents` attribute) |
| `totalItemsCount` | `number` | Total number of items in category |
| `totalBundlesCount` | `number` | Total number of bundles in category |
| `lastUpdate` | `string` | Timestamp of last content update |

### Price Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `priceType` | `string` | Type of price (virtual, real, etc.) |
| `price` | `number` | Price amount |
| `discount` | `number` | Discount percentage |
| `productId` | `string` | IAP product ID (for real currency) |
| `bonusCashAllowance` | `number` | Bonus cash allowance |
| `platform` | `object` | Platform info `{ id, name }` or null |
| `currencyDetails` | `object` | Virtual currency details |
| `currencyDetails.uuid` | `string` | Currency internal ID |
| `currencyDetails.id` | `string` | Currency ID (client-facing) |
| `currencyDetails.name` | `string` | Currency name |
| `currencyDetails.description` | `string` | Currency description |
| `currencyDetails.iconUrl` | `string` | Currency icon URL |
| `currencyDetails.rarity` | `object` | Currency rarity or null |
| `currencyDetails.code` | `string` | Currency code |
| `currencyDetails.type` | `string` | Currency type |
| `realWorldCurrency` | `object` | Real world currency details or null |
| `realWorldCurrency.uuid` | `string` | Currency internal ID |
| `realWorldCurrency.id` | `string` | Currency ID |
| `realWorldCurrency.countryName` | `string` | Country name |
| `realWorldCurrency.name` | `string` | Currency name |
| `realWorldCurrency.code` | `string` | Currency code (USD, EUR, etc.) |
| `realWorldCurrency.symbol` | `string` | Currency symbol ($, €, etc.) |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `bundles[].contents` | `object` | `"bundles.contents"` | Bundle contents |
| `bundles[].contents.items` | `array` | `"bundles.contents"` | Items in bundle |
| `bundles[].contents.bundles` | `array` | `"bundles.contents"` | Nested bundles |
| `bundles[].contents.currencies` | `array` | `"bundles.contents"` | Currencies in bundle |

---

## Request/Response Examples

### Example 1: Get All Contents for a Store Category
**Request:**
```json
{
  "storeId": "main-shop",
  "categoryId": "weapons"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Contents list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-1",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "quantity": 1,
        "rarity": {
          "id": "rarity-uuid-1",
          "name": "Common"
        },
        "prices": [
          {
            "priceType": "virtual",
            "price": 100,
            "discount": 0,
            "productId": null,
            "bonusCashAllowance": 0,
            "platform": null,
            "currencyDetails": {
              "uuid": "currency-uuid-1",
              "id": "gold-coins",
              "name": "Gold Coins",
              "description": "In-game currency",
              "iconUrl": "https://cdn.example.com/gold.png",
              "rarity": null,
              "code": "GLD",
              "type": "virtual"
            },
            "realWorldCurrency": null
          }
        ]
      }
    ],
    "bundles": [
      {
        "uuid": "bundle-uuid-1",
        "id": "weapon-pack",
        "name": "Weapon Pack",
        "description": "A collection of weapons",
        "iconUrl": "https://cdn.example.com/weapon-pack.png",
        "rarity": {
          "id": "rarity-uuid-2",
          "name": "Rare"
        },
        "quantity": 1,
        "prices": [
          {
            "priceType": "virtual",
            "price": 500,
            "discount": 10,
            "productId": null,
            "bonusCashAllowance": 0,
            "currencyDetails": {
              "uuid": "currency-uuid-2",
              "id": "gems",
              "name": "Gems",
              "description": "Premium currency",
              "iconUrl": "https://cdn.example.com/gems.png",
              "rarity": null,
              "code": "GEM",
              "type": "virtual"
            },
            "realWorldCurrency": null
          }
        ],
        "contents": null
      }
    ],
    "totalItemsCount": 25,
    "totalBundlesCount": 5,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 2: Get Contents with Pagination
**Request:**
```json
{
  "storeId": "main-shop",
  "categoryId": "weapons",
  "offset": 0,
  "limit": 20
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Contents list",
  "data": {
    "items": [
      {
        "uuid": "item-uuid-1",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "quantity": 1,
        "rarity": {
          "id": "rarity-uuid-1",
          "name": "Common"
        },
        "prices": []
      }
    ],
    "bundles": [],
    "totalItemsCount": 25,
    "totalBundlesCount": 5,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: Get Contents with Bundle Details
**Request:**
```json
{
  "storeId": "main-shop",
  "categoryId": "bundles",
  "attributes": ["bundles.contents"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Store Contents list",
  "data": {
    "items": [],
    "bundles": [
      {
        "uuid": "bundle-uuid-1",
        "id": "starter-pack",
        "name": "Starter Pack",
        "description": "Everything you need to get started",
        "iconUrl": "https://cdn.example.com/starter-pack.png",
        "rarity": {
          "id": "rarity-uuid-2",
          "name": "Rare"
        },
        "quantity": 1,
        "prices": [
          {
            "priceType": "real",
            "price": 4.99,
            "discount": 0,
            "productId": "com.game.starterpack",
            "bonusCashAllowance": 0,
            "currencyDetails": null,
            "realWorldCurrency": {
              "uuid": "world-currency-uuid",
              "id": "world-currency-uuid",
              "countryName": "United States",
              "name": "US Dollar",
              "code": "USD",
              "symbol": "$"
            }
          }
        ],
        "contents": {
          "items": [
            {
              "uuid": "item-uuid-1",
              "id": "sword-01",
              "name": "Iron Sword",
              "description": "A basic iron sword",
              "iconUrl": "https://cdn.example.com/sword.png",
              "rarity": {
                "id": "rarity-uuid-1",
                "name": "Common"
              },
              "quantity": 1
            }
          ],
          "bundles": [],
          "currencies": [
            {
              "uuid": "currency-uuid-1",
              "id": "gold-coins",
              "name": "Gold Coins",
              "description": "In-game currency",
              "iconUrl": "https://cdn.example.com/gold.png",
              "rarity": null,
              "quantity": 1000
            }
          ]
        }
      }
    ],
    "totalItemsCount": 0,
    "totalBundlesCount": 3,
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
| Store category not found | The specified categoryId does not exist in the store |

---

## Notes

- Returns items and bundles in `data.items` and `data.bundles` arrays
- `totalItemsCount` and `totalBundlesCount` show totals for the category
- Use `bundles.contents` attribute to get bundle contents (items, bundles, currencies inside)
- Each item/bundle includes full pricing details with currency information
- `rarity` field is null if no rarity is assigned

---

## Source Files

- **DTO**: `src/inventory/dtos/get-store-category-contents.v2.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts`
- **Service**: `src/inventory/inventory.service.ts`
