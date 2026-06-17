# Admin API: `content/add`

**Endpoint:** `POST /v1/content/add`

**Tag:** Blueprint

**Summary:** Create content

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateContentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `contentId` | string | — | e.g. `player-content-001` | Custom unique identifier for the content |
| `name` | string | ✅ | e.g. `Default Player Content` | Display name of the content |
| `description` | string | — | e.g. `Default content for new players` | Description of the content |
| `contentJson` | object | — | e.g. `{"level":1,"xp":0}` | JSON data conforming to the blueprint schema |
| `blueprintId` | string | ✅ | e.g. `bp-uuid-12345` | Blueprint ID this content belongs to |
| `active` | boolean | — | e.g. `true` | Whether the content is active |
| `archive` | boolean | — | e.g. `false` | Whether the content is archived |
| `meta` | object | — | e.g. `{"priority":"high"}` | Custom metadata for the content |

