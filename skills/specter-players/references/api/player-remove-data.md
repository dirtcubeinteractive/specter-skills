# Client API (v2): `player/remove-data`

**Endpoint:** `POST /v2/client/player/remove-data`

**Tag:** Player Others

**Summary:** Remove player data keys V2

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `RemoveOtherPlayerDataV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `user123` | User ID |
| `keysToRemove` | string[] | ✅ | e.g. `["level","score"]` | Array of keys to remove from player data |

