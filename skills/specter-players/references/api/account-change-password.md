# Client API (v2): `account/change-password`

**Endpoint:** `POST /v2/client/account/change-password`

**Tag:** Account

**Summary:** Change password

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `ChangePasswordDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `currentPassword` | string | ✅ | e.g. `oldPassword123` | Current password |
| `newPassword` | string | ✅ | e.g. `newPassword456` | New password |

