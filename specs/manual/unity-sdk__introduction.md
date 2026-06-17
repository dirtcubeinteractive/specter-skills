> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-unity-sdk/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-unity-sdk/introduction.md).

# Introduction

## Overview

Welcome to the SpecterSDK for Unity documentation. This SDK is designed to empower Unity developers by providing a comprehensive suite of tools and APIs that enable the integration of advanced game functionalities, including authentication, in-game transactions, leaderboards, inventory management, and more, into your Unity projects. Whether you're developing an indie game or working on a major title, SpecterSDK aims to streamline your development process, enhance player engagement, and help monetize your game effectively.

### **What is SpecterSDK for Unity?**

SpecterSDK is a C# software development kit for Unity that facilitates easy interaction with Specter's backend services. It encompasses a range of client APIs tailored to various game development needs, from managing user data and achievements to handling in-game economies and multiplayer match sessions. The SDK is designed with ease of use in mind, allowing developers to focus on creating immersive game experiences rather than backend complexities.

### **Key Features**

* **Authentication**: Securely manage user sessions and authentication with minimal setup.
* **User Management**: Effortlessly manage and update player profiles and custom player data.
* **App Data Management**: Easily access all app data configured on the Specter dashboard.
* **Inventory Management**: Dynamically manage in-game items and other assets.
* **Wallet Management**: Dynamically manage virtual currencies for in game purchases.
* **Leaderboards**: Foster competition with global and friend leaderboards.
* **Competition Management**: Enable player participation in competitions and distribute prizes.
* **Matchmaking**: Easily create and manage multiplayer game sessions.
* **Progression and Rewards**: Track player progression and distribute rewards.
* **Tasks & Achievements**: Manage player achievements to create robust, engaging experiences.
* **Event Tracking**: Gain valuable insights for custom player actions with events and parameters
* **Store and Transactions**: Implement in-game stores and handle transactions effortlessly.

## **Target Audience**

This documentation is intended for Unity developers of all skill levels interested in integrating SpecterSDK into their games. Whether you are new to game development or a seasoned professional, you will find valuable information to help you get the most out of the SDK. A basic understanding of Unity and C# programming is assumed.

## **Prerequisites**

Before diving into the SpecterSDK, ensure you have the following:

* Unity 2019.4 LTS or newer.
* An active Specter account and access to the Specter dashboard.
* Familiarity with Unity's scripting and scene management.

## **Getting the Most Out of This Documentation**

Our documentation is structured to guide you through the entire process of integrating and utilizing the SpecterSDK in your Unity projects. We recommend starting with the "Getting Started" section to set up the SDK. Follow along with the structured guides, and don't hesitate to experiment with the code snippets provided to see how things work firsthand.

## **Community and Support**

The SpecterSDK community is growing, and we encourage you to be a part of it. If you have questions, suggestions, or need support, please reach out through our community forums or support channels. Your feedback is invaluable to us and helps make SpecterSDK even better.

## Conclusion

We're excited to see what you will build with SpecterSDK. This toolset is designed to enhance your game development process, allowing you to create richer game experiences with less effort. Let's get started!

<br>


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-unity-sdk/introduction.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
