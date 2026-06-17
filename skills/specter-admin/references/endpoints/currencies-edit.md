# Admin API: `currencies/edit`

**Endpoint:** `POST /v1/currencies/edit`

**Tag:** Currencies

**Summary:** Edit currency

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditCurrenciesDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | number | ✅ | e.g. `1` | Currency ID to update |
| `name` | string | — | e.g. `Gold Coins` | Updated currency name |
| `description` | string | — | e.g. `In-game currency for purchases` | Updated currency description |
| `rarityId` | number | — | e.g. `2` | Updated rarity ID |
| `currencyId` | string | — | e.g. `gold-coins-v2` | Updated currency identifier |
| `projectId` | string | — | e.g. `proj-12345-abcde` | Project ID |
| `code` | string | — | e.g. `GLD` | Updated currency code |
| `iconUrl` | string | — | e.g. `https://cdn.example.com/icons/gold-v2.png` | Updated icon URL |
| `type` | string | — | `real` \| `virtual` | Currency type |
| `archive` | boolean | — | e.g. `false` | Archive the currency |
| `tags` | string[] | — | e.g. `["premium"]` | Updated tags |
| `meta` | object | — | e.g. `{"exchangeRate":150}` | Updated metadata |

