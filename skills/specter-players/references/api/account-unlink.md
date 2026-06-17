# Client API (v2): `account/unlink`

**Endpoint:** `POST /v2/client/account/unlink`

**Tag:** Account

**Summary:** Unlink account

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `UnlinkUserAccountsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `type` | string | ✅ | `customId` \| `google` \| `facebook` | Account type to unlink |

