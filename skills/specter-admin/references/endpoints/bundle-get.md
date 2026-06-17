# Admin API: `bundle/get`

**Endpoint:** `POST /v1/bundle/get`

**Tag:** Inventory

**Summary:** Get bundles

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetBundlesDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["bundle_001","bundle_002"]` | Bundle identifiers to filter |
| `types` | string[] | — | e.g. `["weapon_bundle","character_bundle"]` | Bundle types to filter |
| `subTypes` | string[] | — | e.g. `["starter","premium"]` | Bundle sub-types to filter |
| `isLimited` | boolean | — | e.g. `false` | Filter by limited status |
| `isGacha` | boolean | — | e.g. `false` | Filter by gacha status |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |
| `search` | string | — | e.g. `starter` | Search keyword |
| `sortField` | string | — | e.g. `name` | Field to sort by |
| `sortOrder` | string | — | e.g. `ASC` | Sort order |
| `projectId` | string | ✅ | e.g. `123e4567-e89b-12d3-a456-426614174000` | Project ID |
| `showArchived` | boolean | — | e.g. `false` | Whether to show archived bundles |

