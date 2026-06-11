# V2 API: `client/ugc-leaderboards/get-rankings`

**Endpoint:** `POST /v2/client/ugc-leaderboards/get-rankings`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ugcLeaderboardId` | `string` | Yes | UGC leaderboard slug (e.g., `"riff-scores"`) |
| `contentId` | `string` | Yes | The piece of content to fetch rankings for (e.g., `"rf-abc123"`) |
| `scheduleInstanceId` | `string` | No | Specific cycle (schedule instance) to query. Omit for the in-progress instance |
| `page` | `number` | No | Page number (default: 1, min: 1) |
| `limit` | `number` | No | Page size (default: 50, max: 200) |

---

## Response Structure

**Request:**
```json
{
  "ugcLeaderboardId": "riff-scores",
  "contentId": "rf-abc123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Rankings",
  "errors": [],
  "data": {
    "rankings": [
      {
        "userId": "019b358c-0949-7ff0-8efe-e799ffb27322",
        "displayName": "PlayerOne",
        "username": "player_one",
        "thumbUrl": "https://cdn.example.com/avatar.png",
        "score": 9500,
        "rank": 1
      }
    ],
    "totalEntries": 27,
    "meRank": {
      "userId": "019b358c-0949-7ff0-8efe-e799ffb27322",
      "rank": 1,
      "score": 9500,
      "totalEntries": 27
    },
    "scheduleInstanceId": "019c2d3f-5f6f-7001-a927-12090a3e9e38"
  }
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.rankings` | `array` | Paginated ranking rows, ordered by score (direction depends on the leaderboard's outcome type; ties broken by earliest post) |
| `rankings[].userId` | `string` | Ranked user's ID |
| `rankings[].displayName` | `string` | User display name |
| `rankings[].username` | `string` | Username |
| `rankings[].thumbUrl` | `string` | Avatar thumbnail URL |
| `rankings[].score` | `number` | Stored score for this content |
| `rankings[].rank` | `number` | Rank (SQL `RANK()` — ties share a rank) |
| `data.totalEntries` | `number` | Total entries for this (leaderboard, content, instance) |
| `data.meRank` | `object \| null` | The calling user's rank — always populated even if their row falls outside the paginated window; `null` if the caller has no entry |
| `data.scheduleInstanceId` | `string` | The schedule instance the rankings were read from |

---

## Notes

- Fails with `errorCode 1056` if the UGC leaderboard slug is not found, and `errorCode 1090` if no `scheduleInstanceId` was given and the leaderboard has no in-progress instance.
- Pass a historical `scheduleInstanceId` to read a closed cycle's rankings.

---

## Source Files

- **DTO**: `src/ugc-leaderboard/dtos/get-ugc-rankings.dto.ts`
- **Controller**: `src/ugc-leaderboard/ugc-leaderboard.controller.ts` (`getRankings`)
- **Service**: `src/ugc-leaderboard/ugc-leaderboard.service.ts` (`getRankings`)
