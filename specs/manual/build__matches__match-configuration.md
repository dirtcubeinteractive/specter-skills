> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/matches/match-configuration.md).

# Match Configuration

To create a new match, navigate to the 'Matches' section on your App dashboard and click on the '**Create Match**' button. Let's break down each section:

***

### Match Information

1. **Match Icon**: Add a representative icon for your match.
2. **Match Name**: Enter the name for your match.
3. **Match ID**: Assign a unique identifier to your match.
4. **Match Description**: Provide a brief summary of your match.

***

### Technical Details

1. **Select Game**: Choose the game for this match from a dropdown list. Your app will appear at the top of the list.
2. **Select Match Format**: Define the gameplay – single player, multiplayer, or multiplayer team.
3. **Min/Max Player**: (For multiplayer formats) Set the number of players allowed.
4. **Min/Max Team Size**: (For multiplayer team format) Define the team size boundaries.
5. **Match Result Criteria**: Decide how match results are calculated. Options include Score, Completion Time, Finish Position, Earnings, and Win/Loss/Draw.

#### Each Result Criteria has unique characteristics:

1. **Score**: The points accumulated by a player during a match.
2. **Completion Time**: The time a player takes to complete a match.
3. **Finish Position**: The player's final standing in a match. When selecting this criterion, it's important to specify the number of podium positions.
4. **Win/Loss/Draw**: The result of a match, specified as a win, loss, or draw.

#### Deep Dive into Match Result Criteria

For a deeper understanding of how each match result criterion operates with real-world examples, please navigate to our [Match Result Criteria](/specter-user-manual/build/matches/match-result-criteria.md) page.

***

### Leaderboard Creation

Here, you can set up a leaderboard that will rank players based on criteria defined by you. The leaderboard's source is the current match, and it cannot be changed.

1. **Leaderboard Name**: Assign a name to your leaderboard.
2. **Leaderboard ID**: Provide a unique identifier for your leaderboard.
3. **Leaderboard Description**: Briefly describe your leaderboard.
4. **Leaderboard Ranking Method**: Choose the method for ranking players on this leaderboard. Options include High Score, Cumulative Score, Time Trial, Position Weighting, and Win/Loss/Draw Points.

#### Below is a brief overview of each leaderboard ranking method:

1. **High Score**: Players are ranked from highest to lowest based on the scores achieved in a match.
2. **Cumulative Score:** Players are ranked based on the sum of their scores across matches.
3. **Time Trial**: Players are ranked based on the quickest completion time of a match.
4. **Position Weighting**: Players are ranked based on an aggregate score derived from the positions they achieve in various matches.
5. **Win/Loss/Draw Points**: Players are ranked based on points attributed to wins, losses, and draws.

Remember, for an extensive understanding of leaderboards, please refer to our comprehensive [Leaderboards](https://www.dirtcube.xyz/) section.&#x20;

***

### Custom Data

1. **Tags**: Enter up to ten tags.
2. **Meta Data**: Add key-value pairs for additional information related to your match.

***

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/matches/match-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
