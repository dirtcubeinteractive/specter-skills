> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/app/overview.md).

# Overview

This section provides a comprehensive overview of your application's dashboard within Specter. It's designed to give developers quick insights into their project's status, including key metrics, recent activities, and access to essential resources for efficient game development and management.

***

### App Summary

* **Environment:** Displays the current environment (e.g., Development, Quality Assurance, Production) for clarity on the information you are viewing.
* **App ID:** Unique identifier for your application.
* **Category & Genre:** Overview of the app's classification
* **Platforms:** Supported platforms indicating the app's reach across different devices.

***

### Economy

A snapshot of the app's in-game economy, detailing:

* **Currencies:** Number of defined in-game currencies.
* **Items:** Total items available within the game.
* **Bundles:** Bundles created for purchase.
* **Stores:** Stores set up for transactions.

***

### Events

Lists and describes significant in-game events to monitor player interactions and game dynamics.

***

### Progression Systems

Outlines the progression systems implemented in the app, including details like system names, markers, and the number of levels.&#x20;

***

### Competitions

Details on competitions hosted within the app, including:

* **Name:** Competition names.
* **Player Requirements:** Minimum and maximum player count.
* **Schedule:** Start and end times for each competition.

***

### Games and Matches

Information on games managed within the app and their specific matches, emphasizing the creation dates and other relevant details.

***

### Recent Activity

A log of recent significant activities, such as user updates and app modifications, to keep track of changes and developments within the app.

***

### Featured Resources

Curated links to essential resources, including guides on team setup, managing matches, economy setup, and more, to support developers throughout the development process.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/app/overview.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
