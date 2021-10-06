---
title: Overview
description: Use Amplify CLI to add powerful Lambda functions to your cloud-based mobile and web app with a simple guided workflow.
---

## Set up a function

You can add a Lambda function to your project which you can use alongside a REST API or as a datasource in your GraphQL API using the [`@function` directive](~/cli/graphql-transformer/function.md).

```bash
amplify add function
```

```console
? Provide a friendly name for your resource to be used as a label for this category in the project: lambdafunction
? Provide the AWS Lambda function name: lambdafunction
? Choose the function template that you want to use: (Use arrow keys)
❯ Hello world function
  CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)
  Serverless express function (Integration with Amazon API Gateway)
```

## Function templates

- The `Hello World function` will create a basic hello world Lambda function
- The `CRUD function for Amazon DynamoDB table (Integration with Amazon API Gateway and Amazon DynamoDB)` function would add a predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) Lambda function template for CRUD operations to DynamoDB tables (which you can create by following the CLI prompts or use the tables which you've already configured using the `amplify add storage` command)
- The `Serverless express function (Integration with Amazon API Gateway)` will add a predefined [serverless-express](https://github.com/awslabs/aws-serverless-express) Lambda function template with routing enabled for your REST API paths.

You can update the Lambda execution role policies for your function to access other resources generated and maintained by the CLI, using the CLI

```console
$ amplify update function
Please select the Lambda Function you would want to update: lambdafunction
? Do you want to update permissions granted to this Lambda function to perform on other resources in your project? Yes
? Select the category (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ api
 ◯ function
 ◯ storage
 ◯ auth
? Select the operations you want to permit for betatest (Press <space> to select, <a> to toggle all, <i> to invert selection)
❯◉ create
 ◯ read
 ◯ update
 ◯ delete

You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiBetatestGraphQLAPIIdOutput = process.env.API_BETATEST_GRAPHQLAPIIDOUTPUT
var apiBetatestGraphQLAPIEndpointOutput = process.env.API_BETATEST_GRAPHQLAPIENDPOINTOUTPUT
```

Behind the scenes, the CLI automates populating of the resource identifiers for the selected resources as Lambda environment variables which you will see in your function code as well. This process additionally configures CRUD level IAM policies on the Lambda execution role to access these resources from the Lambda function. For instance, you might grant permissions to your Lambda function to read/write to a DynamoDB table in the Amplify project by using the above flow and the appropriate IAM policy would be set on that Lambda function's execution policy which is scoped to that table only.

## Supported Lambda runtimes

Amplify CLI enables you to create, test and deploy Lambda functions with the following runtimes:

|Runtime|Default Version|Requirements|
|-------|-----------------|------------|
|NodeJS |12.x|- Install [NodeJS](https://nodejs.org/en/)|
|Java   |11|- Install [Java 11 JDK](https://docs.aws.amazon.com/corretto/latest/corretto-11-ug/downloads-list.html) and [Gradle 5+](https://docs.gradle.org/current/userguide/installation.html)|
|Go     |1.x|- Install [Go](https://golang.org/doc/install)|
|.NET Core|3.1|- Install [.NET Core SDK](https://docs.microsoft.com/en-us/dotnet/core/install/sdk)|
|Python |3.8.x|- Install [python3](https://www.python.org/downloads/) and [pipenv](https://pypi.org/project/pipenv/) <br/> - Ensure `python3` and `pipenv` commands are available in your `PATH`|

In order to create and test Lambda functions locally, you need to have the runtime's requirements (table above) fulfilled. You'll be asked to `Choose the runtime you would like to use:` when running `amplify add function`.

Once a runtime is selected, you can select a function template for the runtime to help bootstrap your Lambda function.

## Schedule recurring Lambda functions

Amplify CLI allows you to schedule Lambda functions to be executed periodically (e.g every minute, hourly, daily, weekly, monthly or yearly). You can also formulate more complex schedules using AWS Cron Expressions such as: *“10:15 AM on the last Friday of every month”*. Review the [Schedule Expression for Rules documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions) for more details.

To schedule your Lambda function, answer **Yes** to `Do you want to invoke this function on a recurring schedule?` in the `amplify add function` flow. Once you deploy a function, it'll create a CloudWatch Rule to periodically execute the selected Lambda function.

## GraphQL from Lambda

<inline-fragment src="~/lib/graphqlapi/fragments/graphql-from-node.md"></inline-fragment>

For more information on files generated in the function resource folder, see [Function Category Files](~/cli/reference/files.md#function-category-files).
