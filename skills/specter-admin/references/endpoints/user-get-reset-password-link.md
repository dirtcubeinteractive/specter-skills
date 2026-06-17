# Admin API: `user/get-reset-password-link`

**Endpoint:** `POST /v1/user/get-reset-password-link`

**Tag:** Users

**Summary:** Get reset password link

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `user@example.com` | User email address to send reset link to |
| `url` | string | ✅ | e.g. `https://myapp.com/reset-password` | Base URL for the reset password page |

