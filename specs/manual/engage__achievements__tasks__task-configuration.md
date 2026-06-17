> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/engage/achievements/tasks/task-configuration.md).

# Task Configuration

To initiate the process of crafting a task, navigate to the 'Engage' section, click on 'Achievements', and subsequently 'Tasks'. Click on the '**Create Task**' button to begin the configuration.

***

### **Task Information**

1. **Task Icon**: Assign or update the graphic representation of your task.
2. **Task Name**: Define the display name of your task.
3. **Task ID**: Input a distinct identifier for your task, ensuring no duplicates exist.
4. **Task Description**: Provide a concise description to give clarity about the task's objectives and significance.

***

### **Task Rewards**

To add rewards to your task, click on the ‘+’ icon. A pop-up will emerge, enabling you to:

1. Select among items, currencies, bundles, progression markers.
2. Configure third-party rewards via a specified URL.
3. Once you've chosen your rewards, determine the quantity each player will receive upon task completion.

***

### **Configure Task Logic**

1. **Choose Task Type**: Define the task's frequency from the dropdown:
   1. **Static**: One-off or recurrent tasks.
   2. **Daily**: Tasks reset daily.
   3. **Weekly**: Tasks reset every week.
2. **Reward Claim**: Decide the reward claim method:
   1. **Automatic**: Directly bestowed upon completion.
   2. **On Claim**: Requires player action or game client to claim after task completion.
3. **Event Name**: Opt for an event from the dropdown or create a new one in line.
4. **Event ID**: This will populate based on your selected event, or you can enter it manually if crafting a new event.
5. **Event Rule Engine**: Configure the conditions for task completion:
   1. **Task Parameter**: Choose a parameter from the provided list, encapsulating both Specter's inherent data and event-specific parameters.
   2. **Operator**: The list will adapt based on the chosen parameter, showcasing only relevant operators.
   3. **Task Parameter Value**: Define this value.
   4. **Parameter Value Incremental Type**: Specify as either 'one shot' or 'cumulative'.
   5. **Time Period All Time**: Select between 'yes' or 'no'.
   6. **Number of Records to be Included**: Define this if not opting for the 'all time' duration.

***

### **Access and Eligibility**

1. **Lock by Level**: Determine if access to the task is conditional based on a level.
2. **Choose Progression System**: If the task's availability is linked to a progression system, select that system from the dropdown.
3. **Level System Level**: Define the specific level within the chosen progression system that unlocks the task.
4. **Choose Segments**: Identify the player segments for which the task will be accessible.

***

### **Custom Data**

1. **Tags**: Implement tags to streamline task organisation and searching capabilities.
2. **Meta Data**: Key in supplementary details in the form of key-value pairs to deepen your task configuration details.

With the powerful suite of tools provided by Specter, curate engaging and dynamic tasks tailored to different player preferences and gameplay modes.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/engage/achievements/tasks/task-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
