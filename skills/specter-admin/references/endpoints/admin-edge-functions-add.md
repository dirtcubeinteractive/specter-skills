# Admin API: `admin/edge-functions/add`

**Endpoint:** `POST /v2/admin/edge-functions/add`

**Tag:** Edge Functions

**Summary:** Create edge function

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateFunctionDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `project-uuid-here` | Project ID |
| `organisationId` | string | ✅ | e.g. `org-uuid-here` | Organisation ID |
| `name` | string | ✅ | e.g. `calcDamage` | Function name (alphanumeric, starts with letter) |
| `description` | string | — | e.g. `Calculates combat damage based on attack and …` | Function description |
| `files` | object | ✅ | e.g. `{"main.ts":"export default { async fetch(req)…` | Function code files as key-value pairs (filename -> code) |
| `entryPoint` | string | — | e.g. `main.ts` | Entry point file name |
| `createdBy` | string | — |  | Member ID who created the function |

