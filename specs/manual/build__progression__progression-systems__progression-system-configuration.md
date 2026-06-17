> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/progression/progression-systems/progression-system-configuration.md).

# Progression System Configuration

To initiate the configuration of your game's progression systems, proceed to the 'Progression' section under 'Build'. Click on 'Progression Systems', and then the 'Create Progression System' button to access the configuration options.

***

### **Progression System Information**

1. **Progression System Icon:** Assign or modify the graphical representation of your progression system.
2. **Display Name:** Define the display name for your progression system.
3. **Progression System ID:** Input a unique identifier for your progression system.
4. **Progression System Description:** Detail a descriptive narrative for your progression system.
5. **Select Parameter:** Decide if this system is anchored on a 'Progression Marker' or a 'Statistic'. Based on your selection, you'll be prompted to pick the appropriate 'Progression Marker' or 'Statistic' from the dropdown menu

***

### Progression System Type

1. **Progression System Type:** Select 'Linear' for a straightforward sequence of progression, or 'Non-linear' for multiple routes of advancement.

#### **If 'Linear' is chosen:**

1. **Add Levels:** Introduce levels, naming them accordingly. For each level:
2. **Set Threshold:** Define the requirements based on your chosen progression system parameter.
3. **Assign Rewards:** Detail the rewards for achieving this level. Dive into the reward settings, picking from items, currencies, or bundles.
4. **Quick Leveling Tool:** For faster configuration:
   1. Click the `fx` symbol to invoke the formula configuration.
   2. Specify the initial number of levels and the threshold for the inaugural level, followed by the multiplier. Specter will automate the subsequent levels' thresholds, rounding to the nearest tenth for ease.

***

### Custom Data

* **Tags:** Utilise tags for efficient searchability and categorisation.
* **Meta Data:** Include any additional data that supports your progression system configuration.

***

Harness the power of Specter's versatile progression system management. With this configuration, design intricate player advancement structures that are both rewarding and aligned with your game's vision and strategy.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/progression/progression-systems/progression-system-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
