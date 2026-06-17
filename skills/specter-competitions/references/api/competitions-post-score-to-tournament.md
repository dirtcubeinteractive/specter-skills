# Client API (v2): `competitions/post-score-to-tournament`

**Endpoint:** `POST /v2/client/competitions/post-score-to-tournament`

**Tag:** Competition

**Summary:** Post score to tournament

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `competitionId` | string | ✅ | e.g. `instant battel` | Competition ID |
| `entryId` | string | ✅ | e.g. `2f57d41a-e749-4886-a5e9-94abe060b28c` | Entry ID |
| `score` | number | ✅ | e.g. `900` | Score to post |

