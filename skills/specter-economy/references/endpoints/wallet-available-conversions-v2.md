# V2 API: `client/wallet/available-conversions`

**Endpoint:** `POST /v2/client/wallet/available-conversions`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

No request body required.

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Available conversions",
  "data": [
    {
      "id": 1,
      "sourceWallet": {
        "balance": "5000",
        "currency": {
          "uuid": "550e8400-e29b-41d4-a716-446655440000",
          "id": "gold-coins",
          "name": "Gold Coins",
          "description": "In-game currency",
          "code": "GLD",
          "iconUrl": "https://cdn.example.com/gold.png",
          "rarity": null,
          "type": "virtual"
        }
      },
      "targetCurrency": {
        "uuid": "550e8400-e29b-41d4-a716-446655440001",
        "id": "gems",
        "name": "Gems",
        "code": "GEM",
        "description": "Premium currency",
        "iconUrl": "https://cdn.example.com/gems.png",
        "rarity": null,
        "type": "virtual"
      },
      "conversionRate": 0.1,
      "conversionFee": 5
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `id` | `number` | Conversion pair ID |
| `sourceWallet.balance` | `string` | Current balance in source wallet |
| `sourceWallet.currency` | `object` | Source currency details |
| `targetCurrency` | `object` | Target currency details |
| `conversionRate` | `number` | Exchange rate |
| `conversionFee` | `number` | Fee percentage |

---

## Request Examples

### Example: Get Available Conversions
**Request:**
```json
{}
```

---

## Notes

- Only returns conversion pairs where the user has a positive balance in the source currency
- Conversion rates and fees are configured at the project level

---

## Source Files

- **Controller**: `src/wallet/wallet.controller.ts`
- **Service**: `src/wallet/wallet.service.ts`
