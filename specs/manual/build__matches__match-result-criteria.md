> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/build/matches/match-result-criteria.md).

# Match Result Criteria

In Specter, matches are the stages where players showcase their skills and strategies. But how do we determine who stands victorious at the end of these matches? This is where match result criteria come in. Let's dive deeper into each of these criteria, understand what they mean, and see them in action with some examples.

### Score

The score is the most common and straightforward way to determine the outcome of a match. Players accumulate points based on their performance in the match. The player with the highest score at the end of the match is declared the winner.

**Example**: In a game of Scrabble, players gain points for every word they create. The player with the highest points when all the letters have been used is deemed the winner.

***

### Completion Time

In games where speed and efficiency are key, completion time is an effective match result criterion. Here, the player who completes the match in the shortest time comes out on top.

**Example**: In a racing game, the player who crosses the finish line in the least amount of time is the winner.

***

### Finish Position

In games where players compete simultaneously, their finishing position at the end of the match often defines the result. This criterion takes into account the rank of a player at the match's conclusion, which is particularly relevant in games where there are multiple winners.

**Example**: Consider a game of Ludo with four players. At the end of the game, the players finish at different positions - 1st, 2nd, 3rd, and 4th. Here, not only does the player who finishes first is recognised, but those at the 2nd and 3rd positions also have distinct podium ranks. Thus, the 'Finish Position' as a match result criterion enables you to award different players based on their respective ranks at the end of the match.

***

### Win/Loss/Draw

This criterion is usually applied in games that inherently have a win, loss, or draw outcome. Here, the player who wins is the one who meets the win conditions set by the game.

**Example**: In a game of chess, the player who checkmates their opponent's king is declared the winner.

***

These match result criteria offer a wide array of possibilities to customize match outcomes according to the dynamics and rules of your game. Remember, the choice of result criteria should align with your game mechanics to ensure a fair and engaging player experience.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/build/matches/match-result-criteria.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
