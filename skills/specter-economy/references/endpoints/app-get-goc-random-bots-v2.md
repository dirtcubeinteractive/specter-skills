# V2 API: `client/app/get-goc-random-bots`

**Endpoint:** `POST /v2/client/app/get-goc-random-bots`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

> Hidden from Swagger (`@ApiExcludeEndpoint`). Internal GOC (Game of Chance) helper endpoint.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `winCodes` | `string[]` | Yes | Array of win-code tag names; one random bot item is returned per win code |

---

## Response Structure

`data` is an **array** of bot item records — one randomly selected item per requested win code, in the same order as the `winCodes` array. Bots are inventory items tagged with both the `botPlayers` tag and the win-code tag.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Random bots retrieved successfully",
  "data": [
    {
      "id": "item-uuid-123",
      "name": "Bot Alpha",
      "description": "A bot player profile",
      "meta": {},
      "itemId": "bot-alpha-01",
      "win_code": "WIN001"
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data[].id` | `string` | Item unique identifier (internal ID) |
| `data[].name` | `string` | Bot item name |
| `data[].description` | `string` | Bot item description |
| `data[].meta` | `object` | Custom metadata stored on the item |
| `data[].itemId` | `string` | Item ID (client-facing) |
| `data[].win_code` | `string` | The win-code tag this bot was selected for |

---

## Request Examples

### Example 1: Single Win Code
**Request:**
```json
{
  "winCodes": ["WIN001"]
}
```
**Effect:** Returns one random bot item tagged with `botPlayers` and `WIN001`.

### Example 2: Multiple Win Codes
**Request:**
```json
{
  "winCodes": ["WIN001", "WIN002"]
}
```
**Effect:** Returns one random bot per win code, ordered `WIN001` then `WIN002`.

---

## Notes

- Returns `[]` (empty array) if `winCodes` is empty or no matching tagged items exist.
- Selection is random per win code (`ROW_NUMBER() OVER (PARTITION BY win_code ORDER BY RANDOM())`), so repeated calls can return different bots.
- Only active, non-archived items in the API key's project are considered.

---

## Source Files

- **DTO**: `src/inventory/dtos/get-goc-random-bots.dto.ts`
- **Controller**: `src/inventory/inventory.controller.ts:1604-1625`
- **Service**: `src/inventory/inventory.service.ts:17528-17584` (`getGocRandomBots`)
