# V2 API: `client/app/get-matches`

**Endpoint:** `POST /v2/client/app/get-matches`

**Authentication:** API Key Required (via `GetProjectIdFromApikey`)

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `matchIds` | `string[]` | No | Array of match IDs to filter by |
| `gameIds` | `string[]` | No | Array of game IDs to filter by |
| `attributes` | `string[]` | No | Array of attributes to include in response |
| `offset` | `number` | No | Pagination offset (default: 0) |
| `limit` | `number` | No | Number of matches to return (default: 10) |
| `search` | `string` | No | Search keyword for match names |
| `includeTags` | `string[]` | No | Filter matches that have these tags |

**Note:** Cannot use both `gameIds` and `matchIds` in the same request.

---

## Available Attributes

Use the `attributes` array in the request to include additional fields in the response:

| Attribute | Description | Fields Added |
|-----------|-------------|--------------|
| `meta` | Custom metadata | `meta: {}` |
| `tags` | Associated tags | `tags: ["tag1", "tag2"]` |
| `leaderboards` | Linked leaderboards | `leaderboards: [{ uuid, id, name, description, iconUrl }]` |
| `competitions` | Linked competitions | `competitions: [{ uuid, id, name, description, iconUrl }]` |
| `config` | Match configuration | `config: { matchmaking, runtime, skill, queue, priority, party, team, orchestration, crossRegionEnabled, regions }` |

---

## Response Structure

### Base Response (without attributes)
```json
{
  "status": "success",
  "code": 200,
  "message": "Matches list",
  "data": [
    {
      "uuid": "match-internal-uuid",
      "id": "battle-royale-1v1",
      "name": "1v1 Battle Royale",
      "description": "Fast-paced 1v1 battle royale match",
      "iconUrl": "https://cdn.example.com/match-icon.png",
      "game": {
        "uuid": "game-internal-uuid",
        "id": "battle-royale-game",
        "name": "Battle Royale",
        "description": "Epic battle royale game",
        "iconUrl": "https://cdn.example.com/game-icon.png"
      },
      "minPlayers": 2,
      "maxPlayers": 2,
      "formatType": {
        "id": 1,
        "name": "1v1"
      },
      "outcomeType": {
        "id": 1,
        "name": "score"
      },
      "winCondition": {
        "id": 1,
        "name": "highest_score"
      }
    }
  ],
  "errors": []
}
```

---

## Response Fields Explained

### Base Fields (always returned)

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Array of match objects |
| `[].uuid` | `string` | Unique identifier (internal ID) |
| `[].id` | `string` | Match ID (client-facing) |
| `[].name` | `string` | Match display name |
| `[].description` | `string` | Match description |
| `[].iconUrl` | `string` | URL to match icon |
| `[].game` | `object` | Associated game details |
| `[].game.uuid` | `string` | Game internal ID |
| `[].game.id` | `string` | Game ID (client-facing) |
| `[].game.name` | `string` | Game name |
| `[].game.description` | `string` | Game description |
| `[].game.iconUrl` | `string` | Game icon URL |
| `[].minPlayers` | `number` | Minimum players required |
| `[].maxPlayers` | `number` | Maximum players allowed |
| `[].formatType` | `object` | Format type `{ id, name }` |
| `[].outcomeType` | `object` | Outcome type `{ id, name }` |
| `[].winCondition` | `object` | Win condition `{ id, name }` |

### Conditional Fields (based on `attributes` parameter)

| Field | Type | Attribute Required | Description |
|-------|------|-------------------|-------------|
| `[].meta` | `object` | `"meta"` | Custom metadata object |
| `[].tags` | `array` | `"tags"` | Array of tag names |
| `[].leaderboards` | `array` | `"leaderboards"` | Linked leaderboards |
| `[].leaderboards[].uuid` | `string` | `"leaderboards"` | Leaderboard internal ID |
| `[].leaderboards[].id` | `string` | `"leaderboards"` | Leaderboard ID (client-facing) |
| `[].leaderboards[].name` | `string` | `"leaderboards"` | Leaderboard name |
| `[].leaderboards[].description` | `string` | `"leaderboards"` | Leaderboard description |
| `[].leaderboards[].iconUrl` | `string` | `"leaderboards"` | Leaderboard icon URL |
| `[].competitions` | `array` | `"competitions"` | Linked competitions |
| `[].competitions[].uuid` | `string` | `"competitions"` | Competition internal ID |
| `[].competitions[].id` | `string` | `"competitions"` | Competition ID (client-facing) |
| `[].competitions[].name` | `string` | `"competitions"` | Competition name |
| `[].competitions[].description` | `string` | `"competitions"` | Competition description |
| `[].competitions[].iconUrl` | `string` | `"competitions"` | Competition icon URL |
| `[].config` | `object` | `"config"` | Match configuration |
| `[].config.matchmaking` | `object` | `"config"` | Matchmaking settings |
| `[].config.runtime` | `object` | `"config"` | Runtime settings |
| `[].config.skill` | `object` | `"config"` | Skill-based settings |
| `[].config.queue` | `object` | `"config"` | Queue settings |
| `[].config.priority` | `object` | `"config"` | Priority settings |
| `[].config.party` | `object` | `"config"` | Party settings |
| `[].config.team` | `object` | `"config"` | Team settings |
| `[].config.orchestration` | `object` | `"config"` | Orchestration settings |
| `[].config.crossRegionEnabled` | `boolean` | `"config"` | Cross-region enabled flag |
| `[].config.regions` | `array` | `"config"` | Available regions `[{ id, name, code }]` |

---

## Request/Response Examples

### Example 1: Basic Request (no attributes)
**Request:**
```json
{}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Matches list",
  "data": [
    {
      "uuid": "match-uuid-1",
      "id": "battle-royale-1v1",
      "name": "1v1 Battle Royale",
      "description": "Fast-paced 1v1 battle royale match",
      "iconUrl": "https://cdn.example.com/match-icon.png",
      "game": {
        "uuid": "game-uuid-1",
        "id": "battle-royale-game",
        "name": "Battle Royale",
        "description": "Epic battle royale game",
        "iconUrl": "https://cdn.example.com/game-icon.png"
      },
      "minPlayers": 2,
      "maxPlayers": 2,
      "formatType": {
        "id": 1,
        "name": "1v1"
      },
      "outcomeType": {
        "id": 1,
        "name": "score"
      },
      "winCondition": {
        "id": 1,
        "name": "highest_score"
      }
    }
  ],
  "errors": []
}
```

### Example 2: With Tags and Meta Attributes
**Request:**
```json
{
  "attributes": ["tags", "meta"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Matches list",
  "data": [
    {
      "uuid": "match-uuid-1",
      "id": "battle-royale-1v1",
      "name": "1v1 Battle Royale",
      "description": "Fast-paced 1v1 battle royale match",
      "iconUrl": "https://cdn.example.com/match-icon.png",
      "game": {
        "uuid": "game-uuid-1",
        "id": "battle-royale-game",
        "name": "Battle Royale",
        "description": "Epic battle royale game",
        "iconUrl": "https://cdn.example.com/game-icon.png"
      },
      "minPlayers": 2,
      "maxPlayers": 2,
      "formatType": {
        "id": 1,
        "name": "1v1"
      },
      "outcomeType": {
        "id": 1,
        "name": "score"
      },
      "winCondition": {
        "id": 1,
        "name": "highest_score"
      },
      "meta": {
        "mode": "competitive",
        "season": 1
      },
      "tags": ["ranked", "1v1", "competitive"]
    }
  ],
  "errors": []
}
```

### Example 3: With Leaderboards and Competitions Attributes
**Request:**
```json
{
  "attributes": ["leaderboards", "competitions"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Matches list",
  "data": [
    {
      "uuid": "match-uuid-1",
      "id": "battle-royale-1v1",
      "name": "1v1 Battle Royale",
      "description": "Fast-paced 1v1 battle royale match",
      "iconUrl": "https://cdn.example.com/match-icon.png",
      "game": {
        "uuid": "game-uuid-1",
        "id": "battle-royale-game",
        "name": "Battle Royale",
        "description": "Epic battle royale game",
        "iconUrl": "https://cdn.example.com/game-icon.png"
      },
      "minPlayers": 2,
      "maxPlayers": 2,
      "formatType": {
        "id": 1,
        "name": "1v1"
      },
      "outcomeType": {
        "id": 1,
        "name": "score"
      },
      "winCondition": {
        "id": 1,
        "name": "highest_score"
      },
      "leaderboards": [
        {
          "uuid": "leaderboard-uuid-1",
          "id": "global-ranking",
          "name": "Global Ranking",
          "description": "Worldwide player rankings",
          "iconUrl": "https://cdn.example.com/leaderboard.png"
        }
      ],
      "competitions": [
        {
          "uuid": "competition-uuid-1",
          "id": "weekly-tournament",
          "name": "Weekly Tournament",
          "description": "Weekly competitive tournament",
          "iconUrl": "https://cdn.example.com/tournament.png"
        }
      ]
    }
  ],
  "errors": []
}
```

### Example 4: With Config Attribute
**Request:**
```json
{
  "attributes": ["config"]
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Matches list",
  "data": [
    {
      "uuid": "match-uuid-1",
      "id": "battle-royale-1v1",
      "name": "1v1 Battle Royale",
      "description": "Fast-paced 1v1 battle royale match",
      "iconUrl": "https://cdn.example.com/match-icon.png",
      "game": {
        "uuid": "game-uuid-1",
        "id": "battle-royale-game",
        "name": "Battle Royale",
        "description": "Epic battle royale game",
        "iconUrl": "https://cdn.example.com/game-icon.png"
      },
      "minPlayers": 2,
      "maxPlayers": 2,
      "formatType": {
        "id": 1,
        "name": "1v1"
      },
      "outcomeType": {
        "id": 1,
        "name": "score"
      },
      "winCondition": {
        "id": 1,
        "name": "highest_score"
      },
      "config": {
        "matchmaking": {
          "backfillEnabled": false,
          "isMatchmakingEnabled": true,
          "matchDurationMinutes": null,
          "reconnectGracePeriod": 30,
          "spectatorModeEnabled": true
        },
        "runtime": {
          "pauseEnabled": false,
          "maxDurationMinutes": 10,
          "maxPausesPerPlayer": null,
          "enableRunTimeConfig": true,
          "endingWarningSeconds": 10,
          "minPlayersPercentage": 50,
          "pauseCooldownSeconds": null,
          "pauseDurationSeconds": null,
          "startCountdownSeconds": 10,
          "inactiveTimeoutMinutes": 30,
          "statsUpdateIntervalSeconds": 10
        },
        "skill": {
          "algorithmConfig": {
            "beta": null,
            "kFactor": null,
            "maximumMMR": 3000,
            "minimumMMR": 100,
            "newPlayerK": null,
            "initialMean": null,
            "kFactorType": "tiered",
            "startingMMR": 100,
            "ratingPeriod": null,
            "expertKFactor": 10,
            "expertLevelTo": 3000,
            "initialRating": null,
            "skillTemplate": "Custom",
            "dynamicsFactor": null,
            "newPlayerGames": null,
            "ratingTemplate": "Custom",
            "systemConstant": null,
            "beginnerKFactor": 40,
            "beginnerLevelTo": 1000,
            "drawProbability": null,
            "expertLevelFrom": 2001,
            "ratingAlgorithm": "standard_elo",
            "skillTemplateId": null,
            "ratingTemplateId": null,
            "beginnerLevelFrom": 100,
            "initialVolatility": null,
            "establishedPlayerK": null,
            "intermediateKFactor": 20,
            "intermediateLevelTo": 2000,
            "intermediateLevelFrom": 1001,
            "initialRatingDeviation": null,
            "initialStandardDeviation": null,
            "conservativeSkillEstimate": null
          },
          "initialMmrRange": 100,
          "maximumMmrRange": 300,
          "skillBasedEnabled": true,
          "mmrExpansionAmount": 50,
          "mmrExpansionInterval": 10
        },
        "queue": {
          "declinePenaltySeconds": 30,
          "maximumQueueTimeSeconds": 60,
          "noResponsePenaltySeconds": 30,
          "acceptMatchTimeoutSeconds": 120
        },
        "priority": {
          "priorityEnabled": true
        },
        "party": {
          "maxPartySize": 10,
          "partiesAllowed": true,
          "preferPartyVsParty": true
        },
        "team": {
          "teamSize": 2,
          "numberOfTeams": 2,
          "allowUnevenTeams": false,
          "teamFormationMethod": "matchmaking_balanced",
          "teamBalancingAlgorithm": "snake_draft"
        },
        "orchestration": {
          "enabled": true,
          "provider": "hathora"
        },
        "crossRegionEnabled": false,
        "regions": [
          {
            "id": 2,
            "name": "US East (Ohio)",
            "code": "us-east-2"
          },
          {
            "id": 14,
            "name": "Asia Pacific (Mumbai)",
            "code": "ap-south-1"
          },
          {
            "id": 1,
            "name": "US East (N. Virginia)",
            "code": "us-east-1"
          }
        ]
      }
    }
  ],
  "errors": []
}
```

### Example 5: Filter by Game IDs with Tags
**Request:**
```json
{
  "gameIds": ["battle-royale-game"],
  "includeTags": ["ranked"],
  "attributes": ["tags"],
  "limit": 10
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Matches list",
  "data": [
    {
      "uuid": "match-uuid-1",
      "id": "battle-royale-1v1",
      "name": "1v1 Battle Royale",
      "description": "Fast-paced 1v1 battle royale match",
      "iconUrl": "https://cdn.example.com/match-icon.png",
      "game": {
        "uuid": "game-uuid-1",
        "id": "battle-royale-game",
        "name": "Battle Royale",
        "description": "Epic battle royale game",
        "iconUrl": "https://cdn.example.com/game-icon.png"
      },
      "minPlayers": 2,
      "maxPlayers": 2,
      "formatType": {
        "id": 1,
        "name": "1v1"
      },
      "outcomeType": {
        "id": 1,
        "name": "score"
      },
      "winCondition": {
        "id": 1,
        "name": "highest_score"
      },
      "tags": ["ranked", "1v1"]
    }
  ],
  "errors": []
}
```

---

## Notes

- Returns array of matches directly in `data` (not wrapped in `data.matches`)
- Cannot use both `gameIds` and `matchIds` in the same request
- Use `includeTags` to filter matches that have specific tags
- Use `attributes` to control which additional fields are included
- Search is case-insensitive and matches by name

---

## Source Files

- **DTO**: `src/matches/dtos/get-client-matches.v2.dto.ts`
- **Controller**: `src/matches/matches.controller.ts`
- **Service**: `src/matches/matches.service.ts`
