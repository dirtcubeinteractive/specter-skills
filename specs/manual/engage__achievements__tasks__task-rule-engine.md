> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/achievements/tasks/task-rule-engine.md).

# Task Rule Engine

Events within Specter are pivotal in tracking in-game player activities. These activities, when they fulfil certain criteria, lead to the completion of specific tasks or achievements. For a developer, setting up a task is akin to defining a rule: "If Event X happens with Condition Y, then Task Z is achieved."

It is a dynamic tool tailored to facilitate developers in crafting precise conditions for tasks using events and their associated parameters. It provides the flexibility and precision required to define the criteria for task completion, ensuring tasks are both challenging and reflective of in-game activity.

***

### Overview

The Rule Engine allows developers to:

* Combine multiple conditions using logical operators (`AND`, `OR`).
* Utilise appropriate operators based on the data type of the event parameter, state, or statistic.
* Create nested conditions for more complex task requirements.

***

### Getting Started

1. **Accessing the Rule Engine**: Navigate to the Task Configuration section. Once you've selected the triggering event for your task, you can begin your rule configuration.
2. **Selecting Parameters**: Choose from available event parameters that you have configured in the events section. In addition you may be able to use some Specter Presets.

***

### Crafting Rules

1. **Basic Conditions**:
   * For **States** (often binary or categorical), use operators like `is` or `is not`. E.g., Player's current state `is` "Werewolf".
   * For **Statistics** (numerical data points), use operators like `=`, `>`, `<`, `>=`, `<=`. E.g., Player's score `>=` 1000.
2. **Combining Conditions**:
   * Use the `AND` operator when all conditions must be met.
   * Use the `OR` operator when any one of the conditions can be met.
3. **Nested Conditions**: For more intricate rules, you can nest conditions within one another. E.g., Player's score `>=` 1000 `AND` (Player's state `is` "Werewolf" `OR` Player's state `is` "Vampire").

***

### Advanced Tips

* **Data Type Awareness**: Ensure you're using the correct operators for the data type. For instance, string-based states will not support numerical operators.
* **Optimal Use of `AND` & `OR`**: While combining conditions, be clear about the task's requirements. Overcomplicating with too many nested conditions can make the task confusing.
* **Testing Your Rules**: Always test the rules you've set up in a controlled environment to ensure they trigger as expected.

***

The Rule Engine is a cornerstone of Specter's task configuration, providing developers with a dynamic tool to set precise conditions for task achievements. By understanding and effectively using the Rule Engine, developers can ensure that in-game tasks are engaging, challenging, and rewarding for players.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/achievements/tasks/task-rule-engine.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
