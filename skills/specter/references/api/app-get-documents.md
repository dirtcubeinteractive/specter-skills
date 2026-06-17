# Client API (v2): `app/get-documents`

**Endpoint:** `POST /v2/client/app/get-documents`

**Tag:** App

**Summary:** Get documents

**Auth:** Project **api-key** (`api-key` header) only. No player login required.

---

## Request body

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `documentIds` | string[] | — | e.g. `["privacy-policy","terms-of-service"]` | Optional array of document IDs to filter |
| `limit` | number | — | e.g. `10` | Number of records to return |
| `offset` | number | — | e.g. `0` | Number of records to skip |

