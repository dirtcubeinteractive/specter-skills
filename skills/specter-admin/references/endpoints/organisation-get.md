# Admin API: `organisation/get`

**Endpoint:** `POST /v1/organisation/get`

**Tag:** Organisation

**Summary:** Get organisation

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `GetOrganisationDetailsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | — | e.g. `org-uuid-12345` | Organisation ID |

