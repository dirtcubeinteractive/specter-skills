# V2 API: `client/player/get-single-data`

**Endpoint:** `POST /v2/client/player/get-single-data`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | No | ID of the player to fetch data for; omit to fetch the authenticated user's own data |
| `keys` | `string[]` | No | Specific player-data keys to retrieve; omit to return all visible keys |

---

## Response Structure

`data` is a key-value map of player data. Each value is `{ value, permission }`.

- If `userId` is **omitted**, the authenticated user's own data is returned (both `public` and `private` keys).
- If `userId` is **provided**, only keys with `permission: "public"` are returned for that player.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Player Data",
  "data": {
    "settings": {
      "value": { "soundEnabled": true, "musicVolume": 80 },
      "permission": "private"
    },
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
| `data.<key>.value` | `any` | The stored value for the key |
| `data.<key>.permission` | `string` | Key visibility: `"public"` or `"private"` |

---

## Request Examples

### Example 1: Own Data (all keys)
**Request:**
```json
{}
```
**Effect:** Returns all of the authenticated user's player data, including private keys.

### Example 2: Another Player's Data
**Request:**
```json
{
  "userId": "player-123"
}
```
**Effect:** Returns only the public player-data keys of player `player-123`.

### Example 3: Specific Keys
**Request:**
```json
{
  "userId": "player-123",
  "keys": ["settings", "gameProgress"]
}
```
**Effect:** Returns only the requested keys, filtered to public ones.

---

## Notes

- Returns `404` with error code `1028` ("User not found") if `userId` does not match an active user in the project.
- A player with no (matching) data returns `data: {}`.

---

## Source Files

- **DTO**: `src/users/dto/get-player-data.dto.ts`
- **Controller**: `src/users/users.controller.ts:2610-2638`
- **Service**: `src/users/users.service.ts:1695-1772` (`getPlayerData`)
