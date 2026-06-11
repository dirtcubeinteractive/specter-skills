# V2 API: `client/matchmaking/server-ready`

**Endpoint:** `POST /v2/client/matchmaking/server-ready`

**Authentication:** API Key Required (No User Auth)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchSessionId` | `string` | **Yes** | The match session ID the server is ready for |
| `serverInfo` | `object` | **Yes** | Server connection information |
| `serverInfo.host` | `string` | **Yes** | Server host address |
| `serverInfo.port` | `number` | **Yes** | Server port number |
| `serverInfo.transportType` | `string` | No | Transport protocol type (e.g., "udp", "tcp") |
| `roomId` | `string` | No | Room ID for the match (optional) |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Server is ready",
  "data": [],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Empty array on success |

---

## Request Examples

### Example 1: Server Ready with Basic Info
**Request:**
```json
{
  "matchSessionId": "match-session-uuid-12345",
  "serverInfo": {
    "host": "192.168.1.100",
    "port": 7777
  }
}
```

### Example 2: Server Ready with Full Details
**Request:**
```json
{
  "matchSessionId": "match-session-uuid-12345",
  "serverInfo": {
    "host": "game-server-01.example.com",
    "port": 7777,
    "transportType": "udp"
  },
  "roomId": "room-abc-123"
}
```

---

## Notes

- This endpoint is called by the game server (not by players)
- Notifies the system that the game server is ready to accept player connections
- After this is called, players receive the server connection details
- Used in dedicated server orchestration workflows
- No user authentication required - uses API key authentication

---

## Source Files

- **DTO**: `src/matchmaking/dto/server-ready.dto.ts`
- **Controller**: `src/matchmaking/matchmaking.controller.ts`
- **Service**: `src/matchmaking/matchmaking.service.ts`
