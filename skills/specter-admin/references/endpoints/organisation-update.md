# Admin API: `organisation/update`

**Endpoint:** `POST /v1/organisation/update`

**Tag:** Organisation

**Summary:** Update organisation

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `UpdateOrganisationDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `organisationId` | string | ✅ | e.g. `org-uuid-12345` | Organisation ID |
| `name` | string | — | e.g. `My Game Studio` | Organisation name |
| `location` | string | — | e.g. `Mumbai, India` | Location |
| `defaultLogoUrl` | string | — | e.g. `https://example.com/logo.png` | Default logo URL |
| `email` | string | — | e.g. `org@example.com` | Email address |
| `gstNo` | string | — | e.g. `27AABCU9603R1ZM` | GST number |
| `panNo` | string | — | e.g. `ABCDE1234F` | PAN number |
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

