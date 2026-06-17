# Client API (v2): `matchmaking/end-match-session`

**Endpoint:** `POST /v2/client/matchmaking/end-match-session`

**Tag:** Matchmaking

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `matchSessionId` | string | ✅ | e.g. `4eb2a1ba-a16f-402c-a081-0669717e619f` | Match Session ID |
| `userInfo` | object[] | ✅ |  |  |
| `meta` | object | — |  | Additional metadata (optional) |

