# Client API (v2): `competitions/get-current-prize-pool`

**Endpoint:** `POST /v2/client/competitions/get-current-prize-pool`

**Tag:** Competition

**Summary:** Get current prize pool

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `competitionId` | string | ✅ | e.g. `ReshaEnterCompTesting` | Competition ID |
| `instanceId` | string | ✅ | e.g. `420ead9c-247f-41e9-b72d-c367b40cef60` | Competition instance ID |

