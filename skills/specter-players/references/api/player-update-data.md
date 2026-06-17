# Client API (v2): `player/update-data`

**Endpoint:** `POST /v2/client/player/update-data`

**Tag:** Player Others

**Summary:** Update another player data V2

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `UpdateOtherPlayerDataV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `user123` | User ID |
| `playerData` | PlayerData[] | ✅ | see below | Array of player data to update |


### Nested object: `PlayerData`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `key` | string | ✅ | e.g. `level` | Key for the player data |
| `value` | object | ✅ | e.g. `{"level":5}` | Value for the player data |
