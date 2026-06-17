# Client API (v2): `app/get-gacha-bundle-config`

**Endpoint:** `POST /v2/client/app/get-gacha-bundle-config`

**Tag:** App

**Summary:** Get gacha bundle configuration (V2)

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body — `GetClientGachaBundleConfigV2Dto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `bundleId` | string | ✅ | e.g. `bundle_001` | Bundle identifier |
| `offset` | number | — | e.g. `0` | Pagination offset |
| `limit` | number | — | e.g. `10` | Pagination limit |

