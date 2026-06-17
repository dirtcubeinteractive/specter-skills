# Admin API: `blueprint/update`

**Endpoint:** `POST /v1/blueprint/update`

**Tag:** Blueprint

**Summary:** Update blueprint

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateBlueprintDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `bp-db-uuid` | Internal database ID of the blueprint to update |
| `blueprintId` | string | — | e.g. `player-profile-bp-v2` | Custom unique identifier for the blueprint |
| `name` | string | — | e.g. `Player Profile Blueprint Updated` | Display name of the blueprint |
| `description` | string | — | e.g. `Updated blueprint for player profile data` | Description of the blueprint |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this blueprint belongs to |
| `meta` | object | — | e.g. `{"category":"player","version":"2.0"}` | Custom metadata for the blueprint |
| `blueprintJson` | object | — | e.g. `{"fields":[{"name":"level","type":"number"},{…` | JSON schema defining the blueprint structure |
| `active` | boolean | — | e.g. `true` | Whether the blueprint is active |
| `archive` | boolean | — | e.g. `false` | Whether the blueprint is archived |
| `tags` | string[] | — | e.g. `["player","profile","updated"]` | Tags for categorization |

