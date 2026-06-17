> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/stores/store-configuration.md).

# Store Configuration

To set up a store, you first need to navigate to the 'Economy' section under the 'Build' category. Click on 'Stores' and then select the '**Create Store**' button to access the store configuration settings.

***

### Store Information

This is where you enter the basic information about your store.

1. **Store Icon:** Assign an attractive graphic representation for your store.
2. **Display Name:** Set the name for your store as it will appear to players.
3. **Store ID:** Enter a unique identifier for your store.
4. **Store Description:** Describe your store to give players a better understanding of what they can expect to find in it.
5. **Add No of Categories:** Enter the number of categories you want in your store. The number you input will generate that many categories for you to fill.

***

### Category Information

This is where you provide information for each category you have created in your store.

1. **Category Icon:** Assign a graphic representation for each category.
2. **Category Name:** Set the name for each category.
3. **Category ID:** Enter a unique identifier for each category.
4. **Add Content to Category:** Select the items or bundles that belong to each category. Currencies need to be added to bundles in order to be added to stores.
5. **Set Store Price:** While configuring the pricing for store content, you'll find the process mirrors that of items and bundles. It involves selecting a currency type (Virtual, IAP, or Real Money Gaming Currency), setting the price amount, and if desired, offering a discount.

{% hint style="info" %}
If you choose Real Money Gaming (RMG) Currency as your pricing medium, an additional field for '**Bonus Cash Allowance**' appears. This field sets the maximum amount of bonus cash (part of your RMG Currency) that can be used for purchasing the store content. If players possess the required bonus cash, it will be automatically deducted during the purchase, up to the maximum amount.
{% endhint %}

For an in-depth understanding of how bonus cash operates and the functionality of RMG Currency, you're advised to refer to the dedicated [Real Money Gaming](https://manual.specterapp.xyz/specter-user-manual/build/economy/stores/www.dirtcube.xyz) section.

{% hint style="info" %}
For each piece of content, assign a price that can be virtual, IAP, or RMG currency. The store price will override the root price of an item or bundle.
{% endhint %}

Learn more about this in the dedicated [Store Content Pricing ](/specter-user-manual/build/economy/stores/store-content-pricing.md)section.

{% hint style="info" %}
A combination of currencies can also be used to price store content.
{% endhint %}

You may want to check out:

{% content-ref url="/pages/6pbQ887s0Nqj2iKBcVAD" %}
[Currency Types](/specter-user-manual/build/economy/currencies/currency-types.md)
{% endcontent-ref %}

{% content-ref url="/pages/JoeNJsbPcFjn6esDhDAd" %}
[Store Content Pricing](/specter-user-manual/build/economy/stores/store-content-pricing.md)
{% endcontent-ref %}

***

### Access and Eligibility

This section allows you to control who can access the store and when.

1. **Lock by Level:** Choose if the store is locked until players reach a certain level in the progression system. Use the toggle to select 'yes' or 'no'.
2. **Choose Progression System:** If the store is locked by level, select the specific progression system.
3. **Set Progression System Level:** Define the level within the chosen progression system that a player must reach to unlock the store.
4. **Choose Segments:** Define the player segments for whom the store will be visible.

You may want to check out:

{% content-ref url="/pages/odeWyFFykYbxreECOIbM" %}
[Progression Systems](/specter-user-manual/build/progression/progression-systems.md)
{% endcontent-ref %}

***

### Custom Data

This is where you can add further classification and meta-data to your store.

1. **Tags:** Use tags to organise and manage your stores more effectively.
2. **Meta Data:** Enter any additional information, defined as key-value pairs, to enhance your store configuration.

***

Specter's comprehensive and adaptable store management system allows you to create virtual stores with extensive customisation options. Whether you're aiming to provide a general marketplace or create niche shops for specific player segments, the Specter platform provides the flexibility to do so, enriching your in-game economy and player experience.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/stores/store-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
