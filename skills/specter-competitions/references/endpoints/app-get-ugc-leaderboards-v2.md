# V2 API: `client/app/get-ugc-leaderboards`

**Endpoint:** `POST /v2/client/app/get-ugc-leaderboards`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`) — no user token required; this path is whitelisted in `api_validation_middleware`

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | `number` | No | Number of UGC leaderboards to return (default: 50, min: 1) |
| `offset` | `number` | No | Pagination offset (default: 0, min: 0) |

The `projectId` is resolved from the API key — the caller does not pass it.

---

## Response Structure

**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "UGC leaderboards",
  "errors": [],
  "data": {
    "ugcLeaderboards": [
      {
        "id": "019c2d3f-5f6f-7001-a927-12090a3e9e38",
        "ugcLeaderboardId": "riff-scores",
        "name": "Riff Scores",
        "description": null,
        "iconUrl": null,
        "leaderboardOutcomeDetails": null,
        "startDate": null,
        "endDate": null,
        "isRecurring": false,
        "prizeDistributionRule": null,
        "dynamicPrizeDistributionRule": null,
        "prizeDistributionOffset": 0,
        "meta": null,
        "tags": null,
        "active": true,
        "archive": false,
        "projectId": "019ac982-8a5c-7838-a448-ddbca93bd24d",
        "leaderboardOutcomeTypeMasterId": 1,
        "intervalId": null,
        "sourceTypeId": 3,
        "customStatisticId": null,
        "defaultStatisticId": null,
        "leaderboardOutcomeMaster": {
          "id": 1,
          "name": "high_score"
        },
        "leaderboardSourceTypeMaster": {
          "id": 3,
          "name": "custom"
        },
        "createdAt": "2026-01-15T10:30:00.000Z",
        "updatedAt": "2026-01-15T10:30:00.000Z"
      }
    ],
    "totalCount": 1
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.ugcLeaderboards` | `array` | UGC leaderboard config rows (newest first) |
| `ugcLeaderboards[].id` | `string` | Unique identifier (internal UUID) |
| `ugcLeaderboards[].ugcLeaderboardId` | `string` | Slug — the handle clients reference in `post-score` / `get-rankings` |
| `ugcLeaderboards[].name` | `string` | Display name |
| `ugcLeaderboards[].description` | `string \| null` | Description |
| `ugcLeaderboards[].iconUrl` | `string \| null` | Icon URL |
| `ugcLeaderboards[].leaderboardOutcomeMaster` | `object` | Outcome type (e.g., `high_score`, `time_trial`, `cumulative_score`) |
| `ugcLeaderboards[].leaderboardSourceTypeMaster` | `object` | Score source type (`custom` or `statistics`) |
| `ugcLeaderboards[].prizeDistributionRule` | `object \| null` | Prize distribution configuration |
| `ugcLeaderboards[].active` / `archive` | `boolean` | Lifecycle flags |
| `data.totalCount` | `number` | Total number of UGC leaderboards in the project |

---

## Notes

- Mirrors `POST /v2/client/app/get-leaderboards` in security posture: apiKey-scoped, no user token.
- Unlike legacy leaderboards, a single UGC leaderboard config partitions scores across unbounded `contentId` values — projects typically only need a handful.
- Used by clients to discover available UGC leaderboards at boot, then call `client/ugc-leaderboards/post-score` / `get-rankings` against the slugs.

---

## Source Files

- **DTO**: `src/ugc-leaderboard/dtos/list-public-ugc-leaderboards.dto.ts`
- **Controller**: `src/ugc-leaderboard/ugc-leaderboard.controller.ts` (`getPublicUgcLeaderboards`)
- **Service**: `src/ugc-leaderboard/ugc-leaderboard.service.ts` (`getUgcLeaderboards`)
- **Model**: `src/ugc-leaderboard/models/ugc-leaderboard.model.ts`
