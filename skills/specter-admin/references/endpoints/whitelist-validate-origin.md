# Admin API: `whitelist/validate-origin`

**Endpoint:** `POST /v1/whitelist/validate-origin`

**Tag:** Whitelist

**Summary:** Validate origin

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `ValidateOriginDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID |
| `origin` | string | ✅ | e.g. `https://example.com` | Origin URL to validate against whitelist |

