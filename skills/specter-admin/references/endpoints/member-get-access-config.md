# Admin API: `member/get-access-config`

**Endpoint:** `POST /v1/member/get-access-config`

**Tag:** Member

**Summary:** Get access config

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetAccessConfigDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-uuid-12345` | Organisation ID to get access config for |
| `projectIds` | string[] | — | e.g. `["proj-uuid-1","proj-uuid-2"]` | Filter by specific project IDs |
| `memberEmails` | string[] | ✅ | e.g. `["john@example.com","jane@example.com"]` | List of member emails to get access config for |
| `env` | string[] | ✅ | e.g. `["development","production"]` | Environment types to get config for |

