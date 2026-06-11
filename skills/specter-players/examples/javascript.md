# JavaScript/TypeScript — Specter auth client

```js
const BASE = "https://client.staging.specterapp.xyz/v2/client"; // prod: https://api.specterapp.xyz/v2/client
const API_KEY = process.env.SPECTER_API_KEY;

let accessToken = null;
let entityToken = null;

async function specter(path, body = {}, { auth = true } = {}) {
  const res = await fetch(`${BASE}/${path}`, {
    method: "POST",
    headers: {
      "api-key": API_KEY,
      "Content-Type": "application/json",
      ...(auth && accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(body),
  });
  if (res.status === 429) {
    const err = await res.json().catch(() => ({}));
    await new Promise((r) => setTimeout(r, (err.retryAfterSeconds ?? 2) * 1000));
    return specter(path, body, { auth });
  }
  const json = await res.json();
  if (json.status === "error" && json.code === 401 && auth) {
    await refresh();                       // refresh once, then retry
    return specter(path, body, { auth });
  }
  if (json.status !== "success") throw new Error(json.message ?? "Specter error");
  return json.data;
}

// Silent login: one call handles first launch AND returning players
export async function login(customId) {
  const data = await specter(
    "auth/login-custom",
    { customId, createAccount: true },
    { auth: false }
  );
  accessToken = data.accessToken;
  entityToken = data.entityToken;
  return data.user;
}

async function refresh() {
  const data = await specter(
    "auth/refresh-token",
    { entityToken, expiringAccessToken: accessToken },
    { auth: false }
  );
  accessToken = data.refreshAccessToken?.accessToken ?? data.accessToken;
}

export const getProfile = () => specter("player/me/get-profile");
export const saveData = (kv) => specter("player/me/update-data", { playerData: kv });

// Usage
const user = await login(localStorage.deviceId ??= crypto.randomUUID());
console.log("logged in as", user.id);
```

Persist `accessToken`/`entityToken` in secure storage on native platforms (Keychain/Keystore),
`localStorage` is acceptable for web games.
