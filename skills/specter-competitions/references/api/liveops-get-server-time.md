# Client API (v2): `liveops/get-server-time`

**Endpoint:** `POST /v2/client/liveops/get-server-time`

**Tag:** Live-ops

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetServerTimeDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `timezone` | string | — | e.g. `America/New_York` | Timezone for server time |

