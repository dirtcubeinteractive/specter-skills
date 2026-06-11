# V2 API: `client/party/transfer-leader`

**Endpoint:** `POST /v2/client/party/transfer-leader`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | Yes | The ID of the party |
| `newLeaderId` | `string` | Yes | The user ID of the new party leader |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Party leadership transferred successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Transfer Leadership
**Request:**
```json
{
  "partyId": "party-uuid-123",
  "newLeaderId": "player-456"
}
```

---

## Notes

- Only the current party leader can transfer leadership
- The new leader must be a member of the party
- Leadership transfer is immediate

---

## Source Files

- **DTO**: `src/party/dto/transfer-leader.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
