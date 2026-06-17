> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/leaderboards/leaderboard-ranking-methods.md).

# Leaderboard Ranking Methods

Understanding the various leaderboard ranking methods available in Specter is crucial for designing a competitive and engaging gaming experience. Each method offers a unique way to measure and celebrate player achievements, catering to different game mechanics and player objectives. Below, we detail each ranking method, accompanied by examples to illustrate how they can be applied in a gaming context.

***

### **High Score**

**Description:** The high score method ranks players based on the highest scores they achieve in a game. This method is straightforward and is commonly used in many gaming contexts, especially in arcade and action games.

**Example:** In a classic arcade shooter game, players are ranked on the leaderboard based on the total points they accumulate by defeating enemies. The player with the highest total points at the end of the game period tops the leaderboard.

***

### **Time Trial**

**Description:** Time trial ranks players based on the quickest completion times for a given challenge or game level. This method is ideal for racing games or any game where speed and efficiency are key.

**Example:** In a racing game, players compete to complete tracks in the shortest amount of time possible. The leaderboard ranks players from fastest to slowest based on their best lap times, with the fastest time securing the top position.

***

### **Position Weighting**

**Description:** Position weighting involves ranking players based on an aggregate score derived from their positions in various matches or competitions. This method is well-suited for games with multiple rounds or stages.

**Example:** In a battle royale game, players are ranked across several matches based on their finishing positions (e.g., 1st, 2nd, 3rd). Points are assigned inversely to their ranks (more points for higher positions) across matches, and the leaderboard reflects the cumulative score, highlighting players who consistently perform well.

***

### **Cumulative Score**

**Description:** This method ranks players based on their total or accumulated score in a game.&#x20;

**Example:** In a strategy game with an in-game economy, players can earn gold by completing missions, trading resources, or conquering territories. The leaderboard ranks players based on their total gold earned, showcasing the wealthiest or most economically savvy players.

***

### **Win/Loss/Draw Points**

**Description:** Players are ranked based on points attributed to wins, losses, and draws. This method is versatile, applicable to almost any competitive game format, especially where matches have clear outcomes.

**Example:** In a multiplayer online battle arena (MOBA) game, teams compete in matches that result in a win, loss, or draw. Teams receive points based on the match outcomes (e.g., 3 points for a win, 1 point for a draw, and 0 points for a loss). The leaderboard ranks teams based on their accumulated points, promoting consistent performance across games.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/leaderboards/leaderboard-ranking-methods.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
