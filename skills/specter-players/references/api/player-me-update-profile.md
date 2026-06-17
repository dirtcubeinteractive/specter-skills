# Client API (v2): `player/me/update-profile`

**Endpoint:** `POST /v2/client/player/me/update-profile`

**Tag:** My Player

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `UpdateUserDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `firstName` | string | — | e.g. `John` | First name |
| `lastName` | string | — | e.g. `Doe` | Last name |
| `username` | string | — | e.g. `johndoe` | Username |
| `displayName` | string | — | e.g. `John D.` | Display name |
| `thumbUrl` | string | — | e.g. `https://example.com/thumb.jpg` | Thumbnail URL |
| `isKycComplete` | boolean | — | e.g. `true` | KYC completion status |
| `birthdate` | string | — | e.g. `1990-01-01` | Birthdate |
| `tags` | string[] | — | e.g. `["vip","premium"]` | User tags |
| `specterParams` | object | — | e.g. `{"param1":"value1"}` | Specter parameters |
| `customParams` | object | — | e.g. `{"custom1":"value1"}` | Custom parameters |

