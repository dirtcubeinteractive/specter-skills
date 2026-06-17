# Client API (v2): `auth/validate-token`

**Endpoint:** `POST /v2/client/auth/validate-token`

**Tag:** Auth

**Summary:** Validate access token V2

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `ValidateTokenDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `entityToken` | string | — | e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Entity token |
| `accessToken` | string | ✅ | e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Access token to validate |

