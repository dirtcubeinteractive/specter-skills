# V2 API: `client/battlepass/get-tier-list`

**Endpoint:** `POST /v2/client/battlepass/get-tier-list`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `battlepassId` | `string` | **Yes** | The battlepass ID to get tiers for |
| `tierIds` | `string[]` | No | Array of specific tier IDs to filter |
| `limit` | `number` | No | Number of levels to return per tier (default: 10) |
| `offset` | `number` | No | Pagination offset for levels |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier levels fetched successfully",
  "data": {
    "battlepassTierList": [
      {
        "id": "season-1-pass",
        "tiers": [
          {
            "uuid": "tier-uuid-1",
            "name": "Free Track",
            "totalLevels": 50,
            "levels": [
              {
                "levelId": "level-uuid-1",
                "tierLevelId": "tier-level-mapping-uuid-1",
                "levelNo": 1,
                "rewards": {
                  "items": [
                    {
                      "uuid": "item-uuid-1",
                      "id": "exclusive-skin-01",
                      "name": "Exclusive Skin",
                      "description": "A rare skin",
                      "iconUrl": "https://cdn.example.com/skin.png",
                      "quantity": 1,
                      "rarity": {
                        "id": "rarity-uuid",
                        "type": "Rare"
                      }
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
                      "quantity": 100,
                      "rarity": null
                    }
                  ],
                  "progressionMarkers": []
                }
              },
              {
                "levelId": "level-uuid-2",
                "tierLevelId": "tier-level-mapping-uuid-2",
                "levelNo": 2,
                "rewards": {
                  "items": [],
                  "bundles": [],
                  "currencies": [
                    {
                      "uuid": "currency-uuid-1",
                      "id": "gold-coins",
                      "name": "Gold Coins",
                      "description": "In-game currency",
                      "iconUrl": "https://cdn.example.com/gold.png",
                      "quantity": 150,
                      "rarity": null
                    }
                  ],
                  "progressionMarkers": []
                }
              }
            ]
          },
          {
            "uuid": "tier-uuid-2",
            "name": "Premium Track",
            "totalLevels": 50,
            "levels": [
              {
                "levelId": "level-uuid-1",
                "tierLevelId": "tier-level-mapping-uuid-3",
                "levelNo": 1,
                "rewards": {
                  "items": [
                    {
                      "uuid": "item-uuid-2",
                      "id": "premium-skin-01",
                      "name": "Premium Skin",
                      "description": "An exclusive premium skin",
                      "iconUrl": "https://cdn.example.com/premium-skin.png",
                      "quantity": 1,
                      "rarity": {
                        "id": "rarity-uuid-2",
                        "type": "Legendary"
                      }
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
                      "quantity": 500,
                      "rarity": null
                    }
                  ],
                  "progressionMarkers": []
                }
              }
            ]
          }
        ]
      }
    ]
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `battlepassTierList` | `array` | Array containing battlepass tier data |
| `battlepassTierList[].id` | `string` | Battlepass ID (client-facing) |
| `battlepassTierList[].tiers` | `array` | Array of tier tracks (e.g., Free, Premium) |
| `tiers[].uuid` | `string` | Tier unique identifier (internal ID) |
| `tiers[].name` | `string` | Tier name (e.g., "Free Track", "Premium Track") |
| `tiers[].totalLevels` | `number` | Total number of levels in this tier |
| `tiers[].levels` | `array` | Array of level objects (paginated) |
| `levels[].levelId` | `string` | Level system level ID |
| `levels[].tierLevelId` | `string` | Tier level mapping ID |
| `levels[].levelNo` | `number` | Level number |
| `levels[].rewards` | `object` | Rewards available at this level |
| `rewards.items` | `array` | Item rewards |
| `rewards.bundles` | `array` | Bundle rewards |
| `rewards.currencies` | `array` | Currency rewards |
| `rewards.progressionMarkers` | `array` | Progression marker rewards |

### Reward Object Fields

| Field | Type | Description |
|-------|------|-------------|
| `uuid` | `string` | Internal unique identifier |
| `id` | `string` | Client-facing ID |
| `name` | `string` | Reward name |
| `description` | `string` | Reward description |
| `iconUrl` | `string` | URL to reward icon |
| `quantity` | `number` | Quantity of the reward |
| `rarity` | `object` | Rarity info `{ id, type }` or null |

---

## Request/Response Examples

### Example 1: Get All Tiers for a Battlepass
**Request:**
```json
{
  "battlepassId": "season-1-pass"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier levels fetched successfully",
  "data": {
    "battlepassTierList": [
      {
        "id": "season-1-pass",
        "tiers": [
          {
            "uuid": "tier-uuid-1",
            "name": "Free Track",
            "totalLevels": 50,
            "levels": [
              {
                "levelId": "level-uuid-1",
                "tierLevelId": "tier-level-mapping-uuid-1",
                "levelNo": 1,
                "rewards": {
                  "items": [],
                  "bundles": [],
                  "currencies": [
                    {
                      "uuid": "currency-uuid-1",
                      "id": "gold-coins",
                      "name": "Gold Coins",
                      "description": "In-game currency",
                      "iconUrl": "https://cdn.example.com/gold.png",
                      "quantity": 100,
                      "rarity": null
                    }
                  ],
                  "progressionMarkers": []
                }
              }
            ]
          }
        ]
      }
    ]
  },
  "errors": []
}
```

### Example 2: Get Specific Tiers
**Request:**
```json
{
  "battlepassId": "season-1-pass",
  "tierIds": ["tier-uuid-1", "tier-uuid-2"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier levels fetched successfully",
  "data": {
    "battlepassTierList": [
      {
        "id": "season-1-pass",
        "tiers": [
          {
            "uuid": "tier-uuid-1",
            "name": "Free Track",
            "totalLevels": 50,
            "levels": [
              {
                "levelId": "level-uuid-1",
                "tierLevelId": "tier-level-mapping-uuid-1",
                "levelNo": 1,
                "rewards": {
                  "items": [],
                  "bundles": [],
                  "currencies": [],
                  "progressionMarkers": []
                }
              }
            ]
          },
          {
            "uuid": "tier-uuid-2",
            "name": "Premium Track",
            "totalLevels": 50,
            "levels": [
              {
                "levelId": "level-uuid-1",
                "tierLevelId": "tier-level-mapping-uuid-2",
                "levelNo": 1,
                "rewards": {
                  "items": [],
                  "bundles": [],
                  "currencies": [],
                  "progressionMarkers": []
                }
              }
            ]
          }
        ]
      }
    ]
  },
  "errors": []
}
```

### Example 3: Get Tiers with Pagination
**Request:**
```json
{
  "battlepassId": "season-1-pass",
  "offset": 0,
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier levels fetched successfully",
  "data": {
    "battlepassTierList": [
      {
        "id": "season-1-pass",
        "tiers": [
          {
            "uuid": "tier-uuid-1",
            "name": "Free Track",
            "totalLevels": 50,
            "levels": [
              {
                "levelId": "level-uuid-1",
                "tierLevelId": "tier-level-mapping-uuid-1",
                "levelNo": 1,
                "rewards": {
                  "items": [],
                  "bundles": [],
                  "currencies": [
                    {
                      "uuid": "currency-uuid-1",
                      "id": "gold-coins",
                      "name": "Gold Coins",
                      "description": "In-game currency",
                      "iconUrl": "https://cdn.example.com/gold.png",
                      "quantity": 100,
                      "rarity": null
                    }
                  ],
                  "progressionMarkers": []
                }
              },
              {
                "levelId": "level-uuid-2",
                "tierLevelId": "tier-level-mapping-uuid-2",
                "levelNo": 2,
                "rewards": {
                  "items": [],
                  "bundles": [],
                  "currencies": [
                    {
                      "uuid": "currency-uuid-1",
                      "id": "gold-coins",
                      "name": "Gold Coins",
                      "description": "In-game currency",
                      "iconUrl": "https://cdn.example.com/gold.png",
                      "quantity": 150,
                      "rarity": null
                    }
                  ],
                  "progressionMarkers": []
                }
              }
            ]
          }
        ]
      }
    ]
  },
  "errors": []
}
```

---

## Notes

- Returns tier information organized by battlepass with tracks (Free/Premium)
- Each tier contains paginated levels with their associated rewards
- `totalLevels` shows the total number of levels in each tier track
- Levels are sorted by `levelNo` in ascending order
- Rewards are categorized into `items`, `bundles`, `currencies`, and `progressionMarkers`
- Use `limit` and `offset` to paginate through levels within each tier

---

## Source Files

- **DTO**: `src/battlepass/dto/get-battlepass-tier-rewards.v2.dto.ts`
- **Controller**: `src/battlepass/battlepass.controller.ts`
- **Service**: `src/battlepass/battlepass.service.ts`
