> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/organisation/activity-feed.md).

# Activity Feed

The Activity Feed is an essential tool for organization administrators and team members to monitor and review all significant actions and events within the organization's Specter environment. It helps in ensuring accountability, tracking progress, and identifying any unauthorized or unintended changes.

***

### Accessing the Activity Feed

To view the activity feed:

1. Navigate to the organization dashboard within Specter.
2. Select the "Activity Feed" option to access a detailed log of all organizational activities.

***

### Features of the Activity Feed

1. **Date/Member**: Each entry in the feed includes the date and time of the activity, along with the email of the member who performed the action. This information is crucial for tracking when specific actions were taken and by whom.
2. **Activities**: The feed captures a wide range of activities, including but not limited to:
   1. User additions or removals from apps or projects.
   2. Creation, editing, archiving, or deletion of apps and information within apps.
   3. Invoice activities and payment updates.
   4. Changes in alert configurations and settings adjustments.

***

### Utilizing the Activity Feed

The Activity Feed can be used for various administrative and management purposes, such as:

1. **Security and Compliance**: Monitoring for unauthorized or suspicious activities.
2. **Project Management**: Keeping track of project milestones and changes.
3. **Operational Oversight**: Ensuring that actions taken by team members align with organizational policies and goals.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/organisation/activity-feed.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
