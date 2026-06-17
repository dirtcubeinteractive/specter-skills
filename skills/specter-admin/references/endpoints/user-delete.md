# Admin API: `user/delete`

**Endpoint:** `POST /v1/user/delete`

**Tag:** Users

**Summary:** Delete players

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeletePlayerDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | ✅ | e.g. `["user123","user456"]` | Array of player IDs to delete |

