> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/bundles/bundle-types.md).

# Bundle Types

In Specter, just like items, bundles are a fundamental part of the game experience. Similar to items, bundles are divided into '**Durable**' and '**Consumable**' types, each with its distinct features and impact on gameplay. As you're already familiar with these from the item types, let's examine their applications in the context of bundles.

#### **1. Durable Bundles**&#x20;

Durable bundles are enduring entities in a player's inventory and persist indefinitely. Once a player acquires them, they remain available until manually removed. These bundles typically contain valuable or strategic items that augment the player's gaming experience.

**Example**: In a sci-fi MMO, a `Survival Kit` bundle could be a durable entity. Once players purchase this bundle, it stays in their inventory until they decide to utilise its contents, which could include health packs, ammunition, and a unique weapon. This survival kit can be a crucial aid in the player's space exploration journey.

***

#### 2. Consumable Bundles

In contrast to durable bundles, consumable bundles are those with limited validity or usage. They decrease over time or with each use, thus offering strategic choices to the players.

**Example**: In the same sci-fi MMO, a `Temporal Shield Pack` bundle could be a consumable entity. This bundle may contain a set of shield boosts that players can activate to temporarily increase their defenses during tough battles. However, once activated, these shield boosts are used up and removed from the player's inventory.

***

### Bundle Subtypes&#x20;

Just as with items, bundles in Specter can be further characterised by various subtypes to define their interactions and functionality within the game.

#### Stackable&#x20;

Stackable bundles can accumulate in a player's inventory without consuming additional slots. Both durable and consumable bundles can be made stackable. Developers can establish a maximum stack count for such bundles, setting a limit on how many instances of a bundle can be stacked in a single inventory slot.

**Example**: In a fantasy RPG, players might gather `Potion Packs` (a durable bundle) over time. Instead of each pack occupying an individual slot, these packs can be stacked onto each other in the inventory, saving space and facilitating more efficient inventory management.

***

#### Equippable&#x20;

Equippable bundles can be assigned to a player's character, often providing enhancements to their capabilities or attributes. This subtype is applicable to both durable and consumable bundles.

**Example**: In a post-apocalyptic survival game, players could equip a `Survival Gear Pack` (a durable bundle) to improve their survival skills. Alternatively, they could equip an `Adrenaline Shot Pack` (a consumable bundle) for a temporary boost in agility during combat scenarios.

***

#### Tradable&#x20;

Tradable bundles can be exchanged between players, fostering social interaction within your gaming community.

**Example**: In an interstellar trading game, players might trade bundles like "Galactic Trade Goods" or `Alien Artifacts`with each other to enrich their collection and further their progress in the game.

***

#### Rentable&#x20;

Rentable bundles can be leased for a specified duration, introducing a time-limited aspect to your game's bundles. This characteristic applies to both durable and consumable bundles.

**Example**: In a virtual world simulation game, players might rent a `Furniture Set` (durable bundle) to furnish their virtual homes. Alternatively, they could rent a `Festival Decorations`(consumable bundle) to adorn their virtual space for a limited-time event.

***

#### Time Stackable&#x20;

Time stackable is a unique subtype applicable only to consumable bundles. These bundles have a time-based validity and can extend their duration when stacked.

**Example**: In an MMORPG, players might have several `XP Boost Packs`. Each pack provides an XP boost for a certain duration. If a player uses one pack and then another after 15 minutes, the second pack's boost doesn't overwrite the first one but extends the XP boost duration instead. This illustrates the 'time stackable' concept, where the effect of the same bundle can be stacked over time.

***

### Limited Availability

If you choose to limit a bundle's availability, much like limited availability items, you create an element of rarity and exclusivity. This can encourage competitive dynamics among players.

**Example**: In a battle royale game, there could be a `Legendary Gear Pack` that's marked as '**Limited**', with only a specific number of these bundles available in the game. As these bundles contain powerful equipment, they would become a sought-after asset, with players strategising to acquire one.

If you mark a bundle as '**Limited**', you will need to specify the quantity available. After the designated number of that bundle has been obtained by players, it

{% hint style="info" %}
Remember, applying these concepts to bundles is similar to implementing them with items. However, the strategic and economic implications may vary, offering you more complexity and flexibility in your game design.
{% endhint %}

You may want to check out:<br>

{% content-ref url="/pages/WjxHkzZAcTwbX2A0VsLY" %}
[Item Types](/specter-user-manual/build/economy/items/item-types.md)
{% endcontent-ref %}

***

### Opening Bundles

Specter provides developers with the option to choose when and how a bundle opens, adding another layer of strategic decision-making and anticipation for players. This characteristic can be set to 'Automatically' open upon purchase or 'Manually' opened by the player.

1. **Automatic Opening**: If a bundle is set to open automatically, the contents of the bundle are immediately made available to the player upon purchase. This can be beneficial for players seeking instant gratification and quick access to bundle contents.
2. **Manual Opening**: In contrast, if a bundle is set to open manually, the player decides when to access the contents of the bundle. This introduces a 'container' functionality to the game, whereby the bundle acts as a stored package that players can open at a time of their choosing.

#### Creating a Container

The manual opening option can be combined with the lock by item/bundle feature to create a container that requires a key. This can introduce an element of suspense or a requirement of acquiring a particular item before gaining access to the bundle's contents.

For example, in an adventure RPG, players might obtain a `Mysterious Chest` (a bundle) during their journey. This chest remains locked in their inventory until they find the corresponding `Ancient Key`. Once they acquire the key, they can use it to open the chest and gain access to its contents, which could include rare items or powerful equipment.

To elaborate on the vast possibilities and use cases of this functionality, please refer to the dedicated section for ‘[Containers](/specter-user-manual/build/economy/bundles/containers.md)’. This section will provide you with a comprehensive understanding of creating and utilising this feature to its fullest extent in your game design, thereby enriching the gameplay experience for players.<br>

You may want to check out:

{% content-ref url="/pages/8405qlgFlQqU5PatVOge" %}
[Containers](/specter-user-manual/build/economy/bundles/containers.md)
{% endcontent-ref %}


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/bundles/bundle-types.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
