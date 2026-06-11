# V2 API: `client/player/me/get-rm-wallet-history`

**Endpoint:** `POST /v2/client/player/me/get-rm-wallet-history`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | `number` | No | Number of transactions to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get My RM transaction history",
  "data": [
    {
      "id": "txn-uuid-1",
      "status": "processed",
      "transactionType": "debit",
      "amount": 100,
      "purpose": {
        "id": 11,
        "name": "Competition Entry Fee"
      },
      "mode": "automatic",
      "isTaxed": false,
      "referenceId": "ref-abc-123",
      "note": "Partial coverage for net",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "txn-uuid-2",
      "status": "processed",
      "transactionType": "credit",
      "amount": 500,
      "purpose": {
        "id": 11,
        "name": "Competition Entry Fee"
      },
      "mode": "automatic",
      "isTaxed": true,
      "referenceId": null,
      "note": "Prize winnings",
      "createdAt": "2024-01-14T08:00:00.000Z",
      "updatedAt": "2024-01-14T08:00:00.000Z"
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of transaction objects |
| `data[].id` | `string` | Unique transaction identifier |
| `data[].status` | `string` | Transaction status (e.g., "processed") |
| `data[].transactionType` | `string` | Transaction type: "debit" or "credit" |
| `data[].amount` | `number` | Transaction amount |
| `data[].purpose` | `object \| null` | Transaction purpose details |
| `purpose.id` | `number` | Purpose ID from wallet_transaction_purpose_master |
| `purpose.name` | `string` | Purpose name (e.g., "Competition Entry Fee", "Platform Fee", "GST") |
| `data[].mode` | `string` | Transaction mode (e.g., "automatic", "manual") |
| `data[].isTaxed` | `boolean` | Whether the transaction was taxed |
| `data[].referenceId` | `string \| null` | External reference ID |
| `data[].note` | `string \| null` | Transaction note |
| `data[].createdAt` | `string` | ISO timestamp of creation |
| `data[].updatedAt` | `string` | ISO timestamp of last update |

---

## Request/Response Examples

### Example 1: Get Recent Transactions
**Request:**
```json
{
  "limit": 10,
  "offset": 0
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get My RM transaction history",
  "data": [
    {
      "id": "txn-uuid-1",
      "status": "processed",
      "transactionType": "debit",
      "amount": 50,
      "purpose": {
        "id": 11,
        "name": "Competition Entry Fee"
      },
      "mode": "automatic",
      "isTaxed": false,
      "referenceId": null,
      "note": "Partial coverage for net",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "id": "txn-uuid-2",
      "status": "processed",
      "transactionType": "credit",
      "amount": 200,
      "purpose": {
        "id": 16,
        "name": "Platform Fee"
      },
      "mode": "automatic",
      "isTaxed": false,
      "referenceId": "payout-ref-xyz",
      "note": null,
      "createdAt": "2024-01-14T08:00:00.000Z",
      "updatedAt": "2024-01-14T08:00:00.000Z"
    }
  ],
  "errors": []
}
```

### Example 2: Paginated Request
**Request:**
```json
{
  "limit": 50,
  "offset": 50
}
```

### Example 3: Empty Transaction History
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get My RM transaction history",
  "data": [],
  "errors": []
}
```

---

## Notes

- Returns the authenticated user's RMG (Real Money Gaming) wallet transaction history
- Results are ordered by `updatedAt` descending (most recent first)
- Transaction purposes include: "Competition Entry Fee" (11), "Platform Fee" (16), "GST" (14), "VAT" (15), "Sales Tax" (17)
- `isTaxed` is true when `taxStatus` is "taxed"
- Use pagination for large transaction histories

---

## Source Files

- **DTO**: `src/rmg-transaction/dtos/get-my-rm-transaction-history.dto.ts`
- **Controller**: `src/rmg-transaction/rmg-transaction.controller.ts`
- **Service**: `src/rmg-transaction/rmg-transaction.service.ts`
