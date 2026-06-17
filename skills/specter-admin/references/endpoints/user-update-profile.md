# Admin API: `user/update-profile`

**Endpoint:** `POST /v1/user/update-profile`

**Tag:** Users

**Summary:** Update player profile

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdatePlayerProfileDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `firstName` | string | — | e.g. `John` | First name of the player |
| `lastName` | string | — | e.g. `Doe` | Last name of the player |
| `birthdate` | string | — | e.g. `1990-01-01` | Birthdate of the player |
| `countryCode` | string | — | e.g. `US` | Country code |
| `isKycComplete` | boolean | — | e.g. `true` | KYC completion status |
| `meta` | object | — | e.g. `{"device":"ios"}` | Additional metadata |
| `tags` | object | — | e.g. `["vip","premium"]` | Player tags |
| `playerData` | object | — | e.g. `{"level":5,"score":1000}` | Player data object |
| `projectId` | string | ✅ | e.g. `proj123` | Project ID |
| `userId` | string | ✅ | e.g. `user123` | User ID |
| `customId` | string | — | e.g. `custom123` | Custom ID |

