# V2 API: `client/app/get-leaderboards`

**Endpoint:** `POST /v2/client/app/get-leaderboards`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `leaderboardIds` | `string[]` | Filter leaderboards by specific leaderboard IDs |
| `matchIds` | `string[]` | Filter leaderboards by match IDs (cannot use with leaderboardIds) |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `scheduleStatuses` | `string[]` | Filter by schedule status (default: "in progress") |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `search` | `string` | Search leaderboards by name (case-insensitive) |
| `includeTags` | `string[]` | Filter leaderboards by tag names |

**Important:** You cannot use both `leaderboardIds` and `matchIds` in the same request. Use one or the other.

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Leaderboards",
  "data": {
    "leaderboards": [...],
    "totalCount": 15,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each leaderboard returns these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "leaderboard-123",
  "name": "Weekly Top Scores",
  "description": "Top players of the week",
  "iconUrl": "https://cdn.example.com/leaderboard-icon.png",
  "rankingMethod": {
    "id": "ranking-uuid",
    "name": "high_score"
  },
  "sourceType": {
    "id": "source-uuid",
    "name": "match"
  },
  "match": {
    "uuid": "match-uuid",
    "id": "match-123",
    "name": "1v1 Duel",
    "description": "Quick match",
    "iconUrl": "https://cdn.example.com/match-icon.png",
    "winCondition": {
      "id": "condition-uuid",
      "name": "Higher Score"
    },
    "outcomeType": {
      "id": "outcome-uuid",
      "name": "high_score"
    }
  }
}
```

*Note: `match` is `null` if no match is associated with the leaderboard.*

---

## How Each Attribute Changes Response

### `attributes: ["schedule"]`
Adds schedule details with current instance information:
```json
{
  ...base fields...,
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2025-01-07T23:59:59.000Z",
    "intervalUnit": "weekly",
    "intervalLength": 1,
    "occurrences": 52,
    "isRecurring": true,
    "currentInstanceSchedule": {
      "instanceId": "instance-uuid",
      "status": "in progress",
      "instanceStartDate": "2025-12-01T00:00:00.000Z",
      "instanceEndDate": "2025-12-07T23:59:59.000Z"
    }
  }
}
```

---

### `attributes: ["prizeDistribution"]`
Adds prize distribution rules:
```json
{
  ...base fields...,
  "prizeDistribution": {
    "rules": [
      {"rank": 1, "percentage": 50},
      {"rank": 2, "percentage": 30},
      {"rank": 3, "percentage": 20}
    ],
    "timeOffsetSeconds": 3600
  }
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["weekly", "featured", "competitive"]
}
```

---

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "customField1": "value1",
    "maxEntries": 1000
  }
}
```

---

## Combining Multiple Attributes

### Request
```json
{
  "attributes": ["schedule", "prizeDistribution", "tags"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "leaderboard-123",
  "name": "Weekly Top Scores",
  "description": "Top players of the week",
  "iconUrl": "https://cdn.example.com/leaderboard-icon.png",
  "rankingMethod": {"id": "...", "name": "high_score"},
  "sourceType": {"id": "...", "name": "match"},
  "match": {...},
  "schedule": {
    "firstInstanceStartDate": "2025-01-01T00:00:00.000Z",
    "firstInstanceEndDate": "2025-01-07T23:59:59.000Z",
    "intervalUnit": "weekly",
    "intervalLength": 1,
    "occurrences": 52,
    "isRecurring": true,
    "currentInstanceSchedule": {...}
  },
  "prizeDistribution": {
    "rules": [...],
    "timeOffsetSeconds": 3600
  },
  "tags": ["weekly", "featured"]
}
```

---

## How Filters Affect Response

### `leaderboardIds` Filter
Returns only leaderboards with the specified IDs.

**Request:**
```json
{
  "leaderboardIds": ["leaderboard-123", "leaderboard-456"]
}
```
**Effect:** Response contains only leaderboards where `leaderboardId` matches one of the provided IDs.

---

### `matchIds` Filter
Returns leaderboards associated with the specified matches.

**Request:**
```json
{
  "matchIds": ["match-123", "match-456"]
}
```
**Effect:** Response contains only leaderboards linked to the specified matches.

**Note:** Cannot be used together with `leaderboardIds`. Use one or the other.

---

### `search` Filter
Filters leaderboards by name (case-insensitive partial match).

**Request:**
```json
{
  "search": "weekly"
}
```
**Effect:** Returns leaderboards where name contains "weekly" (e.g., "Weekly Top Scores", "WEEKLY Champion").

---

### `scheduleStatuses` Filter
Filters leaderboards by their current schedule instance status.

**Request:**
```json
{
  "scheduleStatuses": ["in progress"]
}
```
**Effect:** Returns only leaderboards with schedule instances in "in progress" status.

**Default:** "in progress"

---

### `includeTags` Filter
Filters leaderboards that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["featured", "competitive"]
}
```
**Effect:** Returns leaderboards tagged with "featured" OR "competitive".

**Note:** Requires `"tags"` in attributes array for tag filtering to work.

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 10,
  "limit": 5
}
```
**Effect:** Skips first 10 leaderboards, returns next 5. Results are ordered by `updated_at DESC`.

**Defaults:**
- `offset`: 0
- `limit`: 10

---

## Complete Request/Response Examples

### Example 1: Minimal Request
**Request:**
```json
{}
```
**Response:** First 10 leaderboards with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["schedule", "prizeDistribution", "tags", "meta"]
}
```
**Response:** First 10 leaderboards with ALL optional fields included.

---

### Example 3: Filter by Match with Schedule
**Request:**
```json
{
  "matchIds": ["match-123"],
  "attributes": ["schedule", "tags"],
  "scheduleStatuses": ["in progress"]
}
```
**Response:** Leaderboards for match-123 that are currently in progress, with schedule and tags data.

---

## Source Files

- **DTO**: `src/leaderboard/dto/get-client-leaderboard.v2.dto.ts`
- **Controller**: `src/leaderboard/leaderboard.controller.ts`
- **Service**: `src/leaderboard/leaderboard.service.ts:3217-3533`
