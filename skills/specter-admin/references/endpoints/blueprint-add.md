# Admin API: `blueprint/add`

**Endpoint:** `POST /v1/blueprint/add`

**Tag:** Blueprint

**Summary:** Create blueprint

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateBlueprintDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `blueprintId` | string | — | e.g. `player-profile-bp` | Custom unique identifier for the blueprint |
| `name` | string | ✅ | e.g. `Player Profile Blueprint` | Display name of the blueprint |
| `description` | string | — | e.g. `Blueprint for storing player profile data` | Description of the blueprint |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this blueprint belongs to |
| `meta` | object | — | e.g. `{"category":"player","version":"1.0"}` | Custom metadata for the blueprint |
| `blueprintJson` | object | — | e.g. `{"fields":[{"name":"level","type":"number"}]}` | JSON schema defining the blueprint structure |
| `active` | boolean | — | e.g. `true` | Whether the blueprint is active |
| `archive` | boolean | — | e.g. `false` | Whether the blueprint is archived |
| `tags` | string[] | — | e.g. `["player","profile"]` | Tags for categorization |

