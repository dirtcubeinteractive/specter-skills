# V2 API: `client/rmg/execute-deposit`

**Endpoint:** `POST /v2/client/rmg/execute-deposit`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | `number` | **Yes** | Deposit amount |
| `currencyId` | `string` | **Yes** | Currency ID for the deposit |
| `referenceId` | `string` | **Yes** | External payment reference ID |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Amount deposited successfully",
  "data": {
    "currencyId": "currency-uuid-123",
    "amount": 1000,
    "referenceId": "payment-ref-abc123",
    "remainingDailyLimit": 9000,
    "remainingWeeklyLimit": 49000,
    "remainingMonthlyLimit": 99000
  },
  "errors": []
}
```

### Validation Failure Response
```json
{
  "status": "unprocessable_entity",
  "code": 422,
  "message": "Not elegible to deposit amount",
  "data": null,
  "errors": [
    "Amount exceeds daily deposit limit of 10000"
  ]
}
```

---

## Response Fields Explained

### Success Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.currencyId` | `string` | Internal currency UUID |
| `data.amount` | `number` | Deposited amount |
| `data.referenceId` | `string` | External payment reference ID |
| `data.remainingDailyLimit` | `number` | Remaining daily deposit limit (if policy configured) |
| `data.remainingWeeklyLimit` | `number` | Remaining weekly deposit limit (if policy configured) |
| `data.remainingMonthlyLimit` | `number` | Remaining monthly deposit limit (if policy configured) |

### Failure Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `errors` | `string[]` | Array of validation failure reasons |

---

## Request/Response Examples

### Example 1: Successful Deposit
**Request:**
```json
{
  "amount": 1000,
  "currencyId": "usd",
  "referenceId": "payment-ref-abc123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Amount deposited successfully",
  "data": {
    "currencyId": "currency-uuid-123",
    "amount": 1000,
    "referenceId": "payment-ref-abc123",
    "remainingDailyLimit": 9000
  },
  "errors": []
}
```

### Example 2: Validation Failed
**Request:**
```json
{
  "amount": 50000,
  "currencyId": "usd",
  "referenceId": "payment-ref-xyz"
}
```

**Response:**
```json
{
  "status": "unprocessable_entity",
  "code": 422,
  "message": "Not elegible to deposit amount",
  "data": null,
  "errors": [
    "Amount exceeds monthly deposit limit of 100000"
  ]
}
```

---

## Notes

- Executes a deposit after payment confirmation
- The `referenceId` should match the payment gateway transaction
- Automatically validates the deposit before execution
- Credits the amount to the user's deposit wallet
- Remaining limits are only returned if the respective limit is configured in the policy
- Creates wallet transactions for both debit from project wallet and credit to user wallet

---

## Error Scenarios

| Error | Code | Description |
|-------|------|-------------|
| Currency not found | 1041 | Currency ID is invalid or not found |
| Wallet not found | 1050 | User wallet not found for the currency |
| Validation failed | 422 | Deposit amount doesn't meet policy requirements |

---

## Source Files

- **DTO**: `src/deposit/dto/execute-deposit.dto.ts`
- **Controller**: `src/deposit/deposit.controller.ts`
- **Service**: `src/deposit/deposit.service.ts`
