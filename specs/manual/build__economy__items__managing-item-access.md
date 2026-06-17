> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/items/managing-item-access.md).

# Managing Item Access

In certain game scenarios, you might want to restrict access to an item unless players have a specific item or bundle in their possession, or they've reached a certain progression level. This feature is useful for introducing stages of gameplay or providing meaningful rewards to players.

**Example**: In a treasure hunt game, access to a `Treasure Chest` (item) might be locked unless a player has a `Magic Key` (item) in their inventory. In this scenario, the `Magic Key` unlocks the 'Treasure Chest'.

To set this, simply choose '**Lock By**' and select '**Item/Bundle**' from the dropdown menu. Then, specify the item or bundle needed to unlock the new item.

Alternatively, items can be locked based on a player's progression within the game.

**Example**: In an RPG, a `Master Sword` (item) might only become available when a player reaches `Level 20` in the 'Warrior's Path' progression system.

To set this, choose '**Lock By**' and select '**Progression System**' from the dropdown menu. Then, specify the progression system and the level needed to unlock the item.

By using these mechanisms, you can structure your game's flow, incentivise player progression, and introduce intriguing gameplay elements.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/items/managing-item-access.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
