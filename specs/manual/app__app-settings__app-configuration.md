> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/app/app-settings/app-configuration.md).

# App Configuration

## Creating a New Application

To start a new project, navigate to the 'Apps' section and click on the '**Create App**' button. In the dialog box, you will need to provide:

1. **App Name**: The name for your new app.
2. **App Icon**: An image file to serve as the icon for your app.
3. **App Category:** Specify your app's category by selecting from the list provided, such as Gaming, Fintech, Healthcare, Education, etc. This information helps Specter understand the industry domain your app belongs to and can assist in tailoring the services and support we offer to better suit your needs.

Click '**Save**' to create the app and proceed to the **Application Configuration** page. On this page, you will set up the details and preferences for your app.

***

### App Information

1. **App Icon**: Update or remove the app icon.
2. **App Name**: Update the app name if necessary.
3. **App Category:**  Update your app's category by selecting from the list provided, if needed.
4. **Genre**: Select up to 5 genres from a dropdown list that best describe your app.
5. **App Description**: Provide a brief summary of your app.

***

### Technical Details

1. **App Platform**: Choose from multiple options such as iOS, Android, Steam, Xbox, PS, etc., to specify where your app will be available.
2. **Asset Bundle**: Upload the corresponding asset bundle files required by the app.
3. **Asset Bundle Version**: Specify the version of the uploaded asset bundle.
4. **Minimum App Version**: Indicate the minimum app version that is compatible with the asset bundle.

***

### Location

1. **App Location**: Select the geographical locations where your app will be available.

***

### Extras&#x20;

1. **Screenshots**: Upload image files to showcase your app.
2. **Videos**: Upload video files that represent your app.
3. **How-to**: Provide instructions or guides relevant to your app.

***

### Custom Data

1. **Tags**: Add relevant tags (up to 10) for enhanced app discoverability and organisation.
2. **Meta Data**: Provide key-value pairs that can serve as additional information about your app.

***


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/app/app-settings/app-configuration.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
