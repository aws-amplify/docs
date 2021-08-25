---
title: Directives
description: The Amplify CLI provides GraphQL directives to enhance your schema with additional capabilities, such as custom indexes, authorization rules, function triggers and more.
---

The Amplify CLI provides GraphQL directives to enhance your schema with additional capabilities such as custom indexes, authorization rules, function triggers, and more.

## Amplify-provided directives

- [`@model`: Defines top level object types in your API that are backed by Amazon DynamoDB](~/cli/graphql-transformer/model.md)
- [`@key`: Configures custom index structures for @model types](~/cli/graphql-transformer/key.md)
- [`@auth`: Defines authorization rules for your @model types and fields](~/cli/graphql-transformer/auth.md)
- [`@connection`: Defines 1:1, 1:M, and N:M relationships between @model types](~/cli/graphql-transformer/connection.md)
- [`@function`: Configures a Lambda function resolvers for a field](~/cli/graphql-transformer/function.md)
- [`@http`: Configures an HTTP resolver for a field](~/cli/graphql-transformer/http.md)
- [`@predictions`: Queries an orchestration of AI/ML services such as Amazon Rekognition, Amazon Translate, and/or Amazon Polly](~/cli/graphql-transformer/predictions.md)
- [`@searchable`: Makes your data searchable by streaming it to Amazon OpenSearch](~/cli/graphql-transformer/searchable.md)
- [`@versioned`: Defines the versioning and conflict resolution strategy for an @model type](~/cli/graphql-transformer/versioned.md)

## AWS AppSync-provided directives

The following directives are supported by the AppSync service and can be used within the Amplify GraphQL schemas. These will not be processed by Amplify CLI but passed through to the service as is and will be present in the output schema. For example, Amplify's `@auth` directive will add these directives under the hood to the output schema.

- `@aws_api_key`
- `@aws_iam`
- `@aws_oidc`
- `@aws_cognito_user_pools`
- `@aws_auth`
- `@aws_subscribe`

Learn more about these directives in the [AWS AppSync Developer Guide](https://docs.aws.amazon.com/appsync/latest/devguide/security-authz.html).

## 3rd party directives

- [`@algolia`: Add serverless search to your Amplify API with Algolia](https://github.com/thefinnomenon/graphql-algolia-transformer)
- [`@ttl`: Enable DynamoDB's time-to-live feature to auto-delete old entries in your AWS Amplify API](https://github.com/flogy/graphql-ttl-transformer)
- [`@firehose`: Add a simple interceptor to all of your Amplify API mutations and queries](https://github.com/LaugnaHealth/graphql-firehose-transformer)
- [`@retain`: Enable the "Retain" deletion policy for your Amplify-generated DynamoDB tables](https://github.com/flogy/graphql-retain-transformer)

> Looking to build your own transformers & directives? Check out the guide on [how to author your own transformer & directives](~/cli/plugins/authoring.md#authoring-custom-graphql-transformers--directives).
