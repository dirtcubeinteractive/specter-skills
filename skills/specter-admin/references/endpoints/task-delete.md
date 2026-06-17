# Admin API: `task/delete`

**Endpoint:** `POST /v1/task/delete`

**Tag:** Achievements

**Summary:** Delete tasks

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteTaskDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | ✅ | e.g. `["task-uuid-12345","task-uuid-67890"]` | Array of task IDs to delete |

