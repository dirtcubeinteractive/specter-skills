# V2 API: `client/player/get-wallet-history`

**Endpoint:** `POST /v2/client/player/get-wallet-history`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | ID of the player whose wallet history to fetch |
| `currencyIds` | `string[]` | No | Array of currency IDs (client-facing `currencyId`) to filter transactions by |
| `limit` | `number` | No | Number of transactions to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

`data` is an **array** of transaction objects for the requested player, ordered by `updatedAt` descending. Returns an empty array if the player has no wallets. Same transaction shape as `client/player/me/get-wallet-history`.

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
      "transactionType": "debit",
      "currencyDetails": {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png",
        "code": "GLD",
        "type": "virtual",
        "rarity": null
      },
      "realWorldCurrency": null,
      "purchasedItem": {
        "uuid": "item-uuid-123",
        "id": "sword-01",
        "name": "Iron Sword",
        "description": "A basic iron sword",
        "iconUrl": "https://cdn.example.com/sword.png",
        "rarity": null
      },
      "purchasedBundle": null,
      "purpose": {
        "id": 2,
        "name": "store_purchase"
      },
      "amount": 50,
      "remarks": null,
      "createdAt": "2024-12-09T05:20:15.123Z",
      "updatedAt": "2024-12-09T05:20:15.123Z"
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
| `data[].currencyDetails` | `object \| null` | In-game currency details `{ uuid, id, name, description, iconUrl, code, type, rarity }` |
| `data[].realWorldCurrency` | `object \| null` | Real-world currency details `{ uuid, id, countryName, currency, code, symbol }` |
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
{
  "userId": "player-123"
}
```
**Effect:** Returns the latest 10 transactions for player `player-123`.

### Example 2: Filter by Currency
**Request:**
```json
{
  "userId": "player-123",
  "currencyIds": ["gold-coins"],
  "limit": 5
}
```
**Effect:** Returns the latest 5 Gold Coins transactions for player `player-123`.

---

## Notes

- Shares the same service method (`getTransactionHistoryV2`) as `client/player/me/get-wallet-history`; the only difference is the target user comes from `payload.userId` instead of the bearer token.
- Returns `[]` (empty array) when the target player has no active wallets.

---

## Source Files

- **DTO**: `src/users/dto/get-other-transaction-history.dto.ts`
- **Controller**: `src/users/users.controller.ts:2728-2756`
- **Service**: `src/users/users.service.ts:7954-8177` (`getTransactionHistoryV2`)
