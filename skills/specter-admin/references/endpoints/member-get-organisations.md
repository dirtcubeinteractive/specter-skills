# Admin API: `member/get-organisations`

**Endpoint:** `POST /v1/member/get-organisations`

**Tag:** Member

**Summary:** Get organisations

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetAllOrganisationsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `memberId` | string | ✅ | e.g. `member-uuid-12345` | Member ID to get organisations for |

