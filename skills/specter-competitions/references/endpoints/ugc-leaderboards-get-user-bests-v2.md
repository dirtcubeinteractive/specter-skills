# V2 API: `client/ugc-leaderboards/get-user-bests`

**Endpoint:** `POST /v2/client/ugc-leaderboards/get-user-bests`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ugcLeaderboardId` | `string` | Yes | UGC leaderboard slug (e.g. `riff-scores`) |
| `userId` | `string` | No | Target user; defaults to the bearer's userId (admin tools can pass another user) |
| `contentIds` | `string[]` | No | Optional filter (max 200); defaults to all contentIds the user has scored on |
| `scheduleInstanceId` | `string` | No | Specific schedule instance; defaults to the active instance |

---

## Response Structure

The user's best score, rank, and entry count per contentId — used to render a player's high-score grid (profile pages, saved-content lists, etc.).

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "User bests",
  "data": {
    "bests": [
      {
        "contentId": "rf-1",
        "score": 9800,
        "rank": 1,
        "totalEntries": 42
      },
      {
        "contentId": "rf-7",
        "score": 4200,
        "rank": 5,
        "totalEntries": 30
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
| `data.bests` | `array` | One entry per contentId the user has scored on, ordered by score (per the leaderboard's outcome direction) |
| `bests[].contentId` | `string` | The content ID |
| `bests[].score` | `number` | The user's score on this contentId |
| `bests[].rank` | `number` | The user's rank on this contentId (1 = best) |
| `bests[].totalEntries` | `number` | Total active score entries for this contentId |
| `data.scheduleInstanceId` | `string` | The schedule instance the bests were computed against |

---

## Request Examples

### Example 1: My Bests
**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores"
}
```
**Effect:** Returns the caller's best score per contentId they have scored on, in the active instance.

### Example 2: Specific User and Content Set
**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores",
  "userId": "user-uuid-2",
  "contentIds": ["rf-1", "rf-2"]
}
```
**Effect:** Returns that user's bests restricted to the given contentIds.

---

## Notes

- Returns `400` with error code `1056` if the UGC leaderboard slug is not found in the project.
- If no `scheduleInstanceId` is given and there is no active instance, returns `{ "bests": [] }` (without `scheduleInstanceId`).
- Rank direction follows the leaderboard's outcome type (e.g. `high_score` → higher is better).

---

## Source Files

- **DTO**: `src/ugc-leaderboard/dtos/get-ugc-user-bests.dto.ts`
- **Controller**: `src/ugc-leaderboard/ugc-leaderboard.controller.ts:245-261`
- **Service**: `src/ugc-leaderboard/ugc-leaderboard.service.ts:605-667` (`getUserBests`)
