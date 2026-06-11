# V2 API: `client/party/invite`

**Endpoint:** `POST /v2/client/party/invite`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | Yes | The ID of the party |
| `inviteeId` | `string` | Yes | The user ID of the player to invite |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 201,
  "message": "Party invite sent successfully",
  "data": [],
  "errors": []
}
```

---

## Request Examples

### Example: Invite a Player
**Request:**
```json
{
  "partyId": "party-uuid-123",
  "inviteeId": "player-456"
}
```

---

## Notes

- Only the party leader or members with permission can send invites
- Invites have an expiration time
- The invited player must accept the invite to join

---

## Source Files

- **DTO**: `src/party/dto/invite-to-party.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
