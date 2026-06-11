# Specter error reference

Two layers produce errors: the **gateway** (api-key, billing, rate limits, CORS — small
`{"error": ...}` bodies) and the **API itself** (standard envelope with `errors[]`).

## Gateway errors

| HTTP | Body | Cause | Fix |
|---|---|---|---|
| 400 | `{"error": "API key is Required"}` | Missing `api-key` header | Send the header on every request |
| 401 | `{"error": "Invalid API Key"}` | Key unknown / wrong environment | Check key + environment in dashboard |
| 401 | `{"error": "Invalid access token"}` | JWT expired or malformed | Re-login or `auth/refresh-token` |
| 401 | `{"error": "Invalid Api Key or access token"}` | Token's project ≠ api-key's project | Use matching key + token |
| 402 | `{"error": "Your billing term has ended. Please renew your subscription to continue using services."}` | Subscription lapsed | Renew in dashboard |
| 403 | `{"error": "CORS not allowed for this origin"}` | Browser origin not whitelisted | Whitelist domain in dashboard (wildcards like `*.example.com` supported) |
| 429 | `{"error": "API limit reached"}` | Trial plan API-call quota exhausted | Upgrade plan |
| 429 | `{"error": "Data transfer limit reached"}` | Trial plan data quota exhausted | Upgrade plan |
| 429 | `{"error": "Your subscription has been cancelled, please renew to continue"}` | Cancelled plan, limits exhausted | Renew |
| 429 | `{"code": 429, "status": "TooManyRequests", "error": "APIClientRequestRateLimitExceeded", "errorCode": 1199, "retryAfterSeconds": N}` | Token-bucket rate limit (per app/IP/user) | Back off `retryAfterSeconds`, add client-side throttling |

## API errors (standard envelope)

```json
{
  "status": "error",
  "code": 401,
  "message": "Unauthorized",
  "data": null,
  "errors": [{ "errorCode": 1001, "errorMessage": "Invalid token" }]
}
```

Common cases: validation failures (400 with field messages), insufficient wallet balance on
purchase, item not found, task not available in the current schedule window, tournament entry
attempts exhausted.

## Client implementation guidance

- Treat any 429 as retryable with backoff (`retryAfterSeconds` when present, else exponential).
- **Also treat 500 as transient and retryable with backoff.** Observed on staging: sharp
  request bursts (tens of concurrent calls) can produce HTTP 500s before any 429 appears.
  Rate-limit thresholds are configured per organisation/app — don't assume a fixed number;
  keep client request rates modest (batch events, debounce reads).
- Treat 401 `Invalid access token` as a signal to silently refresh/re-login, then retry once.
- 402 and the subscription-429s are **developer-account** problems, not player problems — surface
  them in your own telemetry, show players a generic "service unavailable".
- Log `errors[].errorCode` values; they are stable identifiers.
