# Event Parameters

Specter's event-driven architecture tracks player activities with precision. Events capture actions, but it's the parameters that provide the context. Understanding these parameters is essential for game developers seeking insights into player behaviour.

To illustrate the functioning and importance of these parameters, we'll utilise an example from the esteemed FPS game, "**Call of Duty**". Consider a high-stakes match tagged `Final Frontier` with a unique identifier `FF-2023-07`.

***

### **Event Parameter Types**

1. &#x20;**Default Parameters**: Foundational to any event, default parameters consistently provide the essential context. They are inherent to the event, ensuring the primary data remains standardised.

{% hint style="info" %}
For the `Final Frontier` match in "**Call of Duty**",

**Default Parameter**: `MatchID` - This is a unique identifier associated with the specific instance of the match, in this case, `FF-2023-07.`
{% endhint %}

2. **Optional Parameters**: These parameters enhance the basic structure offered by default parameters. They provide an additional layer of data, supplementing the core information without being mandatory.

Still referring to the `Final Frontier` match:

{% hint style="info" %}
Still referring to the `Final Frontier` match:

1. **Optional Parameter:** `CompetitionID` (Signifies the particular competition under which the match falls, if applicable.)

2. **Optional Parameter:** `MatchResult` (Here, the result could range from `Win`, `Draw`, or `Loss`, defining the outcome.)
   {% endhint %}

3. **Custom Parameters**: Recognising the diverse needs of various games, custom parameters cater to the unique aspects not covered by default or optional parameters. These are delineated into "**State**" (indicating a particular status) and "**Statistic**" (quantifying ongoing actions).

Analysing the "Final Frontier" match:

{% hint style="info" %}
Analysing the "Final Frontier" match:

1. Custom Parameter (State): `SpecialWeaponStatus` - Reflects the status of a unique weapon, e.g., `Platinum Rifle`, during the match. The states might be `Acquired`, `Activated,` or `Unavailable`.
2. Custom Parameter (Statistic): `GrenadesDeployed` - Quantifies the number of grenades utilised by a player in the match.
   {% endhint %}

By integrating these parameters into events, Specter ensures a holistic representation of in-game activities, offering developers precise and actionable insights.

***

### Exploring Data Types of Event Parameters

Event parameters can be presented in various data types to capture the essence of the player's actions or the game's state. The chosen type depends largely on what facet of information we wish to extract or represent.

{% tabs %}
{% tab title="Boolean" %}
**Description**: Represents a binary value (True/False).

**Applicability:** Predominantly used for States where a condition either exists or doesn’t.

**Example:** In a game like "Legend of Zelda":

* **Parameter Name:** `isShieldActive`
* **Description:** This parameter signifies whether the player has an active shield.
* **Possible Values:** `True` (Shield is active) or `False` (Shield is not active).
  {% endtab %}

{% tab title="Integer/Float" %}
**Description**: Numeric parameters encompass integers (whole numbers) and floats (numbers with decimal points). They're pivotal for representing quantifiable data.

**Applicability:** Majorly utilised for Statistics, capturing counts or measures. Occasionally, they also find relevance in States, especially when levels or thresholds are concerned.

**Example (Integer):**

* **Parameter Name:** `EnemiesDefeated`
* **Description:** Counts the number of adversaries the player has conquered.
* **Possible Values:** Any integer value, e.g., 32.

**Example (Float):**

* **Parameter Name:** `PlayerSpeed`
* **Description:** Indicates the current speed of the player, perhaps in a racing or running game.
* **Possible Values:** Any float value, e.g., 10.75 (units/second).
  {% endtab %}

{% tab title="String" %}
**Description**: String parameters convey textual data. They're versatile, encapsulating categorical or descriptive information.

**Applicability:** Used in both States and Statistics, depending on the game's context or the specifics of the event.

**Example:**

* **Parameter Name:** `WeaponEquipped`
* **Description:** Dictates the type of weapon a player has currently equipped.
* **Possible Values:** 'Sword', 'Bow', 'Magic Staff'.
  {% endtab %}

{% tab title="Arrays/Lists" %}
**Description**: Arrays or Lists hold a collection of values. They are instrumental in representing sets of related data, especially when the number of items can vary.

**Applicability:** Primarily used for Statistics, especially when detailing multiple items or actions in a single event.

**Example:**

* **Parameter Name:** `ItemsCollected`
* **Description:** A list of items the player has gathered during a particular phase or session.
* **Possible Values:** \['Potion', 'Gold Coin', 'Diamond'].
  {% endtab %}
  {% endtabs %}

***

### Parameter Best Practices

To ensure optimal readability and maintainability, adhering to best practices in parameter naming and usage is imperative.

<details>

<summary><strong>Naming Conventions</strong> </summary>

Good naming conventions are vital for easy interpretation and error reduction.

**Conventions**:

* **CamelCase**: e.g., `playerScore`, `totalEnemiesDefeated`
* **snake\_case**: e.g., `player_score`, `total_enemies_defeated`

**Guidelines**:

* Avoid abbreviations and acronyms to reduce ambiguity.
* Prefix booleans for instant recognition, such as `isAlive` or `hasAmmo`.
* Favor specificity over generic terms to enhance clarity.
* Integrate units where appropriate, like `timeInSeconds` or `distanceInMeters`.

</details>

<details>

<summary>Consistency</summary>

Preserve a uniform approach towards naming parameters and choosing their data types across events.

**Example**: If an event utilises the term `playerScore` with an integer data type, any subsequent events should adhere to the same convention.

</details>

<details>

<summary><strong>Avoid Redundancies</strong></summary>

While collecting exhaustive data might seem beneficial, it's prudent to avoid parameters that offer redundant or overlapping insights.

**Example**: If there's a parameter like `totalCoins`, introducing another one like `coinCount` would be unnecessary and could lead to inconsistencies.

</details>

<details>

<summary><strong>Validating Inputs</strong></summary>

Before registering a parameter's data, always ensure its validity to maintain data integrity.

**Example**: If a parameter is intended to record a player's score and expects an integer, validate that the input isn't a string or other data type before logging.

</details>

***

### **Common Mistakes to Watch For**

1. **Mismatched Data Types**

**Problem**: Using a non-congruent data type for a parameter.

**Example**: A parameter named `enemiesDefeated` designed to track the number of enemies defeated should be an integer. If it's registered as a string, it's likely a mistake.

2. **Event Overloading**

**Problem**: Incorporating too many parameters within a single event.

**Example**: A custom event called `endOfLevel` shouldn't be overwhelmed with parameters like `playerScore`, `enemiesDefeated`, `itemsCollected`, `timeTaken`, `playerHealthLeft`, and so on. Instead, it's better to categorise and distribute parameters across relevant events.

***

In conclusion, event parameters in Specter's architecture offer critical insights into player activities. By employing them with precision, developers can greatly enhance gameplay and foster deeper player engagement.
