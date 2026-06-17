# Admin API: `app-event/get/custom`

**Endpoint:** `POST /v1/app-event/get/custom`

**Tag:** Events

**Summary:** Get custom events

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetDefaultAppEventDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get events for |
| `categories` | string[] | — | e.g. `["gameplay","economy"]` | Filter by event categories |
| `ids` | string[] | — | e.g. `["event-uuid-1","event-uuid-2"]` | Filter by specific event IDs |
| `search` | string | — | e.g. `score` | Search keyword to filter by name |
| `showArchived` | boolean | — | e.g. `false` | Whether to include archived events |

