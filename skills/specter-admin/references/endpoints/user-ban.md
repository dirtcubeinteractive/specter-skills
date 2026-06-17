# Admin API: `user/ban`

**Endpoint:** `POST /v1/user/ban`

**Tag:** Users

**Summary:** Ban player

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `user-uuid-12345` | User ID of the player to ban |

