# V2 API: `client/app/get-markers`

**Endpoint:** `POST /v2/client/app/get-markers`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `progressionMarkerIds` | `string[]` | No | Array of progression marker IDs to filter by |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `limit` | `number` | No | Number of results to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `search` | `string` | No | Search term for filtering by name |
| `includeTags` | `string[]` | No | Filter markers that have these tags |

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `progressionSystems` | Linked progression systems | `progressionSystems: [{ uuid, id, name, description, iconUrl }]` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Progression Marker data",
  "data": {
    "markers": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points for player progression",
        "iconUrl": "https://cdn.example.com/xp-icon.png"
      }
    ],
    "totalCount": 10,
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
| `data.markers` | `array` | Array of progression marker objects |
| `markers[].uuid` | `string` | Unique identifier (internal ID) |
| `markers[].id` | `string` | Progression marker ID (client-facing) |
| `markers[].name` | `string` | Display name of the marker |
| `markers[].description` | `string` | Description of the marker |
| `markers[].iconUrl` | `string` | URL to marker icon |
| `totalCount` | `number` | Total number of progression markers |
| `lastUpdate` | `string` | Timestamp of last update |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `markers[].meta` | `object` | `"meta"` | Custom metadata object |
| `markers[].tags` | `array` | `"tags"` | Array of tag names |
| `markers[].progressionSystems` | `array` | `"progressionSystems"` | Linked progression systems |
| `markers[].progressionSystems[].uuid` | `string` | `"progressionSystems"` | Progression system internal ID |
| `markers[].progressionSystems[].id` | `string` | `"progressionSystems"` | Progression system ID (client-facing) |
| `markers[].progressionSystems[].name` | `string` | `"progressionSystems"` | Progression system name |
| `markers[].progressionSystems[].description` | `string` | `"progressionSystems"` | Progression system description |
| `markers[].progressionSystems[].iconUrl` | `string` | `"progressionSystems"` | Progression system icon URL |

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
  "message": "Progression Marker data",
  "data": {
    "markers": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points for player progression",
        "iconUrl": "https://cdn.example.com/xp-icon.png"
      },
      {
        "uuid": "marker-uuid-2",
        "id": "skill-points",
        "name": "Skill Points",
        "description": "Points used for skill upgrades",
        "iconUrl": "https://cdn.example.com/skill-icon.png"
      }
    ],
    "totalCount": 10,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 2: With Tags and Meta Attributes
**Request:**
```json
{
  "attributes": ["tags", "meta"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Progression Marker data",
  "data": {
    "markers": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points for player progression",
        "iconUrl": "https://cdn.example.com/xp-icon.png",
        "meta": {
          "category": "core",
          "displayOrder": 1
        },
        "tags": ["progression", "main", "core"]
      }
    ],
    "totalCount": 10,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 3: With Progression Systems Attribute
**Request:**
```json
{
  "attributes": ["progressionSystems"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Progression Marker data",
  "data": {
    "markers": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points for player progression",
        "iconUrl": "https://cdn.example.com/xp-icon.png",
        "progressionSystems": [
          {
            "uuid": "level-system-uuid",
            "id": "player-level",
            "name": "Player Level",
            "description": "Main player leveling system",
            "iconUrl": "https://cdn.example.com/level-icon.png"
          }
        ]
      }
    ],
    "totalCount": 10,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

### Example 4: Get Specific Markers with Tags Filter
**Request:**
```json
{
  "progressionMarkerIds": ["player-xp", "skill-points"],
  "includeTags": ["progression"],
  "attributes": ["tags"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Progression Marker data",
  "data": {
    "markers": [
      {
        "uuid": "marker-uuid-1",
        "id": "player-xp",
        "name": "Player XP",
        "description": "Experience points for player progression",
        "iconUrl": "https://cdn.example.com/xp-icon.png",
        "tags": ["progression", "main"]
      }
    ],
    "totalCount": 10,
    "lastUpdate": "2024-01-15T10:30:00.000Z"
  },
  "errors": []
}
```

---

## Notes

- Returns all progression markers configured for the project
- Progression markers are used to track player progress values (XP, skill points, etc.)
- Use `progression/update-marker` to update a player's marker value
- Use `attributes` to control which additional fields are included

---

## Source Files

- **DTO**: `src/progression-marker/dto/get-marker.dto.ts`
- **Controller**: `src/progression-marker/progression-marker.controller.ts`
- **Service**: `src/progression-marker/progression-marker.service.ts`
