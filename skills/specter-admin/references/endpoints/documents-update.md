# Admin API: `documents/update`

**Endpoint:** `POST /v1/documents/update`

**Tag:** Documents

**Summary:** Update document

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateDocumentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `doc-uuid-12345` | Internal database ID of the document to update |
| `documentId` | string | — | e.g. `privacy-policy-v2` | Updated custom unique identifier for the document |
| `name` | string | — | e.g. `Privacy Policy Updated` | Updated display name of the document |
| `content` | object | — | e.g. `<h1>Privacy Policy</h1><p>Updated content...</p>` | Updated HTML content of the document |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this document belongs to |
| `organisationId` | string | — | e.g. `org-uuid-12345` | Organisation ID |

