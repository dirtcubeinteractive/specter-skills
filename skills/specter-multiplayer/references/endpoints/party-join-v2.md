# V2 API: `client/party/join`

**Endpoint:** `POST /v2/client/party/join`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | No | The ID of the party to join |
| `inviteCode` | `string` | No | Invite code for private parties |
| `mmr` | `number` | No | Matchmaking rating of the joining player |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Party joined successfully",
  "data": {
    "partyId": "party-uuid-123"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `partyId` | `string` | The ID of the joined party |

---

## Request Examples

### Example 1: Join by Party ID
**Request:**
```json
{
  "partyId": "party-uuid-123"
}
```

### Example 2: Join by Invite Code
**Request:**
```json
{
  "inviteCode": "ABC123",
  "mmr": 1500
}
```

---

## Notes

- Either `partyId` or `inviteCode` must be provided
- For private parties, invite code is required
- MMR is used for matchmaking purposes

---

## Source Files

- **DTO**: `src/party/dto/join-party.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
