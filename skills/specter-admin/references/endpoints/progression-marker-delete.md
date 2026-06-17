# Admin API: `progression-marker/delete`

**Endpoint:** `POST /v1/progression-marker/delete`

**Tag:** Progression Marker

**Summary:** Delete progression marker

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteProgressionMarkerDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | ✅ | e.g. `1` | ID of the progression marker to delete |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |

