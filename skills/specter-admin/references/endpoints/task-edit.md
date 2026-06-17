# Admin API: `task/edit`

**Endpoint:** `POST /v1/task/edit`

**Tag:** Achievements

**Summary:** Edit task

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditTaskDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `task-uuid-12345` | Task UUID to update |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID the task belongs to |
| `name` | string | — | e.g. `Daily Login Task` | Task display name |
| `taskId` | string | — | e.g. `task-daily-login-001` | Unique task identifier |
| `description` | string | — | e.g. `Login every day to earn rewards` | Task description |
| `iconUrl` | string | — | e.g. `https://cdn.example.com/icons/login.png` | URL to task icon |
| `rewardClaim` | string | — | `automatic` \| `on-claim` | How rewards are claimed |
| `customEventId` | string | — | e.g. `custom-event-uuid` | Custom event ID that triggers this task |
| `defaultEventId` | string | — | e.g. `default-event-uuid` | Default event ID that triggers this task |
| `rewardDetails` | TaskReward[] | — | see below | Task reward configurations |
| `levelDetails` | levelDetails[] | — | see below | Level requirements to unlock task |
| `tags` | string[] | — | e.g. `["daily","login"]` | Array of tag names |
| `meta` | object | — | e.g. `{"difficulty":"easy"}` | Custom metadata object |
| `config` | object | — | e.g. `[]` | Task configuration array |
| `businessLogic` | object | — | e.g. `{"targetCount":1}` | Business logic configuration |
| `isRecurring` | object | — | e.g. `true` | Whether this task recurs |
| `linkedRewardDetails` | TaskReward[] | — | see below | Linked reward configurations for task groups |
| `isLinkedRewardSameAsGeneralRewards` | boolean | — | e.g. `false` | Whether linked rewards match general rewards |


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
