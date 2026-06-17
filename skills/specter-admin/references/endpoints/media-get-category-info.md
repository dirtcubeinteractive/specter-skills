# Admin API: `media/get/category-info`

**Endpoint:** `POST /v1/media/get/category-info`

**Tag:** Media

**Summary:** Get media category info

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetMediaCategoryInfoDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `categories` | object | ✅ | e.g. `["icons","assets","videos"]` | Array of media categories to get info for |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get category info for |

