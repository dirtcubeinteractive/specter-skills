# Admin API: `whitelist/delete`

**Endpoint:** `POST /v1/whitelist/delete`

**Tag:** Whitelist

**Summary:** Delete whitelist entry

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteWhitelistDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID |
| `id` | number | ✅ | e.g. `1` | ID of the whitelist entry to delete |

