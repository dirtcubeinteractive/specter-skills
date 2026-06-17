# Admin API: `media/add`

**Endpoint:** `POST /v1/media/add`

**Tag:** Media

**Summary:** Add media content

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `AddContentToMediaDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to add media to |
| `contents` | Content[] | — | see below | Array of content to add |


### Nested object: `Content`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `contentType` | string | ✅ | e.g. `image/png` | MIME type of the content |
| `category` | string | ✅ | `icons` \| `assets` \| `videos` \| `bundles` \| `misc` | Category of the media |
| `fileName` | string | — | e.g. `avatar.png` | Name of the file |
| `url` | string | — | e.g. `https://cdn.example.com/avatar.png` | URL of the uploaded file |
| `fileSize` | number | — | e.g. `102400` | Size of the file in bytes |
