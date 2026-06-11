# V2 API: `client/app/get-currencies`

**Endpoint:** `POST /v2/client/app/get-currencies`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `currencyIds` | `string[]` | Filter currencies by specific currency IDs |
| `type` | `string` | Filter currencies by type |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `search` | `string` | Search currencies by name (case-insensitive) |
| `includeTags` | `string[]` | Filter currencies by tag names |

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Currencies",
  "data": {
    "currencies": [...],
    "totalCount": 15,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each currency returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "currency-123",
  "name": "Gold Coins",
  "description": "Primary in-game currency",
  "iconUrl": "https://cdn.example.com/gold-icon.png",
  "code": "GLD",
  "type": "soft",
  "rarity": {
    "id": "rarity-uuid",
    "name": "Common"
  }
}
```

*Note: `rarity` is `null` if no rarity tier is assigned.*

---

## How Each Attribute Changes Response

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "exchangeRate": 100,
    "maxStack": 999999,
    "customField": "value"
  }
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["premium", "purchasable", "tradeable"]
}
```

---

## Combining Multiple Attributes

### Request
```json
{
  "attributes": ["meta", "tags"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "currency-123",
  "name": "Gold Coins",
  "description": "Primary in-game currency",
  "iconUrl": "https://cdn.example.com/gold-icon.png",
  "code": "GLD",
  "type": "soft",
  "rarity": {
    "id": "rarity-uuid",
    "name": "Common"
  },
  "meta": {
    "exchangeRate": 100,
    "maxStack": 999999
  },
  "tags": ["premium", "purchasable"]
}
```

---

## How Filters Affect Response

### `currencyIds` Filter
Returns only currencies with the specified IDs.

**Request:**
```json
{
  "currencyIds": ["currency-123", "currency-456"]
}
```
**Effect:** Response contains only currencies where `currencyId` matches one of the provided IDs.

---

### `type` Filter
Filters currencies by type.

**Request:**
```json
{
  "type": "soft"
}
```
**Effect:** Returns only currencies of type "soft".

**Request:**
```json
{
  "type": "hard"
}
```
**Effect:** Returns only currencies of type "hard".

---

### `search` Filter
Filters currencies by name (case-insensitive partial match).

**Request:**
```json
{
  "search": "gold"
}
```
**Effect:** Returns currencies where name contains "gold" (e.g., "Gold Coins", "Golden Gems", "GOLD BARS").

---

### `includeTags` Filter
Filters currencies that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["premium", "purchasable"]
}
```
**Effect:** Returns currencies tagged with "premium" OR "purchasable".

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 5,
  "limit": 10
}
```
**Effect:** Skips first 5 currencies, returns next 10 currencies. Results are ordered by `updated_at DESC`.

**Defaults:**
- `offset`: 0
- `limit`: 10

---

## Combining Filters and Attributes

### Request
```json
{
  "type": "soft",
  "search": "coin",
  "includeTags": ["tradeable"],
  "attributes": ["meta", "tags"],
  "offset": 0,
  "limit": 20
}
```

### Effect
1. Filters to soft currencies only
2. Filters to currencies with "coin" in name
3. Filters to currencies with "tradeable" tag
4. Returns first 20 results
5. Each currency includes base fields + meta + tags

---

## Complete Request/Response Examples

### Example 1: Minimal Request
**Request:**
```json
{}
```
**Response:** First 10 currencies with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["meta", "tags"]
}
```
**Response:** First 10 currencies with ALL optional fields included.

---

### Example 3: Specific Currencies by Type
**Request:**
```json
{
  "type": "hard",
  "attributes": ["tags"]
}
```
**Response:** All hard currencies with tags data.

---

### Example 4: Search with Pagination
**Request:**
```json
{
  "search": "gem",
  "offset": 0,
  "limit": 5,
  "attributes": ["meta"]
}
```
**Response:** First 5 currencies with "gem" in name, including metadata.

---

## Source Files

- **DTO**: `src/currencies/dtos/get-master-currencies.v2.dto.ts`
- **Controller**: `src/currencies/currencies.controller.ts:177-210`
- **Service**: `src/currencies/currencies.service.ts:309-418`
