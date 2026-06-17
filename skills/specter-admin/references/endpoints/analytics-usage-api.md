# Admin API: `analytics/usage/api`

**Endpoint:** `POST /v1/analytics/usage/api`

**Tag:** Analytics

**Summary:** Get API usage analytics

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetApiUsageDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID to get API usage for |
| `projectId` | string | — | e.g. `proj-12345-abcde` | Project ID to filter API usage |
| `category` | string | — | `App` \| `Authentication` \| `Progression` \| `Tasks` \| `User` \| `Inventory` \| `Wallet` \| `Matches` \| `Events` \| `Stores` \| `Rewards` \| `Leaderboards` | API category to filter by |
| `startDate` | string | — | e.g. `2024-01-01T00:00:00Z` | Start date for filtering API usage |
| `endDate` | string | — | e.g. `2024-12-31T23:59:59Z` | End date for filtering API usage |

