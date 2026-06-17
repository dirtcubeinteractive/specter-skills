# Custom Events

Custom events provide the flexibility to track and react to any specific action or occurrence that might not be covered by the predefined Specter events. By allowing developers to define their own event types, custom events make it possible to cater to the unique needs of every game, ensuring that all important in-game actions can be tracked, analysed, and used to drive specific outcomes.

***

### Why are Custom Events Important

* **Flexibility**: Custom events offer unparalleled adaptability, ensuring developers aren't confined to predefined event structures.
* **Unique Game Mechanics Capture**: Every game has its unique features and mechanics. Custom events allow developers to accurately track these specialized game functions, offering insights that standard events might miss.
* **Detailed Analysis**: By capturing these unique events, developers can gather more granular data, enabling them to optimise the gaming experience based on genuine player behavior.

***

### Setting up Custom Events

<details>

<summary>Step 1: <strong>Define the Action</strong></summary>

Determine the specific in-game action or occurrence you aim to track.

</details>

<details>

<summary>Step 2: <strong>Utilise the Events API</strong></summary>

Register and manage your custom events with the Specter Events API, ensuring consistency in storage, processing, and retrieval.

</details>

<details>

<summary>Step 3: <strong>Avoid Duplication</strong></summary>

Cross-check to ensure your custom event is not a replica of any existing Specter event. This prevents data redundancy and confusion.

</details>

<details>

<summary>Step 4: <strong>Ensure Compatibility</strong></summary>

Make sure your custom event is in line with Specter's guidelines and limitations for efficient data processing and analysis.

</details>

***

### **Best Practices**

1. **Clear Naming Convention**: Names should reflect the event’s purpose. For instance, for a special power-up that makes the player invincible, `InvincibilityPowerupActivated` is more descriptive than `SpecialEvent1`.
2. **Limit Parameters**: Use only essential parameters to avoid data overload. For an event capturing a player's decision at a pivotal story junction, ideal parameters might be `decisionChoice`, `storyChapter`, and `timeTaken`.
3. **Regularly Review Events**: With periodic updates, ensure your custom events remain unique and relevant.
4. **Maintain Documentation**: Keep updated notes on each custom event, detailing its purpose, parameters, and any changes. This provides clarity for all team members.

***

### **Common Mistakes to Avoid**

1. **Event Overload**: Focus on events that provide valuable insights rather than tracking every detail, which can clutter data analysis.
2. **Inconsistent Naming**: Ensure uniformity in naming conventions across all events. This aids in data organisation and analysis.
3. **Outdated Documentation**: Always update your documentation to mirror any changes or modifications made to custom events.
4. **Skipping Testing**: Post-creation, always test new events within gameplay scenarios to ensure accuracy and functionality.

***

Custom events offer developers the tailored granularity needed to understand and optimise unique game dynamics. Leveraging custom events judiciously ensures a more refined and player-centric game development approach.<br>
