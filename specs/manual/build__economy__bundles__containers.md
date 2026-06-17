> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/bundles/containers.md).

# Containers

One of the most captivating aspects of gameplay is the element of suspense and anticipation. With Specter's '**Bundle**' feature, you can enhance these emotions by creating '**Containers**' - special types of bundles that players can open at their own discretion to reveal the contents inside. But before we dive into the specifics, let's clarify what we mean by a '**Container**'.

### Understanding Containers&#x20;

A '**Container**', in the context of Specter, is essentially a bundle set to open manually by players. It serves as a storage unit for various game elements, from simple items to powerful gear. But unlike regular bundles, which distribute their contents immediately upon acquisition, containers retain their contents until the player decides to **reveal** them.

***

### Why Use Containers?&#x20;

The utility of containers in game design is multifold:

1. **Enhanced Player Engagement**: The anticipation of discovering what's inside a container can engage players and add a layer of excitement to the gameplay.
2. **Flexible Reward Distribution**: Containers can act as rewards for players, holding inside them a variety of possible game assets. They provide a flexible and efficient way to distribute rewards at different stages of the game.
3. **Strategy and Decision-Making**: Containers that require specific keys or conditions to unlock can add strategic elements to the game, driving players to make decisions based on their needs and resources.

***

### Setting Up Containers in Specter&#x20;

To create a container in Specter, you follow the steps for creating a regular bundle, with a slight tweak in the configuration:

1. **Bundle Type**: When defining a new bundle, choose the bundle type based on how you want players to use the container. '**Consumable**' for a single-use container, or '**Durable**' for a reusable one.
2. **Bundle Open**: Set this option to '**Manual**'. This configuration allows players to choose when they want to open the bundle, effectively turning it into a container.
3. **Lock By**: If you want to add a twist to your container, consider using the '**Lock By**' option. You can require a specific item or attainment of a certain progression level to unlock the container. This could potentially deepen the gameplay, as players would need to find the key or reach the specified level to access the container's contents.
4. **Items in the Bundle**: Include the items/currency that will be inside the container. You can select any number of items and decide the quantity of each.

By using containers, you can create more engaging and dynamic player experiences. Whether it's the thrill of finding a key to unlock a special container or the joy of revealing a rare item hidden inside, containers provide a versatile tool for enhancing gameplay.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/bundles/containers.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
