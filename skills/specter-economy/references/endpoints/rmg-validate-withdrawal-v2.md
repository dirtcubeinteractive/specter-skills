# V2 API: `client/rmg/validate-deposit`

**Endpoint:** `POST /v2/client/rmg/validate-withdrawal`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | `number` | **Yes** | Withdrawal amount (integer) |
| `currencyId` | `string` | **Yes** | Currency ID for the withdrawal |
| `walletType` | `string` | No | Wallet type: "deposit" (default: main wallet) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Withdrawal validation successful",
  "data": {
    "isValid": true,
    "amount": 500,
    "currencyId": "usd",
    "processingFee": 10,
    "netAmount": 490,
    "availableBalance": 1500,
    "errors": []
  },
  "errors": []
}
```

### Validation Failure Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Withdrawal validation failed",
  "data": {
    "isValid": false,
    "amount": 2000,
    "currencyId": "usd",
    "availableBalance": 1500,
    "errors": [
      "Insufficient balance"
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `isValid` | `boolean` | Whether the withdrawal is valid |
| `amount` | `number` | Requested withdrawal amount |
| `currencyId` | `string` | Currency ID |
| `processingFee` | `number` | Processing fee (if valid) |
| `netAmount` | `number` | Net amount after fee (if valid) |
| `availableBalance` | `number` | User's available balance |
| `errors` | `array` | Array of validation error messages |

---

## Request Examples

### Example 1: Validate Withdrawal
**Request:**
```json
{
  "amount": 500,
  "currencyId": "usd"
}
```

### Example 2: Validate from Deposit Wallet
**Request:**
```json
{
  "amount": 500,
  "currencyId": "usd",
  "walletType": "deposit"
}
```

---

## Notes

- Validates a withdrawal before execution
- Checks against policy limits and available balance
- Returns processing fees for the transaction
- Use `rmg/execute-withdrawal` to complete the withdrawal

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Insufficient balance | User doesn't have enough funds |
| Below minimum | Amount is below the minimum withdrawal limit |
| Above maximum | Amount exceeds the maximum withdrawal limit |
| Daily limit exceeded | Daily withdrawal limit has been reached |

---

## Source Files

- **DTO**: `src/withdrawal/dto/withdrawal-validate.dto.ts`
- **Controller**: `src/withdrawal/withdrawal.controller.ts`
- **Service**: `src/withdrawal/withdrawal.service.ts`
