# V2 API: `client/app/get-games`

**Endpoint:** `POST /v2/client/app/get-games`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `gameIds` | `string[]` | Filter games by specific game IDs |
| `attributes` | `string[]` | Select which optional attributes to include in response |
| `isGameScreenOrientationLandscape` | `boolean` | Filter by screen orientation |
| `IsDefault` | `boolean` | Filter by default game flag |
| `offset` | `number` | Pagination offset (default: 0) |
| `limit` | `number` | Pagination limit (default: 10) |
| `search` | `string` | Search games by name (case-insensitive) |
| `includeTags` | `string[]` | Filter games by tag names |

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Games list",
  "data": {
    "games": [...],
    "totalCount": 25,
    "lastUpdate": "2025-12-01T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, each game returns only these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "game-123",
  "name": "Game Name",
  "description": "Game description",
  "iconUrl": "https://cdn.example.com/icon.png",
  "isDefault": false
}
```

---

## How Each Attribute Changes Response

### `attributes: ["screenshotUrls"]`
Adds screenshot URLs array:
```json
{
  "uuid": "...",
  "id": "...",
  "name": "...",
  "description": "...",
  "iconUrl": "...",
  "isDefault": false,
  "screenshotUrls": [
    "https://cdn.example.com/screenshot1.png",
    "https://cdn.example.com/screenshot2.png"
  ]
}
```

---

### `attributes: ["videoUrls"]`
Adds preview video URLs array:
```json
{
  ...base fields...,
  "videoUrls": [
    "https://cdn.example.com/preview.mp4"
  ]
}
```

---

### `attributes: ["isScreenOrientationLandscape"]`
Adds screen orientation boolean:
```json
{
  ...base fields...,
  "isScreenOrientationLandscape": true
}
```

---

### `attributes: ["howTo"]`
Adds how-to instructions:
```json
{
  ...base fields...,
  "howTo": "Tap to jump, swipe to move..."
}
```

---

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "customField1": "value1",
    "customField2": 123
  }
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["multiplayer", "action", "pvp"]
}
```

---

### `attributes: ["platforms"]`
Adds platforms array with asset bundle info:
```json
{
  ...base fields...,
  "platforms": [
    {
      "id": "platform-uuid-1",
      "name": "iOS",
      "assetBundleUrl": "https://cdn.example.com/ios-bundle.zip",
      "assetBundleVersion": "1.2.0",
      "minimumGameVersion": "2.0.0"
    },
    {
      "id": "platform-uuid-2",
      "name": "Android",
      "assetBundleUrl": "https://cdn.example.com/android-bundle.zip",
      "assetBundleVersion": "1.2.0",
      "minimumGameVersion": "2.0.0"
    }
  ]
}
```

---

### `attributes: ["locations"]`
Adds geo/country locations array:
```json
{
  ...base fields...,
  "locations": [
    {
      "id": "country-uuid-1",
      "name": "United States"
    },
    {
      "id": "country-uuid-2",
      "name": "Canada"
    }
  ]
}
```

---

### `attributes: ["genre"]`
Adds genres array (note: response key is `genres`):
```json
{
  ...base fields...,
  "genres": [
    {
      "id": "genre-uuid-1",
      "name": "Action"
    },
    {
      "id": "genre-uuid-2",
      "name": "Adventure"
    }
  ]
}
```

---

### `attributes: ["matches"]`
Adds associated matches array:
```json
{
  ...base fields...,
  "matches": [
    {
      "uuid": "match-uuid-1",
      "id": "match-123",
      "name": "1v1 Duel",
      "description": "Quick 1v1 match",
      "iconUrl": "https://cdn.example.com/match-icon.png"
    },
    {
      "uuid": "match-uuid-2",
      "id": "match-456",
      "name": "Tournament",
      "description": "8 player tournament",
      "iconUrl": "https://cdn.example.com/tournament-icon.png"
    }
  ]
}
```

---

## Combining Multiple Attributes

You can combine multiple attributes to build the exact response you need:

### Request
```json
{
  "attributes": ["tags", "platforms", "matches"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "game-123",
  "name": "Game Name",
  "description": "Game description",
  "iconUrl": "https://cdn.example.com/icon.png",
  "isDefault": false,
  "tags": ["multiplayer", "action"],
  "platforms": [
    {
      "id": "platform-uuid",
      "name": "iOS",
      "assetBundleUrl": "https://...",
      "assetBundleVersion": "1.0.0",
      "minimumGameVersion": "2.0.0"
    }
  ],
  "matches": [
    {
      "uuid": "match-uuid",
      "id": "match-123",
      "name": "1v1 Duel",
      "description": "Quick match",
      "iconUrl": "https://..."
    }
  ]
}
```

---

## How Filters Affect Response

### `gameIds` Filter
Returns only games with the specified IDs.

**Request:**
```json
{
  "gameIds": ["game-123", "game-456"]
}
```
**Effect:** Response contains only games where `gameId` matches one of the provided IDs.

---

### `search` Filter
Filters games by name (case-insensitive partial match using `ILIKE`).

**Request:**
```json
{
  "search": "puzzle"
}
```
**Effect:** Returns games where name contains "puzzle" (e.g., "Puzzle Quest", "Block Puzzle", "PUZZLE MASTER").

---

### `isGameScreenOrientationLandscape` Filter
Filters games by screen orientation.

**Request:**
```json
{
  "isGameScreenOrientationLandscape": true
}
```
**Effect:** Returns only landscape-oriented games.

**Request:**
```json
{
  "isGameScreenOrientationLandscape": false
}
```
**Effect:** Returns only portrait-oriented games.

---

### `IsDefault` Filter
Filters by default game flag.

**Request:**
```json
{
  "IsDefault": true
}
```
**Effect:** Returns only default games.

*Note: By default, the API already excludes default games (`isDefault: false` in where clause).*

---

### `includeTags` Filter
Filters games that have any of the specified tags.

**Request:**
```json
{
  "includeTags": ["multiplayer", "pvp"]
}
```
**Effect:** Returns games tagged with "multiplayer" OR "pvp".

---

### `offset` and `limit` (Pagination)
Controls pagination of results.

**Request:**
```json
{
  "offset": 20,
  "limit": 10
}
```
**Effect:** Skips first 20 games, returns next 10 games. Results are ordered by `updated_at DESC`.

**Defaults:**
- `offset`: 0
- `limit`: 10

---

## Combining Filters and Attributes

### Request
```json
{
  "search": "racing",
  "isGameScreenOrientationLandscape": true,
  "includeTags": ["multiplayer"],
  "attributes": ["tags", "platforms", "screenshotUrls"],
  "offset": 0,
  "limit": 5
}
```

### Effect
1. Filters to games with "racing" in name
2. Filters to landscape-oriented games only
3. Filters to games with "multiplayer" tag
4. Returns first 5 results
5. Each game includes base fields + tags + platforms + screenshotUrls

---

## Complete Request/Response Examples

### Example 1: Minimal Request
**Request:**
```json
{}
```
**Response:** First 10 games with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["screenshotUrls", "videoUrls", "isScreenOrientationLandscape", "howTo", "meta", "tags", "platforms", "locations", "genre", "matches"]
}
```
**Response:** First 10 games with ALL optional fields included.

---

### Example 3: Specific Games with Selected Data
**Request:**
```json
{
  "gameIds": ["game-123"],
  "attributes": ["platforms", "matches"]
}
```
**Response:** Only game-123 with platforms and matches data.

---

## Source Files

- **DTO**: `src/games/dtos/get-client-games.v2.dto.ts`
- **Controller**: `src/games/games.controller.ts:239-271`
- **Service**: `src/games/games.service.ts:946-1135`
