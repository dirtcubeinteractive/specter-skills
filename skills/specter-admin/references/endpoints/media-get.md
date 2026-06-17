# Admin API: `media/get`

**Endpoint:** `POST /v1/media/get`

**Tag:** Media

**Summary:** Get media

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetMediaDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get media for |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `avatar` | Search keyword to filter by name |
| `filters` | any | — |  | Filters for categories and extensions |

