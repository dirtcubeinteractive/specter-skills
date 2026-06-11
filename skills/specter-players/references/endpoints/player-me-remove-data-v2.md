# V2 API: `client/player/me/remove-data`

**Endpoint:** `POST /v2/client/player/me/remove-data`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `keysToRemove` | `string[]` | Yes | Array of player-data keys to remove from the authenticated user's data |

---

## Response Structure

`data` is a key-value map of the **removed** entries (the data as it was before deletion). Each value is `{ value, permission }`.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Data removed successfully",
  "data": {
    "gameProgress": {
      "value": { "lastLevel": 15, "stars": 42 },
      "permission": "private"
    }
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.<key>` | `object` | The removed entry, echoed back as `{ value, permission }` |
| `data.<key>.value` | `any` | The value the key held before removal |
| `data.<key>.permission` | `string` | Key visibility: `"public"` or `"private"` |

---

## Request Examples

### Example 1: Remove a Single Key
**Request:**
```json
{
  "keysToRemove": ["gameProgress"]
}
```
**Effect:** Removes `gameProgress` from the user's player data and returns the removed entry.

### Example 2: Remove Multiple Keys
**Request:**
```json
{
  "keysToRemove": ["gameProgress", "settings"]
}
```
**Effect:** Removes both keys and returns the removed entries.

---

## Notes

- Returns `404` with error code `1129` ("No matching keys found to remove") if none of the requested keys exist on the user's player data.
- Removal is persisted immediately via an update to the user's `playerData`.

---

## Source Files

- **DTO**: `src/users/dto/remove-player-data.dto.ts`
- **Controller**: `src/users/users.controller.ts:2669-2697`
- **Service**: `src/users/users.service.ts:1591-1626` (`removePlayerDataV2`)
