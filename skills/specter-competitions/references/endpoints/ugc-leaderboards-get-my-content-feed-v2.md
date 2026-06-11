# V2 API: `client/ugc-leaderboards/get-my-content-feed`

**Endpoint:** `POST /v2/client/ugc-leaderboards/get-my-content-feed`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ugcLeaderboardId` | `string` | Yes | UGC leaderboard slug (e.g. `riff-scores`) |
| `scheduleInstanceId` | `string` | No | Specific schedule instance; defaults to the active instance |
| `page` | `number` | No | Page number, 1-based (default: 1, min: 1) |
| `limit` | `number` | No | Entries per page (default: 25, max: 100) |

---

## Response Structure

Paginated list of every contentId the calling user has scored on (within the active or specified instance), sorted by the user's rank ascending — "you're #1 here" content rises to the top.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My content feed",
  "data": {
    "entries": [
      {
        "contentId": "rf-1",
        "myScore": 9800,
        "myRank": 1,
        "totalEntries": 42
      },
      {
        "contentId": "rf-7",
        "myScore": 4200,
        "myRank": 5,
        "totalEntries": 30
      }
    ],
    "totalContent": 12,
    "scheduleInstanceId": "instance-uuid-1"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.entries` | `array` | Page of contentIds the caller has scored on, sorted by `myRank` ascending |
| `entries[].contentId` | `string` | The content ID |
| `entries[].myScore` | `number` | The caller's score on this contentId |
| `entries[].myRank` | `number` | The caller's rank on this contentId (1 = best) |
| `entries[].totalEntries` | `number` | Total active score entries for this contentId |
| `data.totalContent` | `number` | Total number of contentIds the caller has scored on (for pagination) |
| `data.scheduleInstanceId` | `string` | The schedule instance the feed was computed against |

---

## Request Examples

### Example 1: First Page
**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores"
}
```
**Effect:** Returns the first 25 contentIds the caller has scored on, best ranks first.

### Example 2: Pagination
**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores",
  "page": 2,
  "limit": 50
}
```
**Effect:** Returns entries 51-100.

---

## Notes

- Returns `400` with error code `1056` if the UGC leaderboard slug is not found in the project.
- If no `scheduleInstanceId` is given and there is no active instance, returns `{ "entries": [], "totalContent": 0 }` (without `scheduleInstanceId`).
- Rank direction follows the leaderboard's outcome type (e.g. `high_score` → higher is better).

---

## Source Files

- **DTO**: `src/ugc-leaderboard/dtos/get-ugc-my-content-feed.dto.ts`
- **Controller**: `src/ugc-leaderboard/ugc-leaderboard.controller.ts:263-282`
- **Service**: `src/ugc-leaderboard/ugc-leaderboard.service.ts:669-733` (`getMyContentFeed`)
