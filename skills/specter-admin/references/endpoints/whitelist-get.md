# Admin API: `whitelist/get`

**Endpoint:** `POST /v1/whitelist/get`

**Tag:** Whitelist

**Summary:** Get whitelist entries

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetWhitelistDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID to fetch whitelist entries for |
| `type` | string | — | `IP` \| `DOMAIN` | Filter by whitelist type |
| `limit` | object | — | e.g. `20` | Maximum number of entries to return |
| `offset` | object | — | e.g. `0` | Number of entries to skip for pagination |

