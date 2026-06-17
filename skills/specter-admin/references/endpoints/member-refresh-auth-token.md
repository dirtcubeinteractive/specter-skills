# Admin API: `member/refresh-auth-token`

**Endpoint:** `POST /v1/member/refresh-auth-token`

**Tag:** Member

**Summary:** Refresh auth token

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `RefreshAuthTokenDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `memberId` | string | ✅ | e.g. `member-uuid-12345` | Member ID to refresh auth token for |

