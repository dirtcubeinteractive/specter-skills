# Admin API: `app-event/edit/custom`

**Endpoint:** `POST /v1/app-event/edit/custom`

**Tag:** Events

**Summary:** POST /v1/app-event/edit/custom

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `EditCustomEventDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `id` | string | ✅ | e.g. `event-uuid-12345` | Internal ID of the custom event to edit |
| `name` | string | — | e.g. `Player Scored Updated` | Updated display name |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID |
| `eventId` | string | — | e.g. `player-scored-event-v2` | Updated custom unique identifier |
| `eventDescription` | string | — | e.g. `Updated trigger description` | Updated description of the event |
| `tags` | string[] | — | e.g. `["gameplay","updated"]` | Updated tags |
| `meta` | object | — | e.g. `{"priority":"medium"}` | Updated custom metadata |
| `customParameterDetails` | customParameterDetails[] | — | see below | Updated custom parameter definitions |
| `isSubscribed` | boolean | ✅ | e.g. `true` | Whether the event is subscribed |


### Nested object: `customParameterDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `score` | Name of the custom parameter |
| `type` | string | ✅ | `state` \| `statistic` | Type of the parameter |
| `dataTypeId` | string | ✅ | e.g. `1` | Data type ID for the parameter |
