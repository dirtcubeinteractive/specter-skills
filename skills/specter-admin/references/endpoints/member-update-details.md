# Admin API: `member/update-details`

**Endpoint:** `POST /v1/member/update-details`

**Tag:** Member

**Summary:** Update member details

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateMemberDetailsDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | object | — | e.g. `John Doe` | Member name |
| `email` | object | — | e.g. `john@example.com` | Email address |
| `contactNo` | string | — | e.g. `+919876543210` | Contact number |
| `profileUrl` | object | — | e.g. `https://example.com/profile.jpg` | Profile image URL |
| `timezone` | object | — | e.g. `Asia/Kolkata` | Timezone |

