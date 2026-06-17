# Admin API: `organisation/verify`

**Endpoint:** `POST /v1/organisation/verify`

**Tag:** Organisation

**Summary:** Verify organisation

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `VerifyOrganisationDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `code` | number | ✅ | e.g. `123456` | Verification code |
| `email` | string | ✅ | e.g. `john@example.com` | Email address to verify |

