> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/progression.md).

# Progression

Progression is crucial to enriching player engagement in games and apps. Within Specter's progression framework, there are two essential components:

1. [**Progression Markers**](/specter-user-manual/build/progression/progression-markers.md): These serve as quantitative indicators of a player's advancement.&#x20;
2. [**Progression Systems**](/specter-user-manual/build/progression/progression-systems.md): This provides the structure that determines how these markers translate into levels or stages.

{% hint style="info" %}
In a fantasy game,Experience Points (XP) act as **Progression Markers**, gained from battles or quests. Using **Progression Systems**, 100 XP might signify reaching Level 2, while an additional 250 XP advances a player to Level 3.&#x20;
{% endhint %}

This system structures the player's in-game journey through these set milestones.&#x20;

Further integrating with other features in Specter, these tools allow developers to create varied player experiences, from ranking systems to reward-based structures.&#x20;

To leverage Specter's progression capabilities to the fullest, explore the detailed sections on Progression Markers and Progression Systems.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/progression.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
