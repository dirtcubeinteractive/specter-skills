# Admin API: `member/verify-code`

**Endpoint:** `POST /v1/member/verify-code`

**Tag:** Member

**Summary:** Verify member code

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `VerifyCodeOfMemberDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `john@example.com` | Email address to verify |
| `code` | number | ✅ | e.g. `123456` | Verification code sent to email |

