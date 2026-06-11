# V2 API: `client/app/welcome`

**Endpoint:** `POST /v2/client/app/welcome`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| - | - | - | No request body required |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Congratulations! You made your first API call!",
  "data": [],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Empty array |

---

## Request Examples

### Example 1: Test API Connection
**Request:**
```json
{}
```

---

## Notes

- This is a simple test endpoint to verify API connectivity
- Returns a success message when the API key is valid
- Useful for health checks and initial SDK integration testing
- No authentication required beyond a valid API key

---

## Source Files

- **Controller**: `src/project/project.controller.ts`
