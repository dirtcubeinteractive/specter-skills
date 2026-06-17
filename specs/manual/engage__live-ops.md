> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/live-ops.md).

# Live Ops

Live operations (Live Ops) in the gaming industry are crucial for maintaining player engagement, updating content, and managing in-game events post-launch. These operations enable developers to introduce fresh content, special offers, and competitive play opportunities, keeping the game dynamic and players continually engaged.

***

Traditionally, Live Ops encompasses a range of activities including:

* **In-App Messages and Notifications**: Communicating directly with players within the game or through push notifications to inform them of new content, events, or offers.
* **Content Updates**: Rolling out new content or changes to existing game elements through updates, often packaged as downloadable content (DLC) or patches.
* **Special Events and Offers**: Hosting time-limited events or offering special deals to encourage continued player engagement and monetization.

These activities are essential for keeping the game environment lively and players invested in the long term.

***

## Live Ops in Specter

Specter expands on the traditional concept of Live Ops by organizing it into three main subsections: Campaigns, Seasons, and Schedule Competitions. This structure provides a comprehensive framework for managing all live activities within the game.

### Campaigns

Campaigns cover the broad spectrum of Live Ops activities, including:

* **In-App Messages and Notifications**: Engaging players with timely and relevant information directly within the game or via notifications.
* **Content Updates**: Facilitating the introduction of new content or modifications to the game, managed through updates in JSON files or similar formats.

This section is designed for the dynamic delivery of content and messages to the player base.

### Seasons

Seasons allow developers to categorize various achievement types, such as tasks and task groups, into seasonal events. Features include:

* **Bucketing Achievements**: Grouping different types of achievements into seasons for structured player engagement.
* **Scheduling**: Planning when these seasonal achievements become active, providing a timeline for players to complete them.

Seasons introduce a thematic approach to Live Ops, aligning content and competitions with specific time frames or events, enhancing the thematic depth and player anticipation.

### Schedule Competitions

This section focuses on the competitive aspect of Live Ops, including:

* **Competition Scheduling**: Setting up and managing the timings for various competitive events, from one-off tournaments to recurring competitions.
* **Engagement Through Competition**: Encouraging player participation in scheduled events, fostering a sense of community and competition.

Schedule Competitions bring a structured approach to hosting and managing in-game competitions, vital for sustaining player interest and activity.

***

By integrating Campaigns, Seasons, and Schedule Competitions, Specter offers a robust and flexible Live Ops management system. This comprehensive approach ensures that developers can effectively engage their player base, update content seamlessly, and host exciting competitions, all within a unified platform.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/live-ops.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
