# V2 API: `client/party/update-settings`

**Endpoint:** `POST /v2/client/party/update-settings`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | Yes | The ID of the party |
| `maxSize` | `number` | No | New maximum party size (min: 2, max: 10) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Party settings updated successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Update Max Size
**Request:**
```json
{
  "partyId": "party-uuid-123",
  "maxSize": 6
}
```

---

## Notes

- Only the party leader can update settings
- Cannot reduce max size below current member count
- Cannot update settings while party is in a match

---

## Source Files

- **DTO**: `src/party/dto/update-party-settings.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
