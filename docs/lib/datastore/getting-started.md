---
title: Getting started
description: Amplify DataStore provides a programming model for leveraging shared and distributed data without writing additional code for offline and online scenarios, which makes working with distributed, cross-user data just as simple as working with local-only data.
---

## Datastore with Amplify

Amplify DataStore provides a programming model for leveraging shared and distributed data without writing additional code for offline and online scenarios, which makes working with distributed, cross-user data just as simple as working with local-only data.

<amplify-callout>

**Note:** this allows you to start persisting data locally to your device with DataStore, even without an AWS account.

</amplify-callout>

## Goal
To setup and configure your application with Amplify DataStore and use it to persist data locally on a device.

## Prerequisites

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/10_preReq.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/10_preReq.md"></inline-fragment>

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/20_installLib.md"></inline-fragment>

There are two options to integrate the Amplify build process with the project.

## Option 1: Platform integration

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/30_platformIntegration.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/30_platformIntegration.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/30_platformIntegration.md"></inline-fragment>

## Option 2: Use Amplify CLI

Instead of using the platform integration, you can alternatively use the Amplify CLI on its own to accomplish the same thing that Amplify Tools is doing for you. This option is particularly useful for **existing projects** where Amplify is already configured.

The base structure for a DataStore app is created by adding a new GraphQL API to your app.

```console
# For new APIs
amplify add api

# For existing APIs
amplify update api
```

During the API configuration process select **GraphQL** as the API type and reply to the questions as follows. Make sure you respond **Yes, I want to make some additional changes** when prompted for **advanced settings** and turn on **conflict detection**. This setting is **required** when syncing data to the cloud since the conflict resolution strategy is what allows local data to be reconciled with data from the cloud backend.

```console
? Please select from one of the below mentioned services:
    `GraphQL`
? Provide API name:
    `BlogAppApi`
? Choose the default authorization type for the API
    `API key`
? Enter a description for the API key:
    `BlogAPIKey`
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
? Do you have an annotated GraphQL schema?
    `No`
? Do you want a guided schema creation?
    `No`
? Provide a custom type name
    `Post`
```

<amplify-callout warning>

**Troubleshooting:** without the **conflict detection** configuration cloud sync will fail. In that case use `amplify update api` and choose **Enable DataStore for entire API** (this option will enable the conflict detection as described above).

</amplify-callout>

## Idiomatic persistence

DataStore relies on platform standard data structures to represent the data schema in an idiomatic way. The persistence language is composed by data types that satisfies the `Model` interface and operations defined by common verbs such as `save`, `query` and `delete`.

### Data schema

The first step to create an app backed by a persistent datastore is to **define a schema**. DataStore uses GraphQL schema files as the definition of the application data model. The schema contains data types and relationships that represent the app's functionality.

### Sample schema

For the next steps, let's start with a schema for a small blog application. It has a single model, a `Post`. New types and constructs will be added to this base schema as more concepts are presented.

Open the `schema.graphql` file located by default at `amplify/backend/{api_name}/` and **define the model** `Post` as follows.

```graphql
type Post @model {
  id: ID!
  title: String!
  status: PostStatus!
  rating: Int
  content: String
}

enum PostStatus {
  DRAFT
  PUBLISHED
}
```

Now you will to convert the platform-agnostic `schema.graphql` into platform-specific data structures. DataStore relies on code generation to guarantee schemas are correctly converted to platform code.

Like the initial setup, models can be generated either using the IDE integration or Amplify CLI directly.

### Code generation: Platform integration

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/40_codegen.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/40_codegen.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/40_codegen.md"></inline-fragment>

### Code generation: Amplify CLI

Models can also be generated using the Amplify CLI directly.

1. In your terminal, change directories to your project's folder and **execute the codegen command**:
    ```console
    amplify codegen models
    ```
2. **Locate the generated files** at `amplify/generated/models/`.
3. **Add the files** to the Xcode project.

## Initialize Amplify DataStore

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/50_initDataStore.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/50_initDataStore.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/50_initDataStore.md"></inline-fragment>

## Persistence operations

Now the application is ready to execute persistence operations. The data will be persisted to a local database, enabling offline-first use cases by default.

Even though a GraphQL API is already added to your project, the cloud synchronization will only be enabled when the API plugin is initialized and the backend provisioned. See the [Next steps](#next-steps) for more info.

### Writing to the database

To write to the database, create an instance of the `Post` model and save it.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/60_saveSnippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/60_saveSnippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/60_saveSnippet.md"></inline-fragment>

### Reading from the database

To read from the database, the simplest approach is to query for all records of a given model type.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/70_querySnippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/70_querySnippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/70_querySnippet.md"></inline-fragment>

## Next steps

Congratulations! You’ve created and retrieved data from the local database. Check out the following links to see other Amplify DataStore use cases and advanced concepts:

- [Write data](~/lib/datastore/data-access.md#create-and-update)
- [Query data](~/lib/datastore/data-access.md#query-data)
- [Model associations](~/lib/datastore/relational.md)
- [Cloud synchronization](~/lib/datastore/sync.md)
- [Clear local data](~/lib/datastore/sync.md#clear-local-data)
