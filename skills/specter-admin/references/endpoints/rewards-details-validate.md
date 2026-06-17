# Admin API: `rewards-details/validate`

**Endpoint:** `POST /v1/rewards-details/validate`

**Tag:** Inventory

**Summary:** Validate rewards

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `RewardRequestDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `rewardDetails` | any | ✅ |  | Reward details |
| `projectId` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Project ID |

