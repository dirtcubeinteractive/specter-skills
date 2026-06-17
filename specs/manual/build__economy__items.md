> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/items.md).

# Items

Items represent a broad spectrum of in-game assets, adding depth and richness to your gaming environment. Specter provides a versatile and comprehensive item management system that caters to diverse gaming economies and designs.

From power-ups that augment player capabilities to avatar skins that amplify player individuality, items encapsulate a wide array of entities within a game. These interactive elements can populate player inventories, serve as rewards, or be sold in virtual stores, enhancing player engagement and invigorating the in-game economy.

At Specter, we acknowledge that each game has its unique item specifications, and hence, our platform supports various item types and subtypes. Items can be classified as durable or consumable, with the latter further categorized by count or duration. Additionally, you can assign various properties to items such as stackable, equippable, tradable, rentable, and time-stackable. More information regarding item types and how they work can be found in the dedicated [Item Types](https://manual.specterapp.xyz/specter-user-manual/build/economy/www.dirtcube.xyz) section.

Through segmentation, you can control item accessibility among different player groups, personalising your game experience for varied player demographics. Items can also be locked based on multiple parameters, regulating their availability and usage within your game.

Our robust API suite enables seamless management of player inventories, granting of items, and controlling the equipped states of items. This way, you can efficiently reward players or facilitate purchases, thereby fostering a vibrant in-game economy. With Specter, you possess a powerful toolkit for crafting compelling gaming experiences.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/items.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
