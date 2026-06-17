# Admin API: `documents/add`

**Endpoint:** `POST /v1/documents/add`

**Tag:** Documents

**Summary:** Create document

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateDocumentDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `Privacy Policy` | Display name of the document |
| `documentId` | string | ✅ | e.g. `privacy-policy-v1` | Custom unique identifier for the document |
| `content` | string | ✅ | e.g. `<h1>Privacy Policy</h1><p>Your privacy is imp…` | HTML content of the document |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this document belongs to |
| `organisationId` | string | — | e.g. `org-uuid-12345` | Organisation ID |

