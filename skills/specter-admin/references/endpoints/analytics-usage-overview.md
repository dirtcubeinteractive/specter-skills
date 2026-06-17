# Admin API: `analytics/usage/overview`

**Endpoint:** `POST /v1/analytics/usage/overview`

**Tag:** Analytics

**Summary:** Get usage overview

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetOverviewDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID to get overview for |

