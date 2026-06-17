# Admin API: `app-event/add/custom`

**Endpoint:** `POST /v1/app-event/add/custom`

**Tag:** Events

**Summary:** Create custom event

**Auth:** Member Bearer token (`Authorization: Bearer <token>`) through the api-key gateway (`api-key` header). Get the token via the MCP browser sign-in — never ask the user for a password.

---

## Request body — `CreateAppEventDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `Player Scored` | Display name of the custom event |
| `eventId` | string | ✅ | e.g. `player-scored-event` | Custom unique identifier for the event |
| `description` | string | — | e.g. `Triggered when a player scores` | Description of the event |
| `projectId` | string | ✅ | e.g. `proj-uuid-12345` | Project ID this event belongs to |
| `tags` | string[] | — | e.g. `["gameplay","scoring"]` | Tags for categorization |
| `meta` | object | — | e.g. `{"priority":"high"}` | Custom metadata for the event |
| `customParameterDetails` | customParameterDetails[] | — | see below | Custom parameter definitions for the event |


### Nested object: `customParameterDetails`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `name` | string | ✅ | e.g. `score` | Name of the custom parameter |
| `type` | string | ✅ | `state` \| `statistic` | Type of the parameter |
| `dataTypeId` | string | ✅ | e.g. `1` | Data type ID for the parameter |
