# V2 API: `client/auth/callback`

**Endpoint:** `GET /v2/client/auth/callback`

**Authentication:** None (OAuth callback endpoint)

---

## Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | `string` | No | OAuth authorization code from provider |
| `state` | `string` | No | State parameter with encoded redirect info |
| `error` | `string` | No | Error code if OAuth failed |
| `provider` | `string` | No | OAuth provider name |

---

## Response Behavior

This endpoint handles OAuth callbacks and redirects to the game client.

### Success Flow
When OAuth is successful, the endpoint redirects to the game's redirect URL with the authorization code:

```
{gameRedirectUrl}?code={authorizationCode}&provider={provider}
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
    "provider": "google"
  }
}
```

### Error Flow
When OAuth fails, redirects to the error URL:

```
{errorRedirectUrl}?error={errorCode}&provider={provider}
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

## Usage Flow

1. Game initiates OAuth flow with provider (Google, Discord, etc.)
2. Provider authenticates user and redirects to this callback URL
3. This endpoint parses the state parameter to get redirect URLs
4. Redirects user back to game with auth code or error

---

## Request Examples

### Example 1: Successful OAuth Callback
**URL:**
```
GET /v2/client/auth/callback?code=4/0AX4XfWh...&state=eyJnYW1lUmVkaXJlY3RVcmwiOiJodHRwczovL2dhbWUuY29tL2F1dGgifQ==&provider=google
```

**Behavior:** Redirects to `https://game.com/auth?code=4/0AX4XfWh...&provider=google`

### Example 2: OAuth Error
**URL:**
```
GET /v2/client/auth/callback?error=access_denied&state=eyJlcnJvclJlZGlyZWN0VXJsIjoiaHR0cHM6Ly9nYW1lLmNvbS9lcnJvciJ9&provider=google
```

**Behavior:** Redirects to `https://game.com/error?error=access_denied&provider=google`

---

## Notes

- This is a redirect-based endpoint, not a typical JSON API
- Used as the OAuth redirect URI when setting up OAuth providers
- The state parameter is base64-encoded JSON containing redirect URLs
- Game client should handle the final redirect with the auth code
- Auth code should then be exchanged via login/signup endpoints

---

## Error Scenarios

| Error | Description |
|-------|-------------|
| callback_processing_failed | Failed to process the OAuth callback |
| No redirect URL | State parameter missing or doesn't contain redirect URL |
| Invalid state | State parameter couldn't be parsed |

---

## Source Files

- **Controller**: `src/users/users.controller.ts`
