> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/app/app-settings/api-settings.md).

# API Settings

The API Settings section in Specter is crucial for developers to configure and manage the application's integration with Specter's backend. This section allows for the setup of environment-specific endpoints, authentication tokens, and secret keys, ensuring secure and efficient communication between your app and Specter.

***

### Accessing API Settings

To access the API settings for your app, follow these steps:

1. Navigate to 'App Settings' within the Specter dashboard.
2. Click on the 'App Settings' section to expand its options.
3. Select the 'API Settings' subsection to view and manage your API configuration.

Within this section, you'll find detailed information about your app, including its name, ID, location, the number of active users, creation date, and the current environment settings.

***

### API Settings Overview

The API Settings page is divided into sections based on the environment type—Production, Development, and Quality Assurance. Each section contains the following fields:

* **App Name**: The name of your application as registered in Specter.
* **App ID**: A unique identifier for your app.
* **Location**: The geographical location where your app is hosted.
* **No of Active Users**: The current number of active users on your app.
* **Created At**: The date and time when your app was created.
* **Current Environment**: Indicates the environment you are currently managing, whether it be development, quality assurance, or production.

***

### **Environment-Specific Settings**

Each environment—Production, Development, and Quality Assurance—has its own set of configurations:

* **URL**: The endpoint URL for the Specter API specific to the environment.
* **Auth Token w/ regenerate**: A token used for authenticating API requests. This token can be regenerated as needed for security purposes.
* **Secret Key**: A key used in conjunction with the Auth Token to ensure secure communication between your app and Specter.

***

### Managing API Settings

To ensure secure and efficient integration, it's essential to manage your API settings carefully:

* **Regenerate Auth Token**: For security reasons, it's advisable to periodically regenerate your Auth Token. This can be done by clicking the 'Regenerate' option next to the Auth Token field.
* **Update Environment Settings**: Depending on your development stage, you may need to switch between environments. Ensure that the URL, Auth Token, and Secret Key are correctly set for each environment.
* **Secure Your Secret Key**: The Secret Key should be kept confidential and only used in secure server-to-server communication.

The API Settings section is fundamental for the seamless integration and operation of your app with Specter's services. By correctly configuring and managing these settings, you can ensure that your app communicates securely and effectively with Specter, providing a robust foundation for your application's backend functionality.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/app/app-settings/api-settings.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
