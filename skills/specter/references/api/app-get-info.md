# Client API (v2): `app/get-info`

**Endpoint:** `POST /v2/client/app/get-info`

**Tag:** App

**Summary:** Get app info

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `attributes` | string[] | — | e.g. `["games","currencies","items"]` | Optional attributes to include in response |

