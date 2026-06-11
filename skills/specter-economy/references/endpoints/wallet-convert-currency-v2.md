# V2 API: `client/wallet/convert-currency`

**Endpoint:** `POST /v2/client/wallet/convert-currency`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `sourceCurrencyId` | `string` | Yes | The currency ID to convert from |
| `targetCurrencyId` | `string` | Yes | The currency ID to convert to |
| `amount` | `number` | Yes | Amount to convert (must be positive) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Currency converted successfully",
  "data": {
    "sourceAmount": 1000,
    "sourceCurrency": {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "id": "gold-coins",
      "name": "Gold Coins",
      "description": "In-game currency",
      "code": "GLD",
      "iconUrl": "https://cdn.example.com/gold.png",
      "type": "virtual",
      "rarity": null
    },
    "targetAmount": 95,
    "targetCurrency": {
      "uuid": "550e8400-e29b-41d4-a716-446655440001",
      "id": "gems",
      "name": "Gems",
      "description": "Premium currency",
      "code": "GEM",
      "iconUrl": "https://cdn.example.com/gems.png",
      "type": "virtual",
      "rarity": null
    },
    "fee": {
      "percentage": 5,
      "amount": 5
    },
    "conversionRate": 0.1
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `sourceAmount` | `number` | Amount deducted from source currency |
| `sourceCurrency` | `object` | Source currency details |
| `targetAmount` | `number` | Amount added to target currency (after fee) |
| `targetCurrency` | `object` | Target currency details |
| `fee.percentage` | `number` | Fee percentage applied |
| `fee.amount` | `number` | Absolute fee amount |
| `conversionRate` | `number` | Exchange rate used |

---

## Request Examples

### Example: Convert Gold to Gems
**Request:**
```json
{
  "sourceCurrencyId": "gold-coins",
  "targetCurrencyId": "gems",
  "amount": 1000
}
```

---

## Source Files

- **DTO**: `src/wallet/dto/convert-currency.dto.ts`
- **Controller**: `src/wallet/wallet.controller.ts`
- **Service**: `src/wallet/wallet.service.ts`
