# V2 API: `client/rmg/create-order`

**Endpoint:** `POST /v2/client/rmg/create-order`

**Authentication:** User Auth Guard Required

---

## Request DTO Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `amount` | `number` | **Yes** | Order amount (in smallest currency unit, e.g., cents) |
| `currencyId` | `string` | **Yes** | Currency ID for the order |
| `gatewayName` | `string` | **Yes** | Payment gateway name (e.g., "stripe", "razorpay") |

---

## Response Structure

### Success Response (Stripe)
```json
{
  "status": "success",
  "code": 201,
  "message": "Order created successfully",
  "data": {
    "id": "pi_1234567890",
    "amount": 1000,
    "client_secret": "pi_1234567890_secret_abc123",
    "currency": "usd",
    "status": "requires_payment_method"
  },
  "errors": []
}
```

### Success Response (Razorpay)
```json
{
  "status": "success",
  "code": 201,
  "message": "Order created successfully",
  "data": {
    "id": "order_abc123",
    "amount": 50000,
    "currency": "INR",
    "status": "created"
  },
  "errors": []
}
```

---

## Response Fields Explained

The response data varies based on the payment gateway used. The gateway's native response object is returned directly.

### Stripe Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.id` | `string` | Stripe PaymentIntent ID |
| `data.amount` | `number` | Amount in smallest currency unit (e.g., cents) |
| `data.client_secret` | `string` | Client secret for frontend payment completion |
| `data.currency` | `string` | Currency code (lowercase) |
| `data.status` | `string` | PaymentIntent status |

### Razorpay Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `data.id` | `string` | Razorpay Order ID |
| `data.amount` | `number` | Amount in smallest currency unit (e.g., paise) |
| `data.currency` | `string` | Currency code (uppercase) |
| `data.status` | `string` | Order status |

---

## Request Examples

### Example 1: Create Stripe Order
**Request:**
```json
{
  "amount": 1000,
  "currencyId": "usd",
  "gatewayName": "stripe"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "Order created successfully",
  "data": {
    "id": "pi_1234567890",
    "amount": 1000,
    "client_secret": "pi_1234567890_secret_abc123",
    "currency": "usd",
    "status": "requires_payment_method"
  },
  "errors": []
}
```

### Example 2: Create Razorpay Order
**Request:**
```json
{
  "amount": 50000,
  "currencyId": "inr",
  "gatewayName": "razorpay"
}
```

**Response:**
```json
{
  "status": "success",
  "code": 201,
  "message": "Order created successfully",
  "data": {
    "id": "order_xyz789",
    "amount": 50000,
    "currency": "INR",
    "status": "created"
  },
  "errors": []
}
```

---

## Notes

- Creates a payment order with the specified gateway
- The response is the gateway's native order object (Stripe PaymentIntent or Razorpay Order)
- Use `client_secret` (Stripe) with frontend SDK to complete payment
- After successful payment, use `rmg/execute-deposit` to credit funds
- Payment order is stored internally with the external order ID

---

## Supported Gateways

| Gateway | Description |
|---------|-------------|
| `stripe` | Stripe payment gateway (returns PaymentIntent) |
| `razorpay` | Razorpay payment gateway (returns Order) |

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| Payment gateway not configured | Gateway is not configured for the organization |
| Currency not found | Currency ID is invalid or not found |

---

## Source Files

- **DTO**: `src/payment-gateway/dto/create-order.dto.ts`
- **Controller**: `src/payment-gateway/payment-gateway.controller.ts`
- **Service**: `src/payment-gateway/payment-gateway.service.ts`
