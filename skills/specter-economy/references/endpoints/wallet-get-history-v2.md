# V2 API: `client/wallet/get-history`

**Endpoint:** `POST /v2/client/wallet/get-history`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

> **DEPRECATED** — marked `/* DEPRECATED API */` in the controller. Use `client/player/me/get-wallet-history` instead.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | `number` | No | Number of transactions to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

`data` is an **array** of transaction objects for the authenticated user, ordered by `updatedAt` descending.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get wallet history",
  "data": [
    {
      "id": "transaction-uuid-123",
      "status": "completed",
      "transactionType": "credit",
      "currency": {
        "uuid": "currency-uuid",
        "id": "gold-coins",
        "name": "Gold Coins",
        "description": "In-game currency",
        "iconUrl": "https://cdn.example.com/gold.png"
      },
      "purchasedBy": null,
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
| `data[].currency` | `object \| null` | In-game currency details `{ uuid, id, name, description, iconUrl }` |
| `data[].purchasedBy` | `object \| null` | Currency used to make the purchase `{ uuid, id, name, description, iconUrl }` |
| `data[].purchasedItem` | `object \| null` | Item bought in this transaction `{ uuid, id, name, description, iconUrl }` |
| `data[].purchasedBundle` | `object \| null` | Bundle bought in this transaction `{ uuid, id, name, description, iconUrl }` |
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
**Effect:** Returns the latest 10 transactions of the authenticated user.

### Example 2: Pagination
**Request:**
```json
{
  "limit": 25,
  "offset": 25
}
```
**Effect:** Returns transactions 26-50.

---

## Notes

- Deprecated in favor of `client/player/me/get-wallet-history` (which adds `currencyIds` filtering, `currencyDetails` with `code`/`type`/`rarity`, and `realWorldCurrency`).
- Unlike the newer endpoint, the currency object here is keyed `currency` (not `currencyDetails`) and does not include `code`, `type`, `rarity`, or `realWorldCurrency`.

---

## Source Files

- **DTO**: `src/users/dto/get-transaction-history.dto.ts`
- **Controller**: `src/users/users.controller.ts:1983-2011`
- **Service**: `src/users/users.service.ts:738-893` (`getTransactionHistory`)
