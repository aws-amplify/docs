---
title: Directives
description: The Amplify CLI provides GraphQL directives to enhance your schema with additional capabilities, such as custom indexes, authorization rules, function triggers and more.
---

The Amplify CLI provides GraphQL directives to enhance your schema with additional capabilities, such as custom indexes, authorization rules, function triggers and more.

## Amplify-provided directives

- [`@model`: Defines a top level object type in your API that are backed by Amazon DynamoDB](~/cli/graphql-transformer/model.md)
- [`@key`: Configures custom index structures for @model types](~/cli/graphql-transformer/key.md)
- [`@auth`: Defines authorization rules for your @model types and fields](~/cli/graphql-transformer/auth.md)
- [`@connection`: Defines 1:1, 1:M, and N:M relationships between @model types](~/cli/graphql-transformer/connection.md)
- [`@function`: Configures a Lambda function resolvers for a field](~/cli/graphql-transformer/function.md)
- [`@http`: Configures an HTTP resolver for a field](~/cli/graphql-transformer/http.md)
- [`@predictions`: Queries an orchestration of AI/ML services such as Amazon Rekognition, Amazon Translate, and/or Amazon Polly](~/cli/graphql-transformer/predictions.md)
- [`@searchable`: Makes your data searchable by streaming it to Elasticsearch](~/cli/graphql-transformer/searchable.md)
- [`@versioned`: Defines the versioning and conflict resolution strategy for an @model type](~/cli/graphql-transformer/versioned.md)

## 3rd party directives
- [`@ttl`: Enable DynamoDB's time-to-live feature to auto-delete old entries in your AWS Amplify API](https://github.com/flogy/graphql-ttl-transformer)

> Looking to build your own transformers & directives? Check out the guide on [how to author your own transformer & directives](~/cli/plugins/authoring.md#authoring-custom-graphql-transformers--directives).