# V2 API: `client/player/me/get-profile`

**Endpoint:** `POST /v2/client/player/me/get-profile`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

All fields are **optional**.

| Field | Type | Description |
|-------|------|-------------|
| `attributes` | `string[]` | Select which optional attributes to include in response |

**Available attributes:** `linkedAccounts`, `isKycComplete`, `equippedItems`

---

## Response Structure

### Success Response
```json
{
  "status": "success",
  "code": 200,
  "message": "My Profile data",
  "data": {
    "user": {
      "uuid": "550e8400-e29b-41d4-a716-446655440000",
      "id": "player-123",
      "email": "player@example.com",
      "displayName": "PlayerOne",
      "firstName": "John",
      "lastName": "Doe",
      "username": "playerone",
      "thumbUrl": "https://cdn.example.com/avatar.png",
      "referralCode": "ABC123"
    }
  },
  "errors": []
}
```

---

## How Each Attribute Changes Response

### `attributes: ["linkedAccounts"]`
Adds linked social/auth accounts:
```json
{
  "user": {
    ...base fields...,
    "linkedAccounts": [
      {
        "authProvider": "google",
        "userId": "google-user-id-123"
      },
      {
        "authProvider": "facebook",
        "userId": "fb-user-id-456"
      }
    ]
  }
}
```

---

### `attributes: ["isKycComplete"]`
Adds KYC verification status:
```json
{
  "user": {
    ...base fields...,
    "isKycComplete": true
  }
}
```

---

### `attributes: ["equippedItems"]`
Adds equipped items information:
```json
{
  ...base response...,
  "equippedItems": [
    {
      "instanceId": "instance-uuid",
      "uuid": "item-uuid",
      "id": "sword-001",
      "name": "Legendary Sword",
      "description": "A powerful weapon",
      "iconUrl": "https://cdn.example.com/sword.png",
      "rarity": {
        "id": "rarity-uuid",
        "name": "Legendary"
      },
      "collectionId": "weapons-collection"
    }
  ]
}
```

---

## Request Examples

### Example 1: Basic Request
**Request:**
```json
{}
```
**Effect:** Returns basic profile information with user object.

---

### Example 2: With Linked Accounts
**Request:**
```json
{
  "attributes": ["linkedAccounts"]
}
```
**Effect:** Returns profile with linked social accounts.

---

### Example 3: Full Profile
**Request:**
```json
{
  "attributes": ["linkedAccounts", "isKycComplete", "equippedItems"]
}
```
**Effect:** Returns profile with all optional data.

---

## Source Files

- **DTO**: `src/users/dto/get-my-profile.v2.dto.ts`
- **Controller**: `src/users/users.controller.ts:2095-2117`
- **Service**: `src/users/users.service.ts:3366-3449`
