# Admin API: `whitelist/update`

**Endpoint:** `POST /v1/whitelist/update`

**Tag:** Whitelist

**Summary:** Update whitelist entry

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateWhitelistDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID |
| `id` | number | ✅ | e.g. `1` | ID of the whitelist entry to update |
| `value` | string | — | e.g. `updated-example.com` | Updated value (IP address or domain) |
| `isActive` | boolean | — | e.g. `true` | Whether the whitelist entry is active |
| `type` | string | ✅ | `IP` \| `DOMAIN` | Type of whitelist entry |
| `description` | string | — | e.g. `Updated production domain` | Updated description |

