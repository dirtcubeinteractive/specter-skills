# V2 API: `client/party/accept-invite`

**Endpoint:** `POST /v2/client/party/accept-invite`

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
  "message": "Invite accepted successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Accept Party Invite
**Request:**
```json
{
  "inviteId": "invite-uuid-123"
}
```

---

## Notes

- The invite must be pending and not expired
- The user will be added to the party upon accepting
- The invite status changes to "accepted"

---

## Source Files

- **DTO**: `src/party/dto/accept-invite.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
