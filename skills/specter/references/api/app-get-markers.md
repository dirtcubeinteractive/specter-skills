# Client API (v2): `app/get-markers`

**Endpoint:** `POST /v2/client/app/get-markers`

**Tag:** App

**Summary:** Get progression markers

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetMarkerDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `progressionMarkerIds` | string[] | — | e.g. `["marker-uuid-1","marker-uuid-2"]` | Filter by progression marker IDs |
| `attributes` | string[] | — | e.g. `["name","description"]` | Attributes to include in response |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Number of records to return |
| `search` | string | — | e.g. `xp` | Search keyword |
| `includeTags` | string[] | — | e.g. `["gameplay","rewards"]` | Filter by tags |

