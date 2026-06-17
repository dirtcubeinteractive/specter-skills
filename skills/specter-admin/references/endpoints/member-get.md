# Admin API: `member/get`

**Endpoint:** `POST /v1/member/get`

**Tag:** Member

**Summary:** Get members

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetMemberDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["member-uuid-1","member-uuid-2"]` | Filter by specific member IDs |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Number of records to return |
| `search` | string | — | e.g. `john` | Search keyword for filtering members |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | `ASC` \| `DESC` | Sort order |
| `organisationId` | string | ✅ | e.g. `org-uuid-12345` | Organisation ID |
| `projectId` | string | — | e.g. `proj-uuid-12345` | Filter by project ID |
| `accessConfig` | any | — |  | Access configuration filter |

