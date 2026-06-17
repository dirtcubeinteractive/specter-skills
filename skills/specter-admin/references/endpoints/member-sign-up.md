# Admin API: `member/sign-up`

**Endpoint:** `POST /v1/member/sign-up`

**Tag:** Member

**Summary:** Member sign up

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateMemberDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | — | e.g. `My Game Studio` | Organisation name |
| `teamSize` | string | — | e.g. `10-50` | Team size |
| `location` | string | — | e.g. `Mumbai, India` | Location |
| `goals` | string[] | — | e.g. `["Managing In-Game Economy","Boosting Engagem…` | Organisation goals |
| `platforms` | string[] | — | e.g. `["IOS","Android","Web"]` | Target platforms |
| `typeId` | number | ✅ | e.g. `1` | Member type ID |
| `fullName` | object | — | e.g. `John Doe` | Full name of the member |
| `contactNo` | string | — | e.g. `+919876543210` | Contact number |
| `email` | object | ✅ | e.g. `john@example.com` | Email address |
| `password` | object | — | e.g. `securePassword123` | Password (required if googleId not provided) |
| `websiteUrl` | object | — | e.g. `https://mygamestudio.com` | Website URL |
| `playstoreUrl` | object | — | e.g. `https://play.google.com/store/apps/details?id…` | Play Store URL |
| `appstoreUrl` | object | — | e.g. `https://apps.apple.com/app/id123456789` | App Store URL |
| `panNo` | object | — | e.g. `ABCDE1234F` | PAN number |
| `gstNo` | object | — | e.g. `27AABCU9603R1ZM` | GST number |
| `registrationNo` | object | — | e.g. `REG123456` | Registration number |
| `googleId` | string | — | e.g. `1234567890` | Google ID for OAuth login |
| `timezone` | string | ✅ | e.g. `Asia/Kolkata` | Timezone |
| `billingAddress` | any | — |  | Billing address |
| `shippingAddress` | any | — |  | Shipping address |
| `gstTreatment` | string | — | e.g. `business_gst` | GST treatment type |
| `placeOfContact` | string | — | e.g. `Mumbai` | Place of contact |
| `vatTreatment` | string | — | e.g. `vat_registered` | VAT treatment type |
| `taxRegNo` | string | — | e.g. `TAX123456` | Tax registration number |
| `tdsTaxId` | string | — | e.g. `TDS123456` | TDS tax ID |
| `taxTreatment` | string | — | e.g. `business` | Tax treatment type |
| `taxRegime` | string | — | e.g. `new_regime` | Tax regime |
| `isTdsRegistered` | boolean | — | e.g. `true` | Is TDS registered |
| `vatRegNo` | string | — | e.g. `VAT123456` | VAT registration number |
| `currencyCode` | string | ✅ | `INR` \| `USD` | Currency code |
| `accessConfig` | AccessConfig[] | — | see below | Access configuration |


### Nested object: `AccessConfig`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `env` | string | ✅ | e.g. `dev` | Environment |
| `orgFlags` | object | — |  | Organisation level flags |
| `projectFlags` | object | — |  | Project level flags |
