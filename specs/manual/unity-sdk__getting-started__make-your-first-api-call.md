> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-unity-sdk/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-unity-sdk/getting-started/make-your-first-api-call.md).

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


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-unity-sdk/getting-started/make-your-first-api-call.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
