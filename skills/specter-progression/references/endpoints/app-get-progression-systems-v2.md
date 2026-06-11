# V2 API: `client/app/get-progression-systems`

**Endpoint:** `POST /v2/client/app/get-progression-systems`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `progressionSystemIds` | `string[]` | No | Array of progression system IDs to filter by |
| `progressionMarkerIds` | `string[]` | No | Array of progression marker IDs to filter by |
| `search` | `string` | No | Search term for filtering by name |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `limit` | `number` | No | Number of results to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `includeTags` | `string[]` | No | Filter progression systems that have these tags |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `levels` | Level configurations | `levels: [{ uuid, id, levelNo, name, incrementalParameterValue, cumulativeParameterValue }]` |
| `levels.rewardDetails` | Level rewards (includes levels) | `levels[].rewardDetails: { items, bundles, currencies, progressionMarkers }` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Progression System Data",
  "data": {
    "progressionSystems": [
      {
        "uuid": "level-system-uuid",
        "id": "player-level",
        "name": "Player Level",
        "description": "Main player progression system",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "progressionMarker": {
          "uuid": "marker-uuid",
          "id": "player-xp",
          "name": "Player XP",
          "description": "Experience points",
          "iconUrl": "https://cdn.example.com/xp-icon.png"
        },
        "totalLevels": 50
      }
    ],
    "totalCount": 5,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data.progressionSystems` | `array` | Array of progression system objects |
| `progressionSystems[].uuid` | `string` | Unique identifier (internal ID) |
| `progressionSystems[].id` | `string` | Progression system ID (client-facing) |
| `progressionSystems[].name` | `string` | Display name of the progression system |
| `progressionSystems[].description` | `string` | Description of the progression system |
| `progressionSystems[].iconUrl` | `string` | URL to progression system icon |
| `progressionSystems[].progressionMarker` | `object` | Associated progression marker (or empty object) |
| `progressionSystems[].progressionMarker.uuid` | `string` | Marker internal ID |
| `progressionSystems[].progressionMarker.id` | `string` | Marker ID (client-facing) |
| `progressionSystems[].progressionMarker.name` | `string` | Marker name |
| `progressionSystems[].progressionMarker.description` | `string` | Marker description |
| `progressionSystems[].progressionMarker.iconUrl` | `string` | Marker icon URL |
| `progressionSystems[].totalLevels` | `number` | Total number of levels in the system |
| `totalCount` | `number` | Total number of progression systems |
| `lastUpdate` | `string` | Timestamp of last update |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `progressionSystems[].meta` | `object` | `"meta"` | Custom metadata object |
| `progressionSystems[].tags` | `array` | `"tags"` | Array of tag names |
| `progressionSystems[].levels` | `array` | `"levels"` or `"levels.rewardDetails"` | Level configurations |
| `progressionSystems[].levels[].uuid` | `string` | `"levels"` | Level internal ID |
| `progressionSystems[].levels[].id` | `string` | `"levels"` | Level ID |
| `progressionSystems[].levels[].levelNo` | `number` | `"levels"` | Level number |
| `progressionSystems[].levels[].name` | `string` | `"levels"` | Level name |
| `progressionSystems[].levels[].incrementalParameterValue` | `number` | `"levels"` | XP needed from previous level |
| `progressionSystems[].levels[].cumulativeParameterValue` | `number` | `"levels"` | Total XP needed from level 1 |
| `progressionSystems[].levels[].rewardDetails` | `object` | `"levels.rewardDetails"` | Rewards for this level |
| `progressionSystems[].levels[].rewardDetails.items` | `array` | `"levels.rewardDetails"` | Item rewards |
| `progressionSystems[].levels[].rewardDetails.bundles` | `array` | `"levels.rewardDetails"` | Bundle rewards |
| `progressionSystems[].levels[].rewardDetails.currencies` | `array` | `"levels.rewardDetails"` | Currency rewards |
| `progressionSystems[].levels[].rewardDetails.progressionMarkers` | `array` | `"levels.rewardDetails"` | Progression marker rewards |

---

## Request/Response Examples

### Example 1: Basic Request (no attributes)
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Progression System Data",
  "data": {
    "progressionSystems": [
      {
        "uuid": "level-system-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Main player progression system",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "progressionMarker": {
          "uuid": "marker-uuid-1",
          "id": "player-xp",
          "name": "Player XP",
          "description": "Experience points for player progression",
          "iconUrl": "https://cdn.example.com/xp-icon.png"
        },
        "totalLevels": 50
      },
      {
        "uuid": "level-system-uuid-2",
        "id": "battle-rank",
        "name": "Battle Rank",
        "description": "Competitive ranking system",
        "iconUrl": "https://cdn.example.com/rank-icon.png",
        "progressionMarker": {},
        "totalLevels": 20
      }
    ],
    "totalCount": 2,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 2: With Meta and Tags Attributes
**Request:**
```json
{
  "attributes": ["meta", "tags"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Progression System Data",
  "data": {
    "progressionSystems": [
      {
        "uuid": "level-system-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Main player progression system",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "progressionMarker": {
          "uuid": "marker-uuid-1",
          "id": "player-xp",
          "name": "Player XP",
          "description": "Experience points for player progression",
          "iconUrl": "https://cdn.example.com/xp-icon.png"
        },
        "meta": {
          "category": "core",
          "maxLevel": 50
        },
        "tags": ["main", "player", "core"],
        "totalLevels": 50
      }
    ],
    "totalCount": 1,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: With Levels Attribute
**Request:**
```json
{
  "attributes": ["levels"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Progression System Data",
  "data": {
    "progressionSystems": [
      {
        "uuid": "level-system-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Main player progression system",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "progressionMarker": {
          "uuid": "marker-uuid-1",
          "id": "player-xp",
          "name": "Player XP",
          "description": "Experience points for player progression",
          "iconUrl": "https://cdn.example.com/xp-icon.png"
        },
        "levels": [
          {
            "uuid": "level-mapping-uuid-1",
            "id": "level-mapping-uuid-1",
            "levelNo": 1,
            "name": "Beginner",
            "incrementalParameterValue": 0,
            "cumulativeParameterValue": 0
          },
          {
            "uuid": "level-mapping-uuid-2",
            "id": "level-mapping-uuid-2",
            "levelNo": 2,
            "name": "Novice",
            "incrementalParameterValue": 100,
            "cumulativeParameterValue": 100
          },
          {
            "uuid": "level-mapping-uuid-3",
            "id": "level-mapping-uuid-3",
            "levelNo": 3,
            "name": "Apprentice",
            "incrementalParameterValue": 150,
            "cumulativeParameterValue": 250
          }
        ],
        "totalLevels": 50
      }
    ],
    "totalCount": 1,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 4: With Levels and Reward Details Attribute
**Request:**
```json
{
  "attributes": ["levels.rewardDetails"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Progression System Data",
  "data": {
    "progressionSystems": [
      {
        "uuid": "level-system-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Main player progression system",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "progressionMarker": {
          "uuid": "marker-uuid-1",
          "id": "player-xp",
          "name": "Player XP",
          "description": "Experience points for player progression",
          "iconUrl": "https://cdn.example.com/xp-icon.png"
        },
        "levels": [
          {
            "uuid": "level-mapping-uuid-1",
            "id": "level-mapping-uuid-1",
            "levelNo": 1,
            "name": "Beginner",
            "incrementalParameterValue": 0,
            "cumulativeParameterValue": 0,
            "rewardDetails": {
              "items": [],
              "bundles": [],
              "currencies": [],
              "progressionMarkers": []
            }
          },
          {
            "uuid": "level-mapping-uuid-2",
            "id": "level-mapping-uuid-2",
            "levelNo": 2,
            "name": "Novice",
            "incrementalParameterValue": 100,
            "cumulativeParameterValue": 100,
            "rewardDetails": {
              "items": [
                {
                  "uuid": "item-uuid-1",
                  "id": "starter-sword",
                  "name": "Starter Sword",
                  "description": "A basic sword for beginners",
                  "iconUrl": "https://cdn.example.com/sword.png",
                  "rarity": {
                    "id": "rarity-uuid",
                    "name": "Common"
                  },
                  "quantity": 1
                }
              ],
              "bundles": [],
              "currencies": [
                {
                  "uuid": "currency-uuid-1",
                  "id": "gold-coins",
                  "name": "Gold Coins",
                  "description": "In-game currency",
                  "iconUrl": "https://cdn.example.com/gold.png",
                  "rarity": null,
                  "quantity": 100
                }
              ],
              "progressionMarkers": []
            }
          }
        ],
        "totalLevels": 50
      }
    ],
    "totalCount": 1,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 5: Filter by Progression System IDs with Tags
**Request:**
```json
{
  "progressionSystemIds": ["player-level"],
  "includeTags": ["main"],
  "attributes": ["tags"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Progression System Data",
  "data": {
    "progressionSystems": [
      {
        "uuid": "level-system-uuid-1",
        "id": "player-level",
        "name": "Player Level",
        "description": "Main player progression system",
        "iconUrl": "https://cdn.example.com/level-icon.png",
        "progressionMarker": {
          "uuid": "marker-uuid-1",
          "id": "player-xp",
          "name": "Player XP",
          "description": "Experience points for player progression",
          "iconUrl": "https://cdn.example.com/xp-icon.png"
        },
        "tags": ["main", "player"],
        "totalLevels": 50
      }
    ],
    "totalCount": 1,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Notes

- Returns progression systems wrapped in `data.progressionSystems` with `totalCount` and `lastUpdate`
- Each progression system is linked to a `progressionMarker` (or empty object if none)
- Use `levels` attribute to get level configurations
- Use `levels.rewardDetails` attribute to get reward details for each level (also includes levels)
- Use `includeTags` to filter progression systems that have specific tags
- Use `player/me/get-progress` to get a player's current progress in these systems

---

## Source Files

- **DTO**: `src/level-system/dto/get-progression-system-master.v2.dto.ts`
- **Controller**: `src/level-system/level-system.controller.ts`
- **Service**: `src/level-system/level-system.service.ts`
