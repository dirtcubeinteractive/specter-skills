# V2 API: `client/competitions/enter`

**Endpoint:** `POST /v2/client/competitions/enter`

**Authentication:** User Auth Guard Required

---

## Description

Enters the authenticated user into a competition. Validates eligibility, deducts entry fees if applicable, and creates a competition entry record.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | Yes | The competition ID to enter |
| `customParams` | `object` | No | Custom parameters for task validation |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Entry created successfully",
  "data": {
    "entryId": "550e8400-e29b-41d4-a716-446655440000",
    "competitionInstanceId": "660e8400-e29b-41d4-a716-446655440001"
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Basic Entry
**Request:**
```json
{
  "competitionId": "tournament-123"
}
```
**Effect:** Enters the user into tournament-123.

---

### Example 2: Entry with Custom Params
**Request:**
```json
{
  "competitionId": "instant-battle-456",
  "customParams": {
    "teamName": "Alpha Squad",
    "preferredRegion": "US-East"
  }
}
```
**Effect:** Enters the user with custom parameters passed to task validation.

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `entryId` | `string (UUID)` | The created competition entry ID (UserCompetitionEntryDetails.id) |
| `competitionInstanceId` | `string (UUID)` | The schedule instance ID (ScheduleInstances.id) |

---

## Error Cases

| Scenario | Error Code | Error Message |
|----------|------------|---------------|
| competitionId not provided | - | Validation error |
| Competition not found | 1069 | Competition not found |
| Competition not active | 1069 | Competition not found or inactive |
| No running instance | 1068 | Competition instance not running |
| User not eligible | 1085 | User not eligible for competition |
| Competition paused | 1085 | Competition is paused |
| Insufficient balance | - | Insufficient balance for entry fee |

---

## Side Effects

- Triggers `enter-competition` task validation
- Deducts entry fee from user wallet if applicable
- Creates competition entry record in UserCompetitionEntryDetails

---

## Source Files

- **DTO**: `src/competitions/enter-competition.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts:372-407`
- **Service**: `src/competitions/competitions.service.ts:3208-3305`
