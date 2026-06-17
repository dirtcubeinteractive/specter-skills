# Admin API: `member/email-exist`

**Endpoint:** `POST /v1/member/email-exist`

**Tag:** Member

**Summary:** Check email exists

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `MemberEmailExistDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `john@example.com` | Email address to check for existence |

