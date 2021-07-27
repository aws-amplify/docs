---
title: Define your model types
description: Specify the various types that make up your schema.
---

## @model

Object types that are annotated with `@model` are top-level entities in the
generated API. Objects annotated with `@model` are stored in Amazon DynamoDB and are
capable of being protected via `@auth`, related to other objects via `@connection`,
and streamed into Amazon OpenSearch via `@searchable`. You may also apply the
`@versioned` directive to instantly add a version field and conflict detection to a
model type.

### Definition

The following SDL defines the `@model` directive that allows you to easily define
top level object types in your API that are backed by Amazon DynamoDB.

```graphql
directive @model(
  queries: ModelQueryMap
  mutations: ModelMutationMap
  subscriptions: ModelSubscriptionMap
  timestamps: TimestampConfiguration
) on OBJECT
input ModelMutationMap {
  create: String
  update: String
  delete: String
}
input ModelQueryMap {
  get: String
  list: String
}
input ModelSubscriptionMap {
  onCreate: [String]
  onUpdate: [String]
  onDelete: [String]
  level: ModelSubscriptionLevel
}
enum ModelSubscriptionLevel {
  off
  public
  on
}
input TimestampConfiguration {
  createdAt: String
  updatedAt: String
}
```

### Usage

Define a GraphQL object type and annotate it with the `@model` directive to store
objects of that type in DynamoDB and automatically configure CRUDL queries and
mutations.

```graphql
type Post @model {
  id: ID! # id: ID! is a required attribute.
  title: String!
  tags: [String!]!
}
```

You may also override the names of any generated queries, mutations and subscriptions, or remove operations entirely.

```graphql
type Post @model(queries: { get: "post" }, mutations: null, subscriptions: null) {
  id: ID!
  title: String!
  tags: [String!]!
}
```

Model directive automatically adds createdAt and updatedAt timestamps to each entities. The timestamp field names can be changed by passing `timestamps` attribute to the directive

```graphql
type Post @model(timestamps:{createdAt: "createdOn", updatedAt: "updatedOn"}) {
  id: ID!
  title: String!
  tags: [String!]!
}
```

The above schema will generate Post with `createdOn` and `updatedOn` fields as shown

```graphql
type Post {
  id: ID!
  title: String!
  tags: [String!]!
  createdOn: AWSDateTime!
  updatedOn: AWSDateTime!
}
```

The automatically added `createdAt` and `updatedAt` fields can't be set in create or update mutation. If these fields need to be controlled as part of the mutation, they should be in the input schema and should have `AWSDateTime` as their type

```graphql
type Post @model {
  id: ID!
  title: String!
  tags: [String!]!
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}
```

This would create and configure a single query field `post(id: ID!): Post` and
no mutation fields.

### Generates

A single `@model` directive configures the following AWS resources:

- An Amazon DynamoDB table with PAY_PER_REQUEST billing mode enabled by default.
- An AWS AppSync DataSource configured to access the table above.
- An AWS IAM role attached to the DataSource that allows AWS AppSync to call the above table on your behalf.
- Up to 8 resolvers (create, update, delete, get, list, onCreate, onUpdate, onDelete) but this is configurable via the `queries`, `mutations`, and `subscriptions` arguments on the `@model` directive.
- Input objects for create, update, and delete mutations.
- Filter input objects that allow you to filter objects in list queries and connection fields.
- For list queries the default number of objects returned is 100. You can override this behavior by setting the **limit** argument.

This input schema document

```graphql
type Post @model {
  id: ID!
  title: String
  metadata: MetaData
}
type MetaData {
  category: Category
}
enum Category { comedy news }
```

would generate the following schema parts

```graphql
type Post {
  id: ID!
  title: String!
  metadata: MetaData
  createdAt: AWSDatetime
  updatedAt: AWSDateTime
}

type MetaData {
  category: Category
}

enum Category {
  comedy
  news
}

input MetaDataInput {
  category: Category
}

enum ModelSortDirection {
  ASC
  DESC
}

type ModelPostConnection {
  items: [Post]
  nextToken: String
}

input ModelStringFilterInput {
  ne: String
  eq: String
  le: String
  lt: String
  ge: String
  gt: String
  contains: String
  notContains: String
  between: [String]
  beginsWith: String
}

input ModelIDFilterInput {
  ne: ID
  eq: ID
  le: ID
  lt: ID
  ge: ID
  gt: ID
  contains: ID
  notContains: ID
  between: [ID]
  beginsWith: ID
}

input ModelIntFilterInput {
  ne: Int
  eq: Int
  le: Int
  lt: Int
  ge: Int
  gt: Int
  contains: Int
  notContains: Int
  between: [Int]
}

input ModelFloatFilterInput {
  ne: Float
  eq: Float
  le: Float
  lt: Float
  ge: Float
  gt: Float
  contains: Float
  notContains: Float
  between: [Float]
}

input ModelBooleanFilterInput {
  ne: Boolean
  eq: Boolean
}

input ModelPostFilterInput {
  id: ModelIDFilterInput
  title: ModelStringFilterInput
  and: [ModelPostFilterInput]
  or: [ModelPostFilterInput]
  not: ModelPostFilterInput
}

type Query {
  getPost(id: ID!): Post
  listPosts(filter: ModelPostFilterInput, limit: Int, nextToken: String): ModelPostConnection
}

input CreatePostInput {
  title: String!
  metadata: MetaDataInput
}

input UpdatePostInput {
  id: ID!
  title: String
  metadata: MetaDataInput
}

input DeletePostInput {
  id: ID
}

type Mutation {
  createPost(input: CreatePostInput!): Post
  updatePost(input: UpdatePostInput!): Post
  deletePost(input: DeletePostInput!): Post
}

type Subscription {
  onCreatePost: Post @aws_subscribe(mutations: ["createPost"])
  onUpdatePost: Post @aws_subscribe(mutations: ["updatePost"])
  onDeletePost: Post @aws_subscribe(mutations: ["deletePost"])
}
```
