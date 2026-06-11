# V2 API: `client/player/update-data`

**Endpoint:** `POST /v2/client/player/update-data`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to update data for |
| `playerData` | `PlayerData[]` | Yes | Array of key-value pairs to update |

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

### Example 1: Update Another Player's Data
**Request:**
```json
{
  "userId": "player-123",
  "playerData": [
    {
      "key": "adminNotes",
      "value": {
        "note": "Verified player",
        "verifiedAt": "2025-12-01"
      }
    }
  ]
}
```
**Effect:** Updates data for player-123 with the provided key-value pair.

---

### Example 2: Update Multiple Keys
**Request:**
```json
{
  "userId": "player-123",
  "playerData": [
    {
      "key": "rewards",
      "value": {
        "bonus": 500,
        "reason": "Special event"
      }
    },
    {
      "key": "flags",
      "value": {
        "isPremium": true
      }
    }
  ]
}
```
**Effect:** Updates both "rewards" and "flags" keys for the specified player.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| userId not provided | Validation error |
| playerData not provided | Validation error |
| User not found | User not found |

---

## Source Files

- **DTO**: `src/users/dto/update-other-player-data.v2.dto.ts`
- **Controller**: `src/users/users.controller.ts:299-332`
- **Service**: `src/users/users.service.ts`
