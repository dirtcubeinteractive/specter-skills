# Admin API: `member/get-verification-email`

**Endpoint:** `POST /v1/member/get-verification-email`

**Tag:** Member

**Summary:** Get verification email

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetVerificationEmailDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `user@example.com` | Email address to send verification code |

