# Client API (v2): `battlepass/get-tier-list`

**Endpoint:** `POST /v2/client/battlepass/get-tier-list`

**Tag:** Battlepass

**Summary:** Get battlepass tier list

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `GetBattlepassTierRewardsV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `battlepassId` | string | ✅ | e.g. `summer-pass-2024` | Battlepass ID to get tier rewards for |
| `tierIds` | string[] | — | e.g. `["tier-uuid-1","tier-uuid-2"]` | Array of tier IDs to filter by |
| `limit` | number | — | e.g. `50` | Maximum number of records to return |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |

