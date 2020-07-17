---
title: Usage Data in Amplify CLI
description: More information about usage data in Amplify CLI
---  

At AWS, we develop and launch services based on what we learn from interactions with our customers. We use customer feedback to iterate on our product. Anonymized usage data helps us to better understand our customers’ needs, diagnose issues, and deliver features that improve the customer experience.

Amplify CLI sends anonymized information such as system metadata, usage metrics and errors. The data is marked for deletion in a year from the point of it being collected. Amplify CLI does **not** collect personally identifiable information such as email addresses, usernames, keys, ARNs or any project - level information.

### Manage usage data collection for your Amplify CLI Instance

**Disable usage data collection**


Run the following command to turn off Amplify CLI usage data collection

```
amplify configure --usage-data-off
```

**Enable usage data collection**


Run the following command to turn on Amplify CLI usage data collection

```
amplify configure --usage-data-on
```

**Usage data collection is managed on a machine per installation basis enabling/disabling will change it for all the projects on that instance*

## Learn More

The usage data that's collected adheres to the AWS data privacy policies. For more information, see the following:

*   [AWS Service Terms](https://aws.amazon.com/service-terms/)
*   [Data Privacy](https://aws.amazon.com/compliance/data-privacy-faq/)


