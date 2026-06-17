> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/economy/items/item-types.md).

# Item Types

In Specter, items are key elements that can significantly influence gameplay dynamics and player engagement. Items are classified into two main types, namely '**Durable**' and '**Consumable**', each with its distinct characteristics. Let's delve into each one and understand their functionality in greater detail.

#### 1. Durable Items

Durable items, as the name suggests, are long-lasting items that persist in a player's inventory indefinitely. Once a player acquires them, they remain until manually removed. These items are often central to a player's gaming identity or offer consistent strategic advantages.

**Example:** In a Medieval RPG game, a `Knight's Sword` is a durable item. Once players acquire this sword, they can use it indefinitely without it breaking or disappearing. The `Knight's Sword` may provide a constant increase to the player's attack damage.

***

#### 2. Consumable Items

Contrary to durable items, consumable items have limited usage or validity. They get used up over time or decrease with usage, thus posing strategic choices for the players.

**Example:** In the same Medieval RPG game, a `Health Potion` is a consumable item. Players can use it to regain lost health during a battle. However, once used, the `Health Potion` gets consumed and removed from the player's inventory.

***

### Item Subtypes

Further to these primary types, items in Specter can be characterised by various subtypes. These subtypes dictate the item's functionality and interaction within the game.

#### **Stackable**

Stackable items can be accumulated in a player's inventory without taking additional slots. Both durable and consumable items can be made stackable. Developers can set a max stack count for such items, limiting how many instances of an item can be stacked in a single inventory slot.

**Example:** In a fantasy strategy game, a player might gather `Magic Crystals` (a durable item) over time. Rather than each crystal occupying an individual slot, they stack onto each other in the inventory, saving space and allowing easy management.

***

#### **Equippable**

Equippable items can be attached or wielded by a player's character, often enhancing their abilities or attributes. This subtype applies to both durable and consumable items.

**Example:** In a space-themed shooter game, a player might equip a `Plasma Shield` (a durable item) to increase their defence stats. Alternatively, they might use an `Adrenaline Boost` (a consumable item) during a difficult boss fight to temporarily increase their speed.

***

#### **Tradable**

Tradable items are those that players can exchange among themselves. This promotes social interaction within your game community.

**Example:** In a collectible card game, players may trade `Rare Cards` with each other to complete their collections. These could be either durable (like `Golden Dragon Card`) or consumable (like `Limited Edition Event Card`).

***

#### **Rentable**

Rentable items can be leased for a specified duration. This introduces a time-limited usage aspect to your game items, applicable to both durable and consumable items.

**Example:** In a racing game, players might rent a `Turbocharged Sports Car` (durable item) for a few races. Or, in a detective-themed game, players might rent a `Clue Detector` (consumable item) for a certain number of levels.

***

#### **Time Stackable**

Time Stackable is a unique subtype applicable only to consumable items. These items have time-based usage and can extend their duration when stacked.

**Example:** In a MMORPG, players might possess multiple `Double XP Scrolls`. Each scroll is valid for 30 minutes. If a player uses one scroll and then another after 15 minutes, the second scroll's effect won't overwrite the first one. Instead, the double XP period gets extended by the duration of the second scroll, offering 45 minutes of double XP gain in total. This illustrates the 'time stackable' concept, where the effect of the same item can be stacked over time.

***

### Limited Availability

Items with limited availability are unique because their quantity in the game is restricted, creating an atmosphere of scarcity and often encouraging a competitive dynamic among players.

**Example**: Imagine an adventure game where there is a `Golden Compass` that guides players to hidden treasures. This item is marked as 'Limited', and there are only 100 of these compasses available in the entire game world. As a result, the `Golden Compass` becomes a coveted possession, and players might compete or strategise differently to acquire one.

If you choose to mark an item as '**Limited**', you will be asked to specify the quantity available. After the specified number of that item has been acquired by players, it will no longer be available unless you choose to add more.

By utilising limited availability items, you can create exciting dynamics within your game and promote player engagement through unique challenges and rewards.

{% hint style="info" %}
Remember, designing your game's economy and items requires careful consideration. It's essential to balance the gameplay dynamics with the player's experience, providing a challenging yet enjoyable gaming environment.
{% endhint %}

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/economy/items/item-types.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
