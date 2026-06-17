# Admin API: `tags/update`

**Endpoint:** `POST /v1/tags/update`

**Tag:** Tags

**Summary:** Update tags

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateTagsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `tagDetails` | TagDetail[] | ✅ | see below | Array of tag details to update |


### Nested object: `TagDetail`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | — | e.g. `tag-uuid-12345` | Tag ID (for existing tags) |
| `name` | string | ✅ | e.g. `gameplay` | Tag name |
| `type` | number | ✅ | `0` \| `1` \| `2` | Tag type (0 = create, 1 = update, 2 = delete) |
