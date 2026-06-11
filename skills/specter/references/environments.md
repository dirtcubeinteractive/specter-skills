# Specter environments & URLs

| Surface | Production | Staging |
|---|---|---|
| Client REST API | `https://api.specterapp.xyz/v2/client` | `https://client.staging.specterapp.xyz/v2/client` |
| Multiplayer Socket.io | `https://multiplayer.specterapp.xyz` | `https://staging.multiplayer.specterapp.xyz` |
| Dashboard (configure content, get API keys) | `https://console.specterapp.xyz` | — |
| Interactive API docs (Swagger) | `https://api.specterapp.xyz/api-docs/client` | — |
| Asset CDN | `https://cdn.specterapp.xyz` | same |
| Health check | `https://api.specterapp.xyz/health` | — |

Notes:

- API keys are **per project per environment**. A staging key will not work against production.
- The multiplayer server is hosted separately from the REST API (different cloud) — always use
  the hostnames above; never derive one URL from the other.
- Icon/asset URLs returned by catalog endpoints point at the CDN and can be cached aggressively.
