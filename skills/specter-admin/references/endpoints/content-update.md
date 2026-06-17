# Admin API: `content/update`

**Endpoint:** `POST /v1/content/update`

**Tag:** Blueprint

**Summary:** Update content

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateContentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `content-db-uuid` | Internal database ID of the content to update |
| `contentId` | string | — | e.g. `player-content-001-v2` | Custom unique identifier for the content |
| `blueprintId` | string | — | e.g. `bp-uuid-12345` | Blueprint ID this content belongs to |
| `name` | string | — | e.g. `Updated Player Content` | Display name of the content |
| `description` | string | — | e.g. `Updated content for players` | Description of the content |
| `meta` | object | — | e.g. `{"priority":"medium","updated":true}` | Custom metadata for the content |
| `contentJson` | object | — | e.g. `{"level":5,"xp":1000}` | JSON data conforming to the blueprint schema |
| `active` | boolean | — | e.g. `true` | Whether the content is active |
| `archive` | boolean | — | e.g. `false` | Whether the content is archived |

