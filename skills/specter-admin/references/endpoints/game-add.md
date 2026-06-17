# Admin API: `game/add`

**Endpoint:** `POST /v1/game/add`

**Tag:** Games

**Summary:** Add game

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `AddGameDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `gameId` | string | ✅ | e.g. `game-puzzle-001` | Unique game identifier |
| `name` | string | ✅ | e.g. `Puzzle Master` | Game display name |
| `description` | string | — | e.g. `A challenging puzzle game for all ages` | Game description |
| `howTo` | string | — | e.g. `Match 3 or more tiles to score points` | How to play instructions |
| `logo` | string | — | e.g. `https://cdn.example.com/games/puzzle-logo.png` | URL to game logo |
| `downloadUrl` | string[] | — | e.g. `["https://play.google.com/store/apps/details?…` | Array of download URLs for different platforms |
| `screenShotUrl` | string[] | — | e.g. `["https://cdn.example.com/screenshots/1.png"]` | Array of screenshot URLs |
| `previewVideoUrl` | string[] | — | e.g. `["https://cdn.example.com/videos/preview.mp4"]` | Array of preview video URLs |
| `minimumAppVersion` | string | — | e.g. `1.0.0` | Minimum app version required |
| `isGameScreenOrientationLandscape` | boolean | — | e.g. `true` | Whether game is landscape oriented |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID the game belongs to |
| `gameObjectId` | number | — | e.g. `1` | Game object ID reference |
| `isDraft` | boolean | — | e.g. `false` | Whether the game is in draft mode |
| `isApp` | boolean | — | e.g. `false` | Whether this is a native app game |
| `isDefault` | boolean | — | e.g. `false` | Whether this is the default game |
| `meta` | object | — | e.g. `{"difficulty":"medium"}` | Custom metadata object |
| `tags` | string[] | — | e.g. `["puzzle","casual"]` | Array of tag names |
| `gameGenre` | any | — |  | Game genre configuration |
| `gamePlatforms` | GamePlatforms[] | — | see below | Platform configurations |
| `gameGeo` | any | — |  | Geographic availability configuration |


### Nested object: `GamePlatforms`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | — | e.g. `Android` | Platform name |
| `assetBundleUrl` | string | — | e.g. `https://cdn.example.com/bundles/game.bundle` | URL to asset bundle |
| `assetName` | string | — | e.g. `game_main_bundle` | Asset name identifier |
| `assetBundleVersion` | string | — | e.g. `1.0.0` | Asset bundle version |
| `minimumGameVersion` | string | — | e.g. `1.0.0` | Minimum game version required |
| `gamePlatformMasterId` | number | ✅ | e.g. `1` | Platform master ID (1=Android, 2=iOS, 3=WebGL) |
