# Admin API: `currencies/add`

**Endpoint:** `POST /v1/currencies/add`

**Tag:** Currencies

**Summary:** Add currency

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `AddCurrenciesDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `Gold Coins` | Currency display name |
| `description` | string | — | e.g. `In-game currency for purchases` | Currency description |
| `currencyId` | string | ✅ | e.g. `gold-coins` | Unique currency identifier |
| `rarityId` | number | — | e.g. `1` | Rarity ID for the currency |
| `projectId` | string | ✅ | e.g. `proj-12345-abcde` | Project ID the currency belongs to |
| `organisationId` | string | — | e.g. `org-12345-abcde` | Organisation ID |
| `code` | string | — | e.g. `GLD` | Currency code (short identifier) |
| `iconUrl` | string | — | e.g. `https://cdn.example.com/icons/gold.png` | URL to currency icon |
| `type` | string | ✅ | `real` \| `virtual` | Currency type |
| `tags` | string[] | — | e.g. `["premium","earnable"]` | Array of tag names |
| `meta` | object | — | e.g. `{"exchangeRate":100}` | Custom metadata object |

