# Admin API: `tags/get`

**Endpoint:** `POST /v1/tags/get`

**Tag:** Tags

**Summary:** Get tags

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetAllTagsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `search` | string | — | e.g. `gameplay` | Search keyword |
| `limit` | number | — | e.g. `10` | Number of records to return |
| `offset` | number | — | e.g. `0` | Pagination offset |

