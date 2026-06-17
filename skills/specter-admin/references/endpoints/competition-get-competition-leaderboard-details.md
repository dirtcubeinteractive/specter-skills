# Admin API: `competition/get-competition-leaderboard-details`

**Endpoint:** `POST /v1/competition/get-competition-leaderboard-details`

**Tag:** Competition

**Summary:** Get leaderboard details

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetCompetitionDetailsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `competitionId` | string | ✅ | e.g. `comp-weekly-battle-001` | Competition ID |
| `matchId` | string | — | e.g. `match-12345` | Match ID to filter by |
| `instanceId` | string | ✅ | e.g. `instance-67890` | Instance ID of the competition |
| `gameId` | string | — | e.g. `game-puzzle-001` | Game ID to filter by |
| `pagination` | any | ✅ |  | Pagination options |

