# Client API (v2): `app/get-bundles`

**Endpoint:** `POST /v2/client/app/get-bundles`

**Tag:** App

**Summary:** Get bundles (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetClientBundlesV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `bundleIds` | string[] | — | e.g. `["bundle_001","bundle_002"]` | Bundle identifiers to filter |
| `attributes` | string[] | — | e.g. `["name","description"]` | Attributes to include in response |
| `isLocked` | boolean | — | e.g. `false` | Filter by locked status |
| `isGacha` | boolean | — | e.g. `false` | Filter by gacha status |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `weapon` | Search keyword |
| `includeTags` | string[] | — | e.g. `["premium","limited"]` | Tags to include in filter |

