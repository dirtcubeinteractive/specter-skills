> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/competitions/tournaments/tournament-configuration.md).

# Tournament Configuration

To initiate the process of setting up a tournament, navigate to the '**Engage**' section, click on 'Competitions', and subsequently 'Tournaments'. Click on the '**Create Tournament**' button to begin the configuration.

***

### **Information**

1. **Tournament Icon:** Upload a distinctive icon to represent your tournament visually. This icon will help players easily recognize your tournament.
2. **Display Name:** Enter a compelling name for your tournament that captures its spirit and purpose, enticing players to join.
3. **Tournament ID:** Assign a unique identifier to your tournament, crucial for tracking and management within the Specter ecosystem.
4. **Description:** Provide a detailed description of the tournament, including objectives, rules, and any unique features. This information helps players understand what the tournament is about and how they can participate.
5. **Minimum Players:** Set the minimum number of players required for the tournament to take place, ensuring competitive viability.
6. **Maximum Players:** Determine the maximum number of players allowed to enter, managing the scale of your tournament effectively.
7. **Select Source:** Choose the basis for scoring in the tournament. Options include 'Matches' for using scores from specific game matches or 'Custom' for using scores sent via the 'Send Score to Competition API'. If 'Matches' is selected, specify the particular match.

***

### **Entry Configuration**

1. **Number of Entries:** Specify how many times a player can enter the competition, allowing for multiple attempts or single entry per player.
2. **Number of Attempts:** Define the number of chances a player has within a single entry, enhancing the competitive structure.
3. **Choose Pricing Options:** Set if the entry is priced, selecting the currency type and defining the entry amount. Options include:
   1. **Virtual Currency:** Choose the in-game currency, set the entry amount, and apply any discounts.
   2. **RMG Currency:** Select the real money gaming currency, set the entry amount, and apply discounts.
   3. **Hosting Fee per User:** Choose between a percentage or flat fee for hosting, entering the fee amount.

***

### **Prize Configuration**

1. **Prize Distribution Setup:** Decide if you want to establish prize distribution for the tournament. This can be set differently for RMG and non-RMG tournaments:
   1. **RMG:** Follow strict rules where the total prize pool is the entry fee minus the hosting fee, multiplied by the maximum number of players. Specter provides a dynamic algorithm to adjust prize values based on final participant numbers. Prizes are distributed in the selected RMG currency.
   2. **Non-RMG:** Set prizes without strict limitations. Prizes can include items, bundles, currencies, or progression markers. Specify ranks and corresponding prizes.

***

### **Access & Eligibility**

1. **Lock by Item/Bundle:** Restrict tournament access to players who possess a specific item or bundle.
2. **Lock by Progression System:** Limit participation to players who have reached a certain level within a specified progression system, enhancing the competition's exclusivity.

***

### **Custom Data**

1. **Tags:** Enter up to 10 tags to describe and categorize your tournament, aiding in management and player discovery.
2. **Meta Data:** Provide additional information through key-value pairs, offering deeper insights or rules about the tournament setup.

***

For scheduling your tournament, refer to the Competition Scheduling section under Live Ops to define start and end times, ensuring a seamless operational flow.

{% content-ref url="/pages/Xa6eTeYuXelOZ9UcfTpF" %}
[Schedule Competitions](/specter-user-manual/engage/live-ops/schedule-competitions.md)
{% endcontent-ref %}

***

By meticulously configuring each aspect of your tournament in Specter, you create a structured and engaging competitive experience.&#x20;


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/competitions/tournaments/tournament-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
