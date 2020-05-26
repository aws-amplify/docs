---
title: Getting started
description: The Amplify DataStore category enables developers to write applications whose data lives in the mobile device for instant/offline-first access while synchronization with a cloud backend is handled automatically.
---

The Amplify DataStore category enables developers to write applications whose data lives in the mobile device for instant/offline-first access while synchronization with a cloud backend powered by [AppSync](https://aws.amazon.com/appsync/) is handled automatically, which makes working with distributed, cross-user data just as simple as working with local-only data.

**Note:** cloud synchronization is optional and disabled by default. This allows developers to start with Amplify DataStore right away, even without an AWS account.

## Goal
To setup and configure your application with Amplify DataStore and go through a basic create/read example to make sure data is persisted in the device.

## Prerequisites

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/10_preReq.md"></inline-fragment>

## Data schema

The first step to create an app backed by a persistent datastore is to **define a schema**. Amplify DataStore uses GraphQL schema files as the the definition of the application data model. The schema contains data types and relationships that represent the app functionality.

### Sample schema

For the sake of simplicity, the schema will represent a small *Blogging App* and will start with a single model: a `Post`. New types and constructs will be added to this base schema as more concepts are presented.

Open the `schema.graphql` file located by default at `amplify/backend/{api_name}/`  and **define the model** `Post` as follows.

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
}
```

## Install Amplify Libraries

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/20_installLib.md"></inline-fragment>

## Idiomatic persistence: Models

Amplify DataStore relies on platform standard data structures to represent the data schema in an idiomatic way. The persistence language is composed by data types that satisfies the `Model` interface and operations defined by common verbs such as `save`, `query` and `delete`.

In order to start choose an option to **generate models** from the `schema.graphql`.

### Option 1: Use AmplifyTools

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/30_amplifyTools.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/30_amplifyTools.md"></inline-fragment>

### Option 2: Use Amplify CLI

If more control over the configuration and code generation process is needed the Amplify CLI can be used directly. This option is also useful for **existing codebases** with Amplify already configured.

The base structure for a DataStore app is created by adding a new GraphQL API to your app.

```console
amplify add api
```

During the API configuration process select **GraphQL** as the API type and reply to the questions as follows. Make sure you respond **yes** to **advanced settings** and turn on **conflict detection**. This setting is critical when syncing data to the cloud since the conflict resolution strategy is what allows local data to be reconciled with data from the cloud backend.

```console
? Please select from one of the below mentioned services:
    `GraphQL`
? Choose the default authorization type for the API
    `API key`
? Enter a description for the API key:
    `defaultapikey`
? After how many days from now the API key should expire (1-365):
    `365`
? Do you want to configure advanced settings for the GraphQL API
    `Yes, I want to make some additional changes.`
? Configure additional auth types?
    `No`
? Configure conflict detection?
    `Yes`
? Select the default resolution strategy
    `Auto Merge`
? Do you want to override default per model settings?
    `No`
```

Generate the models by running in the terminal.

```console
amplify codegen models
```

The files should be generated at `amplify/generated/models/`, add them to your Xcode project (TODO elaborate on how to do it?).

<amplify-callout>

**Troubleshooting:** without the **conflict detection** configuration cloud sync will fail. If that's the case use `amplify update api` and choose **Enable DataStore for entire API** (this option will enable the conflict detection as described above).

</amplify-callout>

## Initialize Amplify Storage

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/40_initDataStore.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/40_initDataStore.md"></inline-fragment>

## Persistence operations

Now the application is ready to execute persistence operations. The data will be persisted to a local database, enabling offline-first use cases by default.

Even though a GraphQL API is already added to your project, the cloud synchronization will only be enabled when the API plugin is initialized and the backend provisioned. See the [Next steps](#next-steps) for more info.

### Writing to the database

To write to the database, create a instance of the `Post` model and save it.

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/50_saveSnippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/50_saveSnippet.md"></inline-fragment>

### Reading from the database

To read from the database, the simplest approach is to query for all records of a given model type.

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/60_querySnippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/60_querySnippet.md"></inline-fragment>

## Next steps

Congratulations! You’ve created and retrieved data from the local database. Check out the following links to see other Amplify DataStore use cases and advanced concepts:

- Queries with conditions and pagination
- Delete records
- Cloud synchronization
- Model associations
- Clear the local database
