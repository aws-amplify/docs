---
title: Overview
description: description
---

The API (GraphQL) category provides a solution for making HTTP requests to GraphQL endpoints.

## GraphQL

AWS AppSync helps you build data-driven apps with real-time and offline capabilities. The [Amplify API Plugin](https://github.com/aws-amplify/amplify-ios) enables you to integrate your app with the AWS AppSync service. The framework supports multiple authorization models, handles subscription handshake protocols for real-time updates to data, and has built-in capabilities for offline support that makes it easy to integrate into your app.

The AWS Amplify API module supports AWS AppSync or any other GraphQL backends.

To learn more about GraphQL, please visit the [GraphQL website](http://graphql.org/learn/).
{: .callout .callout--action}

## Using AWS AppSync

AWS AppSync helps you build data-driven apps with real-time and offline capabilities. Learn more about [AWS AppSync](https://aws.amazon.com/appsync/) by visiting [AWS AppSync Developer Guide](https://docs.aws.amazon.com/appsync/latest/devguide/welcome.html){: .target='new'}.
{: .callout .callout--action}


The Amplify Framework offers two client options for AppSync:

- [Amplify GraphQL client](#amplify-graphql-client)

- [AWS AppSync SDK](#aws-appsync-sdk)

The Amplify GraphQL client is a light weight option if you're looking for a simple way to leverage GraphQL features and do not need the offline capabilities or caching. If you need those features, please look at [Amplify DataStore](https://aws-amplify.github.io/docs/js/datastore).

Alternatively the [AWS AppSync SDK](https://github.com/awslabs/aws-mobile-appsync-sdk-js/) enables you to integrate your app with the AWS AppSync service and integrates with the Apollo client found [here](https://github.com/apollographql/apollo-client/).