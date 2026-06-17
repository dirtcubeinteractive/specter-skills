# Admin API: `member/validate-refresh-token`

**Endpoint:** `POST /v1/member/validate-refresh-token`

**Tag:** Member

**Summary:** Validate refresh token

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ValidateRefreshTokenDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `memberId` | string | ✅ | e.g. `member-uuid-12345` | Member ID to validate refresh token for |

