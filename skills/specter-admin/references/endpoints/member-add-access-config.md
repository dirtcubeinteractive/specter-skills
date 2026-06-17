# Admin API: `member/add-access-config`

**Endpoint:** `POST /v1/member/add-access-config`

**Tag:** Member

**Summary:** Add access config

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `AddAccessConfigDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `accessConfig` | AccessConfig[] | ✅ | see below | Array of access configuration objects |


### Nested object: `AccessConfig`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `env` | string | ✅ | e.g. `dev` | Environment |
| `orgFlags` | object | — |  | Organisation level flags |
| `projectFlags` | object | — |  | Project level flags |
