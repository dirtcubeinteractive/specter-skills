# Admin API: `member/get-flags`

**Endpoint:** `POST /v1/member/get-flags`

**Tag:** Member

**Summary:** Get feature flags

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetFeatureFlagsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `limit` | number | — | e.g. `10` | Maximum number of feature flags to return |
| `offset` | number | — | e.g. `0` | Number of feature flags to skip for pagination |

