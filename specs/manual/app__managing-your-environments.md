> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/app/managing-your-environments.md).

# Managing your Environments

Specter provides three distinct environments to support the lifecycle of your application: Development, Quality Assurance (QA), and Production. Each environment serves a unique role, allowing you to manage your project flexibly from inception to deployment. While these environments are designed to facilitate different stages of your development process, the transition of features between them requires manual management.

***

### **Development Environment**

**Purpose:** The Development environment is where your application begins its journey. It's designated for building new features and initial testing. This is your sandbox for innovation, where you can experiment and debug without impacting the live version of your application.

**Usage:** Use this environment to integrate and test new code changes and developments. Since changes in this environment do not affect your live application, it's the ideal place for development and early-stage testing.

### **Quality Assurance (QA) Environment**

**Purpose:** The QA environment is set up for in-depth testing and quality checks. It's where you test your application under conditions that are intended to simulate your live environment as closely as possible, based on your configuration.

**Usage:** Conduct comprehensive testing in the QA environment to ensure the functionality, performance, and security of your application meet all requirements. This stage is crucial for catching and fixing bugs before they reach your end-users.

### **Production Environment**

**Purpose:** The Production environment hosts your live application. It's where your end-users interact with your application, so stability, performance, and security are paramount.

**Usage:** Deploy thoroughly tested and finalized features to the Production environment. It's essential to ensure that all changes deployed in this environment are ready for your users, as this is the version of your application that is live and accessible to the public.

***

## **Managing Your Environments**

Each environment in Specter is equipped with separate databases, configurations, and access controls to ensure that they can operate independently while providing a seamless workflow from development to production.&#x20;

Currently, Specter does not offer an automated promotion feature across environments. Therefore, transitioning updates from Development to QA, and finally to Production, must be managed manually. This process involves ensuring that changes are fully tested and validated before manually implementing them in the next environment.

***

## **Practical Considerations**

* **Separate API Keys:** Specter provides separate API keys for each environment to maintain the security and independence of your application across different stages of development.
* **Manual Environment Management:** Developers are responsible for manually managing the transition of their application through the development stages. This includes moving code and configurations from Development to QA, and then to Production, after thorough testing.
* **Custom Configuration:** While Specter's environments are designed to facilitate different phases of development, it's up to you to configure and manage these environments according to your project's needs.

By leveraging Specter's environments, you can effectively manage the development and deployment of your application, ensuring that each stage of the process is given the attention it requires for success.


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/app/managing-your-environments.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
