# Admin API: `member/update-access-config`

**Endpoint:** `POST /v1/member/update-access-config`

**Tag:** Member

**Summary:** Update access config

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateAccessConfigDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `accessConfig` | AccessConfig[] | ✅ | see below | Array of access configuration objects to update |


### Nested object: `AccessConfig`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `env` | string | ✅ | e.g. `dev` | Environment |
| `orgFlags` | object | — |  | Organisation level flags |
| `projectFlags` | object | — |  | Project level flags |
