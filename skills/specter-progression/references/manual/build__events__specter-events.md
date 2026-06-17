# Specter Events

Specter Events are integral components of the Specter system, designed to capture and respond to specific player interactions within a gaming environment. By offering granular insight into player behaviour, Specter Events empower developers to optimise gameplay dynamics, enhance the achievements module, and more effectively engage their user base.

***

### **Features of Specter Events**

1. **Standardised Capture**: These events are designed keeping in mind the standard activities of a player within a game. They ensure that the fundamental in-game actions are easily and accurately logged.
2. **Automatic Logging**: Upon integration, Specter Events auto-log certain player activities without the need for additional coding or configuration by developers.
3. **Server-level Automation**: Many Specter Events are designed to function seamlessly with server-level processes, ensuring that actions are logged even when they don't directly involve client-side triggers.

***

### **How Specter Events Work**

When a player performs an action corresponding to a predefined Specter Event, the system registers it. These events carry default parameters and you may also use optional parameters as well as custom parameters.

For instance, the `equip_from_inventory` event would log default parameters such as `ItemID`, `PlayerID`, and the `InventoryID` when a player equips an item.

***

### **Integrating Specter Events**

To make the most of Specter Events:

1. **Explore the List**: Familiarise yourself with the available Specter Events to identify which ones align with your game's mechanics. This ensures you are not reinventing the wheel and can use what's readily available.
2. **Opt for Customisation**: While Specter Events cover a wide range of in-game actions, there might be specific nuances of your game that aren't addressed. In such cases, it's a good idea to combine Specter Events with custom events for a more comprehensive data capture.
3. **Monitor & Analyse**: Regularly check the data captured by Specter Events to gain insights into player behaviour and game dynamics.

***

### Specter Event Categories

To help developers navigate and choose, Specter Events are categorised based on different game modules. Some of these are:

<details>

<summary><strong>User Profile Events</strong></summary>

1. These events manage and update the user's profile, login details, and associated information.
2. Include user-centric actions like `user_signup`, `user_logged_in`, `update_username`, `update_user_email`, `update_user_kyc`, and `sign_in_using_google`.

</details>

<details>

<summary><strong>Match Events</strong></summary>

1. Related to the beginning and conclusion of gameplay sessions or matches.
2. Events marking the beginning and conclusion of gameplay sessions, namely `match_start` and `match_end`.

</details>

<details>

<summary><strong>Inventory Events</strong></summary>

1. Events that focus on in-game player inventory management, items, and bundles.
2. Events detailing inventory transactions including `add_item_to_inventory`, `get_item_from_inventory`, `equip_from_inventory`, `unequip_from_inventory`, and `remove_item_from_inventory`.

</details>

<details>

<summary><strong>Wallet and Purchase Events</strong></summary>

1. These actions relate directly to in-game currencies, wallets, and purchasing mechanisms.
2. Actions like `update_currency`, `update_wallet`, `item_purchased`, `bundle_purchased`, and `store_purchased`.

</details>

<details>

<summary><strong>Progression Events</strong></summary>

1. These are associated with the player's progression markers within the game.
2. These encompass events such as `update_progression_marker` and `force_complete_task`.

</details>

{% hint style="info" %}
The full list of Specter Events, complete with their default and optional parameters, can be found in the dedicated[ Events Manual](https://manual.specterapp.xyz/specter-user-manual/build/events/www.dirtcube.xyz).
{% endhint %}

***

By integrating Specter Events, developers can cater to a wide range of in-game scenarios and player behaviors, ensuring a dynamic and engaging gameplay experience.
