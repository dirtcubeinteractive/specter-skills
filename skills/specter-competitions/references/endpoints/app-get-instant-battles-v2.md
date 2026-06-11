# V2 API: `client/app/get-instant-battles`

**Endpoint:** `POST /v2/client/app/get-instant-battles`

**Authentication:** API Key Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `competitionIds` | `string[]` | No | Filter by specific competition IDs |
| `matchIds` | `string[]` | No | Filter by specific match IDs |
| `attributes` | `string[]` | No | Specific attributes to include in response |
| `offset` | `number` | No | Pagination offset |
| `limit` | `number` | No | Pagination limit |
| `includeTags` | `string[]` | No | Filter instant battles by tags |
| `search` | `string` | No | Search keyword |
| `scheduleStatuses` | `string[]` | No | Filter by schedule statuses |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "InstantBattle list",
  "data": {
    "instantbattles": [
      {
        "id": "ib-uuid",
        "competitionId": "quick-match",
        "name": "Quick Match",
        "description": "Fast 1v1 battles",
        "iconUrl": "https://cdn.example.com/ib.png",
        "schedule": {
          "status": "live",
          "startTime": "2024-01-15T10:00:00.000Z",
          "endTime": "2024-01-15T22:00:00.000Z"
        },
        "entryFee": {
          "amount": 50,
          "currencyId": "gold-coins"
        }
      }
    ],
    "totalCount": 8,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `instantbattles` | `array` | Array of instant battle objects |
| `totalCount` | `number` | Total number of instant battles |
| `lastUpdate` | `string` | Timestamp of last update |

---

## Request Examples

### Example 1: Get All Instant Battles
**Request:**
```json
{}
```

### Example 2: Filter by Competition IDs
**Request:**
```json
{
  "competitionIds": ["quick-match", "ranked-1v1"],
  "scheduleStatuses": ["live"]
}
```

---

## Source Files

- **DTO**: `src/competitions/dtos/get-client-instant-battles.v2.dto.ts`
- **Controller**: `src/competitions/competitions.controller.ts`
- **Service**: `src/competitions/competitions.service.ts`
