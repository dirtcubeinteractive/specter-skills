> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/competitions/instant-battles/instant-battles-configuration.md).

# Instant Battles Configuration

To initiate the process of setting up an Instant Battle, navigate to the 'Engage' section, click on 'Competitions', and subsequently 'Instant Battles'. Click on the 'Create Instant Battle' button to begin the configuration.

***

### **Information**

1. **Icon:** Upload an icon that represents the Instant Battle, helping players quickly identify the competition.
2. **Display Name:** Choose a compelling name that captures the essence of the Instant Battle, enticing players to participate.
3. **Instant Battle ID:** Assign a unique identifier for the battle, crucial for tracking and management within the Specter system.
4. **Description:** Provide a detailed description of the Instant Battle, outlining the rules, objectives, and any unique features.
5. **Minimum Players:** Set the minimum number of players required to initiate the battle, ensuring a viable competition.
6. **Maximum Players:** Determine the maximum number of players allowed to participate, keeping the competition balanced and manageable.
7. **Select Source:** Choose 'Matches' for using scores from specific game matches or 'Custom' for scores sent via the 'Send Score to Competition API'. Specify the match if 'Matches' is selected.

***

### **Entry Configuration**

1. **Number of Entries:** Indicate how many times a player can enter the competition, allowing for multiple attempts to win.
2. **Number of Attempts:** Define the number of chances a player gets within a single entry to succeed.
3. **Number of Slots:** Specify the slots as 'Unlimited' for open participation or 'Custom' for setting a fixed number of instances of the match that can be held concurrently.
4. **Choose Pricing Options:** If the entry is priced, select the type of currency and set the entry fee. Options include:
   1. **Virtual Currency:** Select the in-game currency, specify the entry amount, and apply any discounts.
   2. **RMG Currency:** Choose the real money gaming currency, set the entry amount, and apply discounts.
   3. **Hosting Fee per User:** Opt for a percentage or flat fee for hosting and enter the fee amount.

***

**Prize Configuration**

1. **Prize Distribution Setup:** Decide if you want to establish prize distribution for the Instant Battle, which can be tailored for RMG and non-RMG formats:
   1. **RMG:** Adhere to strict rules with the total prize pool calculated as (entry fee - hosting fee) \* Max players. A dynamic algorithm adjusts prize values based on the actual number of participants. Prizes are awarded in the selected RMG currency.
   2. **Non-RMG:** Set prizes freely without strict limitations. Prizes can include items, bundles, currencies, or progression markers. Define ranks and assign corresponding prizes.

***

### **Access & Eligibility**

1. **Lock by Item/Bundle:** Restrict access to the Instant Battle to players who possess a specific item or bundle, enhancing exclusivity.
2. **Lock by Progression System:** Limit participation to players who have reached a certain level within a specific progression system, adding an element of achievement-based qualification.

***

### **Custom Data**

1. **Tags:** Utilize up to 10 tags to describe and categorize the Instant Battle, facilitating easier management and discovery.
2. **Meta Data:** Provide additional details through key-value pairs, offering more insights into the battle setup.

For scheduling your instant battle, refer to the Competition Scheduling section under Live Ops to define start and end times, ensuring a seamless operational flow.

{% content-ref url="/pages/Xa6eTeYuXelOZ9UcfTpF" %}
[Schedule Competitions](/specter-user-manual/engage/live-ops/schedule-competitions.md)
{% endcontent-ref %}

***

Instant Battles in Specter allow developers to create engaging, quick competitions that cater to players seeking immediate gameplay experiences. By carefully configuring each aspect of the Instant Battle, you can ensure a thrilling competition that enhances player engagement and adds dynamic content to your game.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/competitions/instant-battles/instant-battles-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
