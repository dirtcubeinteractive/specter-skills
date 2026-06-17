# Admin API: `tags/add`

**Endpoint:** `POST /v1/tags/add`

**Tag:** Tags

**Summary:** Add tags

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateBulkTagsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string[] | ✅ | e.g. `["gameplay","rewards","seasonal"]` | Array of tag names to create |
| `organisationId` | string | ✅ | e.g. `org-uuid-12345` | Organisation ID |

