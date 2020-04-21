---
title: Getting started
description: Amplify DataStore provides a programming model for leveraging shared and distributed data without writing additional code for offline and online scenarios, which makes working with distributed, cross-user data just as simple as working with local-only data.
---

## Datastore with Amplify

Amplify DataStore provides a programming model for leveraging shared and distributed data without writing additional code for offline and online scenarios, which makes working with distributed, cross-user data just as simple as working with local-only data.

<amplify-callout>

DataStore can be used as a local-only data persistence mechanism and an AWS account is not required for that. However, if you wish to sync with the cloud it is recommended you [Install and configure the Amplify CLI](~/cli/start/install.md).

</amplify-callout>

## Generate models

Modeling your data and *generating models* which are used by DataStore is the first step to get started. GraphQL is used as a common language across all supported platforms for this process, and is also used as the network protocol when syncing with the cloud. GraphQL is also what powers some of the features such as [Automerge in AppSync](https://docs.aws.amazon.com/appsync/latest/devguide/conflict-detection-and-sync.html#automerge).

### Sample schema

For the purpose of this guide, let's use the following simple GraphQL schema:

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  rating: Int!
  status: PostStatus!
}
```

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/generate-models.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/generate-models.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/generate-models.md"></inline-fragment>

## Configuration

Amplify DataStore follows convention over configuration and it is initialized with nice defaults whenever possible. Moreover, the Amplify CLI generates most of the boilerplate necessary to setup your app.

### Schema

The main configuration required by DataStore is the *schema*. The schema defines all the models and their fields. It is created from the aforementioned `schema.graphql` and it is used by the DataStore implementation to provision all the storage infrastructure, both locally and on the cloud.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/configuration.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/configuration.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/configuration.md"></inline-fragment>
