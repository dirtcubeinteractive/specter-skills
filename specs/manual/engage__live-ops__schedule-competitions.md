> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/live-ops/schedule-competitions.md).

# Schedule Competitions

### Accessing Schedule Competitions

1. Navigate to 'Engage' and select 'Live Ops'.
2. Choose 'Schedule Competitions' to begin the setup process.

***

### **Information**

1. **Select Competition**: Choose the competition you wish to schedule from a dropdown list of available competitions.
2. **Competition ID**: This field auto-populates once a competition is selected, providing a unique identifier for tracking and management.

***

### **Schedule**

1. **Schedule Type**: Decide between a 'Normal' or 'Recurring' schedule for the competition.
   * **Normal**: For a one-time event, specify the start date/time and end date/time.
   * **Recurring**: For ongoing competitions, choose the frequency (daily, weekly, monthly, yearly). The system calculates subsequent occurrences based on the initial start date/time plus the set interval (24 hours for daily, 7 days for weekly, etc.).
2. **Start Date/Time**: Set the beginning of the competition. For recurring competitions, this marks the first occurrence.
3. **End Date/Time**: For normal schedules, define when the competition concludes. Not applicable for the initial setup of recurring competitions.
4. **Prize Distribution Offset**: Specify how the prize distribution aligns with the competition's end. Options include immediate distribution ('On End') or setting an offset in hours and minutes to delay the distribution.

***

### Building the Schedule

Once the details are specified, organizers can create a schedule that accommodates both one-off and ongoing competitions, with flexibility in recurrence and prize distribution timing. This ensures competitions are seamlessly integrated into the game's live operations, providing continuous engagement opportunities for players.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/live-ops/schedule-competitions.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
