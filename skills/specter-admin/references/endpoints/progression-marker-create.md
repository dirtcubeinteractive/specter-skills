# Admin API: `progression-marker/create`

**Endpoint:** `POST /v1/progression-marker/create`

**Tag:** Progression Marker

**Summary:** Create progression marker

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateProgressionMarkerDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `XP Points` | Name of the progression marker |
| `description` | string | — | e.g. `Experience points earned by players` | Description of the progression marker |
| `iconUrl` | string | — | e.g. `https://example.com/icon.png` | Icon URL for the progression marker |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `progressionMarkerId` | object | — | e.g. `marker-ext-123` | External progression marker ID |
| `tags` | string[] | — | e.g. `["gameplay","rewards"]` | Tags associated with the marker |
| `meta` | object | — |  | Additional metadata |
| `rarityId` | number | — | e.g. `1` | Rarity ID for gacha selection |

