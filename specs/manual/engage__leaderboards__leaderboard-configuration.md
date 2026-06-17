> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/leaderboards/leaderboard-configuration.md).

# Leaderboard Configuration

To initiate the creation of a leaderboard, navigate to the '**Engage**' section, click on '**Leaderboards**', and then select the '**Create Leaderboard**' button to access the configuration settings.

***

### **Leaderboard Information**

1. **Upload an Image/Upload Icon/Media:** Click or drop an image or video to visually represent your leaderboard. This media can enhance player engagement by providing a visual symbol of achievement or competition.
2. **Leaderboard Name**: Input a name that encapsulates the essence and objective of the leaderboard. This name should resonate with the competitive spirit of the players and the nature of the achievements being ranked.
3. **Leaderboard ID**: Define a unique identifier for the leaderboard, essential for referencing within your game's code and API calls.
4. **Leaderboard Description:** Offer a brief explanation of the leaderboard, detailing the competitive criteria and what achievements or actions it tracks. This description aids players in understanding the purpose of the leaderboard and how they can climb its ranks.

***

### **Leaderboard Creation**

1. **Leaderboard Source**\*: Choose the source from which the leaderboard will draw its data. The options are as follows:
   1. **Match:** Select this to base the leaderboard on scores from specific game matches.
   2. **Statistic:** Choose this to use numerical data points that you may have set up as event parameters.&#x20;
   3. **Custom:** Opt for this to allow any numerical value to be sent and ranked, offering unparalleled flexibility in leaderboard creation.
2. **Leaderboard Ranking Method**\*: Select the method by which players will be ranked. Your options include:
   1. **High Score:** Rank players by the highest scores achieved.
   2. **Time Trial:** Rank players by the quickest completion times.
   3. **Position Weighting:** Rank players by an aggregate score derived from their positions in various matches.
   4. **Cumulative Score:** Rank players by their total score across matches.
   5. **Win/Loss/Draw Points:** Rank players based on points attributed to wins, losses, and draws.
3. **Recurring:** Specify whether the leaderboard is a one-time event or will recur at a set frequency, fostering ongoing competition and engagement.

***

### **Prize Configuration**

1. **Do you want to configure Prize Distribution for this leaderboard?** Determine if and how prizes will be awarded to top-ranking players on the leaderboard. Configuring prizes can significantly enhance player motivation and participation.
2. **Ranks:** Define the specific ranks or positions that will receive rewards. Detail the start and end rank for distributing prizes, clearly outlining the eligibility for prize reception.

***

### **Custom Data**

* **Tags:** Utilize tags (up to 10) to categorize and efficiently manage your leaderboards. Tags can facilitate the organization of leaderboards by themes, difficulty levels, or any other system relevant to your game.
* **Meta Data:** Input additional information through key-value pairs, providing further context or details about your leaderboard. This could encompass any specific rules, conditions, or nuances associated with the leaderboard's operation within your game.

By meticulously configuring each aspect of your leaderboard through Specter, you create a detailed and engaging competitive structure.&#x20;

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/leaderboards/leaderboard-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
