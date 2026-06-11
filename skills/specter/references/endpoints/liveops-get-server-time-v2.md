# V2 API: `client/liveops/get-server-time`

**Endpoint:** `POST /v2/client/liveops/get-server-time`

**Authentication:** User Auth Guard Required

---

## Description

Returns the current server time. Useful for synchronizing client time with server time for time-sensitive features.

---

## Request DTO Fields

No request body required. Send an empty object `{}`.

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Server time fetched successfully",
  "data": {
    "serverTime": "2025-12-01T15:30:45.123Z",
    "timezone": "UTC",
    "timestamp": 1733067045123
  },
  "errors": []
}
```

---

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `serverTime` | `string` | ISO 8601 formatted server time |
| `timezone` | `string` | Server timezone (always UTC) |
| `timestamp` | `number` | Unix timestamp in milliseconds |

---

## Request Example

**Request:**
```json
{}
```
**Effect:** Returns the current server time.

---

## Use Cases

- Synchronizing local device time with server time
- Calculating time remaining for events/competitions
- Validating time-sensitive actions

---

## Source Files

- **Controller**: `src/users/users.controller.ts:674-700`
- **Service**: Time utility
