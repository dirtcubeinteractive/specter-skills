# Admin API: `battlepass/stop`

**Endpoint:** `POST /v1/battlepass/stop`

**Tag:** Battlepass

**Summary:** Stop battlepass

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `StopBattlepassDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `battlepassId` | string | ✅ | e.g. `bp-uuid-12345` | Battlepass ID to stop |

