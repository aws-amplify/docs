
DataStore has the capability to handle relationships between Models, such as *has one*, *has many*, *belongs to*. In GraphQL this is done with the `@connection` and `@key` directives as defined in the [GraphQL Transformer documentation](~/cli/graphql-transformer/connection.md).

<amplify-callout warning>

When using the `@key` directive with DataStore, as long as you specify a `name` you can use any value(s) in `fields`. However, if the `name` property is omitted, the first item in the `fields` array must be `"id"`. E.g., `@key(fields: ["id", "content"])`.

</amplify-callout>

## Updated schema

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/updated-schema.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/updated-schema.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/updated-schema.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/relational/updated-schema.md"></inline-fragment>

## Saving relations

In order to save connected models you will create an instance of the model you wish to connect and pass it's ID to `DataStore.save`:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/save-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/save-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/save-snippet.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/relational/save-snippet.md"></inline-fragment>

## Querying relations

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/query-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/query-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/query-snippet.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/relational/query-snippet.md"></inline-fragment>

## Deleting relations

When you delete a parent object in a one to many relationship, the children will also be removed from the DataStore and mutations for this deletion will be sent over the network. For example the following operation would remove the Post with id *123* as well as any related comments:

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/delete-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/delete-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/delete-snippet.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/relational/delete-snippet.md"></inline-fragment>

However, in a many to many relationship the children are not removed and you must explicitly delete them.

### Many-to-many

The above example shows how to use a *one-to-many* schema and save connected models. You can also define *many-to-many* relationships, such as the relationship shown in the [@connection examples](~/cli/graphql-transformer/connection.md#many-to-many-connections).

For many-to-many relationships, you save instances of models from each side of the relationship and then join them together by connecting type on a field defined with `@connection`. Consider the following schema:

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  rating: Int
  status: PostStatus
  editors: [PostEditor] @connection(keyName: "byPost", fields: ["id"])
}

type PostEditor
  @model(queries: null)
  @key(name: "byPost", fields: ["postID", "editorID"])
  @key(name: "byEditor", fields: ["editorID", "postID"]) {
  id: ID!
  postID: ID!
  editorID: ID!
  post: Post! @connection(fields: ["postID"])
  editor: User! @connection(fields: ["editorID"])
}

type User @model {
  id: ID!
  username: String!
  posts: [PostEditor] @connection(keyName: "byEditor", fields: ["id"])
}
```

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/save-many-snippet.md"></inline-fragment>
<inline-fragment platform="ios" src="~/lib/datastore/fragments/ios/relational/save-many-snippet.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/datastore/fragments/android/relational/save-many-snippet.md"></inline-fragment>
<inline-fragment platform="flutter" src="~/lib/datastore/fragments/flutter/relational/save-many-snippet.md"></inline-fragment>

<inline-fragment platform="js" src="~/lib/datastore/fragments/js/relational/query-many-snippet.md"></inline-fragment>