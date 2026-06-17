> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/events.md).

# Events

{% hint style="info" %}
Events in Specter capture player activities within games. They are logged either via Specter's standard APIs or through custom inputs in the Events API
{% endhint %}

Specter harnesses an event-driven architecture, integral to enhancing player engagement and enriching game analytics. This system forms the cornerstone of Specter's player engagement strategies, particularly the achievements module. By tracking player actions, behaviours, and experiences in real-time, developers can understand their audience better and craft immersive in-game tasks and objectives that offer meaningful rewards.

***

### **Why is this vital?**

This robust tracking underpins the granular task definitions in the achievements system. When a player achieves a task, it's often the result of a series of actions or events. By dissecting these actions into traceable events, Specter ensures that every accomplishment feels rewarding and is grounded in tangible player activity.

***

### **Types of Events in Specter**

1. **Specter Events:** These events generally correspond directly to specific Specter APIs. Whenever a game triggers one of these default APIs, Specter automatically logs the event, ensuring a real-time snapshot of game activities.

**Example**: Let's consider the `equip inventory item` action in popular MMORPGs like "**World of Warcraft**." When a player obtains a powerful item, say the `Blade of Eternal Light`, and chooses to equip it, Specter's API swiftly registers this action. This act of arming oneself with the legendary blade is then logged as a distinct event, capturing both the action and its in-game significance.

{% hint style="info" %}
For some use cases, events are logged internally in Specter without the need for a direct API call. This happens when certain processes are automated at the server level without any intervention from the client.&#x20;
{% endhint %}

2. **Custom Events:** Not every game action might align with Specter's standard APIs. For scenarios like these, Specter offers Custom Events that can be used in conjunction with the Events API.

**Example**: An apt example is the classic "**Pac-Man**" where players pick up `dots`. This action doesn't align with a default Specter API. Developers can, however, register such an action using the Event API to ensure that every nuance of the game is trackable.

You may want to check out:

{% content-ref url="/pages/Bz0r0yOYDge0DnOl960V" %}
[Specter Events](/specter-user-manual/build/events/specter-events.md)
{% endcontent-ref %}

{% content-ref url="/pages/J0r5PzkmcIqYZRImS5Fh" %}
[Custom Events](/specter-user-manual/build/events/custom-events.md)
{% endcontent-ref %}

***

### Parameters: Adding Context

Parameters are attached to both Specter and Custom Events to provide detailed context about each activity. These can be broadly categorized into:

1. **Backend Parameters**: Inherent to an API, such as "Match ID" or "Player Lat-Long". These are automatically included with Specter Events but can also be manually added to Custom Events for enriched data logging.
2. **Frontend Parameters**: Developer-defined parameters that add game-specific context to events. These custom parameters allow for a more nuanced understanding of in-game actions and their implications.

### **Simplicity in Flexibility**

The power lies in the simplicity of adding context through parameters to both predefined and custom events, ensuring every significant action within the game is trackable and meaningful.

### Practical Application

By utilizing event parameters, developers can effectively:

* Trigger complex functionalities based on specific game activities.
* Enhance player engagement through detailed tracking and personalized experiences.
* Drive game analytics and achievements by capturing a wide array of player behaviors and milestones.

{% content-ref url="/pages/xT1QpWu6UfeEeR4A3nkb" %}
[Event Parameters](/specter-user-manual/build/events/event-parameters.md)
{% endcontent-ref %}

***

### Understanding Statistics & States

In Specter, we categorise data into two main buckets: "**States**" and "**Statistics**". Both can be derived from event parameters or from Specter's accumulated player insights.&#x20;

1. **States:** States signify the current status of a player or an item. Let's consider the RPG "**Skyrim**." A player's state could be `Werewolf` or `Vampire`, denoting unique abilities and challenges.&#x20;

{% hint style="info" %}
States are often binary or categorical.
{% endhint %}

2. **Statistics:** These are numerical data points tracing player activities. In a game like "Apex Legends," a statistic might track the number of `kills` a player achieves.&#x20;

{% hint style="info" %}
Statistics are stored with historical data, aiding in detailed analytics, populating leaderboards, or defining progression systems.
{% endhint %}

***

### **Linking Events to Achievements**

Tasks in the achievements system rely heavily on events. While crafting a task, the user selects an event which serves as the trigger for task evaluation.

The parameters that determine the conditions and benchmarks required for a task's completion are known as **Task Parameters**.&#x20;

**Task Parameters** can be sourced from two main areas:

1. **Event Parameters**: These are the backend and frontend parameters associated with events. For instance, when a "**Match End**" event is triggered, we could have default parameters like "**Match ID**" and custom parameters like "**Kills**".
2. **Specter Presets**: This includes the statistics and states Specter maintains, derived from accumulated player data and computations over time. Examples include "**Total matches played**" or "**Player's current level**".

{% hint style="info" %}
A distinctive feature of Task Parameters is their flexibility. A developer can incorporate any combination of the event parameters and/or Specter's derived knowledge to craft the task's rules.
{% endhint %}

**Example:** In "**PlayerUnknown's Battlegrounds**," a task might be defined as:&#x20;

**Task**: Eliminate 5 opponents in a single match named Verdant Vanguard while wearing a green shirt.&#x20;

Here's how this breaks down:

**Event Triggered**: Match End Event

**Task Parameters**:

1. **Match ID** = 12345 (unique identifier for "Verdant Vanguard")
2. **Kills** = 5
3. **Equipped Item** = Green Shirt

In the provided example, the "**Match ID**" is a default event parameter, "**Kills**" is a custom parameter added to the "**Match End API**", and the "**Equipped Item**" is recognised by Specter based on the player's current equipment status.&#x20;

Alternately, you could have added "**Item id"** as a parameter for the event and sent `Green Shirt` to Specter through the API.&#x20;

When creating the rules for evaluating the event , developers can specify whether statistical parameters should be evaluated as:

{% hint style="info" %}

* **One Shot**: The value is evaluated based on a single instance of the event.
* **Cumulative**: The value is accumulated over multiple instances.

\
We will go over this in more detail in the [Event Rule Engine](/specter-user-manual/engage/achievements/tasks/task-rule-engine.md) section under [Tasks](/specter-user-manual/engage/achievements/tasks.md).
{% endhint %}

Developers can craft intricate conditions using these parameters, ensuring tasks are both challenging and reflective of in-game activity.

You may want to check out

{% content-ref url="/pages/IMpCG1Z15dokum8xhjHJ" %}
[Task Rule Engine](/specter-user-manual/engage/achievements/tasks/task-rule-engine.md)
{% endcontent-ref %}

***

### **Event System Perks**

The magic of the event-driven system isn't just in tracking; it's about harnessing the data for enhanced game experiences:

* **Creating Player Profiles:** With statistics and states, developers get a comprehensive view of each player's journey, preferences, and skills. This data-rich profile aids in personalised game experiences.
* **Analytics:** Dive deep into player behaviour, predict trends, and refine gameplay mechanics.
* **Leaderboards and Progression:** Use statistics to rank players or set criteria for game progression, ensuring players always have new milestones to chase.

***

In conclusion, Specter's event-driven system is more than a tracking tool. It's a dynamic, real-time pulse on player behaviour, and a powerful resource for developers to craft rewarding, immersive game experiences.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/events.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
