# Client API (v2): `app/get-games`

**Endpoint:** `POST /v2/client/app/get-games`

**Tag:** App

**Summary:** Get games (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetClientGamesV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `gameIds` | string[] | — | e.g. `["game-123","game-456"]` | Filter games by specific game IDs |
| `attributes` | string[] | — | e.g. `["tags","platforms","matches"]` | Select which optional attributes to include in response. Available: screenshotUrls, videoUrls, isScreenOrientationLandscape, howTo, meta, tags, platforms, locations, genre, matches |
| `isGameScreenOrientationLandscape` | boolean | — | e.g. `true` | Filter by screen orientation (true = landscape, false = portrait) |
| `isDefault` | boolean | — | e.g. `false` | Filter by default game flag |
| `offset` | number | — | e.g. `0` | Pagination offset (default: 0) |
| `limit` | number | — | e.g. `10` | Pagination limit (default: 10) |
| `search` | string | — | e.g. `racing` | Search games by name (case-insensitive partial match) |
| `includeTags` | string[] | — | e.g. `["multiplayer","pvp"]` | Filter games by tag names (matches games with any of the specified tags) |

