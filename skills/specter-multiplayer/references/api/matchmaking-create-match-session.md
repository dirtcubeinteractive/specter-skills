# Client API (v2): `matchmaking/create-match-session`

**Endpoint:** `POST /v2/client/matchmaking/create-match-session`

**Tag:** Matchmaking

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `matchId` | string | ✅ | e.g. `LM1` | Match ID |
| `userInfo` | object[] | ✅ |  |  |
| `competitionId` | string | — | e.g. `comp_123` | Competition ID (optional) |

