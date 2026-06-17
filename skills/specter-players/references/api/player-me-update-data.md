# Client API (v2): `player/me/update-data`

**Endpoint:** `POST /v2/client/player/me/update-data`

**Tag:** My Player

**Summary:** Update current player data V2

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `UpdatePlayerDataDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `playerData` | PlayerData[] | ✅ | see below | Array of player data to update |
| `permission` | string | — | e.g. `public` | Permission level |


### Nested object: `PlayerData`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `key` | string | ✅ | e.g. `level` | Key for the player data |
| `value` | object | ✅ | e.g. `{"level":5}` | Value for the player data |
