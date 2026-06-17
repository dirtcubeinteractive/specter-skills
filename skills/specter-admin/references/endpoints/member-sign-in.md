# Admin API: `member/sign-in`

**Endpoint:** `POST /v1/member/sign-in`

**Tag:** Member

**Summary:** Member sign in

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetOrganisationDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | string | ✅ | e.g. `john@example.com` | Email address |
| `password` | string | — | e.g. `securePassword123` | Password (required if googleId not provided) |
| `googleId` | string | — | e.g. `1234567890` | Google ID for OAuth login |

