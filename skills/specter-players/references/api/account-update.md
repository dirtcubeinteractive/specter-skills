# Client API (v2): `account/update`

**Endpoint:** `POST /v2/client/account/update`

**Tag:** Account

**Summary:** Update account

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `LinkUserAccounts`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `type` | string | ✅ | `customId` \| `google` \| `facebook` | Account type to link |
| `id` | string | ✅ | e.g. `google123` | Account identifier |

