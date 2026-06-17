# Admin API: `user/details`

**Endpoint:** `POST /v1/user/details`

**Tag:** Users

**Summary:** Get user details

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetUserDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["user1","user2"]` | Array of user IDs |
| `attributes` | object | — | e.g. `["username","email"]` | Attributes to include |
| `entities` | any | — |  | Entities configuration |
| `offset` | number | — | e.g. `0` | Offset for pagination |
| `limit` | number | — | e.g. `10` | Limit for pagination |
| `search` | string | — | e.g. `john` | Search keyword |
| `sortField` | string | — | e.g. `username` | Field to sort by |
| `sortOrder` | string | — | e.g. `asc` | Sort order |
| `projectId` | string | ✅ | e.g. `proj123` | Project ID |
| `showBanPlayer` | boolean | — | e.g. `false` | Show banned players |

