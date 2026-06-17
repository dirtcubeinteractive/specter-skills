> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/analyze/overview.md).

# Overview

Another significant upcoming module is Analytics, which will equip developers with deep insights into game performance and player behavior. The Analytics module will provide detailed metrics on retention, engagement, and more, enabling developers to make data-driven decisions to optimize their games. Key analytics features will include:

* **Retention Analysis:** Understand how well your game retains players over time, identifying key factors that keep players engaged.
* **Engagement Metrics:** Measure player engagement through various metrics, such as session length, frequency of play, and in-game activities.
* **Performance Benchmarks:** Compare your game's performance against industry benchmarks to identify areas of opportunity and improvement.

As these features are currently in development, we encourage you to visit our [Product Roadmap](/specter-user-manual/product-roadmap/overview.md) for the latest information on progress and planned release dates.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/analyze/overview.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
