# Admin API: `app/get-master`

**Endpoint:** `POST /v1/app/get-master`

**Tag:** App

**Summary:** Get master projects

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetProjectDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["proj-123","proj-456"]` | Filter by specific project IDs |
| `limit` | object | — | e.g. `20` | Maximum number of projects to return |
| `offset` | object | — | e.g. `0` | Number of projects to skip for pagination |
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID to fetch projects for |
| `getAllApps` | boolean | — | e.g. `false` | Get all apps without permission filtering |
| `sortField` | string | — | e.g. `name` | Field to sort by |
| `sortOrder` | string | — | e.g. `ASC` | Sort order (ASC or DESC) |
| `search` | string | — | e.g. `game` | Search keyword to filter projects |

