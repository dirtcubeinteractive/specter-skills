# Admin API: `member/invite/send`

**Endpoint:** `POST /v1/member/invite/send`

**Tag:** Member

**Summary:** Send member invite

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `InviteMemberDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `email` | object | ✅ | e.g. `newmember@example.com` | Email address of the member to invite |
| `organisationId` | object | ✅ | e.g. `org-uuid-12345` | Organisation ID |
| `permissions` | Permissions[] | — | see below | Permissions to grant to the member |
| `accessConfig` | AccessConfig[] | — | see below | Access configuration for the member |


### Nested object: `Permissions`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `permissionId` | number | ✅ | e.g. `1` | Permission ID |
| `projectId` | string | — | e.g. `proj-uuid-12345` | Project ID for project-specific permission |

### Nested object: `AccessConfig`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `env` | string | ✅ | e.g. `dev` | Environment |
| `orgFlags` | object | — |  | Organisation level flags |
| `projectFlags` | object | — |  | Project level flags |
