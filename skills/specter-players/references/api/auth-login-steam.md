# Client API (v2): `auth/login-steam`

**Endpoint:** `POST /v2/client/auth/login-steam`

**Tag:** Auth

**Summary:** Login with Steam

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `steamId` | string | ✅ | e.g. `76561198012345678` | Steam user ID |
| `steamTicket` | string | ✅ | e.g. `steam-auth-ticket-123` | Steam auth ticket |

