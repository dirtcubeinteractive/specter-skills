# V2 API: `client/player/get-reward-history`

**Endpoint:** `POST /v2/client/player/get-reward-history`

**Authentication:** Bearer Token Required (via `UseUserAuthGuard`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userId` | `string` | Yes | User ID of the player to fetch reward history for |
| `taskIds` | `string[]` | No | Filter by task IDs (source = task) |
| `taskGroupIds` | `string[]` | No | Filter by task group IDs |
| `levelIds` | `string[]` | No | Filter by level system IDs |
| `leaderboardIds` | `string[]` | No | Filter by leaderboard IDs |
| `competitionIds` | `string[]` | No | Filter by competition IDs |
| `battlepassTierLevelIds` | `string[]` | No | Filter by battlepass tier level IDs |
| `status` | `string` | No | Filter by reward status (e.g., `"completed"`, `"pending"`) |
| `rewardGrant` | `string` | No | Filter by grant mode (e.g., `"client"`, `"server"`) |
| `attributes` | `string[]` | No | Additional fields to include, e.g. `["rewardDetails"]` |
| `limit` | `number` | No | Pagination limit |
| `offset` | `number` | No | Pagination offset |

**Validation rule:** At most one of `taskIds`, `taskGroupIds`, `levelIds` may be provided (`IsTaskIdsOrTaskGroupIdsOrLevelIdsAndFiltersPresent` validator).

---

## Response Structure

**Request:**
```json
{
  "userId": "player-123",
  "attributes": ["rewardDetails"],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Player Reward history data",
  "errors": [],
  "data": [
    {
      "instanceId": "e515f8eb-9de9-4443-812c-155aa5c3e33d",
      "amount": 100,
      "status": "completed",
      "rewardGrant": "client",
      "sourceType": "task",
      "sourceId": "tsk_tgrp_00100_00023",
      "rewardDetails": {
        "currencies": {
          "instanceId": "e515f8eb-9de9-4443-812c-155aa5c3e33d",
          "uuid": 44,
          "id": "curr_skai",
          "name": "SKAI",
          "amount": 100
        }
      }
    }
  ]
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of reward history entries for the specified player |
| `data[].instanceId` | `string` | Reward history instance ID |
| `data[].amount` | `number` | Reward amount |
| `data[].status` | `string` | Reward status (e.g., `"completed"`, `"pending"`) |
| `data[].rewardGrant` | `string` | Grant mode (e.g., `"client"`, `"server"`) |
| `data[].sourceType` | `string` | Source of the reward (e.g., `"task"`, `"taskGroup"`, `"level"`, `"leaderboard"`, `"competition"`) |
| `data[].sourceId` | `string` | Client-facing ID of the source entity |
| `data[].rewardDetails` | `object` | Included with `attributes: ["rewardDetails"]` — reward contents keyed by type (e.g., `currencies`, `items`, `bundles`, `progressionMarkers`) |

---

## Notes

- Same behavior as `client/player/me/get-reward-history`, except the target player is specified by `userId` instead of being resolved from the bearer token.

---

## Source Files

- **DTO**: `src/task/dtos/get-player-reward-history.v2.dto.ts`
- **Controller**: `src/task/task.controller.ts` (`getPlayerRewardHistoryV2`)
- **Service**: `src/task/task.service.ts` (`getRewardHistoryV2`)
- **Swagger**: `src/task/task.swagger.ts` (`GetPlayerRewardHistoryV2SuccessResponse`)
