
## DataStore with Amplify

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
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/getting-started/10_preReq.md"></inline-fragment>

<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/20_installLib.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/getting-started/20_installLib.md"></inline-fragment>

## Setup local development environment

<inline-fragment platform="js" src="~/lib/datastore/fragments/native_common/setup-env.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/30_setupEnv.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/native_common/setup-env.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/native_common/setup-env.md"></inline-fragment>

## Idiomatic persistence

DataStore relies on platform standard data structures to represent the data schema in an idiomatic way. The persistence language is composed by data types that satisfies the `Model` interface and operations defined by common verbs such as `save`, `query` and `delete`.

### Data schema

The first step to create an app backed by a persistent datastore is to **define a schema**. DataStore uses GraphQL schema files as the definition of the application data model. The schema contains data types and relationships that represent the app's functionality.

### Sample schema

For the next steps, let's start with a schema for a small blog application. Currently, it has only a single model. New types and constructs will be added to this base schema as more concepts are presented.

Open the `schema.graphql` file located by default at `amplify/backend/{api_name}/` and **define a model** `Post` as follows.

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
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/getting-started/40_codegen.md"></inline-fragment>

### Code generation: Amplify CLI

Models can also be generated using the Amplify CLI directly.

In your terminal, make sure you are in your project/root folder and **execute the codegen command**:

```console
amplify codegen models
```
    
You can **find the generated files** at `amplify/generated/models/`.

## Initialize Amplify DataStore

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/50_initDataStore.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/50_initDataStore.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/50_initDataStore.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/getting-started/50_initDataStore.md"></inline-fragment>

## Persistence operations

Now the application is ready to execute persistence operations. The data will be persisted to a local database, enabling offline-first use cases by default.

Even though a GraphQL API is already added to your project, the cloud synchronization will only be enabled when the API plugin is initialized and the backend provisioned. See the [Next steps](#next-steps) for more info.

### Writing to the database

To write to the database, create an instance of the `Post` model and save it.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/60_saveSnippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/60_saveSnippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/60_saveSnippet.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/getting-started/60_saveSnippet.md"></inline-fragment>

### Reading from the database

To read from the database, the simplest approach is to query for all records of a given model type.

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/getting-started/70_querySnippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/getting-started/70_querySnippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/getting-started/70_querySnippet.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/getting-started/70_querySnippet.md"></inline-fragment>

## Next steps

Congratulations! You’ve created and retrieved data from the local database. Check out the following links to see other Amplify DataStore use cases and advanced concepts:

- [Write data](~/lib/datastore/data-access.md#create-and-update)
- [Query data](~/lib/datastore/data-access.md#query-data)
- [Model associations](~/lib/datastore/relational.md)
- [Cloud synchronization](~/lib/datastore/sync.md)
- [Clear local data](~/lib/datastore/sync.md#clear-local-data)
