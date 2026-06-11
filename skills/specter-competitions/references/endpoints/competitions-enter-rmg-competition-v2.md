# V2 API: `client/competitions/enter-rmg-competition`

**Endpoint:** `POST /v2/client/competitions/enter-rmg-competition`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | **Yes** | The RMG competition ID to enter (client-facing) |
| `customParams` | `object` | No | Custom parameters for events |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Entry created successfully",
  "data": {
    "entryId": "entry-uuid-123",
    "competitionInstanceId": "instance-uuid-456"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.entryId` | `string` | Unique ID for the user's competition entry |
| `data.competitionInstanceId` | `string` | The specific competition instance/slot ID the user entered |

---

## Request/Response Examples

### Example 1: Enter RMG Competition
**Request:**
```json
{
  "competitionId": "rmg-tournament-123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Entry created successfully",
  "data": {
    "entryId": "entry-uuid-abc123",
    "competitionInstanceId": "instance-uuid-xyz789"
  },
  "errors": []
}
```

### Example 2: Enter with Custom Parameters
**Request:**
```json
{
  "competitionId": "daily-rmg-challenge",
  "customParams": {
    "source": "mobile_app",
    "campaign": "summer_promo"
  }
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Entry created successfully",
  "data": {
    "entryId": "entry-uuid-def456",
    "competitionInstanceId": "instance-uuid-uvw321"
  },
  "errors": []
}
```

---

## Notes

- RMG (Real Money Gaming) competitions have additional validation requirements
- Entry fees are automatically processed through the RMG wallet transaction system
- User must have sufficient balance in their wallet to cover entry fees
- The `competitionInstanceId` returned is the currently active instance/slot of the competition
- User eligibility is checked based on:
  - Maximum players allowed (`maxPlayers`)
  - Maximum entries per user (`maxEntryAllowed`)
  - Access and eligibility conditions (items, bundles, progression level requirements)
- Entry fees support bonus cash allowance configuration

---

## Error Scenarios

| Error | Description | Error Code |
|-------|-------------|------------|
| Competition not found | The specified competitionId does not exist | 1069 |
| Competition instance not running | No active instance is currently running | 1068 |
| Competition paused | The competition is currently paused | 1085 |
| Max players reached | Competition has reached maximum player limit | 1070 |
| Max entries reached | User has reached maximum entry limit | 1071 |
| User not eligible | User doesn't meet access/eligibility requirements | varies |
| Insufficient balance | User doesn't have enough wallet balance | - |

---

## Source Files

- **DTO**: `src/competitions/enter-competition.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
