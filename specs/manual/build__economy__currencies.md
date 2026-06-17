> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/currencies.md).

# Currencies

Currencies are the lifeblood of a game's economy, driving all transactions and exchanges within it. Specter's architecture offers comprehensive support for diverse currency systems, mirroring the myriad ways in which games today incorporate currencies. Ranging from traditional virtual currencies like 'soft' and 'hard' currencies, to direct in-app purchases (IAPs) facilitated by real-world money, our system is equipped to manage it all.

We also offer support for Real Money Gaming (RMG), a growing niche in the gaming industry, where the in-game currency mirrors real-world currency values. Specter simplifies the management of this system by providing multiple wallets, each designed to handle specific types of transactions such as deposits, winnings, and bonuses. All wallets operate under specific rules and constraints. Further details about this will be covered under our dedicated [Real Money Gaming ](https://www.dirtcube.xyz/)section.

Within the Specter environment, each currency you build results in the creation of corresponding wallets in our backend, enabling smooth transactions and balance management. Our APIs empower you to regulate player wallet balances, monitor transaction histories, and conduct purchases using the defined currencies. Currencies, being expendable, function as an important medium for players to unlock in-game content, bonuses, and unique experiences.

Additionally, currencies can be retailed directly in the store or via bundles. The latter offers an exciting prospect to pair currencies with other items, creating unique reward bundles that enhance gameplay. More on this will be explained in the upcoming [Bundles](/specter-user-manual/build/economy/bundles.md) section.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/currencies.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
