# V2 API: `client/rmg/get-policy`

**Endpoint:** `POST /v2/client/rmg/get-policy`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currencyId` | `string` | **Yes** | The currency ID to get policy for |
| `entityType` | `string` | No | Entity type for policy filtering |
| `entitySubType` | `string` | No | Entity sub-type for policy filtering |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Policy fetched successfully",
  "data": {
    "policy": {
      "currencyId": "usd",
      "minDeposit": 100,
      "maxDeposit": 10000,
      "minWithdrawal": 500,
      "maxWithdrawal": 5000,
      "dailyDepositLimit": 50000,
      "dailyWithdrawalLimit": 25000,
      "processingFee": 0,
      "processingFeePercent": 2.5
    }
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `policy` | `object` | Policy configuration object |
| `policy.currencyId` | `string` | Currency ID |
| `policy.minDeposit` | `number` | Minimum deposit amount |
| `policy.maxDeposit` | `number` | Maximum deposit amount |
| `policy.minWithdrawal` | `number` | Minimum withdrawal amount |
| `policy.maxWithdrawal` | `number` | Maximum withdrawal amount |
| `policy.dailyDepositLimit` | `number` | Daily deposit limit |
| `policy.dailyWithdrawalLimit` | `number` | Daily withdrawal limit |
| `policy.processingFee` | `number` | Fixed processing fee |
| `policy.processingFeePercent` | `number` | Processing fee percentage |

---

## Request Examples

### Example 1: Get Policy for Currency
**Request:**
```json
{
  "currencyId": "usd"
}
```

### Example 2: Get Policy with Entity Type
**Request:**
```json
{
  "currencyId": "usd",
  "entityType": "competition",
  "entitySubType": "tournament"
}
```

---

## Notes

- Returns the RMG (Real Money Gaming) policy for a specific currency
- Policy defines limits and fees for deposits and withdrawals
- Use this to validate transactions before attempting them
- Different policies may apply based on entity type

---

## Source Files

- **DTO**: `src/policy/dto/get-policy.v2.dto.ts`
- **Controller**: `src/policy/policy.controller.ts`
- **Service**: `src/policy/policy.service.ts`
