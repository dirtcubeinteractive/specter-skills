# V2 API: `client/party/get-details`

**Endpoint:** `POST /v2/client/party/get-details`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `partyId` | `string` | **Yes** | The ID of the party |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Party details fetched successfully",
  "data": {
    "party": {
      "partyId": "party-uuid-123",
      "leader": "player-uuid-123",
      "members": [
        {
          "userId": "player-uuid-123",
          "mmr": 1500,
          "joinedAt": 1704067200000,
          "isReady": true
        },
        {
          "userId": "player-uuid-456",
          "mmr": 1450,
          "joinedAt": 1704067300000,
          "isReady": false
        }
      ],
      "type": "cooperative",
      "maxSize": 4,
      "state": "idle",
      "createdAt": 1704067200000,
      "updatedAt": 1704067300000,
      "inviteCode": "ABC123",
      "currentQueue": null
    }
  },
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data.party` | `object` | Party details object |
| `party.partyId` | `string` | Unique party identifier |
| `party.leader` | `string` | User ID of the party leader |
| `party.members` | `array` | Array of party members |
| `members[].userId` | `string` | Member's user ID |
| `members[].mmr` | `number` | Member's matchmaking rating |
| `members[].joinedAt` | `number` | Unix timestamp (milliseconds) when member joined |
| `members[].isReady` | `boolean` | Whether member is ready for matchmaking |
| `party.type` | `string` | Party type: "cooperative" or "private" |
| `party.maxSize` | `number` | Maximum party size |
| `party.state` | `string` | Party state: "idle", "queuing", or "in_match" |
| `party.createdAt` | `number` | Unix timestamp (milliseconds) of creation |
| `party.updatedAt` | `number` | Unix timestamp (milliseconds) of last update |
| `party.inviteCode` | `string` | Invite code for joining the party (optional) |
| `party.currentQueue` | `object \| null` | Queue info if party is queuing, null otherwise |
| `currentQueue.region` | `string` | Region for matchmaking (if queuing) |
| `currentQueue.queuedAt` | `number` | Unix timestamp when party joined queue (if queuing) |

---

## Request/Response Examples

### Example 1: Get Party Details (Idle State)
**Request:**
```json
{
  "partyId": "party-uuid-123"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Party details fetched successfully",
  "data": {
    "party": {
      "partyId": "party-uuid-123",
      "leader": "player-uuid-123",
      "members": [
        {
          "userId": "player-uuid-123",
          "mmr": 1500,
          "joinedAt": 1704067200000,
          "isReady": true
        },
        {
          "userId": "player-uuid-456",
          "mmr": 1450,
          "joinedAt": 1704067300000,
          "isReady": false
        }
      ],
      "type": "cooperative",
      "maxSize": 4,
      "state": "idle",
      "createdAt": 1704067200000,
      "updatedAt": 1704067300000,
      "inviteCode": "ABC123",
      "currentQueue": null
    }
  },
  "errors": []
}
```

### Example 2: Party in Matchmaking Queue
**Request:**
```json
{
  "partyId": "party-uuid-456"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Party details fetched successfully",
  "data": {
    "party": {
      "partyId": "party-uuid-456",
      "leader": "player-uuid-789",
      "members": [
        {
          "userId": "player-uuid-789",
          "mmr": 1600,
          "joinedAt": 1704070000000,
          "isReady": true
        },
        {
          "userId": "player-uuid-101",
          "mmr": 1550,
          "joinedAt": 1704070100000,
          "isReady": true
        }
      ],
      "type": "cooperative",
      "maxSize": 4,
      "state": "queuing",
      "createdAt": 1704070000000,
      "updatedAt": 1704070500000,
      "inviteCode": "XYZ789",
      "currentQueue": {
        "region": "us-east",
        "queuedAt": 1704070500000
      }
    }
  },
  "errors": []
}
```

### Example 3: Private Party
**Request:**
```json
{
  "partyId": "party-uuid-789"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Party details fetched successfully",
  "data": {
    "party": {
      "partyId": "party-uuid-789",
      "leader": "player-uuid-111",
      "members": [
        {
          "userId": "player-uuid-111",
          "mmr": 1200,
          "joinedAt": 1704080000000,
          "isReady": true
        }
      ],
      "type": "private",
      "maxSize": 2,
      "state": "idle",
      "createdAt": 1704080000000,
      "updatedAt": 1704080000000,
      "inviteCode": "PRIV001",
      "currentQueue": null
    }
  },
  "errors": []
}
```

---

## Notes

- Party data is stored in Redis for fast access
- `state` indicates current party activity: "idle" (not queuing), "queuing" (in matchmaking), "in_match" (match found)
- `type` can be "cooperative" (open to invites) or "private" (invite code required)
- `currentQueue` is populated only when party state is "queuing"
- All members must be ready (`isReady: true`) before the party leader can start matchmaking
- `mmr` represents each member's matchmaking rating for skill-based matching

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Party not found | The specified partyId does not exist |

---

## Source Files

- **DTO**: `src/party/dto/party-action.dto.ts`
- **Controller**: `src/party/party.controller.ts`
- **Service**: `src/party/party.service.ts`
- **Interface**: `src/party/party.interface.ts`
