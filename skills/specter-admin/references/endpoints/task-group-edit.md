# Admin API: `task-group/edit`

**Endpoint:** `POST /v1/task-group/edit`

**Tag:** Achievements

**Summary:** Edit task group

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditTaskGroupDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `task-group-uuid-123` | Task group ID to edit |
| `projectId` | string | ✅ | e.g. `project-123` | Project ID the task group belongs to |
| `name` | string | — | e.g. `Daily Missions` | Task group display name |
| `taskGroupId` | string | — | e.g. `task-group-001` | Unique identifier for the task group |
| `description` | string | — | e.g. `Complete daily missions to earn rewards` | Task group description |
| `iconUrl` | string | — | e.g. `https://example.com/icon.png` | URL for task group icon |
| `rewardClaim` | string | — | `automatic` \| `on-claim` | Reward claim option |
| `missionSequenceOrder` | string | — | `sequence` \| `random` | Mission sequence order type |
| `rewardDetails` | TaskReward[] | — | see below | Array of task rewards |
| `levelDetails` | levelDetails[] | — | see below | Array of level details for level locking |
| `isLockedByLevel` | boolean | — | e.g. `false` | Whether task group is locked by level |
| `tags` | string[] | — | e.g. `["daily","beginner"]` | Array of tags for categorization |
| `meta` | object | — | e.g. `{"key":"value"}` | Metadata object for additional information |
| `config` | object | — | e.g. `{"setting":"value"}` | Configuration object |
| `stageLength` | number | — | e.g. `7` | Stage length for task group |
| `seriesResetMiss` | boolean | — | e.g. `false` | Whether series resets on miss |
| `seriesResetEnd` | boolean | — | e.g. `true` | Whether series resets at end |
| `stageIntervalUnitId` | number | — | e.g. `1` | Stage interval unit ID |
| `typeId` | number | — | e.g. `1` | Task group type ID |
| `taskDetails` | TaskDetails[] | — | see below | Array of task details in this group |
| `noOfMissionsPerCycle` | number | — | e.g. `5` | Number of missions per cycle |
| `linkedRewardDetails` | TaskReward[] | — | see below | Array of linked reward details |
| `isLinkedRewardSameAsGeneralRewards` | boolean | — | e.g. `true` | Whether linked reward is same as general rewards |


### Nested object: `TaskReward`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `quantity` | number | ✅ | e.g. `100` | Reward quantity |
| `rewardSetId` | string | — | e.g. `reward-set-uuid` | Reward set ID |
| `bundleId` | string | — | e.g. `bundle-uuid` | Bundle ID if reward is a bundle |
| `itemId` | string | — | e.g. `item-uuid` | Item ID if reward is an item |
| `currencyId` | object | — | e.g. `1` | Currency ID if reward is currency |
| `progressionMarkerId` | object | — | e.g. `1` | Progression marker ID if reward is a marker |
| `thirdPartyReward` | string | — | e.g. `third-party-reward-code` | Third party reward identifier |

### Nested object: `levelDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `levelSystemId` | string | ✅ | e.g. `level-system-uuid` | Level system ID |
| `level` | number | — | e.g. `5` | Required level |

### Nested object: `TaskDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `Complete 5 matches` | Task display name |
| `sortingOrder` | number | — | e.g. `1` | Sorting order for task display |
| `taskId` | string | ✅ | e.g. `task-001` | Unique identifier for the task |
| `description` | string | — | e.g. `Win 5 matches to complete this task` | Task description |
| `iconUrl` | string | — | e.g. `https://example.com/task-icon.png` | URL for task icon |
| `rewardClaim` | string | ✅ | `automatic` \| `on-claim` | Reward claim option |
| `customEventId` | string | — | e.g. `custom-event-001` | Custom event ID for tracking |
| `defaultEventId` | string | — | e.g. `default-event-001` | Default event ID for tracking |
| `rewardDetails` | TaskReward[] | ✅ | see below | Array of task rewards |
| `config` | object | — | e.g. `[]` | Task configuration array |
| `businessLogic` | object | — | e.g. `{"rule":"value"}` | Business logic object |
| `meta` | object | — | e.g. `{"key":"value"}` | Metadata object for task |
| `tags` | string[] | — | e.g. `["daily","pvp"]` | Array of tags for categorization |
| `isLinkedReward` | boolean | ✅ | e.g. `true` | Whether task has linked rewards |
| `isLinkedRewardSameAsGeneralRewards` | object | — | e.g. `true` | Whether linked reward is same as general rewards |
| `linkedRewardDetails` | TaskReward[] | — | see below | Array of linked reward details |
