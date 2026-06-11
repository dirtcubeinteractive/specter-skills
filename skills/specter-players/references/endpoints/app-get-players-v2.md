# V2 API: `client/app/get-players`

**Endpoint:** `POST /v2/client/app/get-players`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `filters` | `array` | No | Array of filter objects to search players |
| `filters[].type` | `string` | **Yes** | Filter type: "username", "firstName", "lastName", "email", "customId", "displayName" |
| `filters[].value` | `string` | **Yes** | Value to filter by (partial match) |
| `limit` | `number` | No | Number of players to return (default: 10) |
| `offset` | `number` | No | Pagination offset (default: 0) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Players List",
  "data": [
    {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "username": "player123",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "email": "player123@example.com"
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of player objects |
| `[].uuid` | `string` | Unique identifier (internal ID) |
| `[].id` | `string` | Player ID (same as uuid) |
| `[].displayName` | `string` | Player's display name |
| `[].firstName` | `string` | Player's first name |
| `[].lastName` | `string` | Player's last name |
| `[].username` | `string` | Player's username |
| `[].thumbUrl` | `string` | URL to player's avatar/thumbnail |
| `[].email` | `string` | Player's email address |

---

## Request/Response Examples

### Example 1: Get All Players (Paginated)
**Request:**
```json
{
  "limit": 20,
  "offset": 0
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Players List",
  "data": [
    {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "username": "player123",
      "thumbUrl": "https://cdn.example.com/avatar1.png",
      "email": "player123@example.com"
    },
    {
      "uuid": "user-uuid-2",
      "id": "user-uuid-2",
      "displayName": "Gamer Four",
      "firstName": "Jane",
      "lastName": "Smith",
      "username": "gamer456",
      "thumbUrl": "https://cdn.example.com/avatar2.png",
      "email": "gamer456@example.com"
    }
  ],
  "errors": []
}
```

### Example 2: Search by Username
**Request:**
```json
{
  "filters": [
    {
      "type": "username",
      "value": "player"
    }
  ],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Players List",
  "data": [
    {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "username": "player123",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "email": "player123@example.com"
    }
  ],
  "errors": []
}
```

### Example 3: Search by Email
**Request:**
```json
{
  "filters": [
    {
      "type": "email",
      "value": "example.com"
    }
  ]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Players List",
  "data": [
    {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "username": "player123",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "email": "player123@example.com"
    }
  ],
  "errors": []
}
```

### Example 4: Multiple Filters
**Request:**
```json
{
  "filters": [
    {
      "type": "firstName",
      "value": "John"
    },
    {
      "type": "lastName",
      "value": "Doe"
    }
  ],
  "limit": 50,
  "offset": 0
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Players List",
  "data": [
    {
      "uuid": "user-uuid-1",
      "id": "user-uuid-1",
      "displayName": "Player One",
      "firstName": "John",
      "lastName": "Doe",
      "username": "player123",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "email": "player123@example.com"
    }
  ],
  "errors": []
}
```

---

## Filter Types

| Type | Description |
|------|-------------|
| `username` | Filter by username (partial match, case-insensitive) |
| `firstName` | Filter by first name (partial match, case-insensitive) |
| `lastName` | Filter by last name (partial match, case-insensitive) |
| `email` | Filter by email address (partial match, case-insensitive) |
| `customId` | Filter by custom identifier (partial match, case-insensitive) |
| `displayName` | Filter by display name (partial match, case-insensitive) |

---

## Notes

- Returns array of players directly in `data` (not wrapped in `data.players`)
- Only returns active players
- Multiple filters are combined with OR logic
- All filter types support partial matching (case-insensitive)
- Results are ordered by last updated date (descending)
- This is a server-side endpoint for player management/lookup

---

## Source Files

- **DTO**: `src/users/dto/get-player.v2.dto.ts`
- **Controller**: `src/users/users.controller.ts`
- **Service**: `src/users/users.service.ts`
