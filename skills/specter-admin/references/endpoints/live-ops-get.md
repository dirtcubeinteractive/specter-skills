# Admin API: `live-ops/get`

**Endpoint:** `POST /v1/live-ops/get`

**Tag:** Live Ops

**Summary:** POST /v1/live-ops/get

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetLiveOpsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `ids` | string[] | — | e.g. `["liveops-uuid-1"]` | Array of live ops IDs to filter by |
| `attributes` | object | — | e.g. `["name","status"]` | Attributes to include in response |
| `entities` | any | — |  | Entity configuration for nested data |
| `offset` | number | — | e.g. `0` | Number of records to skip for pagination |
| `limit` | number | — | e.g. `10` | Maximum number of records to return |
| `search` | string | — | e.g. `weekly` | Search keyword to filter by name |
| `sortField` | string | — | e.g. `createdAt` | Field to sort by |
| `sortOrder` | string | — | e.g. `desc` | Sort order (asc or desc) |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID to get live ops for |
| `competitionFormatTypeMasterId` | number | — | e.g. `1` | Filter by competition format type master ID |

