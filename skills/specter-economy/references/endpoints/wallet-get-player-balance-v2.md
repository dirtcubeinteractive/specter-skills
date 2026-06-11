# V2 API: `client/player/get-wallet-balance`

**Endpoint:** `POST /v2/client/player/get-wallet-balance`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to get wallet for |
| `currencyIds` | `string[]` | Yes | Array of currency IDs to retrieve (minimum 1) |
| `type` | `string[]` | No | Filter by wallet types |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Pagination limit (default: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Wallet Balance",
  "data": [
    {
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
      "balance": 5000
    }
  ],
  "errors": []
}
```

---

## Request Examples

### Example 1: Get Another Player's Balance
**Request:**
```json
{
  "userId": "player-123",
  "currencyIds": ["gold-coins", "gems"]
}
```

---

## Source Files

- **DTO**: `src/wallet/dto/get-player-wallet-balance.v2.dto.ts`
- **Controller**: `src/wallet/wallet.controller.ts`
- **Service**: `src/wallet/wallet.service.ts`
