# V2 API: `client/battlepass/unlock-battlepass-tier`

**Endpoint:** `POST /v2/client/battlepass/unlock-battlepass-tier`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `battlepassId` | `string` | **Yes** | The battlepass ID (client-facing ID) |
| `tierId` | `string` | **Yes** | The tier UUID to unlock |

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier unlocked for user",
  "data": [],
  "errors": []
}
```

---

## Response Fields Explained

| Field | Type | Description |
|-------|------|-------------|
| `data` | `array` | Empty array on success |

---

## Request/Response Examples

### Example 1: Unlock a Free Tier
**Request:**
```json
{
  "battlepassId": "season-1-pass",
  "tierId": "tier-uuid-1"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier unlocked for user",
  "data": [],
  "errors": []
}
```

### Example 2: Unlock a Premium Tier
**Request:**
```json
{
  "battlepassId": "season-1-pass",
  "tierId": "tier-uuid-2"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 200,
  "message": "Battlepass tier unlocked for user",
  "data": [],
  "errors": []
}
```

---

## Notes

- Unlocks the specified battlepass tier for the authenticated user
- When unlocking a premium tier (sortingOrder = 2), the base/free tier is automatically unlocked as well
- If the user has already progressed past certain levels, catch-up rewards are automatically granted
- Catch-up rewards include currencies, items, bundles, and progression markers for all eligible levels
- Rewards are recorded in reward history to prevent duplicate grants
- Cannot unlock the same tier twice (returns conflict error)

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Tier not found | Tier ID doesn't exist for this battlepass |
| Tier already unlocked | User has already unlocked this tier |

---

## Source Files

- **DTO**: `src/battlepass/dto/unlock-user-battlepass-tier.v2.dto.ts`
- **Controller**: `src/battlepass/battlepass.controller.ts`
- **Service**: `src/battlepass/battlepass.service.ts`
