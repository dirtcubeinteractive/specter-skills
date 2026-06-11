# V2 API: `client/ugc-leaderboards/post-score`

**Endpoint:** `POST /v2/client/ugc-leaderboards/post-score`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ugcLeaderboardId` | `string` | Yes | UGC leaderboard slug (e.g., `"riff-scores"`) |
| `contentId` | `string` | Yes | Discriminator for which piece of content this score belongs to (opaque to Specter — not validated against any catalogue) |
| `score` | `number` | Yes | Score value. Aggregation is determined by the leaderboard's outcome type |
| `specterParams` | `object` | No | Specter-reserved metadata, forwarded to task validation |
| `customParams` | `object` | No | Client-defined metadata, forwarded to task validation |

---

## Response Structure

**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores",
  "contentId": "rf-abc123",
  "score": 9500
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Score posted",
  "errors": [],
  "data": {
    "isUpdated": true,
    "previousBest": 8200,
    "newScore": 9500,
    "rank": 4,
    "totalEntries": 27,
    "leaderboardInstanceId": "019c2d3f-5f6f-7001-a927-12090a3e9e38"
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.isUpdated` | `boolean` | Whether the user's stored score changed: new entry, beat their previous best (`high_score`), went lower (`time_trial`), or always `true` for `cumulative_score` |
| `data.previousBest` | `number \| null` | The user's previous stored score for this (leaderboard, content, instance); `null` if this is their first post |
| `data.newScore` | `number` | The score now stored (best-of for high score / time trial; running total for cumulative) |
| `data.rank` | `number \| null` | The user's live rank for this content after the post |
| `data.totalEntries` | `number` | Total number of entries for this content in the current instance |
| `data.leaderboardInstanceId` | `string` | The schedule instance the score was recorded against |

---

## Notes

- The bearer's user ID is the scorer. The score is upserted per (UGC leaderboard, schedule instance, contentId, userId).
- Fails with `errorCode 1056` if the UGC leaderboard slug is not found in the project, and `errorCode 1090` if the leaderboard's schedule is not currently in progress.
- Fires task validation events: `ugc_leaderboard_score_posted` on every call, and `ugc_leaderboard_rank_achieved` only when the post changed the user's best.
- `specterParams` / `customParams` flow through to task validation business logic.

---

## Source Files

- **DTO**: `src/ugc-leaderboard/dtos/post-ugc-score.dto.ts`
- **Controller**: `src/ugc-leaderboard/ugc-leaderboard.controller.ts` (`postScore`)
- **Service**: `src/ugc-leaderboard/ugc-leaderboard.service.ts` (`postScore`)
