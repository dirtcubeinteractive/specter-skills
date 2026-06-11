# V2 API: `client/rmg/execute-withdrawal`

**Endpoint:** `POST /v2/client/rmg/execute-witdrawal`

**Authentication:** User Auth Guard Required

**Note:** The endpoint path contains a typo ("witdrawal" instead of "withdrawal").

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | `number` | **Yes** | Withdrawal amount |
| `currencyId` | `string` | **Yes** | Currency ID for the withdrawal |
| `referenceId` | `string` | **Yes** | External payout reference ID |
| `walletType` | `string` | No | Wallet type: "deposit" (default: winning wallet) |

---

## Response Structure

### Success Response (No Tax)
```json
{
  "status": "success",
  "code": 200,
  "message": "Amount withdraw successfully",
  "data": {
    "currencyId": "currency-uuid-123",
    "amount": 500,
    "isTaxApplicable": false,
    "referenceId": "payout-ref-xyz123",
    "remainingDailyLimit": 4500,
    "remainingWeeklyLimit": 14500,
    "remainingMonthlyLimit": 49500
  },
  "errors": []
}
```

### Success Response (With Tax and Commission)
```json
{
  "status": "success",
  "code": 200,
  "message": "Amount withdraw successfully",
  "data": {
    "currencyId": "currency-uuid-123",
    "amount": 10000,
    "isTaxApplicable": true,
    "referenceId": "payout-ref-xyz123",
    "taxRate": 30,
    "taxAmount": 2850,
    "commission": 500,
    "netAmount": 6650,
    "remainingDailyLimit": 0
  },
  "errors": []
}
```

### Validation Failure Response
```json
{
  "status": "unprocessable_entity",
  "code": 422,
  "message": "Not elegible to withdraw amount",
  "data": null,
  "errors": [
    "Insufficient balance. Current balance: 1500"
  ]
}
```

---

## Response Fields Explained

### Success Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.currencyId` | `string` | Internal currency UUID |
| `data.amount` | `number` | Requested withdrawal amount |
| `data.isTaxApplicable` | `boolean` | Whether tax was deducted |
| `data.referenceId` | `string` | External payout reference ID |
| `data.taxRate` | `number` | Tax rate percentage (if tax applicable) |
| `data.taxAmount` | `number` | Tax amount deducted (if tax applicable) |
| `data.commission` | `number` | Commission amount deducted (if configured) |
| `data.netAmount` | `number` | Net amount after tax and commission (if tax or commission applicable) |
| `data.remainingDailyLimit` | `number` | Remaining daily withdrawal limit (if policy configured) |
| `data.remainingWeeklyLimit` | `number` | Remaining weekly withdrawal limit (if policy configured) |
| `data.remainingMonthlyLimit` | `number` | Remaining monthly withdrawal limit (if policy configured) |

### Failure Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `errors` | `string[]` | Array of validation failure reasons |

---

## Request/Response Examples

### Example 1: Successful Withdrawal
**Request:**
```json
{
  "amount": 500,
  "currencyId": "usd",
  "referenceId": "payout-ref-xyz123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Amount withdraw successfully",
  "data": {
    "currencyId": "currency-uuid-123",
    "amount": 500,
    "isTaxApplicable": false,
    "referenceId": "payout-ref-xyz123",
    "remainingDailyLimit": 4500
  },
  "errors": []
}
```

### Example 2: Withdrawal with Tax
**Request:**
```json
{
  "amount": 10000,
  "currencyId": "usd",
  "referenceId": "payout-ref-abc"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Amount withdraw successfully",
  "data": {
    "currencyId": "currency-uuid-123",
    "amount": 10000,
    "isTaxApplicable": true,
    "referenceId": "payout-ref-abc",
    "taxRate": 30,
    "taxAmount": 3000,
    "netAmount": 7000,
    "remainingDailyLimit": 0
  },
  "errors": []
}
```

### Example 3: Withdrawal from Deposit Wallet
**Request:**
```json
{
  "amount": 500,
  "currencyId": "usd",
  "referenceId": "payout-ref-xyz123",
  "walletType": "deposit"
}
```

### Example 4: Validation Failed
**Request:**
```json
{
  "amount": 50000,
  "currencyId": "usd",
  "referenceId": "payout-ref-xyz"
}
```

**Response:**
```json
{
  "status": "unprocessable_entity",
  "code": 422,
  "message": "Not elegible to withdraw amount",
  "data": null,
  "errors": [
    "Amount exceeds daily withdrawal limit of 10000"
  ]
}
```

---

## Notes

- Executes a withdrawal after validation
- The `referenceId` should be unique per transaction
- Automatically validates the withdrawal before execution
- By default withdraws from winning wallet; use `walletType: "deposit"` for deposit wallet
- Funds are deducted immediately from user wallet and credited to project wallet
- Tax (TDS) is calculated and deducted if applicable based on policy threshold
- Commission is deducted if configured in the policy
- Creates separate wallet transactions for withdrawal, commission, and TDS

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Currency not found | Currency ID is invalid or not found |
| Wallet not found | User wallet not found for the currency |
| Insufficient balance | User doesn't have enough funds |
| Validation failed | Withdrawal doesn't meet policy requirements |

---

## Source Files

- **DTO**: `src/withdrawal/dto/execute-withdrawal.dto.ts`
- **Controller**: `src/withdrawal/withdrawal.controller.ts`
- **Service**: `src/withdrawal/withdrawal.service.ts`
