# Admin API: `user/signup-custom`

**Endpoint:** `POST /v1/user/signup-custom`

**Tag:** Users

**Summary:** Create player with custom ID

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreatePlayerDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `customId` | string | ✅ | e.g. `custom123` | Custom ID for the player |
| `projectId` | string | ✅ | e.g. `proj123` | Project ID |
| `referralCode` | string | — | e.g. `REF123` | Referral code |
| `meta` | object | — | e.g. `{"device":"ios"}` | Additional metadata |
| `includePlayerData` | boolean | — | e.g. `false` | Include player data in response |
| `includeEquipItem` | boolean | — | e.g. `false` | Include equipped items in response |
| `specterParams` | object | — | e.g. `{"param1":"value1"}` | Specter parameters |
| `customParams` | object | — | e.g. `{"custom1":"value1"}` | Custom parameters |

