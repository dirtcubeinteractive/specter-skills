# Client API (v2): `auth/login-discord`

**Endpoint:** `POST /v2/client/auth/login-discord`

**Tag:** Auth

**Summary:** Login with Discord

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `accessToken` | string | ✅ | e.g. `discord-access-token-123` | Discord access token |

