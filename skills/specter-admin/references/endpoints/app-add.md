# Admin API: `app/add`

**Endpoint:** `POST /v1/app/add`

**Tag:** App

**Summary:** Create project

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateProjectDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `My Game App` | Project name |
| `iconUrl` | string | — | e.g. `https://cdn.example.com/icon.png` | URL to project icon |
| `description` | object | — | e.g. `An exciting mobile game` | Project description |
| `howTo` | object | — | e.g. `Tap to jump, swipe to move` | How to play instructions |
| `screenshotUrls` | string[] | — | e.g. `["https://cdn.example.com/ss1.png","https://c…` | Array of screenshot URLs |
| `videoUrls` | string[] | — | e.g. `["https://cdn.example.com/video1.mp4"]` | Array of video URLs |
| `platformDetails` | PlatformDetails[] | — | see below | Platform-specific details |
| `meta` | object | — | e.g. `{"version":"1.0"}` | Custom metadata |
| `tags` | string[] | — | e.g. `["mobile","casual"]` | Project tags |
| `countryIds` | number[] | — | e.g. `[1,2,3]` | Country IDs for geo targeting |
| `projectCategoryMasterId` | number | ✅ | e.g. `1` | Project category master ID |
| `genreIds` | number[] | — | e.g. `[1,2]` | Genre IDs |
| `organisationId` | string | ✅ | e.g. `org-12345-abcde` | Organisation ID |


### Nested object: `PlatformDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `platformId` | number | ✅ | e.g. `1` | Platform ID |
| `assetBundleUrl` | string | ✅ | e.g. `https://cdn.example.com/bundle.zip` | Asset bundle URL |
| `assetName` | string | ✅ | e.g. `main-bundle` | Asset name |
| `assetBundleVersion` | string | ✅ | e.g. `1.0.0` | Asset bundle version |
| `minimumAppVersion` | string | ✅ | e.g. `1.0.0` | Minimum app version |
