# Client API (v2): `app/get-document-content`

**Endpoint:** `POST /v2/client/app/get-document-content`

**Tag:** App

**Summary:** Get document content

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `documentId` | string | ✅ | e.g. `privacy-policy` | The document ID to retrieve content for |

