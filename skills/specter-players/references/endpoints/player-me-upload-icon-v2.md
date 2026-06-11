# V2 API: `client/player/me/upload-icon`

**Endpoint:** `POST /v2/client/player/me/upload-icon`

**Authentication:** User Auth Guard Required

**Content-Type:** `multipart/form-data`

---

## Request Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | `file` | **Yes** | Image file to upload (multipart form data) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Icon uploaded successfully",
  "data": {
    "locationUrl": "https://cdn.example.com/org-123/app-456/players/user-789/icons/avatar.png"
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.locationUrl` | `string` | URL to the uploaded icon file |

---

## Request Example

**Request:**
```
POST /v2/client/player/me/upload-icon
Content-Type: multipart/form-data

file: [binary image data]
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Icon uploaded successfully",
  "data": {
    "locationUrl": "https://cdn.example.com/org-123/app-456/players/user-789/icons/profile.png"
  },
  "errors": []
}
```

---

## Notes

- Uploads a profile icon/avatar for the authenticated user
- Supports common image formats (PNG, JPG, JPEG, GIF)
- The file is uploaded to AWS S3 storage
- File path format: `org-{orgId}/app-{projectId}/players/{userId}/icons/{filename}`
- Replaces any existing profile icon with the same filename

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| File upload failed | Multipart form parsing failed or file missing |

---

## Source Files

- **Controller**: `src/aws/aws.controller.ts`
- **Service**: `src/aws/aws.service.ts`
