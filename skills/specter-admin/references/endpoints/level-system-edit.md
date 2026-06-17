# Admin API: `level-system/edit`

**Endpoint:** `POST /v1/level-system/edit`

**Tag:** Progression System

**Summary:** Edit level system

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditLevelSystemDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `levelSystemId` | string | — | e.g. `level-sys-ext-123` | External level system ID |
| `iconUrl` | object | — | e.g. `https://example.com/icon.png` | Icon URL |
| `id` | string | ✅ | e.g. `level-uuid-12345` | Level system ID to edit |
| `name` | string | — | e.g. `Player Rank System` | Level system name |
| `description` | string | — | e.g. `Track player progression through ranks` | Level system description |
| `progressionMarkerId` | number | — | e.g. `1` | Progression marker ID to track |
| `appEventId` | string | — | e.g. `event-uuid-12345` | App event ID to track |
| `levelSystemTypeId` | number | — | `1` \| `2` | Level system type (1 = XP-based, 2 = Event-based) |
| `levelDetails` | LevelDetails[] | — | see below | Array of level details |
| `rewardGrantScheduleType` | string | — | `on-completion` \| `custom` | Reward grant schedule type |
| `rewardGrantTime` | string | — | e.g. `10:00` | Reward grant time for custom schedule |
| `rewardGrantDay` | string | — | e.g. `Monday` | Reward grant day for custom schedule |
| `tags` | string[] | — | e.g. `["gameplay","progression"]` | Tags associated with level system |
| `meta` | object | — |  | Additional metadata |


### Nested object: `LevelDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `no` | number | ✅ | e.g. `1` | Level number |
| `name` | string | ✅ | e.g. `Beginner` | Level name |
| `incrementalParameterValue` | number | ✅ | e.g. `100` | Incremental parameter value needed for this level |
| `cumulativeParameterValue` | number | ✅ | e.g. `100` | Cumulative parameter value needed for this level |
| `rewardDetails` | any | ✅ |  | Rewards for reaching this level |
| `archive` | boolean | — | e.g. `false` | Is level archived |
