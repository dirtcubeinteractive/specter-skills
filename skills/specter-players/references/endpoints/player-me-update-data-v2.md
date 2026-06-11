# V2 API: `client/player/me/update-data`

**Endpoint:** `POST /v2/client/player/me/update-data`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `playerData` | `PlayerData[]` | Yes | Array of key-value pairs to update |
| `permission` | `string` | No | Permission level for the data (e.g., "public", "private") |

### PlayerData Object
| Field | Type | Description |
|-------|------|-------------|
| `key` | `string` | The data key to update |
| `value` | `object` | The value to set (can be any JSON object) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Data Updated Successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Update Single Key
**Request:**
```json
{
  "playerData": [
    {
      "key": "settings",
      "value": {
        "soundEnabled": true,
        "musicVolume": 80
      }
    }
  ]
}
```
**Effect:** Creates or updates the "settings" key with the provided value.

---

### Example 2: Update Multiple Keys
**Request:**
```json
{
  "playerData": [
    {
      "key": "preferences",
      "value": {
        "theme": "dark",
        "language": "en"
      }
    },
    {
      "key": "gameProgress",
      "value": {
        "lastLevel": 15,
        "stars": 42
      }
    }
  ]
}
```
**Effect:** Updates both "preferences" and "gameProgress" keys.

---

### Example 3: With Permission Level
**Request:**
```json
{
  "playerData": [
    {
      "key": "publicProfile",
      "value": {
        "bio": "Pro gamer",
        "favoriteGame": "Chess"
      }
    }
  ],
  "permission": "public"
}
```
**Effect:** Updates data with public permission (visible to other players).

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| playerData not provided | Validation error |
| Invalid key format | Key must be a string |
| Value is not an object | Value must be an object |

---

## Source Files

- **DTO**: `src/users/dto/update-player-data.dto.ts`
- **Controller**: `src/users/users.controller.ts:271-297`
- **Service**: `src/users/users.service.ts`
