> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/stores/store-content-pricing.md).

# Store Content Pricing

Store Content Pricing in Specter is an essential feature that allows for dynamic pricing of items, bundles, or currencies across different stores. This means that regardless of the initial price set for a piece of content, its price can be varied in different stores, offering adaptability in pricing strategy.

***

### Individualised Store Pricing

The Store Price is unique to each store, empowering you to set diverse pricing scenarios depending on the context or theme of the store. It allows for the same item or bundle to have different prices across various stores in your game. This versatility opens up ample room for experimental pricing strategies, promotional offerings, and adjustments based on regional variations.

For instance, consider you've designed a `Global Store` catering to your players worldwide. For your players in the U.S., you might want to offer an `Epic Sword bundle` priced at $5. However, for your audience in India, considering the difference in purchasing power, the same bundle could be priced at ₹250, which is approximately $3. This targeted pricing strategy allows you to optimise for regional affordability and maximise global revenue.

***

### Platform Specific Pricing

In another scenario, you could take advantage of platform-specific pricing. Let's say you have separate stores for Android and iOS users due to the different fee structures on Google Play Store and Apple App Store. You might price a `Magic Potion` item at $0.99 for Android users and $1.29 for iOS users to account for the higher App Store fees. The Store Price feature gives you the flexibility to adjust pricing based on such platform differences.

***

### Promotional and Exclusive Pricing

Moreover, this feature can be used to create limited-time promotional offers or exclusive stores. You might have a `Holiday Store` offering a popular item at a discounted price to celebrate a festive occasion. Alternatively, you could develop a `VIP Store` for top-tier players, where rare and exclusive items are sold at a premium.

***

### Overriding the Root Price

The most potent aspect of Store Price lies in its capability to override the '**root price**' of an item or bundle. The root price is the standard price set at the item or bundle level. However, when a Store Price is assigned, it takes precedence, effectively overriding the root price for that specific store. This functionality ensures that your pricing approach can stay adaptable, catering to the fluctuating needs of your game and the evolving player economy.

***

Understanding and harnessing Store Content Pricing effectively is integral to leveraging the full potential of Specter's store management capabilities. By implementing it astutely, you can craft unique, dynamic, and engaging shopping experiences, drawing your players deeper into the immersive world of your game.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/stores/store-content-pricing.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
