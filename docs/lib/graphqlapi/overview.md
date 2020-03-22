---
title: Overview
description: description
---

The API (GraphQL) category provides a solution for making HTTP requests to GraphQL endpoints. It includes a [AWS Signature Version 4](http://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) signer class which automatically signs all AWS API requests for you as well as methods to use API Keys, Amazon Cognito User Pools, or 3rd party OIDC providers.

The AWS Amplify API module supports AWS AppSync or any other GraphQL backends.

<amplify-callout>

To learn more about GraphQL, please visit the [GraphQL website](http://graphql.org/learn/).

</amplify-callout>

## Using AWS AppSync

AWS AppSync helps you build data-driven apps with real-time and offline capabilities. Learn more about [AWS AppSync](https://aws.amazon.com/appsync/) by visiting [AWS AppSync Developer Guide](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html).

The Amplify Framework offers two client options for AppSync:

- [Amplify GraphQL client](~/lib/graphqlapi/query-data.md)

- [AWS AppSync SDK](~/lib/graphqlapi/query-data.md)

The Amplify GraphQL client is a light weight option if you're looking for a simple way to leverage GraphQL features and do not need the offline capabilities or caching. If you need those features, please look at [Amplify DataStore](https://aws-amplify.github.io/docs/js/datastore).

Alternatively the [AWS AppSync SDK](https://github.com/awslabs/aws-mobile-appsync-sdk-js/) enables you to integrate your app with the AWS AppSync service and integrates with the Apollo client found [here](https://github.com/apollographql/apollo-client/).

You can integrate with AWS AppSync using the following steps:

1. Set up the API endpoint and authentication information in the client side configuration.
2. Generate TypeScript/JavaScript code from the API schema. (optional)
3. Write app code to run queries, mutations and subscriptions.

The Amplify CLI provides support for AppSync that make this process easy. Using the CLI, you can configure an AWS AppSync API, download required client side configuration files, and generate client side code within minutes by running a few simple commands on the command line.