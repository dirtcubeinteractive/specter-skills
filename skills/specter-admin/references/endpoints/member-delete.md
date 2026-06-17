# Admin API: `member/delete`

**Endpoint:** `POST /v1/member/delete`

**Tag:** Member

**Summary:** Delete member

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

> ⚠ **Mutating / destructive** — confirm with the user and prefer staging.

---

## Request body — `DeleteMemberDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `memberId` | object | ✅ | e.g. `member-uuid-12345` | Member ID to delete |
| `organisationId` | object | ✅ | e.g. `org-uuid-12345` | Organisation ID |
| `projectId` | object | — | e.g. `proj-uuid-12345` | Project ID (for project-specific member deletion) |

