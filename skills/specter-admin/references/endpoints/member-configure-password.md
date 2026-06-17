# Admin API: `member/configure/password`

**Endpoint:** `POST /v1/member/configure/password`

**Tag:** Member

**Summary:** Configure password

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `SignUpMemberDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | — | e.g. `John Doe` | Member name |
| `fullName` | object | — | e.g. `John Doe` | Full name |
| `contactNo` | object | — | e.g. `+919876543210` | Contact number |
| `email` | object | ✅ | e.g. `john@example.com` | Email address |
| `password` | object | ✅ | e.g. `securePassword123` | Password |
| `isEmailVerified` | object | — | e.g. `false` | Is email verified |
| `profileUrl` | object | — | e.g. `https://example.com/profile.jpg` | Profile image URL |
| `organisationId` | object | ✅ | e.g. `org-uuid-12345` | Organisation ID |
| `type` | object | ✅ | e.g. `admin` | Member type |
| `timezone` | string | — | e.g. `Asia/Kolkata` | Timezone |

