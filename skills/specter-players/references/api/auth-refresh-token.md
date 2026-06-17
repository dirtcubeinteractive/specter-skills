# Client API (v2): `auth/refresh-token`

**Endpoint:** `POST /v2/client/auth/refresh-token`

**Tag:** Auth

**Summary:** Refresh access token V2

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `RefreshAccessTokenDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `entityToken` | string | ✅ | e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Entity token for authentication |
| `expiringAccessToken` | string | ✅ | e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Expiring access token to be refreshed |

