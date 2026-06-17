# Client API (v2): `events/send-custom`

**Endpoint:** `POST /v2/client/events/send-custom`

**Tag:** Event

**Auth:** Project **api-key** (`api-key` header) **+ player access token** (`Authorization: Bearer <playerAccessToken>`). Player-scoped — call after logging the player in.

---

## Request body — `FireCustomEventDto`

| Field | Type | Required | Allowed / Example | Description |
|---|---|---|---|---|
| `userId` | string | — | e.g. `user123` | User ID |
| `eventId` | string | ✅ | e.g. `event123` | Event ID to fire |
| `specterParams` | object | — | e.g. `{"param1":"value1"}` | Specter parameters |
| `customParams` | object | — | e.g. `{"custom1":"value1"}` | Custom parameters |

