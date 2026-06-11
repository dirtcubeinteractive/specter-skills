# V2 API: `client/party/create`

**Endpoint:** `POST /v2/client/party/create`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | `string` | Yes | Party type: "cooperative" or "private" |
| `maxSize` | `number` | Yes | Maximum party size (min: 2, max: 10) |
| `mmr` | `number` | No | Matchmaking rating for the party creator |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Party created successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example 1: Create Cooperative Party
**Request:**
```json
{
  "type": "cooperative",
  "maxSize": 4
}
```

### Example 2: Create Private Party with MMR
**Request:**
```json
{
  "type": "private",
  "maxSize": 6,
  "mmr": 1500
}
```

---

## Notes

- Party types:
  - `cooperative`: Open for players to join matchmaking together
  - `private`: Requires invite code to join
- The party creator automatically becomes the party leader
- Party state starts as "idle"

---

## Source Files

- **DTO**: `src/party/dto/create-party.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
