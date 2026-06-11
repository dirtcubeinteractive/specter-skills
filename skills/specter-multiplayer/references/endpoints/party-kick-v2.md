# V2 API: `client/party/kick`

**Endpoint:** `POST /v2/client/party/kick`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | Yes | The ID of the party |
| `userId` | `string` | Yes | The user ID of the player to kick |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player kicked from party successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Kick a Player
**Request:**
```json
{
  "partyId": "party-uuid-123",
  "userId": "player-456"
}
```

---

## Notes

- Only the party leader can kick members
- Cannot kick yourself (use leave instead)
- Cannot kick while party is in a match

---

## Source Files

- **DTO**: `src/party/dto/kick-from-party.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
