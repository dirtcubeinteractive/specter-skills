# Client API (v2): `app/get-players`

**Endpoint:** `POST /v2/client/app/get-players`

**Tag:** App

**Summary:** Get players

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetPlayersV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `filters` | Filter[] | — | see below | Array of filters to apply |
| `limit` | number | — | e.g. `10` | Limit for pagination |
| `offset` | number | — | e.g. `0` | Offset for pagination |


### Nested object: `Filter`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `type` | string | ✅ | `username` \| `firstName` \| `lastName` \| `email` \| `customId` \| `displayName` | Filter type |
| `value` | string | ✅ | e.g. `johndoe` | Filter value |
