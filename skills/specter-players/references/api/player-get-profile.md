# Client API (v2): `player/get-profile`

**Endpoint:** `POST /v2/client/player/get-profile`

**Tag:** Player Others

**Summary:** Get another player profile V2

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetUserProfileV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `user123` | User ID |
| `username` | string | — | e.g. `johndoe` | Username |
| `email` | string | — | e.g. `john@example.com` | Email address |
| `attributes` | object | — | e.g. `["username","email"]` | Attributes to include |

