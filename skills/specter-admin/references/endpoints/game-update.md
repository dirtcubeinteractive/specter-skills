# Admin API: `game/update`

**Endpoint:** `POST /v1/game/update`

**Tag:** Games

**Summary:** Update game

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateGameDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `game-uuid-12345` | Game UUID to update |
| `gameId` | string | — | e.g. `game-puzzle-001` | Unique game identifier |
| `name` | string | — | e.g. `Puzzle Master` | Game display name |
| `description` | string | — | e.g. `A challenging puzzle game for all ages` | Game description |
| `howTo` | string | — | e.g. `Match 3 or more tiles to score points` | How to play instructions |
| `logo` | string | — | e.g. `https://cdn.example.com/games/puzzle-logo.png` | URL to game logo |
| `downloadUrl` | string[] | — | e.g. `["https://play.google.com/store/apps/details?…` | Array of download URLs |
| `screenShotUrl` | string[] | — | e.g. `["https://cdn.example.com/screenshots/1.png"]` | Array of screenshot URLs |
| `previewVideoUrl` | string[] | — | e.g. `["https://cdn.example.com/videos/preview.mp4"]` | Array of preview video URLs |
| `minimumAppVersion` | string | — | e.g. `1.0.0` | Minimum app version required |
| `isGameScreenOrientationLandscape` | boolean | — | e.g. `true` | Whether game is landscape oriented |
| `projectId` | string | — | e.g. `proj-12345-abcde` | Project ID the game belongs to |
| `gameObjectId` | number | — | e.g. `1` | Game object ID reference |
| `isDraft` | boolean | — | e.g. `false` | Whether the game is in draft mode |
| `tags` | string[] | — | e.g. `["puzzle","casual"]` | Array of tag names |
| `isApp` | boolean | — | e.g. `false` | Whether this is a native app game |
| `archive` | boolean | — | e.g. `false` | Whether the game is archived |
| `gameGenre` | any | — |  | Game genre configuration |
| `gamePlatforms` | UpdateGamePlatforms[] | — | see below | Platform configurations |
| `gameGeo` | any | — |  | Geographic availability configuration |


### Nested object: `UpdateGamePlatforms`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | — | e.g. `1` | Platform configuration ID |
| `name` | string | — | e.g. `Android` | Platform name |
| `assetBundleUrl` | string | — | e.g. `https://cdn.example.com/bundles/game.bundle` | URL to asset bundle |
| `assetName` | string | — | e.g. `game_main_bundle` | Asset name identifier |
| `assetBundleVersion` | string | — | e.g. `1.0.0` | Asset bundle version |
| `minimumGameVersion` | string | — | e.g. `1.0.0` | Minimum game version required |
| `gamePlatformMasterId` | number | — | e.g. `1` | Platform master ID (1=Android, 2=iOS, 3=WebGL) |
