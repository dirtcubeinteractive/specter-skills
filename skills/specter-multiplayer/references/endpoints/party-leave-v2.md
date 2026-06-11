# V2 API: `client/party/leave`

**Endpoint:** `POST /v2/client/party/leave`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | Yes | The ID of the party to leave |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Left party successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Leave a Party
**Request:**
```json
{
  "partyId": "party-uuid-123"
}
```

---

## Notes

- If the leader leaves, leadership is transferred to another member
- If the last member leaves, the party is disbanded
- Cannot leave while party is in a match

---

## Source Files

- **DTO**: `src/party/dto/party-action.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
