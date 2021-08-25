This section describes different use cases for constructing your own custom GraphQL requests and how to approach it. You may want to construct your own GraphQL request if you want to
- retrieve only a subset of the data to reduce data transfer
- retrieve nested objects at a depth that you choose
- combine multiple operations into a single request
- send custom headers to your AppSync endpoint

A GraphQL request is automatically generated for you when using AWSAPIPlugin with the existing workflow. For example, if you have a Todo model, a mutation request to save the Todo will look like this:

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/advanced-workflows/10_example.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/advanced-workflows/10_example.md"></inline-fragment>

Underneath the covers, a request is generated with a GraphQL document and variables and sent to the AppSync service. 

```json
{ 
  "query": "mutation createTodo($input: CreateTodoInput!) {
    createTodo(input: $input) {
      id
      name
      description
    }
  }",
  "variables": "{
    "input": {
      "id": "[UNIQUE-ID]",
      "name": "my first todo",
      "description": "todo description"
    }
  }
}
```

The different parts of the document are described as follows
- `mutation` - the operation type to be performed, other operation types are `query` and `subscription`
- `createTodo($input: CreateTodoInput!)` - the name and input of the operation. 
- `$input: CreateTodoInput!` - the input of type `CreateTodoInput!` referencing the variables containing JSON input
- `createTodo(input: $input)` - the mutation operation which takes a variable input from `$input`
- the selection set containing `id`, `name`, and `description` are fields specified to be returned in the response

You can learn more about the structure of a request from [GraphQL Query Language](https://graphql.org/learn/) and [AppSync documentation](https://docs.aws.amazon.com/appsync/latest/devguide/graphql-overview.html). To test out constructing your own requests, open the AppSync console using `amplify console api` and navigate to the Queries tab.

## Subset of data

The selection set of the document specifies which fields are returned in the response. For example, if you are displaying a view of the Todo without the description, you can construct the document to omit the field. You can learn more about selection sets [here](https://spec.graphql.org/draft/#sec-Selection-Sets).

```
query getTodo($id: ID!) {
  getTodo(id: $id) {
    id
    name
  }
}
```
The response data will look like this
```json
{
  "data": {
    "getTodo": {
      "id": "111",
      "name": "my first todo"
    }
  }
}
```
First, create your own `GraphQLRequest`

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/advanced-workflows/20_custom.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/advanced-workflows/20_custom.md"></inline-fragment>

## Nested Data
If you have a relational model, you can retrieve the nested object by creating a `GraphQLRequest` with a selection set containing the nested object's fields. For example, in this schema, the Post can contain multiple comments and notes.
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
  comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
  notes: [Note] @connection(keyName: "byNote", fields: ["id"])
}
type Comment @model
  @key(name: "byPost", fields: ["postID", "content"]) {
  id: ID!
  postID: ID!
  post: Post! @connection(fields: ["postID"])
  content: String!
}
type Note @model
  @key(name: "byNote", fields: ["postID", "content"]) {
  id: ID!
  postID: ID!
  post: Post! @connection(fields: ["postID"])
  content: String!
}
```
If you only want to retrieve the comments, without the notes, create a `GraphQLRequest` for the Post with nested fields only containing the comment fields.

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/advanced-workflows/30_nested.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/advanced-workflows/30_nested.md"></inline-fragment>

## Combining Multiple Operations

When you want to perform more than one operation in a single request, you can place them within the same document. For example, to retrieve a Post and a Todo

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/advanced-workflows/40_multiple.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/advanced-workflows/40_multiple.md"></inline-fragment>

## Adding Headers to Outgoing Requests

By default, the API plugin includes appropriate authorization headers on your outgoing requests. However, you may have an advanced use case where you wish to send additional request headers to AppSync.

<inline-fragment platform="ios" src="~/lib/graphqlapi/fragments/ios/advanced-workflows/50_interceptor.md"></inline-fragment>
<inline-fragment platform="android" src="~/lib/graphqlapi/fragments/android/advanced-workflows/50_interceptor.md"></inline-fragment>
