---
title: Overview
description: Use Amplify CLI's simple guided workflow to add storage resources such as S3 or DynamoDB to your cloud-based web and mobile apps.
---

## File Storage Lambda Triggers

You can associate a trigger to an S3 bucket managed by the Amplify CLI, by following the `amplify add/update storage` flows. When attempting to add/update an S3 storage resource, you would get the following CLI prompts to add a trigger for it.

```bash
? Do you want to add a Lambda Trigger for your S3 Bucket? Yes
? Select from the following options
❯ Choose an existing function from the project
  Create a new function
```
As you can see in the prompt above, you can either choose to use an existing Lambda function created using the CLI as a part of this project using `amplify add function` or create a new function with a base Lambda function to handle S3 events. We also auto-populate the IAM policies required by the Lambda execution role of the newly created function to access the S3 bucket.

***Note***: You can associate only one Lambda Function trigger to an S3 bucket.

## DynamoDB Lambda Triggers (Data)

You can associate a Lambda trigger with a DynamoDB table, managed by the Amplify CLI, using the amplify add/update storage flows. When attempting to add/update a DynamoDB storage resource, you would get the following CLI prompts to add a trigger for it.

```bash
? Do you want to add a Lambda Trigger for your Table? Yes
? Select from the following options (Use arrow keys)
❯ Choose an existing function from the project
  Create a new function
```

As you can see in the prompt above, you can either choose to use an already existing Lambda function created using the CLI as a part of this project using `amplify add function` or create a new function with a base Lambda function handle DynamoDB events.

***Note***: You can associate more than one Lambda Function trigger to a DynamoDB table.