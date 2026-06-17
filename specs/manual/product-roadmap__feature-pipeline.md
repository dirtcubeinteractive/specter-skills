> For the complete documentation index, see [llms.txt](https://manual.specterapp.xyz/specter-user-manual/llms.txt). Markdown versions of documentation pages are available by appending `.md` to page URLs; this page is available as [Markdown](https://manual.specterapp.xyz/specter-user-manual/product-roadmap/feature-pipeline.md).

# Feature Pipeline

### **Feature Pipeline Overview Table**

Below is a table of features that are currently in development, along with their anticipated release timelines:

| Feature Name                                                                                                                                      | Description                                                                                                                                                              | Status      | Expected Release |
| ------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | ---------------- |
| [Battle Pass](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#battle-pass)                                         | A system that rewards players as they progress through pre-defined challenges and milestones, enhancing engagement and offering incentives for continued gameplay.       | Testing     | Q2 2024          |
| [Skill Divisions](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#skill-divisions)                                 | An achievement system enabling players to ascend or descend through various skill-based divisions, promoting competitive play and personal improvement.                  | Testing     | Q2 2024          |
| [Skill Trees](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#skill-trees)                                         | Offers a node-based interface for creating non-linear progression systems, allowing developers to design complex skill paths for character development.                  | Planned     | Q4 2024          |
| [Time Series](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#time-series)                                         | Facilitates daily login systems and other time-based achievement series, encouraging regular player engagement.                                                          | Testing     | Q2 2024          |
| [JSON Blueprints](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#json-blueprints)                                 | Enables the creation of JSON blueprints for diverse content variations, accompanied by a JSON UI interface for easy scheduling in campaigns.                             | Development | Q3 2024          |
| [Content](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#content)                                                 | Converts JSON blueprints into multiple content variations and allows A/B testing. Includes prebuilt templates for in-app messages, emails, and notifications.            | Development | Q3 2024          |
| [Campaigns](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#campaigns)                                             | A live operations scheduler for content deployment, enabling dynamic content updates and player engagement strategies.                                                   | Development | Q3 2024          |
| [Seasons](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#seasons)                                                 | Live operations scheduler for achievements, allowing for the segmentation of player progression and rewards into seasonal cycles.                                        | Development | Q3 2024          |
| [Clan Management](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#clan-management)                                 | Facilitates the creation and management of player communities, enabling players to form clans or groups for enhanced social gaming experiences.                          | Testing     | Q2 2024          |
| [Referral Management](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#referral-management)                         | Implements referral programs to incentivize player-driven growth, increasing your player base organically through invites.                                               | Testing     | Q2 2024          |
| [Subscription Management](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#subscription-management)                 | Offers subscription models within games, providing a steady revenue stream and giving players access to premium content or benefits.                                     | Development | Q4 2024          |
| [Tickets, Coupons, Scratchcards](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#tickets-coupons-and-scratchcards) | Engages and rewards players with tickets, coupons, and scratchcards for in-game events or promotions, boosting player retention and satisfaction.                        | Development | Q3 2024          |
| [UGC Management](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#ugc-user-generated-content-management)            | Harnesses the creativity of the player base by managing user-generated content, fostering a sense of community and ownership.                                            | Development | Q3 2024          |
| [Retention Analysis](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#retention-analysis)                           | Provides insights into player retention over time, identifying key factors that maintain player engagement.                                                              | Planned     | Q1 2025          |
| [Engagement Metrics](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#engagement-metrics)                           | Measures player engagement through metrics such as session length, frequency of play, and in-game activities, offering insights into player behavior.                    | Planned     | Q1 2025          |
| [Performance Benchmarks](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#performance-benchmarks)                   | Enables comparison of your game's performance against industry benchmarks, identifying areas for improvement and opportunity.                                            | Planned     | Q1 2025          |
| [Unreal SDK](/specter-user-manual/product-roadmap/detailed-feature-pipeline-descriptions.md#unreal-sdk)                                           | (Future Development) An SDK tailored for integration with Unreal Engine, expanding the accessibility of Specter’s features to a wider range of development environments. | Planned     | Q1 2025          |


---

# Agent Instructions
This documentation is published with GitBook. GitBook is the documentation platform designed so that both humans and AI agents can read, navigate, and reason over technical content effectively. Learn more at gitbook.com.

## Querying This Documentation
If you need additional information that is not directly available in this page, you can query the documentation dynamically by asking a question.

Perform an HTTP GET request on the current page URL with the `ask` query parameter:

```
GET https://manual.specterapp.xyz/specter-user-manual/product-roadmap/feature-pipeline.md?ask=<question>
```

The question should be specific, self-contained, and written in natural language.
The response will contain a direct answer to the question and relevant excerpts and sources from the documentation.

Use this mechanism when the answer is not explicitly present in the current page, you need clarification or additional context, or you want to retrieve related documentation sections.
