> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/games/understanding-apps-and-games-on-specter.md).

# Understanding Apps and Games on Specter

Within Specter's system, an 'App' functions similarly to a 'Game'. An 'App' can be thought of as the base unit that can house multiple games, akin to a gaming platform. This modular approach provides the flexibility to host and manage multiple games within a single project, each with its unique configurations. However, functionalities such as economy and engagement features are maintained at the 'App' level to ensure operational efficiency.

{% hint style="info" %}
Apps and games can be archived but not deleted from the system. The archiving feature provides a way to keep your workspace organised without permanently losing any data or configurations.
{% endhint %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/games/understanding-apps-and-games-on-specter.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
