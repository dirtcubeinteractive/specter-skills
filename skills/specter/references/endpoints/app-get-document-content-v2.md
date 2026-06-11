# V2 API: `client/app/get-document-content`

**Endpoint:** `POST /v2/client/app/get-document-content`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `documentId` | `string` | **Yes** | The document ID to retrieve content for |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Document Content retrieved successfully",
  "data": {
    "documentContent": "<html><head><title>Terms of Service</title></head><body><h1>Terms of Service</h1><p>Welcome to our platform...</p></body></html>"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `documentContent` | `string` | HTML content of the document |

---

## Request Examples

### Example 1: Get Terms of Service
**Request:**
```json
{
  "documentId": "terms-of-service"
}
```

### Example 2: Get Privacy Policy
**Request:**
```json
{
  "documentId": "privacy-policy"
}
```

### Example 3: Get Game Rules
**Request:**
```json
{
  "documentId": "game-rules"
}
```

---

## Notes

- Returns the HTML content of the specified document
- Use `app/get-documents` to list all available documents
- Documents are typically legal documents (ToS, Privacy Policy) or game documentation
- Content is returned as HTML string that can be rendered in a webview

---

## Source Files

- **DTO**: `src/documents/dto/get-client-document.dto.ts`
- **Controller**: `src/documents/documents.controller.ts`
- **Service**: `src/documents/documents.service.ts`
