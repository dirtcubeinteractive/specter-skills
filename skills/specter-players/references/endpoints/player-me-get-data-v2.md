# V2 API: `client/player/me/get-data`

**Endpoint:** `POST /v2/client/player/me/get-data`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `keys` | `string[]` | Specific data keys to retrieve. If not provided, returns all data. |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My Player Data",
  "data": {
    "playerData": {
      "settings": {
        "soundEnabled": true,
        "musicVolume": 80
      },
      "preferences": {
        "theme": "dark",
        "language": "en"
      },
      "gameProgress": {
        "lastLevel": 15,
        "stars": 42
      }
    }
  },
  "errors": []
}
```

---

## Request Examples

### Example 1: Get All Data
**Request:**
```json
{}
```
**Effect:** Returns all player data keys and values.

---

### Example 2: Get Specific Keys
**Request:**
```json
{
  "keys": ["settings", "gameProgress"]
}
```
**Effect:** Returns only "settings" and "gameProgress" data.

---

### Example 3: Get Single Key
**Request:**
```json
{
  "keys": ["preferences"]
}
```
**Effect:** Returns only "preferences" data.

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "My Player Data",
  "data": {
    "playerData": {
      "preferences": {
        "theme": "dark",
        "language": "en"
      }
    }
  },
  "errors": []
}
```

---

## Source Files

- **DTO**: `src/users/dto/get-player-data.dto.ts`
- **Controller**: `src/users/users.controller.ts:2155-2177`
- **Service**: `src/users/users.service.ts`
