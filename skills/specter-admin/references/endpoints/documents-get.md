# Admin API: `documents/get`

**Endpoint:** `POST /v1/documents/get`

**Tag:** Documents

**Summary:** Get documents

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetDocumentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["doc-uuid-1","doc-uuid-2"]` | Array of document IDs to filter by |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `privacy` | Search keyword to filter by name |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `desc` | Sort order (asc or desc) |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get documents for |
| `showArchived` | boolean | — | e.g. `false` | Whether to include archived documents |
| `organisationId` | string | — | e.g. `org-uuid-12345` | Organisation ID |

