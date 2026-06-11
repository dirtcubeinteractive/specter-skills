# V2 API: `client/app/get-documents`

**Endpoint:** `POST /v2/client/app/get-documents`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `documentId` | `string` | No | Optional document ID to filter by a specific document |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Documents list",
  "data": [
    {
      "uuid": "doc-uuid-1",
      "id": "terms-of-service",
      "name": "Terms of Service"
    },
    {
      "uuid": "doc-uuid-2",
      "id": "privacy-policy",
      "name": "Privacy Policy"
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of document objects |
| `[].uuid` | `string` | Unique identifier (internal ID) |
| `[].id` | `string` | Document ID (client-facing) |
| `[].name` | `string` | Document display name |

---

## Request/Response Examples

### Example 1: Get All Documents
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Documents list",
  "data": [
    {
      "uuid": "doc-uuid-1",
      "id": "terms-of-service",
      "name": "Terms of Service"
    },
    {
      "uuid": "doc-uuid-2",
      "id": "privacy-policy",
      "name": "Privacy Policy"
    },
    {
      "uuid": "doc-uuid-3",
      "id": "game-rules",
      "name": "Game Rules"
    }
  ],
  "errors": []
}
```

### Example 2: Get a Specific Document
**Request:**
```json
{
  "documentId": "terms-of-service"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Documents list",
  "data": [
    {
      "uuid": "doc-uuid-1",
      "id": "terms-of-service",
      "name": "Terms of Service"
    }
  ],
  "errors": []
}
```

---

## Notes

- Returns metadata for all documents when no filter is provided
- Use `app/get-document-content` to retrieve the actual HTML content
- Documents are typically used for legal compliance (ToS, Privacy Policy)

---

## Source Files

- **DTO**: `src/documents/dto/get-client-all-documents.v2.dto.ts`
- **Controller**: `src/documents/documents.controller.ts`
- **Service**: `src/documents/documents.service.ts`
