# Admin API: `whitelist/create`

**Endpoint:** `POST /v1/whitelist/create`

**Tag:** Whitelist

**Summary:** Create whitelist entry

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateWhitelistDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID to create whitelist entry for |
| `type` | string | ✅ | `IP` \| `DOMAIN` | Type of whitelist entry |
| `value` | string | ✅ | e.g. `example.com` | The value to whitelist (IP address or domain) |
| `description` | string | — | e.g. `Production domain` | Optional description for the whitelist entry |

