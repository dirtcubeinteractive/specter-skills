# Admin API: `policy/edit`

**Endpoint:** `POST /v1/policy/edit`

**Tag:** Policy

**Summary:** Edit policy

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditPolicy`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `policyDetails` | PolicyDetails[] | ✅ | see below | Array of policy details to edit |


### Nested object: `PolicyDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `active` | boolean | — | e.g. `true` | Is policy active |
| `entity` | string | ✅ | `currency` \| `wallet` | Entity type |
| `entitySubType` | string | ✅ | `deposit` \| `winning` \| `bonus` \| `currency_debit` \| `currency_credit` \| `balance_limits` \| `currency_decay` \| `earning_caps` | Entity sub-type |
| `rules` | object | — | e.g. `{"maxBalance":10000,"minBalance":0}` | Policy rules configuration |
