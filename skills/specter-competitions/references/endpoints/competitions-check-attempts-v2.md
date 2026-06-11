# V2 API: `client/competitions/check-attempts`

**Endpoint:** `POST /v2/client/competitions/check-attempts`

**Authentication:** User Auth Guard Required

---

## Description

Checks the remaining attempts for a competition entry. Returns the number of attempts left for the authenticated user based on the competition's maximum attempt limit.

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `entryId` | `string` | Yes | The competition entry ID to check attempts for |

---

## Response Structure

### Success Response (Unlimited Attempts)
When the competition has no attempt limit (`maxAttemptAllowed` is null):
```json
{
  "status": "success",
  "code": 200,
  "message": "Attempts fetched successfully",
  "data": {
    "numberOfAttemptsLeft": null
  },
  "errors": []
}
```

### Success Response (Limited Attempts)
When the competition has an attempt limit:
```json
{
  "status": "success",
  "code": 200,
  "message": "Attempts fetched successfully",
  "data": {
    "numberOfAttemptsLeft": 3
  },
  "errors": []
}
```

### Success Response (No Attempts Left)
When all attempts have been used:
```json
{
  "status": "success",
  "code": 200,
  "message": "Attempts fetched successfully",
  "data": {
    "numberOfAttemptsLeft": 0
  },
  "errors": []
}
```

---

## Request Example

**Request:**
```json
{
  "entryId": "entry-uuid-123"
}
```
**Effect:** Returns the number of remaining attempts for the specified entry.

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `numberOfAttemptsLeft` | `number \| null` | Remaining attempts. `null` means unlimited attempts allowed. |

---

## Calculation Logic

The number of attempts left is calculated differently based on competition type:

- **For Tournaments** (sourceTypeId !== 3): Counts MatchSessions where user's match state is "has started" or "has ended"
- **For Instant Battles** (sourceTypeId === 3): Counts CustomScores entries for this entry

**Formula:** `maxAttemptAllowed - attemptCount`

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| entryId not provided | Validation error |
| Entry not found | Entry not found |

---

## Source Files

- **DTO**: `src/competitions/dtos/check-attempt.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts:533-555`
- **Service**: `src/competitions/competitions.service.ts:3642-3719`
