# Client API (v2): `player/me/get-profile`

**Endpoint:** `POST /v2/client/player/me/get-profile`

**Tag:** My Player

**Summary:** Get current player profile V2

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetMyProfileV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `attributes` | object | — | e.g. `["username","email"]` | Attributes to include in response |

