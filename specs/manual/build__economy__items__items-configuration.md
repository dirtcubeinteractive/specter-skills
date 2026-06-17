> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/items/items-configuration.md).

# Items Configuration

To begin configuring an item, navigate to the 'Economy' section under 'Build', click on 'Items', and then select the '**Create Item**' button to access the configuration settings.

***

### Item Information

1. **Item Icon**: Assign or update the graphic representation of your item.
2. **Display Name**: Define your item's display name.
3. **Item ID**: Enter a unique identifier for your item.
4. **Item Description**: Describe your item to provide a clearer understanding of its function or purpose.

***

### Pricing

1. **Pricing Options**: This involves selecting a currency (Virtual, IAP, or Real Money Gaming Currency), setting the price amount, and if desired, specifying a discount.

{% hint style="info" %}
If you choose to use Real Money Gaming (RMG) Currency, there's an added field for '**Bonus Cash Allowance**.' This field allows you to set the maximum amount of bonus cash (part of your RMG Currency) that can be used when purchasing the item. If a player possesses the applicable bonus cash, it will be automatically deducted during the purchase, up to the set maximum amount.
{% endhint %}

To learn about how bonus cash functions and how RMG Currency operates in more detail, refer to the dedicated [Real Money Gaming](https://manual.specterapp.xyz/specter-user-manual/build/economy/items/www.dirtcube.xyz) section.

{% hint style="info" %}
An item can also be priced by combining different currency options.
{% endhint %}

You may want to check out:

{% content-ref url="/pages/6pbQ887s0Nqj2iKBcVAD" %}
[Currency Types](/specter-user-manual/build/economy/currencies/currency-types.md)
{% endcontent-ref %}

***

### Access and Eligibility

1. **Lock By**: Determine if access to the item is restricted by another item/bundle or progression system.
2. **Item/Bundle Selection**: If the item is locked by another item/bundle, specify that item or bundle.
3. **Progression System Selection**: If the item is locked by a progression system, select the specific system(s).
4. **Progression System Level**: If a progression system is selected, define the level within that system which unlocks the item.
5. **Segment Selection**: Define the player segments for whom the item will be visible.

You may want to check out:

{% content-ref url="/pages/nXE6znTuIWBirU77J6Gl" %}
[Managing Item Access](/specter-user-manual/build/economy/items/managing-item-access.md)
{% endcontent-ref %}

{% content-ref url="/pages/odeWyFFykYbxreECOIbM" %}
[Progression Systems](/specter-user-manual/build/progression/progression-systems.md)
{% endcontent-ref %}

***

### Item Types

1. **Item Type**: Specify whether the item is 'durable' (permanently available) or 'consumable' (used up over time or with use).
2. **Count/Time Usage**: If the item is consumable, choose whether it's depleted by count (number of uses) or time (duration).
3. **Item Subtypes**: Define if the item is stackable, equippable, rentable, tradable, or time-stackable (if consumable by time).
4. **Max Stack Count**: For stackable items, designate the maximum number of items that can be stacked together.
5. **Limited Availability**: Indicate if the item is available in limited quantity. If 'Limited' is chosen, specify the quantity.

You may want to check out:

{% content-ref url="/pages/WjxHkzZAcTwbX2A0VsLY" %}
[Item Types](/specter-user-manual/build/economy/items/item-types.md)
{% endcontent-ref %}

***

### Custom Data

1. **Tags**: Use tags to categorise and manage your items more effectively.
2. **Meta Data**: Enter any additional data, defined as key-value pairs, to enhance your item configuration.

***

Specter's comprehensive and adaptable item management system equips you to create and customise a diverse range of in-game items, catering to various gameplay styles and player preferences.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/items/items-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
