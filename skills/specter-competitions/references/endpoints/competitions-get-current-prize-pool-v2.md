# V2 API: `client/competitions/get-current-prize-pool`

**Endpoint:** `POST /v2/client/competitions/get-current-prize-pool`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionId` | `string` | **Yes** | The competition ID (client-facing) |
| `instanceId` | `string` | **Yes** | The competition instance/slot ID |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Total Prize Pool",
  "data": {
    "totalPool": 50000,
    "numberOfEntries": 250
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.totalPool` | `number` | Current total prize pool amount |
| `data.numberOfEntries` | `number` | Total number of entries in the competition instance |

---

## Request/Response Examples

### Example 1: Get Prize Pool for Active Tournament
**Request:**
```json
{
  "competitionId": "weekly-tournament",
  "instanceId": "instance-uuid-456"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Total Prize Pool",
  "data": {
    "totalPool": 50000,
    "numberOfEntries": 250
  },
  "errors": []
}
```

### Example 2: New Competition with Few Entries
**Request:**
```json
{
  "competitionId": "daily-challenge",
  "instanceId": "instance-uuid-789"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Total Prize Pool",
  "data": {
    "totalPool": 500,
    "numberOfEntries": 5
  },
  "errors": []
}
```

---

## Notes

- Returns the current prize pool based on entry fees collected
- Prize pool increases as more players enter the competition
- `totalPool` is calculated from entry fees multiplied by hosting fee configuration
- Useful for displaying dynamic prize pools to users in real-time

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Competition not found | The specified competitionId does not exist |
| Instance not found | The specified instanceId does not exist |

---

## Source Files

- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
