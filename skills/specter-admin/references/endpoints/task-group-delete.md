# Admin API: `task-group/delete`

**Endpoint:** `POST /v1/task-group/delete`

**Tag:** Achievements

**Summary:** Delete task groups

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteTaskGroupDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | ✅ | e.g. `["taskgroup-uuid-12345","taskgroup-uuid-67890"]` | Array of task group IDs to delete |

