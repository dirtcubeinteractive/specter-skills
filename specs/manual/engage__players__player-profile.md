> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/players/player-profile.md).

# Player Profile

To access a Player Profile, navigate to the '**Engage**' section and select '**Players**'. From here, you can click on any player listed to view their detailed profile. Alternatively, immediately after creating a player using a custom ID, you will be redirected to their newly created profile.

***

### Key Information

The Player Profile comprises several fields, each designed to capture and display vital information about the player:

1. **Username**: The player's chosen username, a unique identifier within your game environment.
2. **UID (User ID)**: This is the player's application-specific ID, used to manage and track the player's actions within a particular app.
3. **UUID (Universally Unique Identifier)**: The player's universal ID across Specter. This facilitates identification and management of the player across multiple apps.
4. **Location**: The geographical location of the player.
5. **Created At**: The date and time when the player's profile was created, providing insights into the player's longevity and engagement with the game.

***

### **Overview Section**

1. **First Name & Last Name**: The player's real names, offering a more personalized approach to player management.
2. **Date Joined**: Indicates the date when the player first joined the game, useful for tracking player engagement over time.
3. **Last Login**: The most recent date and time the player logged into the game, helping identify active and inactive players.
4. **Player Location**: This mirrors the 'Location' field.
5. **Verified**: A radio button selection (Yes/No) indicating whether the player's account has been verified. This is crucial for security and authenticity measures.

***

### **Linked Account Section**

* **Auth Provider**: The authentication provider used by the player to log into the game, e.g., email, social media accounts.
* **ID**: The unique identifier provided by the Auth Provider for the player.
* **Created At**: The date and time when the linked account was created, which may differ from the player's initial game profile creation date.

***

### Editing Player Profiles

All the information captured within the Player Profile can be viewed and edited. This allows for the manual adjustment of player details, catering to scenarios such as player requests for information updates or correcting erroneous data entries. To edit a field, simply click on the respective field and enter the new information. Be sure to save any changes to ensure the updated details are correctly stored in Specter's database.

The Player Profile section is integral to maintaining a robust and interactive player management system. By offering detailed insights and editable fields, Specter empowers game developers and administrators to manage their player base effectively, enhancing the overall gaming experience.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/players/player-profile.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
