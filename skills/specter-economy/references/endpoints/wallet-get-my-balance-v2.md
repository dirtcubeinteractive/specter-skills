# V2 API: `client/player/me/get-wallet-balance`

**Endpoint:** `POST /v2/client/player/me/get-wallet-balance`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currencyIds` | `string[]` | Yes | Array of currency IDs to retrieve (minimum 1) |
| `type` | `string[]` | No | Filter by wallet types |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My Wallet Balance",
  "data": [
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "id": "gold-coins",
      "name": "Gold Coins",
      "description": "In-game currency",
      "iconUrl": "https://cdn.example.com/gold.png",
      "rarity": {
        "id": "rarity-uuid",
        "name": "Common"
      },
      "type": "virtual",
      "code": "GLD",
      "balance": 5000
    },
    {
      "uuid": "550e8400-e29b-41d4-a716-446655440001",
      "id": "gems",
      "name": "Gems",
      "description": "Premium currency",
      "iconUrl": "https://cdn.example.com/gems.png",
      "rarity": null,
      "type": "virtual",
      "code": "GEM",
      "balance": 150
    }
  ],
  "errors": []
}
```

---

## Request Examples

### Example 1: Get Specific Currencies
**Request:**
```json
{
  "currencyIds": ["gold-coins", "gems"]
}
```

### Example 2: With Type Filter
**Request:**
```json
{
  "currencyIds": ["deposit-balance", "winning-balance"],
  "type": ["rm_deposit", "rm_winning"]
}
```

### Example 3: With Pagination
**Request:**
```json
{
  "currencyIds": ["gold-coins"],
  "offset": 0,
  "limit": 20
}
```

---

## Source Files

- **DTO**: `src/wallet/dto/get-my-wallet-balance.v2.dto.ts`
- **Controller**: `src/wallet/wallet.controller.ts`
- **Service**: `src/wallet/wallet.service.ts`
