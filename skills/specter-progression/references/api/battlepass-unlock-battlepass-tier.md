# Client API (v2): `battlepass/unlock-battlepass-tier`

**Endpoint:** `POST /v2/client/battlepass/unlock-battlepass-tier`

**Tag:** Battlepass

**Summary:** Unlock battlepass tier

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `unlockUserBattlepassTierV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `battlepassId` | string | ✅ | e.g. `summer-pass-2024` | Battlepass ID to unlock tier from |
| `tierId` | string | ✅ | e.g. `tier-uuid-12345` | Tier ID to unlock for the user |

