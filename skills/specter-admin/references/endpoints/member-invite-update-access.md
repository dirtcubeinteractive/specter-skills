# Admin API: `member/invite/update-access`

**Endpoint:** `POST /v1/member/invite/update-access`

**Tag:** Member

**Summary:** Update invite access

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `InviteMemberAccessDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `invite-uuid-12345` | Invite ID |
| `permissions` | Permissions[] | — | see below | Array of permissions to assign |


### Nested object: `Permissions`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `permissionId` | number | ✅ | e.g. `1` | Permission ID |
| `projectId` | string | — | e.g. `proj-uuid-12345` | Project ID for project-specific permission |
