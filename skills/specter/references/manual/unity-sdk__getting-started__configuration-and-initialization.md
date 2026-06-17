# Configuration and Initialization

Before making any API calls, you need to configure the SDK. Configuring the SDK is essential before making any API calls. Here's how to set it up with your project details.

## Specter Config Data

The easiest way to configure the SDK is by using the SpecterConfigData scriptable object

In Unity's top bar, navigate to `Specter` > `Select Specter Config`. This action will either generate a new Specter Config ScriptableObject file or open an existing one within your project.

### Required Fields

* `Project Id`: The identifier for the Specter project (called App ID on the dashboard) that your Unity project is associated with
* `Environment`: Choose one of 3 environments for the SDK to run in - `Development`, `Quality Assurance`, `Production`.
* `API Keys`: A list of environment specific API keys for your app. To configure API Keys, follow these steps:
  * Open your app on the Specter dashboard
  * Navigate to `App Settings` > `API`
  * Copy the Development environment API Key.
  * Go back to Unity and your Specter Config ScriptableObject
  * Add an element to the API Keys list (if not already added) and set the element's environment to `Development`.&#x20;
  * Paste the API Key in the provided text field
  * Do the same for `Production` and `Quality Assurance` environments and ensure each element's environment and key pair match those on the dashboard.

Project/App ID and API Keys can be found under the API tab of your App Settings on the dashboard.

{% hint style="warning" %}
Please ensure that you configure every API Key for the corresponding environments that you wish to use and test your Unity project with. You should only set up 1 API Key per corresponding environment.
{% endhint %}

### Additional Fields

* `Auto Init`: This flag allows Specter to auto initialize (see [#automatic](#automatic "mention"))
* `Use Debug Credentials`: Enable this to use the Debug Auth Context
* `Debug Auth Context`
  * `Access Token`: Used to authorize most client API calls.
  * `Entity Token`: Used in the request body for certain API calls such the call to refresh or validate an access token
  * `API Key`: Leave blank. API keys are internally fetched from the list based on your configured environment.

{% hint style="info" %}

#### How to obtain a debug access token

1. Configure the required fields and set the `Environment` to the environment in which the user whose access token you need to obtain exists.
2. Use any of the Authorization API calls to 'log the user in'. An access token is returned in the response. Enable logging in order to view this response in the editor
3. Copy the access token from the log and paste it in the Access Token field
4. Copy the entity token from the *same* log and paste it in the Entity Token field
   {% endhint %}

{% hint style="warning" %}
Ensure steps 3 and 4 are both completed for Debug Credentials to work correctly. The access token and entity token combination work in pairs.
{% endhint %}

## Initialization

The SpecterSDK offers flexible initialization options to suit your project's needs. The following are the easiest approaches with minimal to no code required.

### Automatic

For the easiest setup, enable `Auto Init` in the Specter Config Data. This option will automatically initialize the SDK when your game starts, requiring no additional code.

### Manual With Config

If you prefer manual initialization or need more control, fill out the Specter Config asset as described above and call `Specter.InitializeWithConfig()` at the start of your game. Here's a simple example:

{% tabs %}
{% tab title="C#" %}

```csharp
// Initialize with config
using SpecterSDK;

public class YourScript : MonoBehaviour
{
    private void Awake()
    {
        Specter.InitializeWithConfig();
    }
}
```

{% endtab %}
{% endtabs %}

For additional initialization options please read the code comment in the `SpecterSDK` > `Shared` > `Specter.cs` file.
