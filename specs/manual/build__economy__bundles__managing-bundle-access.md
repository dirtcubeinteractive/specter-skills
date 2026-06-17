> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/bundles/managing-bundle-access.md).

# Managing Bundle Access

Just as items in Specter can have controlled access, bundles also possess a similar feature. The concept of access allows you to structure your game's progression and rewards system meticulously. It lets you decide if players need a certain item, bundle, or specific progression level to access a bundle. This can aid in staging gameplay, incentivising player progress, and introducing complex gameplay elements.

**Example**: Consider a strategy MMO. Access to a `Fortress Construction Kit` bundle may be locked unless a player possesses the `Master Architect's Blueprint` (an item or perhaps another bundle). The blueprint, therefore, unlocks the `Fortress Construction Kit` bundle, creating an interesting gameplay dynamic.

To set this, simply select '**Lock By**' and choose '**Item/Bundle**' from the dropdown menu. Then, specify the required item or bundle that grants access to the new bundle.

Drawing a parallel from items, bundles can also be locked based on a player's progression within the game.

**Example**: In a sci-fi RPG, a `Starship Upgrade Pack` (bundle) might only become available when a player achieves Rank 10 in the `Starfleet Academy` progression system.

To set this, select '**Lock By**' and choose '**Progression System**' from the dropdown menu. Then, specify the progression system and the necessary level to unlock the bundle.

Just as you use these mechanisms to create a structured flow in your game with items, you can apply the same principles to bundles, adding an extra layer of intrigue, incentivising player progression, and enhancing gameplay dynamism.<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/bundles/managing-bundle-access.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
