> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/app/app-settings/app-members.md).

# App Members

The App Members section within Specter is integral to enhancing team collaboration by allowing app administrators to add members directly to their current app. This feature streamlines the process of managing access and roles for new members, ensuring that only authorized individuals can contribute to the app's development and maintenance.

***

### Accessing App Members

To access and manage your app's team members, follow these steps:

1. Navigate to 'App Settings' within the Specter dashboard.
2. Select the 'App Settings' section to unveil additional options.
3. Choose the 'App Members' subsection to manage your app's team members.

This section provides a comprehensive overview of all team members, including their roles, access levels, and invitation status.

***

### Managing Members

#### **Viewing Current Members**

Within the App Members page, you'll find a list of individuals associated with your app, detailed by:

* **Name**: The full name of the team member.
* **Status**: Shows whether the member's status is Active or if they have been Invited but have yet to accept.
* **Role**: The designated role for the member/
* **Access**: The level of access granted (Can Edit, Can View), defining their capabilities within the app.
* **Email**: The email address of the member, used for invitation and identification purposes.

#### **Adding Members**

To invite new members to your current app:

1. **Type Email**: Input the email address of the person you wish to invite.
2. **Send Invite**: By clicking 'Send Invite', an invitation will be sent to the provided email, inviting them to join the app as a new member.
3. **Assign Role and Access Level**: During the invitation process, select the appropriate role and access level for the new member. This will determine their permissions and capabilities within the app, such as "Can Edit" for full access or "Can View" for read-only access.

***

### Collaboration and Security

The App Members feature is a cornerstone of fostering effective collaboration within your app's team. By carefully assigning roles and access levels, you create an environment where team members can contribute their best work securely and efficiently, driving the success of your app.

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/app/app-settings/app-members.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
