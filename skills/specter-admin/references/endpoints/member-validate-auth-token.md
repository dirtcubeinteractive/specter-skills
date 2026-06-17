# Admin API: `member/validate-auth-token`

**Endpoint:** `POST /v1/member/validate-auth-token`

**Tag:** Member

**Summary:** Validate auth token

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ValidateAuthTokenDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `authToken` | string | ✅ | e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Authentication token to validate |

