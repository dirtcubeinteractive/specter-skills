# V2 API: `client/player/remove-data`

**Endpoint:** `POST /v2/client/player/remove-data`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | The user ID of the player to remove data from |
| `keysToRemove` | `string[]` | Yes | Array of data keys to remove |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Data removed successfully",
  "data": {},
  "errors": []
}
```

---

## Request Examples

### Example 1: Remove Single Key
**Request:**
```json
{
  "userId": "player-123",
  "keysToRemove": ["tempSettings"]
}
```
**Effect:** Removes the "tempSettings" key from player-123's data.

---

### Example 2: Remove Multiple Keys
**Request:**
```json
{
  "userId": "player-123",
  "keysToRemove": ["oldPreferences", "deprecatedData", "tempCache"]
}
```
**Effect:** Removes all three specified keys from the player's data.

---

## Error Cases

| Scenario | Error Message |
|----------|---------------|
| userId not provided | Validation error |
| keysToRemove not provided | Validation error |
| User not found | User not found |
| Key does not exist | Key not found (or silently ignored) |

---

## Source Files

- **DTO**: `src/users/dto/remove-other-player-data.v2.dto.ts`
- **Controller**: `src/users/users.controller.ts:334-362`
- **Service**: `src/users/users.service.ts`
