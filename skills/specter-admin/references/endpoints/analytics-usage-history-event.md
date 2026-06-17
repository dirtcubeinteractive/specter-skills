# Admin API: `analytics/usage/history/event`

**Endpoint:** `POST /v1/analytics/usage/history/event`

**Tag:** Analytics

**Summary:** Get event usage history

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetEventUsageDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID to get event usage for |
| `projectId` | string | — | e.g. `proj-12345-abcde` | Project ID to filter event usage |
| `category` | string | — | `Achievement` \| `Authentication` \| `Progression` \| `User` \| `Inventory` \| `Wallet` \| `Matches` \| `Stores` \| `Leaderboards` \| `Custom` | Event category to filter by |
| `startDate` | string | — | e.g. `2024-01-01T00:00:00Z` | Start date for filtering event usage |
| `endDate` | string | — | e.g. `2024-12-31T23:59:59Z` | End date for filtering event usage |

