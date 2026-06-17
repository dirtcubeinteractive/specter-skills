# Make your first API call

To confirm everything is set up correctly, you can make a test API call. Here's a snippet for your first API call to Specter:

{% tabs %}
{% tab title="C#" %}

```csharp
private void Start() {
    // Initialize Specter if not set to auto init...
    
    MyFirstApiCall();
}

private async void MyFirstApiCall() {
    var result = await Specter.App.Welcome();
    Debug.Log(result.Response.message); // Log displays "Congratulations! You made your first API call!"
}

```

{% endtab %}
{% endtabs %}

This script makes a simple call to Specter to ensure your app can communicate with the Specter backend.

## **Best Practices**

* **Stay Updated**: Regularly check for and integrate updates to the SpecterSDK.
* **Secure Configuration**: Use Unity's built-in tools to securely manage and access your API Key and other sensitive configuration data.
* **Comprehensive Testing**: Utilize Unity's testing tools to ensure your integration works seamlessly under various conditions. We recommend using Unity's [TestRunner](https://docs.unity3d.com/2017.4/Documentation/Manual/testing-editortestsrunner.html) framework for thorough unit testing.
