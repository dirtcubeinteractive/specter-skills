# V2 API: `client/leaderboards/post-score`

**Endpoint:** `POST /v2/client/leaderboards/post-score`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `leaderboardIds` | `string[]` | Yes | Leaderboard IDs (client-facing) to post the score to |
| `score` | `number` | Yes | Score value. How it is applied depends on each leaderboard's outcome type (high score, time trial, cumulative, etc.) |

---

## Response Structure

**Request:**
```json
{
  "leaderboardIds": ["custom_podium_cumulative_lb", "custom_high_score"],
  "score": 1
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Score posted to leaderboard successfully",
  "errors": [],
  "data": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Always an empty array — the endpoint acknowledges the post; use `client/leaderboards/get-rankings` to read updated rankings |

---

## Notes

- The score is posted to all leaderboards in `leaderboardIds` in one call.
- The bearer token identifies the scoring user; the API key resolves the project.
- A v1 of this route exists with identical request/response; the v2 differs only in response message wording.

---

## Source Files

- **DTO**: `src/leaderboard/dto/send-score-to-leaderboard.dto.ts`
- **Controller**: `src/leaderboard/leaderboard.controller.ts` (`sendScoreToLeaderboardV2`)
- **Service**: `src/leaderboard/leaderboard.service.ts` (`sendScoreToLeaderboard`)
- **Swagger**: `src/leaderboard/leaderboard.swagger.ts` (`PostScoreToLeaderboardV2Body`)
