> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/events/events-configuration.md).

# Events Configuration

Venture into the 'Build' segment and click on 'Events'. This is where you'll initiate your game's event configuration process. Specter already comes with some events pre-configured. To modify these or to append parameters, simply press the '**Edit**' icon. For those events not predefined by Specter, you have the freedom to add all details as you envision. Press the '**Create Event**' button to dive into the configuration details.

***

### Event Information

1. **Event Name**: Clearly name your event for easy identification.
2. **Event ID**: Input a unique identifier for this event.
3. **Event Description**: Offer a brief description or context regarding this event.

***

### Event Parameters

To inject parameters, click the **'+'** icon. For each one:

1. **Parameter Name**: Label each parameter meaningfully.
2. **Parameter Type**: Use the radio button to discern if the parameter is a '**Statistic**' (an ongoing tally of activities) or a '**State**' (a status within the game).
3. **Data Type**: Specify the nature of the data you'll capture (e.g., string, integer, etc.)

{% hint style="info" %}
For the events under the umbrella of Specter's APIs, modifications to the base structure are restricted. However, you possess the latitude to append other backend or custom parameters, amplifying the depth of data captured during gameplay. Should you wish to get a comprehensive view, the default and optional parameters are also presented for clarity.
{% endhint %}

You may want to check out:

{% content-ref url="/pages/xT1QpWu6UfeEeR4A3nkb" %}
[Event Parameters](/specter-user-manual/build/events/event-parameters.md)
{% endcontent-ref %}

### **Custom Data**

1. **Tags**: Implement tags for better categorisation and quick searches.
2. **Meta Data**: Input extra details that support your event setup.

***

By leveraging Specter's intuitive and comprehensive event configuration platform, developers can ensure that every player action, big or small, is meticulously captured, fostering a richer gameplay experience.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/events/events-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
