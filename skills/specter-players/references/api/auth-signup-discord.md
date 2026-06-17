# Client API (v2): `auth/signup-discord`

**Endpoint:** `POST /v2/client/auth/signup-discord`

**Tag:** Auth

**Summary:** Sign up with Discord

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `accessToken` | string | ✅ | e.g. `discord-access-token-123` | Discord access token |

