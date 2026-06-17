# Client API (v2): `matchmaking/start-match-session`

**Endpoint:** `POST /v2/client/matchmaking/start-match-session`

**Tag:** Matchmaking

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `matchSessionId` | string | — | e.g. `4eb2a1ba-a16f-402c-a081-0669717e619f` | Match Session ID (optional if matchId provided) |
| `matchId` | string | — | e.g. `LM1` | Match ID (optional if matchSessionId provided) |
| `competitionId` | string | — | e.g. `comp_123` | Competition ID (optional) |
| `userInfo` | object[] | ✅ |  |  |
| `meta` | object | — |  | Additional metadata (optional) |

