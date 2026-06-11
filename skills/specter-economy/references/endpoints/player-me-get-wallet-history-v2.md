# V2 API: `client/player/me/get-wallet-history`

**Endpoint:** `POST /v2/client/player/me/get-wallet-history`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currencyIds` | `string[]` | No | Array of currency IDs (client-facing `currencyId`) to filter transactions by |
| `limit` | `number` | No | Number of transactions to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

`data` is an **array** of transaction objects, ordered by `updatedAt` descending. Returns an empty array if the user has no wallets.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get My transaction history",
  "data": [
    {
      "id": "transaction-uuid-123",
      "status": "completed",
      "transactionType": "credit",
      "currencyDetails": {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png",
        "code": "GLD",
        "type": "virtual",
        "rarity": {
          "id": "rarity-uuid",
          "name": "Common"
        }
      },
      "realWorldCurrency": null,
      "purchasedItem": null,
      "purchasedBundle": null,
      "purpose": {
        "id": 1,
        "name": "task_completion_reward"
      },
      "amount": 100,
      "remarks": null,
      "createdAt": "2024-12-09T06:34:28.683Z",
      "updatedAt": "2024-12-09T06:34:28.683Z"
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data[].id` | `string` | Wallet transaction ID |
| `data[].status` | `string` | Transaction status |
| `data[].transactionType` | `string` | `credit` or `debit` |
| `data[].currencyDetails` | `object \| null` | In-game currency details `{ uuid, id, name, description, iconUrl, code, type, rarity }`; falls back to the purchasing currency if the transaction currency is absent |
| `data[].realWorldCurrency` | `object \| null` | Real-world currency details `{ uuid, id, countryName, currency, code, symbol }` for real-money transactions |
| `data[].purchasedItem` | `object \| null` | Item bought in this transaction `{ uuid, id, name, description, iconUrl, rarity }` |
| `data[].purchasedBundle` | `object \| null` | Bundle bought in this transaction `{ uuid, id, name, description, iconUrl, rarity }` |
| `data[].purpose` | `object \| null` | Transaction purpose `{ id, name }` |
| `data[].amount` | `number` | Transaction amount |
| `data[].remarks` | `string \| null` | Free-text remarks |
| `data[].createdAt` | `string` | Creation timestamp |
| `data[].updatedAt` | `string` | Last update timestamp |

---

## Request Examples

### Example 1: Basic Request
**Request:**
```json
{}
```
**Effect:** Returns the latest 10 transactions of the authenticated user across all wallets.

### Example 2: Filter by Currency with Pagination
**Request:**
```json
{
  "currencyIds": ["gold-coins"],
  "limit": 20,
  "offset": 20
}
```
**Effect:** Returns transactions 21-40 for the user's Gold Coins wallet only.

---

## Notes

- Only player-side transactions are returned (credits received by the player wallet, debits sent from the player wallet, and real-money transactions belonging to the user).
- Returns `[]` (empty array) when the user has no active wallets.

---

## Source Files

- **DTO**: `src/users/dto/get-my-transaction-history.dto.ts`
- **Controller**: `src/users/users.controller.ts:2698-2727`
- **Service**: `src/users/users.service.ts:7954-8177` (`getTransactionHistoryV2`)
