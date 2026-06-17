# Admin API: `media/delete`

**Endpoint:** `POST /v1/media/delete`

**Tag:** Media

**Summary:** Delete media content

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteMediaContentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID the media belongs to |
| `ids` | string[] | ✅ | e.g. `["media-uuid-1","media-uuid-2"]` | Array of media IDs to delete |

