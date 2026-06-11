# V2 API: `client/ugc-leaderboards/get-content-summary`

**Endpoint:** `POST /v2/client/ugc-leaderboards/get-content-summary`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ugcLeaderboardId` | `string` | Yes | UGC leaderboard slug (e.g. `riff-scores`) |
| `contentIds` | `string[]` | Yes | 1 to 200 contentIds to summarize in one call |
| `scheduleInstanceId` | `string` | No | Specific schedule instance; defaults to the active instance |

---

## Response Structure

Batched "current champ + entry count" read, one summary per requested contentId (in request order). Designed for feed-card decoration — one round-trip can hydrate up to 200 cards.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Content summary",
  "data": {
    "summaries": [
      {
        "contentId": "rf-1",
        "topUserId": "user-uuid-1",
        "topDisplayName": "PlayerOne",
        "topThumbUrl": "https://cdn.example.com/avatar.png",
        "topScore": 9800,
        "totalEntries": 42
      },
      {
        "contentId": "rf-2",
        "topUserId": null,
        "topScore": null,
        "totalEntries": 0
      }
    ],
    "scheduleInstanceId": "instance-uuid-1"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.summaries` | `array` | One entry per requested contentId, in request order |
| `summaries[].contentId` | `string` | The content ID |
| `summaries[].topUserId` | `string \| null` | User ID of the current top scorer; `null` if no scores yet |
| `summaries[].topDisplayName` | `string` | Top scorer's display name (present when there is a top scorer) |
| `summaries[].topThumbUrl` | `string` | Top scorer's avatar URL (present when there is a top scorer) |
| `summaries[].topScore` | `number \| null` | Top score; `null` if no scores yet |
| `summaries[].totalEntries` | `number` | Total active score entries for this contentId |
| `data.scheduleInstanceId` | `string` | The schedule instance the summary was computed against |

---

## Request Examples

### Example 1: Summarize Feed Cards
**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores",
  "contentIds": ["rf-1", "rf-2", "rf-3"]
}
```
**Effect:** Returns the top scorer and entry count per riff against the active schedule instance.

### Example 2: Specific Instance
**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores",
  "contentIds": ["rf-1"],
  "scheduleInstanceId": "instance-uuid-1"
}
```
**Effect:** Summarizes against the given (e.g. past) schedule instance.

---

## Notes

- Returns `400` with error code `1056` if the UGC leaderboard slug is not found in the project.
- If no `scheduleInstanceId` is given and there is no active instance, all summaries come back with `topUserId: null`, `topScore: null`, `totalEntries: 0` (and no `scheduleInstanceId`).
- Top-scorer ordering follows the leaderboard's outcome type (e.g. `high_score` → highest wins); ties break by earliest `created_at`.

---

## Source Files

- **DTO**: `src/ugc-leaderboard/dtos/get-ugc-content-summary.dto.ts`
- **Controller**: `src/ugc-leaderboard/ugc-leaderboard.controller.ts:225-243`
- **Service**: `src/ugc-leaderboard/ugc-leaderboard.service.ts:542-603` (`getContentSummary`)
