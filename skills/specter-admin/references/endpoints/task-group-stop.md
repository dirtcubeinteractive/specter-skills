# Admin API: `task-group/stop`

**Endpoint:** `POST /v1/task-group/stop`

**Tag:** Achievements

**Summary:** Stop task group

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `StopTaskGroupDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `taskGroupId` | string | ✅ | e.g. `taskgroup-uuid-12345` | Task group ID to stop |

