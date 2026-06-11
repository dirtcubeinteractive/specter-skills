# V2 API: `client/app/get-info`

**Endpoint:** `POST /v2/client/app/get-info`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Description |
|-------|------|-------------|
| `attributes` | `string[]` | Optional - select which attributes to include in response |

---

## Response Structure

### Wrapper Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get App Information",
  "data": {...},
  "errors": []
}
```

---

## Base Response (No Attributes)

When no `attributes` are specified, the response returns only these fields:

```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My App",
  "iconUrl": "https://cdn.example.com/icon.png",
  "description": "App description"
}
```

---

## How Each Attribute Changes Response

### `attributes: ["howTo"]`
Adds how-to instructions:
```json
{
  ...base fields...,
  "howTo": "Instructions on how to use the app..."
}
```

---

### `attributes: ["screenshotUrls"]`
Adds screenshot URLs array:
```json
{
  ...base fields...,
  "screenshotUrls": [
    "https://cdn.example.com/screenshot1.png",
    "https://cdn.example.com/screenshot2.png"
  ]
}
```

---

### `attributes: ["videoUrls"]`
Adds video URLs array:
```json
{
  ...base fields...,
  "videoUrls": [
    "https://cdn.example.com/preview.mp4"
  ]
}
```

---

### `attributes: ["meta"]`
Adds metadata object:
```json
{
  ...base fields...,
  "meta": {
    "customField1": "value1",
    "customField2": 123
  }
}
```

---

### `attributes: ["tags"]`
Adds tags array (tag names only):
```json
{
  ...base fields...,
  "tags": ["featured", "premium", "new"]
}
```

---

### `attributes: ["categories"]`
Adds category object:
```json
{
  ...base fields...,
  "categories": {
    "id": "category-uuid",
    "name": "Gaming"
  }
}
```
*Note: Returns `null` if no category is assigned.*

---

### `attributes: ["platforms"]`
Adds platforms array with asset bundle info:
```json
{
  ...base fields...,
  "platforms": [
    {
      "id": "platform-uuid-1",
      "name": "iOS",
      "assetBundleUrl": "https://cdn.example.com/ios-bundle.zip",
      "assetBundleVersion": "1.2.0",
      "minimumAppVersion": "2.0.0"
    },
    {
      "id": "platform-uuid-2",
      "name": "Android",
      "assetBundleUrl": "https://cdn.example.com/android-bundle.zip",
      "assetBundleVersion": "1.2.0",
      "minimumAppVersion": "2.0.0"
    }
  ]
}
```

---

### `attributes: ["locations"]`
Adds locations/countries array:
```json
{
  ...base fields...,
  "locations": [
    {
      "id": "country-uuid-1",
      "name": "United States"
    },
    {
      "id": "country-uuid-2",
      "name": "Canada"
    }
  ]
}
```

---

### `attributes: ["genre"]`
Adds genres array (note: response key is `genres`):
```json
{
  ...base fields...,
  "genres": [
    {
      "id": "genre-uuid-1",
      "name": "Action"
    },
    {
      "id": "genre-uuid-2",
      "name": "Adventure"
    }
  ]
}
```

---

## Combining Multiple Attributes

### Request
```json
{
  "attributes": ["tags", "platforms", "categories"]
}
```

### Response
```json
{
  "uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "My App",
  "iconUrl": "https://cdn.example.com/icon.png",
  "description": "App description",
  "tags": ["featured", "premium"],
  "platforms": [
    {
      "id": "platform-uuid",
      "name": "iOS",
      "assetBundleUrl": "https://...",
      "assetBundleVersion": "1.0.0",
      "minimumAppVersion": "2.0.0"
    }
  ],
  "categories": {
    "id": "category-uuid",
    "name": "Gaming"
  }
}
```

---

## Complete Request/Response Examples

### Example 1: Minimal Request
**Request:**
```json
{}
```
**Response:** App info with base fields only.

---

### Example 2: Full Attributes
**Request:**
```json
{
  "attributes": ["howTo", "screenshotUrls", "videoUrls", "meta", "tags", "categories", "platforms", "locations", "genre"]
}
```
**Response:** App info with ALL optional fields included.

---

## Source Files

- **DTO**: `src/project/dto/get-app-info.v2.dto.ts`
- **Controller**: `src/project/project.controller.ts:541-570`
- **Service**: `src/project/project.service.ts:1642-1754`
