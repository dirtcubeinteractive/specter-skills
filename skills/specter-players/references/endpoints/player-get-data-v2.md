# V2 API: `client/player/get-data`

**Endpoint:** `POST /v2/client/player/get-data`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userIds` | `string[]` | Yes | Array of user IDs to fetch player data for |
| `keys` | `string[]` | No | Specific player-data keys to retrieve; omit to return all (public) keys |

---

## Response Structure

`data` is an **array** with one entry per found user. Since other players' data is being read, only keys with `permission: "public"` are returned.

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Get Multiple Players Data",
  "data": [
    {
      "userId": "player-123",
      "userData": {
        "publicProfile": {
          "value": { "bio": "Pro gamer", "level": 25 },
          "permission": "public"
        }
      }
    },
    {
      "userId": "player-456",
      "userData": {
        "publicProfile": {
          "value": { "bio": "Casual player", "level": 10 },
          "permission": "public"
        }
      }
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data[].userId` | `string` | The player's user ID |
| `data[].userData` | `object` | Key-value map of player data; each value is `{ value, permission }` |
| `userData.<key>.value` | `any` | The stored value for the key |
| `userData.<key>.permission` | `string` | Key visibility — always `"public"` here, since private keys of other players are filtered out |

---

## Request Examples

### Example 1: All Public Data for Multiple Players
**Request:**
```json
{
  "userIds": ["player-123", "player-456"]
}
```
**Effect:** Returns all public player-data keys for each found user.

### Example 2: Specific Keys
**Request:**
```json
{
  "userIds": ["player-123", "player-456"],
  "keys": ["publicProfile", "stats"]
}
```
**Effect:** Returns only the requested keys (if public) per user.

---

## Notes

- Users that do not exist (or are inactive) in the project are silently omitted from the response array.
- A user with no matching keys returns `userData: {}`.

---

## Source Files

- **DTO**: `src/users/dto/get-multiple-players-data.dto.ts`
- **Controller**: `src/users/users.controller.ts:2640-2667`
- **Service**: `src/users/users.service.ts:1774-1849` (`getMultiplePlayersData`)
