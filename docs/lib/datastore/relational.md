---
title: Relational models
description: Learn more about how DataStore handles relationships between Models, such as "has one", "has many", "belongs to".
---

DataStore has the capability to handle relationships between Models, such as *has one*, *has many*, *belongs to*. In GraphQL this is done with the `@connection` directive as defined in the [GraphQL Transformer documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection).

## Updated schema

For the examples below with DataStore let's add a new model to the [sample schema](~/lib/datastore/getting-started.md#sample-schema):

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
  # New field with @connection
  comments: [Comment] @connection(name: "PostComments")
}

# New model
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

## Saving relations

In order to save connected models you will create an instance of the model you wish to connect and pass it to `DataStore.save` with the parent as an argument (`post` in the below example):

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/save-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/save-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/save-snippet.md"></inline-fragment>

### Many-to-many

The above example shows how to use a *one-to-many* schema and save connected models. For *many-to-many* relations, such as the one shows in the [GraphQL Transformer examples](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection).

In this case, you save instances of models from each side of the relationship and then join them together in the connecting type on a field defined with `@connection`. Consider the following added to the previously defined [sample schema](~/lib/datastore/getting-started.md#sample-schema):

```graphql
type User @model {
  id: ID!
  username: String!
}

type PostEditor @model {
  id: ID!
  editor: User @connection
  post: Post @connection
}
```

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/save-many-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/save-many-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/save-many-snippet.md"></inline-fragment>

## Querying relations

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/query-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/query-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/query-snippet.md"></inline-fragment>

## Deleting relations

When you delete a parent object in a one to many relationship, the children will also be removed from the DataStore and mutations for this deletion will be sent over the network. For example the following operation would remove the Post with id *123* as well as any related comments:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/delete-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/delete-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/delete-snippet.md"></inline-fragment>

However, in a many to many relationship the children are not removed and you must explicitly delete them.
