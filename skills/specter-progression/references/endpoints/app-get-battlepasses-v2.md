# V2 API: `client/app/get-battlepasses`

**Endpoint:** `POST /v2/client/app/get-battlepasses`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `battlepassIds` | `string[]` | No | Array of battlepass IDs to filter by |
| `attributes` | `string[]` | No | Array of attributes to filter battlepasses |
| `scheduleStatuses` | `string[]` | No | Filter by schedule status (e.g., "in progress", "yet to start", "expired") |
| `includeTags` | `string[]` | No | Array of tags to include in results |
| `limit` | `number` | No | Number of battlepasses to return |
| `offset` | `number` | No | Pagination offset |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "battlepass-uuid",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards throughout the season",
      "iconUrl": "https://cdn.example.com/battlepass-s1.png",
      "thumbnailUrls": ["https://cdn.example.com/thumb1.png"],
      "coverImageUrls": ["https://cdn.example.com/cover1.png"],
      "bannerUrls": ["https://cdn.example.com/banner1.png"],
      "tiers": [
        {
          "tierId": "tier-1",
          "tierNo": 1,
          "freeRewards": [],
          "premiumRewards": []
        }
      ],
      "tiersCount": 50
    }
  ],
  "errors": []
}
```

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `schedule` | Schedule information | `schedule: { firstInstanceStartDate, firstInstanceEndDate, currentInstanceSchedule }` |
| `unlockConditions` | Unlock conditions | `unlockConditions: [...]` |

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of battlepass objects |
| `[].uuid` | `string` | Unique identifier (internal ID) |
| `[].id` | `string` | Battlepass ID (client-facing) |
| `[].name` | `string` | Battlepass display name |
| `[].description` | `string` | Battlepass description |
| `[].iconUrl` | `string` | URL to battlepass icon |
| `[].thumbnailUrls` | `array` | Array of thumbnail image URLs |
| `[].coverImageUrls` | `array` | Array of cover image URLs |
| `[].bannerUrls` | `array` | Array of banner image URLs |
| `[].tiers` | `array` | Array of tier objects with rewards |
| `[].tiersCount` | `number` | Total number of tiers |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `[].meta` | `object` | `"meta"` | Custom metadata object |
| `[].tags` | `array` | `"tags"` | Array of tag names |
| `[].schedule` | `object` | `"schedule"` | Schedule information |
| `[].schedule.firstInstanceStartDate` | `string` | `"schedule"` | First instance start date |
| `[].schedule.firstInstanceEndDate` | `string` | `"schedule"` | First instance end date |
| `[].schedule.currentInstanceSchedule` | `object` | `"schedule"` | Current instance with status, start, and end dates |
| `[].unlockConditions` | `object` | `"unlockConditions"` | Unlock conditions object |
| `[].unlockConditions.unlockItem` | `array` | `"unlockConditions"` | Items required to unlock `[{ uuid, id, name }]` |
| `[].unlockConditions.unlockBundle` | `array` | `"unlockConditions"` | Bundles required to unlock `[{ uuid, id, name }]` |
| `[].unlockConditions.unlockLevel` | `array` | `"unlockConditions"` | Level requirements `[{ lockedLevelNo, unlockProgressionSystem: { uuid, id, name } }]` |

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
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "bp-uuid-123",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards",
      "iconUrl": "https://cdn.example.com/bp.png",
      "thumbnailUrls": [],
      "coverImageUrls": [],
      "bannerUrls": [],
      "tiers": [],
      "tiersCount": 50
    }
  ],
  "errors": []
}
```

### Example 2: With Schedule Attribute
**Request:**
```json
{
  "attributes": ["schedule"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "bp-uuid-123",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards",
      "iconUrl": "https://cdn.example.com/bp.png",
      "thumbnailUrls": [],
      "coverImageUrls": [],
      "bannerUrls": [],
      "tiers": [],
      "tiersCount": 50,
      "schedule": {
        "firstInstanceStartDate": "2024-01-01T00:00:00.000Z",
        "firstInstanceEndDate": "2024-03-31T23:59:59.000Z",
        "currentInstanceSchedule": {
          "status": "in progress",
          "instanceStartDate": "2024-01-01T00:00:00.000Z",
          "instanceEndDate": "2024-03-31T23:59:59.000Z"
        }
      }
    }
  ],
  "errors": []
}
```

### Example 3: With Meta and Tags Attributes
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
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "bp-uuid-123",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards",
      "iconUrl": "https://cdn.example.com/bp.png",
      "thumbnailUrls": [],
      "coverImageUrls": [],
      "bannerUrls": [],
      "tiers": [],
      "tiersCount": 50,
      "meta": {
        "season": "1",
        "theme": "winter"
      },
      "tags": ["premium", "seasonal"]
    }
  ],
  "errors": []
}
```

### Example 4: Filter by Schedule Status
**Request:**
```json
{
  "scheduleStatuses": ["in progress"],
  "attributes": ["schedule"],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "bp-uuid-123",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards",
      "iconUrl": "https://cdn.example.com/bp.png",
      "thumbnailUrls": [],
      "coverImageUrls": [],
      "bannerUrls": [],
      "tiers": [],
      "tiersCount": 50,
      "schedule": {
        "firstInstanceStartDate": "2024-01-01T00:00:00.000Z",
        "firstInstanceEndDate": "2024-03-31T23:59:59.000Z",
        "currentInstanceSchedule": {
          "status": "in progress",
          "instanceStartDate": "2024-01-01T00:00:00.000Z",
          "instanceEndDate": "2024-03-31T23:59:59.000Z"
        }
      }
    }
  ],
  "errors": []
}
```

### Example 5: Filter by Tags
**Request:**
```json
{
  "includeTags": ["premium"],
  "attributes": ["tags"],
  "limit": 5
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "bp-uuid-123",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards",
      "iconUrl": "https://cdn.example.com/bp.png",
      "thumbnailUrls": [],
      "coverImageUrls": [],
      "bannerUrls": [],
      "tiers": [],
      "tiersCount": 50,
      "tags": ["premium", "seasonal"]
    }
  ],
  "errors": []
}
```

### Example 6: With Unlock Conditions Attribute
**Request:**
```json
{
  "attributes": ["unlockConditions"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepasses fetched successfully",
  "data": [
    {
      "uuid": "bp-uuid-123",
      "id": "season-1-pass",
      "name": "Season 1 Battle Pass",
      "description": "Unlock exclusive rewards",
      "iconUrl": "https://cdn.example.com/bp.png",
      "thumbnailUrls": [],
      "coverImageUrls": [],
      "bannerUrls": [],
      "tiers": [],
      "tiersCount": 50,
      "unlockConditions": {
        "unlockItem": [
          {
            "uuid": "item-uuid-123",
            "id": "unlock-key",
            "name": "Season Pass Key"
          }
        ],
        "unlockBundle": [
          {
            "uuid": "bundle-uuid-456",
            "id": "starter-pack",
            "name": "Starter Bundle"
          }
        ],
        "unlockLevel": [
          {
            "lockedLevelNo": 5,
            "unlockProgressionSystem": {
              "uuid": "level-uuid-789",
              "id": "player-level",
              "name": "Player Level"
            }
          }
        ]
      }
    }
  ],
  "errors": []
}
```

---

## Notes

- Returns all battlepasses configured for the project
- Use `scheduleStatuses` to filter by battlepass lifecycle status
- Use `battlepass/get-tier-list` to get the tier rewards for a specific battlepass

---

## Source Files

- **DTO**: `src/battlepass/dto/get-battlepasses.v2.dto.ts`
- **Controller**: `src/battlepass/battlepass.controller.ts`
- **Service**: `src/battlepass/battlepass.service.ts`
