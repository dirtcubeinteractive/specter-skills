# V2 API: `client/auth/apple-callback`

**Endpoint:** `POST /v2/client/auth/apple-callback`

**Authentication:** None (OAuth callback endpoint)

---

## Request Body Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | `string` | No | OAuth authorization code from Apple |
| `state` | `string` | No | State parameter with encoded redirect info |
| `error` | `string` | No | Error code if OAuth failed |
| `provider` | `string` | No | Should be "apple" |

---

## Response Behavior

This endpoint handles Apple Sign In callbacks and redirects to the game client. Apple sends callbacks via POST (unlike other providers that use GET).

### Success Flow
When OAuth is successful, the endpoint redirects to the game's redirect URL with the authorization code:

```
{gameRedirectUrl}?code={authorizationCode}&provider=apple
```

### No Redirect URL Provided
If no redirect URL is in the state parameter:

```json
{
  "status": "success",
  "code": 200,
  "message": "OAuth callback processed, but no redirect URL provided",
  "data": {
    "authorizationCode": "auth-code-here",
    "error": null,
    "provider": "apple"
  }
}
```

### Error Flow
When OAuth fails, redirects to the error URL:

```
{errorRedirectUrl}?error={errorCode}&provider=apple
```

Or if no error URL:

```json
{
  "status": "error",
  "code": 500,
  "message": "OAuth callback processing failed",
  "error": "callback_processing_failed"
}
```

---

## State Parameter Structure

The `state` parameter should be a JSON-encoded string containing:

```json
{
  "gameRedirectUrl": "https://yourgame.com/auth/callback",
  "errorRedirectUrl": "https://yourgame.com/auth/error"
}
```

---

## Why POST for Apple?

Apple Sign In uses POST for callbacks (form_post response mode) rather than GET like other OAuth providers. This is more secure as it prevents the authorization code from being logged in server access logs or browser history.

---

## Usage Flow

1. Game initiates Apple Sign In OAuth flow
2. Apple authenticates user and POSTs to this callback URL
3. This endpoint parses the state parameter to get redirect URLs
4. Redirects user back to game with auth code or error

---

## Request Examples

### Example 1: Successful Apple OAuth Callback
**Request Body:**
```json
{
  "code": "c1234567890abcdef...",
  "state": "eyJnYW1lUmVkaXJlY3RVcmwiOiJodHRwczovL2dhbWUuY29tL2F1dGgifQ==",
  "provider": "apple"
}
```

**Behavior:** Redirects to `https://game.com/auth?code=c1234567890abcdef...&provider=apple`

### Example 2: Apple OAuth Error
**Request Body:**
```json
{
  "error": "user_cancelled_authorize",
  "state": "eyJlcnJvclJlZGlyZWN0VXJsIjoiaHR0cHM6Ly9nYW1lLmNvbS9lcnJvciJ9",
  "provider": "apple"
}
```

**Behavior:** Redirects to `https://game.com/error?error=user_cancelled_authorize&provider=apple`

---

## Notes

- This is a redirect-based endpoint, not a typical JSON API
- Apple requires POST method for OAuth callbacks (form_post response mode)
- Used as the Apple Sign In redirect URI in Apple Developer Console
- The state parameter is base64-encoded JSON containing redirect URLs
- Game client should handle the final redirect with the auth code
- Auth code should then be exchanged via `/v2/client/auth/login-apple` or `/v2/client/auth/signup-apple`

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| callback_processing_failed | Failed to process the Apple OAuth callback |
| user_cancelled_authorize | User cancelled the Apple Sign In |
| No redirect URL | State parameter missing or doesn't contain redirect URL |
| Invalid state | State parameter couldn't be parsed |

---

## Source Files

- **Controller**: `src/users/users.controller.ts`
