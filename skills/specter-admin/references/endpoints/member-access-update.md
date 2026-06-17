# Admin API: `member/access/update`

**Endpoint:** `POST /v1/member/access/update`

**Tag:** Member

**Summary:** Update member access

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateMembersAccessDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `updateMemberAccess` | UpdateMemberAccessDto[] | ✅ | see below | Array of member access updates |


### Nested object: `UpdateMemberAccessDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `memberId` | object | ✅ | e.g. `member-uuid-12345` | Member ID to update access for |
| `projectId` | object | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `permissionId` | object | ✅ | e.g. `1` | Permission ID to assign |
| `archive` | boolean | — | e.g. `false` | Whether to archive this access |
