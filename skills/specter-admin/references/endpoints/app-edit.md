# Admin API: `app/edit`

**Endpoint:** `POST /v1/app/edit`

**Tag:** App

**Summary:** Edit project

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditProjectDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `proj-12345-abcde` | Project ID to update |
| `name` | string | — | e.g. `My Updated Game` | Updated project name |
| `iconUrl` | string | — | e.g. `https://cdn.example.com/new-icon.png` | Updated icon URL |
| `platformDetails` | PlatformDetails[] | — | see below | Updated platform details |
| `meta` | object | — | e.g. `{"version":"2.0"}` | Updated metadata |
| `tags` | string[] | — | e.g. `["mobile","action"]` | Updated tags |
| `countryIds` | number[] | — | e.g. `[1,2,3]` | Updated country IDs |
| `projectCategoryMasterId` | number | ✅ | e.g. `1` | Project category master ID |
| `genreIds` | number[] | — | e.g. `[1,2]` | Updated genre IDs |


### Nested object: `PlatformDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `platformId` | number | ✅ | e.g. `1` | Platform ID |
| `assetBundleUrl` | string | ✅ | e.g. `https://cdn.example.com/bundle.zip` | Asset bundle URL |
| `assetName` | string | ✅ | e.g. `main-bundle` | Asset name |
| `assetBundleVersion` | string | ✅ | e.g. `1.0.0` | Asset bundle version |
| `minimumAppVersion` | string | ✅ | e.g. `1.0.0` | Minimum app version |
