# V2 API: `client/wallet/update-balance`

**Endpoint:** `POST /v2/client/wallet/update-balance`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `operation` | `string` | Yes | Operation type: "add" or "subtract" |
| `currencyId` | `string` | Yes | The currency ID to update |
| `walletType` | `string` | Yes | Wallet type: "virtual", "rm_deposit", "rm_winning", or "rm_bonus" |
| `amount` | `number` | Yes | Amount to add/subtract (must be positive) |
| `customParams` | `object` | No | Custom parameters for the update |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Wallet updated successfully",
  "data": {
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
    "balance": 1500,
    "requested": 500,
    "applied": 500,
    "wasAdjusted": false,
    "adjustmentReason": null
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Unique identifier for the currency |
| `id` | `string` | Currency ID |
| `name` | `string` | Currency display name |
| `description` | `string` | Currency description |
| `iconUrl` | `string` | URL to currency icon |
| `rarity` | `object \| null` | Rarity information if applicable |
| `type` | `string` | Currency type |
| `code` | `string` | Currency code |
| `balance` | `number` | New balance after update |
| `requested` | `number` | Amount requested to add/subtract |
| `applied` | `number` | Amount actually applied |
| `wasAdjusted` | `boolean` | Whether amount was adjusted |
| `adjustmentReason` | `string \| null` | Reason for adjustment if any |

---

## Request Examples

### Example 1: Add Currency
**Request:**
```json
{
  "operation": "add",
  "currencyId": "gold-coins",
  "walletType": "virtual",
  "amount": 500
}
```

### Example 2: Subtract Currency
**Request:**
```json
{
  "operation": "subtract",
  "currencyId": "gems",
  "walletType": "virtual",
  "amount": 100,
  "customParams": {
    "reason": "purchase"
  }
}
```

---

## Source Files

- **DTO**: `src/wallet/dto/update-wallet-balance.v2.dto.ts`
- **Controller**: `src/wallet/wallet.controller.ts`
- **Service**: `src/wallet/wallet.service.ts`
