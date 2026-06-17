# Admin API: `task/stop`

**Endpoint:** `POST /v1/task/stop`

**Tag:** Achievements

**Summary:** Stop task

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `StopTaskDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `taskId` | string | ✅ | e.g. `task-uuid-12345` | Task ID to stop |

