# Admin API: `task-bus/get`

**Endpoint:** `POST /v1/task-bus/get`

**Tag:** Achievements

**Summary:** Get task bus

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetTaskBusDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get task bus entries for |
| `limit` | number | — | e.g. `10` | Number of results to return |
| `offset` | number | — | e.g. `0` | Pagination offset |

