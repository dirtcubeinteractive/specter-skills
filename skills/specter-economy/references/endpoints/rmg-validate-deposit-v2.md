# V2 API: `client/rmg/validate-deposit`

**Endpoint:** `POST /v2/client/rmg/validate-deposit`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | `number` | **Yes** | Deposit amount |
| `currencyId` | `string` | **Yes** | Currency ID for the deposit |

---

## Response Structure

### Validation Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Deposit validated successfully",
  "data": {
    "isValid": true,
    "amount": 1000,
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
  "status": "success",
  "code": 200,
  "message": "Deposit validated successfully",
  "data": {
    "isValid": false,
    "reasons": [
      "Amount exceeds daily deposit limit of 10000"
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.isValid` | `boolean` | Whether the deposit is valid |
| `data.amount` | `number` | Requested deposit amount (only if valid) |
| `data.remainingDailyLimit` | `number` | Remaining daily deposit limit after this transaction (if policy configured) |
| `data.remainingWeeklyLimit` | `number` | Remaining weekly deposit limit after this transaction (if policy configured) |
| `data.remainingMonthlyLimit` | `number` | Remaining monthly deposit limit after this transaction (if policy configured) |
| `data.reasons` | `string[]` | Array of validation failure reasons (only if invalid) |

---

## Request/Response Examples

### Example 1: Successful Validation
**Request:**
```json
{
  "amount": 1000,
  "currencyId": "usd"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Deposit validated successfully",
  "data": {
    "isValid": true,
    "amount": 1000,
    "remainingDailyLimit": 9000
  },
  "errors": []
}
```

### Example 2: Exceeds Daily Limit
**Request:**
```json
{
  "amount": 15000,
  "currencyId": "usd"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Deposit validated successfully",
  "data": {
    "isValid": false,
    "reasons": [
      "Amount exceeds daily deposit limit of 10000"
    ]
  },
  "errors": []
}
```

### Example 3: Below Minimum
**Request:**
```json
{
  "amount": 50,
  "currencyId": "usd"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Deposit validated successfully",
  "data": {
    "isValid": false,
    "reasons": [
      "Amount is below the minimum deposit limit of 100"
    ]
  },
  "errors": []
}
```

---

## Notes

- Validates a deposit before execution
- Checks against policy limits (min/max per transaction, daily/weekly/monthly limits)
- Checks wallet balance limits if configured
- May check KYC requirements based on policy
- Use `rmg/execute-deposit` to complete the deposit after validation
- Remaining limits are only returned if the respective limit is configured in the policy

---

## Error Scenarios

| Error | Code | Description |
|-------|------|-------------|
| Currency not found | 1041 | Currency ID is invalid or not found |
| Wallet not found | 1050 | User wallet not found for the currency |
| Policy not found | 1127 | No active deposit policy found for the currency |

---

## Source Files

- **DTO**: `src/deposit/dto/deposit-validate.dto.ts`
- **Controller**: `src/deposit/deposit.controller.ts`
- **Service**: `src/deposit/deposit.service.ts`
