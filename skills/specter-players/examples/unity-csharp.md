# Unity (C#) — Specter auth client

Drop-in `MonoBehaviour`-free client using `UnityWebRequest` + Coroutines (works on all Unity
platforms; for async/await use `UniTask` and `req.SendWebRequest().ToUniTask()`).

```csharp
using System;
using System.Collections;
using System.Text;
using UnityEngine;
using UnityEngine.Networking;

[Serializable] public class SpecterEnvelope<T> {
    public string status; public int code; public string message; public T data;
}
[Serializable] public class LoginData {
    public string accessToken; public string entityToken; public SpecterUser user;
}
[Serializable] public class SpecterUser { public string id; public string username; }

public static class Specter {
    // prod: https://api.specterapp.xyz/v2/client
    const string Base = "https://client.staging.specterapp.xyz/v2/client";
    static string apiKey;          // set once at boot
    static string accessToken;
    static string entityToken;

    public static void Init(string key) => apiKey = key;

    public static IEnumerator Post<T>(string path, string jsonBody,
                                      Action<T> onOk, Action<string> onErr, bool auth = true) {
        var req = new UnityWebRequest($"{Base}/{path}", "POST");
        req.uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(jsonBody ?? "{}"));
        req.downloadHandler = new DownloadHandlerBuffer();
        req.SetRequestHeader("api-key", apiKey);
        req.SetRequestHeader("Content-Type", "application/json");
        if (auth && accessToken != null)
            req.SetRequestHeader("Authorization", $"Bearer {accessToken}");

        yield return req.SendWebRequest();

        if (req.responseCode == 429) {           // rate limited — honor retryAfterSeconds
            yield return new WaitForSeconds(2f);
            yield return Post(path, jsonBody, onOk, onErr, auth);
            yield break;
        }
        var env = JsonUtility.FromJson<SpecterEnvelope<T>>(req.downloadHandler.text);
        if (env != null && env.status == "success") onOk(env.data);
        else onErr(env?.message ?? req.error);
    }

    // Silent login keyed to the device — first launch creates the account
    public static IEnumerator Login(Action<SpecterUser> onOk, Action<string> onErr) {
        string customId = SystemInfo.deviceUniqueIdentifier;
        string body = JsonUtility.ToJson(new LoginBody { customId = customId, createAccount = true });
        yield return Post<LoginData>("auth/login-custom", body, d => {
            accessToken = d.accessToken;
            entityToken = d.entityToken;   // persist both via PlayerPrefs/Keystore for refresh
            onOk(d.user);
        }, onErr, auth: false);
    }
    [Serializable] class LoginBody { public string customId; public bool createAccount; }
}

// Usage from any MonoBehaviour:
//   Specter.Init(specterApiKey);
//   StartCoroutine(Specter.Login(u => Debug.Log($"Hi {u.id}"), Debug.LogError));
```

Notes: `JsonUtility` can't deserialize arbitrary maps — for endpoints returning dynamic
objects (custom player data, `attributes` responses) use Newtonsoft `com.unity.nuget.newtonsoft-json`.
