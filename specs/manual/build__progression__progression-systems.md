> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/progression/progression-systems.md).

# Progression Systems

Progression Systems in Specter are the framework within which players advance and evolve in your game. While Progression Markers, such as XP, represent the units of achievement, Progression Systems provide the structure, defining how many markers are required to reach each level or threshold. They set clear benchmarks, determining how these markers are mapped to various stages or levels, ensuring a coherent journey for players as they level up and navigate through the game's challenges.

There are two primary pathways you can craft for your players:

1. **Linear Progression:** This is the straightforward progression most are familiar with, where players move from one level to the next in a set sequence—Level 1 to Level 2, Level 2 to Level 3, and so on.
2. **Non-Linear Progression:** Think of this as a skill tree or branching pathway system. Players have a choice in how they advance, allowing for multiple routes to success.

Specter's Progression Systems also underpin other game mechanics. For example, in skill divisions, players can progress upwards through ranks, like moving from bronze to platinum. But, there's also the possibility of regression, adding an additional layer of challenge. Similarly, battle passes rely heavily on progression logic, dictating how rewards are earned and milestones achieved.

A standout feature of Specter is its flexibility in progression design. While the default is to use Progression Markers to set level thresholds, you're not limited to just that. Specter permits the integration of statistics from your app parameters (system & custom), allowing for a wider range of progression metrics.&#x20;

In short, Specter's Progression Systems are your tools to craft an engaging, strategic player journey. They are intuitive, adaptable, and central to creating rewarding gameplay experiences. Dive into the subsequent sections for a detailed breakdown on harnessing these systems effectively.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/progression/progression-systems.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
