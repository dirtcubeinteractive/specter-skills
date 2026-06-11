# V2 API: `client/party/decline-invite`

**Endpoint:** `POST /v2/client/party/decline-invite`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `inviteId` | `string` | Yes | The ID of the party invite |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Invite declined successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Decline Party Invite
**Request:**
```json
{
  "inviteId": "invite-uuid-123"
}
```

---

## Notes

- The invite must be pending to be declined
- The invite status changes to "declined"
- The party is not notified of the decline

---

## Source Files

- **DTO**: `src/party/dto/accept-invite.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
