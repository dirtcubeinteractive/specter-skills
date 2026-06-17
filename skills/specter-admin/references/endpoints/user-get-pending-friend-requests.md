# Admin API: `user/get-pending-friend-requests`

**Endpoint:** `POST /v1/user/get-pending-friend-requests`

**Tag:** Users

**Summary:** Get pending friend requests

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetPendingFriendRequestsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | ✅ | e.g. `user123` | User ID |
| `projectId` | string | ✅ | e.g. `proj123` | Project ID |
| `limit` | number | — | e.g. `10` | Limit for pagination |
| `offset` | number | — | e.g. `0` | Offset for pagination |

