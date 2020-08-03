---
title: Directives
description: Annotate your GraphQL schema with directives to automatically transform it into a fully descriptive CloudFormation template that implements the spec.
---

## @model

Object types that are annotated with `@model` are top-level entities in the
generated API. Objects annotated with `@model` are stored in Amazon DynamoDB and are
capable of being protected via `@auth`, related to other objects via `@connection`,
and streamed into Amazon Elasticsearch via `@searchable`. You may also apply the
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

## @key

The `@key` directive makes it simple to configure custom index structures for `@model` types.

Amazon DynamoDB is a key-value and document database that delivers single-digit millisecond performance at any scale but making it work for your access patterns requires a bit of forethought. DynamoDB query operations may use at most two attributes to efficiently query data. The first query argument passed to a query (the hash key) must use strict equality and the second attribute (the sort key) may use gt, ge, lt, le, eq, beginsWith, and between. DynamoDB can effectively implement a wide variety of access patterns that are powerful enough for the majority of applications.

When modeling your data during schema design there are common patterns that you may need to leverage. [We provide a fully working schema with 17 patterns related to relational designs](~/cli/graphql-transformer/dataaccess.md).

### Definition

```graphql
directive @key(fields: [String!]!, name: String, queryField: String) on OBJECT
```

**Argument**

| Argument  | Description  |
|---|---|
| fields  | A list of fields that should comprise the @key, used in conjunction with an `@model` type. The first field in the list will always be the **HASH** key. If two fields are provided the second field will be the **SORT** key. If more than two fields are provided, a single composite **SORT** key will be created from a combination of `fields[1...n]`. All generated GraphQL queries & mutations will be updated to work with custom `@key` directives. |
| name  | When provided, specifies the name of the secondary index. When omitted, specifies that the `@key` is defining the primary index. You may have at most one primary key per table and therefore you may have at most one `@key` that does not specify a **name** per `@model` type.  |
| queryField  | When defining a secondary index (by specifying the *name* argument), this specifies that a new top level query field that queries the secondary index should be generated with the given name.  |

### How to use @key

For an introduction to the `@key` directive, let's start by looking a basic `Todo` app schema with only an `@model` directive.

```graphql
type Todo @model {
  id: ID!
  name: String!
  status: String!
}
```

By default, the `@model` directive will enable the following 2 data access patterns:

1. `getTodo` - Get a Todo by `id`
2. `listTodos` - Query all Todos

You will often need additional data access patterns. For example in a Todo app you may want to fetch Todos by `status`. The `@key` directive would allow you to add this additional data access pattern with a single new line of code:

```graphql
type Todo @model
  @key(name: "todosByStatus", fields: ["status"], queryField: "todosByStatus") {
  id: ID!
  name: String!
  status: String!
}
```

Using the new `todosByStatus` query you can fetch todos by `status`:

```graphql
query todosByStatus {
  todosByStatus(status: "completed") {
    items {
      id
      name
      status
    }
  }
}
```

Next, let's take a closer look at how this works by examining a few more common data access patterns and how to model them.

### Designing Data Models using @key

When designing data models using the `@key` directive, the first step should be to write down your application's expected access patterns. For example, let's say you were building an e-commerce application
and needed to implement access patterns like:

1. Get customers by email.
2. Get orders by customer by createdAt.
3. Get items by order by status by createdAt.
4. Get items by status by createdAt.

Let's take a look at how you would define custom keys to implement these access patterns in your `schema.graphql`.

#### Get customers by email.

```graphql
type Customer @model @key(fields: ["email"]) {
  email: String!
  username: String
}
```

A `@key` without a *name* specifies the key for the DynamoDB table's primary index. You may only provide 1 `@key` without a *name* per `@model` type.

The example above shows the simplest case where you are specifying that the table's primary index should have a simple key where the hash key is *email*. This allows you to get unique customers by their *email*.

```graphql
query GetCustomerById {
  getCustomer(email:"me@email.com") {
    email
    username
  }
}
```

This is great for simple lookup operations, but what if you need to perform slightly more complex queries?

#### Get orders by customer email by createdAt.

```graphql
type Order @model @key(fields: ["customerEmail", "createdAt"]) {
    customerEmail: String!
    createdAt: String!
    orderId: ID!
}
```

This `@key` above allows you to efficiently query *Order* objects by both a *customerEmail* and the *createdAt* time stamp. The `@key` above creates a DynamoDB table where the primary index's hash key is *customerEmail* and the sort key is *createdAt*. This allows you to write queries like this:

```graphql
query ListOrdersForCustomerIn2019 {
  listOrders(customerEmail:"me@email.com", createdAt: { beginsWith: "2019" }) {
    items {
      orderId
      customerEmail
      createdAt
    }
  }
}
```

The query above shows how you can use compound key structures to implement more powerful query patterns on top of DynamoDB but you are not quite done yet.

Given that DynamoDB limits you to query by at most two attributes at a time, the `@key` directive helps by streamlining the process of creating composite sort keys such that you can support querying by more than two attributes at a time. For example, you can implement “Get items by `orderId`, `status`, and `createdAt”` as well as “Get items by `status` and `createdAt”` for a single `@model` with this schema.

```graphql
type Item @model
  @key(fields: ["orderId", "status", "createdAt"])
  @key(name: "ByStatus", fields: ["status", "createdAt"], queryField: "itemsByStatus") {
  orderId: ID!
  status: Status!
  createdAt: AWSDateTime!
  name: String!
}
enum Status {
  DELIVERED
  IN_TRANSIT
  PENDING
  UNKNOWN
}
```

The primary `@key` with 3 fields performs a bit more magic than the 1 and 2 field variants. The first field orderId will be the **HASH** key as expected, but the **SORT** key will be a new composite key named *status#createdAt* that is made of the *status* and *createdAt* fields on the @model. The `@key` directive creates the table structures and also generates resolvers that inject composite key values for you during queries and mutations.

Using this schema, you can query the primary index to get IN_TRANSIT items created in 2019 for a given order.

```graphql
# Get items for order by status by createdAt.
query ListInTransitItemsForOrder {
  listItems(orderId:"order1", statusCreatedAt: { beginsWith: { status: IN_TRANSIT, createdAt: "2019" }}) {
    items {
      orderId
      status
      createdAt
      name
    }
  }
}
```

The query above exposes the *statusCreatedAt* argument that allows you to configure DynamoDB key condition expressions without worrying about how the composite key is formed under the hood. Using the same schema, you can get all PENDING items created in 2019 by querying the secondary index "ByStatus" via the `Query.itemsByStatus` field.

```graphql
query ItemsByStatus {
  itemsByStatus(status: PENDING, createdAt: {beginsWith:"2019"}) {
    items {
      orderId
      status
      createdAt
      name
    }
    nextToken
  }
}
```

### Evolving APIs with @key

There are a few important things to think about when making changes to APIs using `@key`. When you need to enable a new access pattern or change an existing access pattern you should follow these steps.

1. Create a new index that enables the new or updated access pattern.
2. If adding an `@key` with 3 or more fields, you will need to back-fill the new composite sort key for existing data. With a `@key(fields: ["email", "status", "date"])`, you would need to backfill the `status#date` field with composite key values made up of each object's *status* and *date* fields joined by a `#`. You do not need to backfill data for `@key` directives with 1 or 2 fields.
3. Deploy your additive changes and update any downstream applications to use the new access pattern.
4. Once you are certain that you do not need the old index, remove its `@key` and deploy the API again.

### Combining @key with @connection

Secondary indexes created with the `@key` directive can be used to resolve connections when creating relationships between types. To learn how this works, check out [the documentation for @connection](#connection).

## @auth

Authorization is required for applications to interact with your GraphQL API. **API Keys** are best used for public APIs (or parts of your schema which you wish to be public) or prototyping, and you must specify the expiration time before deploying. **IAM** authorization uses [Signature Version 4](https://docs.aws.amazon.com/general/latest/gr/signature-version-4.html) to make request with policies attached to Roles. OIDC tokens provided by **Amazon Cognito User Pools** or 3rd party OpenID Connect providers can also be used for authorization, and simply enabling this provides a simple access control requiring users to authenticate to be granted top level access to API actions. You can set finer grained access controls using `@auth` on your schema which leverages authorization metadata provided as part of these tokens or set on the database items themselves.

`@auth` object types that are annotated with `@auth` are protected by a set of authorization rules giving you additional controls than the top level authorization on an API. You may use the `@auth` directive on object type definitions and field definitions in your project's schema.

When using the `@auth` directive on object type definitions that are also annotated with
`@model`, all resolvers that return objects of that type will be protected. When using the
`@auth` directive on a field definition, a resolver will be added to the field that authorize access
based on attributes found in the parent type.

### Definition

```graphql
# When applied to a type, augments the application with
# owner and group-based authorization rules.
directive @auth(rules: [AuthRule!]!) on OBJECT, FIELD_DEFINITION
input AuthRule {
  allow: AuthStrategy!
  provider: AuthProvider
  ownerField: String # defaults to "owner" when using owner auth
  identityClaim: String # defaults to "username" when using owner auth
  groupClaim: String # defaults to "cognito:groups" when using Group auth
  groups: [String]  # Required when using Static Group auth
  groupsField: String # defaults to "groups" when using Dynamic Group auth
  operations: [ModelOperation] # Required for finer control

  # The following arguments are deprecated. It is encouraged to use the 'operations' argument.
  queries: [ModelQuery]
  mutations: [ModelMutation]
}
enum AuthStrategy { owner groups private public }
enum AuthProvider { apiKey iam oidc userPools }
enum ModelOperation { create update delete read }

# The following objects are deprecated. It is encouraged to use ModelOperations.
enum ModelQuery { get list }
enum ModelMutation { create update delete }
```

> Note: The operations argument was added to replace the 'queries' and 'mutations' arguments. The 'queries' and 'mutations' arguments will continue to work but it is encouraged to move to 'operations'. If both are provided, the 'operations' argument takes precedence over 'queries'.

### Owner authorization

By default, enabling `owner` authorization allows any signed in user to create records.

```graphql
# The simplest case
type Post @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  title: String!
}

# The long form way
type Post
  @model
  @auth(
    rules: [
      { allow: owner, ownerField: "owner", operations: [create, update, delete, read] },
    ])
{
  id: ID!
  title: String!
  owner: String
}
```

<amplify-callout>

Owner authorization requires an authentication type of **Amazon Cognito User Pools** to be enabled in your app.

</amplify-callout>

Owner authorization specifies whether a user can access or operate against an object. To do so, each object will get an `ownerField` field (by default `owner` will be added to the object if not specified) that stores ownership information and is verified in various ways during resolver execution.

You can use the `operations` argument to specify which operations are enabled as follows:

- **read**: Allow the user to perform queries (`get` and `list` operations) against the API.
- **create**: Inject the logged in user's identity as the `ownerField` automatically.
- **update**: Add conditional update that checks the stored `ownerField` is the same as the signed in user.
- **delete**: Add conditional update that checks the stored `ownerField` is the same as the signed in user.

You must ensure that the `create` operations rule is specified explicitly or inferred from defaults to ensure that the owner's identity is stored with the record so it can be verified on subsequent requests.

```graphql
# owner identity inferred from defaults on every object
type Post @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  title: String!
}

# owner identity specified explicitly on every object
type Post @model @auth(rules: [{ allow: owner, operations: [create] }]) {
  id: ID!
  title: String!
}

# owner identity not stored on objects
type Post @model @auth(rules: [{ allow: owner, operations: [read] }]) {
  id: ID!
  title: String!
}
```

<amplify-callout>

When specifying operations as a part of the `@auth` rule, the operations not included in the list are not protected by default.

</amplify-callout>


Let's take a look at a few examples:

```graphql
type Todo @model
  @auth(rules: [{ allow: owner }]) {
  id: ID!
  updatedAt: AWSDateTime!
  content: String!
}
```

In this schema, only the owner of the object has the authorization to perform read (`getTodo` and `listTodos`), update (`updateTodo`), and delete (`deleteTodo`) operations on the owner created object. This prevents the object from being updated or deleted by users other than the creator of the object.

Here's a table outlining which users are permitted to execute which operations. **owner** refers to the user who created the object, **other** refers to all other authenticated users.

|       | getTodo | listTodos | createTodo | updateTodo | deleteTodo |
|:------|:-------:|:---------:|:----------:|:----------:|:----------:|
| owner |    ✅   |     ✅    |     ✅     |      ✅   |     ✅     |
| other |    ❌   |     ❌    |     ✅     |      ❌   |     ❌     |

Next, let's say that you wanted to modify the schema to allow only the owner of the object to be able to update or delete, but allow any authenticated user to read the objects.

```graphql
type Todo @model
  @auth(rules: [{ allow: owner, operations: [create, delete, update] }]) {
  id: ID!
  updatedAt: AWSDateTime!
  content: String!
}
```

In this schema, only the owner of the object has the authorization to perform update (`updateTodo`) and delete (`deleteTodo`) operations on the owner created object, but anyone can read them (`getTodo`, `listTodos`). This prevents the object from being updated or deleted by users other than the creator of the object while allowing all authenticated users of the app to read them.

Here's a table outlining which users are permitted to execute which operations. **owner** refers to the user who created the object, **other** refers to all other authenticated users.

|       | getTodo | listTodos | createTodo | updateTodo | deleteTodo |
|:------|:-------:|:---------:|:----------:|:----------:|:----------:|
| owner |    ✅   |     ✅    |     ✅     |      ✅   |     ✅     |
| other |    ✅   |     ✅    |     ✅     |      ❌   |     ❌     |

Next, let's say that you wanted to modify the schema to allow only the owner of the object to be able to delete, but allow anyone to create, read, and update.

```graphql
type Todo @model
  @auth(rules: [{ allow: owner, operations: [create, delete] }]) {
  id: ID!
  updatedAt: AWSDateTime!
  content: String!
}
```

In this schema, only the owner of the object has the authorization to perform delete operations on the owner created object, but anyone can read or update them. This is because `read` and `update` aren't specified as owner-only actions, so all users are able to perform them. Since `delete` is specified as an owner only action, only the object's creator can delete the object.

Here's a table outlining which users are permitted to execute which operations. **owner** refers to the user who created the object, **other** refers to all other authenticated users.

|       | getTodo | listTodos | createTodo | updateTodo | deleteTodo |
|:------|:-------:|:---------:|:----------:|:----------:|:----------:|
| owner |    ✅   |     ✅    |     ✅     |      ✅   |     ✅     |
| other |    ✅   |     ✅    |     ✅     |      ✅   |     ❌     |


### Multiple authorization rules

You may also apply multiple ownership rules on a single `@model` type. 

For example, imagine you have a type **Draft** that stores unfinished posts for a blog. You might want to allow the **Draft's** owner to `create`, `update`, `delete`, and `read` **Draft** objects. However, you might also want the **Draft's editors** to be able to update and read **Draft** objects.

To allow for this use case you could use the following type definition:

```graphql
type Draft @model
  @auth(rules: [
    # Defaults to use the "owner" field.
    { allow: owner },

    # Authorize the update mutation and both queries.
    { allow: owner, ownerField: "editors", operations: [update, read] }
  ]) {
  id: ID!
  title: String!
  content: String
  owner: String
  editors: [String]
}
```

### Ownership with create mutations

The ownership authorization rule will automatically fill ownership fields unless
told explicitly not to do so. To show how this works, lets look at how the create mutation
would work for the **Draft** type above:

```graphql
mutation CreateDraft {
  createDraft(input: { title: "A new draft" }) {
    id
    title
    owner
    editors
  }
}
```

Let's assume that when I call this mutation I am logged in as `someuser@my-domain.com`. The result would be:

```json
{
    "data": {
        "createDraft": {
            "id": "...",
            "title": "A new draft",
            "owner": "someuser@my-domain.com",
            "editors": ["someuser@my-domain.com"]
        }
    }
}
```

The `Mutation.createDraft` resolver is smart enough to match your auth rules to attributes
and will fill them in be default. If you do not want the value to be automatically set all
you need to do is include a value for it in your input.

For example, to have the resolver automatically set the **owner** but not the **editors**, you would run this:

```graphql
mutation CreateDraft {
  createDraft(
    input: {
      title: "A new draft",
      editors: []
    }
  ) {
    id
    title
    owner
    editors
  }
}
```

This would return:

```json
{
    "data": {
        "createDraft": {
            "id": "...",
            "title": "A new draft",
            "owner": "someuser@my-domain.com",
            "editors": []
        }
    }
}
```

To specify a list of custom **editors**, you could run this:

```graphql
mutation CreateDraft {
  createDraft(
    input: {
      title: "A new draft",
      editors: ["editor1@my-domain.com", "editor2@my-domain.com"]
    }
  ) {
    id
    title
    owner
    editors
  }
}
```

This would return:

```json
{
    "data": {
        "createDraft": {
            "id": "...",
            "title": "A new draft",
            "owner": "someuser@my-domain.com",
            "editors": ["editor1@my-domain.com", "editor2@my-domain.com"]
        }
    }
}
```

You can try to perform the same modification to **owner** but this will throw an **Unauthorized** exception because you are no longer the owner of the object you are trying to create.

```graphql
mutation CreateDraft {
  createDraft(
    input: {
      title: "A new draft",
      editors: [],
      owner: null
    }
  ) {
    id
    title
    owner
    editors
  }
}
```

### Static group authorization

Static group authorization allows you to protect `@model` types by restricting access
to a known set of groups. For example, you can allow all **Admin** users to create,
update, delete, get, and list Salary objects.

```graphql
type Salary @model @auth(rules: [{ allow: groups, groups: ["Admin"] }]) {
  id: ID!
  wage: Int
  currency: String
}
```

When calling the GraphQL API, if the user credential (as specified by the resolver's `$ctx.identity`) is not
enrolled in the *Admin* group, the operation will fail.

To enable advanced authorization use cases, you can layer auth rules to provide specialized functionality.
To show how you might do that, let's expand the **Draft** example you started in the **Owner Authorization**
section above. When you last left off, a **Draft** object could be updated and read by both its owner
and any of its editors and could be created and deleted only by its owner. Let's change it so that
now any member of the "Admin" group can also create, update, delete, and read a **Draft** object.

```graphql
type Draft @model
  @auth(rules: [
    # Defaults to use the "owner" field.
    { allow: owner },

    # Authorize the update mutation and both queries.
    { allow: owner, ownerField: "editors", operations: [update] },

    # Admin users can access any operation.
    { allow: groups, groups: ["Admin"] }
  ]) {
  id: ID!
  title: String!
  content: String
  owner: String
  editors: [String]!
}
```

### Dynamic group authorization

```graphql
# Dynamic group authorization with multiple groups
type Post @model @auth(rules: [{ allow: groups, groupsField: "groups" }]) {
  id: ID!
  title: String
  groups: [String]
}

# Dynamic group authorization with a single group
type Post @model @auth(rules: [{ allow: groups, groupsField: "group" }]) {
  id: ID!
  title: String
  group: String
}
```

With dynamic group authorization, each record contains an attribute specifying
what groups should be able to access it. Use the *groupsField* argument to
specify which attribute in the underlying data store holds this group
information. To specify that a single group should have access, use a field of
type `String`. To specify that multiple groups should have access, use a field of
type `[String]`.

Just as with the other auth rules, you can layer dynamic group rules on top of other rules.
Let's again expand the **Draft** example from the **Owner Authorization** and **Static Group Authorization**
sections above. When you last left off editors could update and read objects, owners had full
access, and members of the admin group had full access to **Draft** objects. Now you have a new
requirement where each record should be able to specify an optional list of groups that can read
the draft. This would allow you to share an individual document with an external team, for example.

```graphql
type Draft @model
  @auth(rules: [
    # Defaults to use the "owner" field.
    { allow: owner },

    # Authorize the update mutation and both queries.
    { allow: owner, ownerField: "editors", operations: [update] },

    # Admin users can access any operation.
    { allow: groups, groups: ["Admin"] }

    # Each record may specify which groups may read them.
    { allow: groups, groupsField: "groupsCanAccess", operations: [read] }
  ]) {
  id: ID!
  title: String!
  content: String
  owner: String
  editors: [String]!
  groupsCanAccess: [String]!
}
```

With this setup, you could create an object that can be read by the "BizDev" group:

```graphql
mutation CreateDraft {
  createDraft(input: {
    title: "A new draft",
    editors: [],
    groupsCanAccess: ["BizDev"]
  }) {
    id
    groupsCanAccess
  }
}
```

And another draft that can be read by the "Marketing" group:

```graphql
mutation CreateDraft {
  createDraft(input: {
    title: "Another draft",
    editors: [],
    groupsCanAccess: ["Marketing"]
  }) {
    id
    groupsCanAccess
  }
}
```

### `public` authorization

```graphql
# The simplest case
type Post @model @auth(rules: [{ allow: public }]) {
  id: ID!
  title: String!
}
```

The `public` authorization specifies that everyone will be allowed to access the API, behind the scenes the API will be protected with an API Key. To be able to use `public` the API must have API Key configured.

```graphql
# public authorization with provider override
type Post @model @auth(rules: [{ allow: public, provider: iam }]) {
  id: ID!
  title: String!
}
```

The @auth directive allows the override of the default provider for a given authorization mode. In the sample above iam is specified as the provider which allows you to use an "UnAuthenticated Role" from Cognito Identity Pools for public access, instead of an API Key. When used in conjunction with amplify add auth the CLI generates scoped down IAM policies for the "UnAuthenticated" role automatically.

### `private` authorization

```graphql
# The simplest case
type Post @model @auth(rules: [{ allow: private }]) {
  id: ID!
  title: String!
}
```

The `private` authorization specifies that everyone will be allowed to access the API with a valid JWT token from the configured Cognito User Pool. To be able to use `private` the API must have Cognito User Pool configured.

```graphql
# private authorization with provider override
type Post @model @auth(rules: [{ allow: private, provider: iam }]) {
  id: ID!
  title: String!
}
```

The @auth directive allows the override of the default provider for a given authorization mode. In the sample above iam is specified as the provider which allows you to use an "Authenticated Role" from Cognito Identity Pools for private access. When used in conjunction with amplify add auth the CLI generates scoped down IAM policies for the "Authenticated" role automatically.

### Authorization using an `oidc` provider

```graphql
# owner authorization with provider override
type Profile @model @auth(rules: [{ allow: owner, provider: oidc, identityClaim: "sub" }]) {
  id: ID!
  displayNAme: String!
}
```

By using a configured `oidc` provider for the API, it is possible to authenticate the users against it. In the sample above, `oidc` is specified as the provider for the `owner` authorization on the type. The field `identityClaim: "sub"` specifies that the `"sub"` claim from your JWT token is used to provider ownership instead of the default `username` claim, which is used by the Amazon Cognito JWT.


### Combining multiple authorization types

Amplify GraphQL APIs have a primary **default** authentication type and, optionally, additional secondary authentication types. The objects and fields in the GraphQL schema can have rules with different authorization providers assigned based on the authentication types configured in your app.

One of the most common scenarios for multiple authorization rules is for combining public and private access. For example, blogs typically allow public access for viewing a post but only allow a post's creator to update or delete that post.

Let's take a look at how you can combine public and private access to achieve this:

```graphql
type Post @model
  @auth (
    rules: [
      # allow all authenticated users ability to create posts
      # allow owners ability to update and delete their posts
      { allow: owner },

      # allow all authenticated users to read posts
      { allow: private, operations: [read] },

      # allow all guest users (not authenticated) to read posts
      { allow: public, operations: [read] }
    ]
  ) {
  id: ID!
  title: String
  owner: String
}
```

<amplify-callout>

The above schema assumes a combination of **Amazon Cognito User Pools** and **API key** authentication types

</amplify-callout>

Let's take a look at another example. Here the `Post` model is protected by Cognito User Pools by default and the `owner` can perform any operation on the `Post` type. You can also call `getPosts` and `listPosts` from an AWS Lambda function if it is configured with the appropriate IAM policies in its execution role.

```graphql
type Post @model
  @auth (
    rules: [
      { allow: owner },
      { allow: private, provider: iam, operations: [read] }
    ]
  ) {
  id: ID!
  title: String
  owner: String
}
```

<amplify-callout>

The above schema assumes a combination of **Amazon Cognito User Pools** and **IAM** authentication types

</amplify-callout>

Let's have a look at one more example. In the following example the model is protected by Cognito User Pools by default and anyone with a valid JWT token can perform any operation on the `Post` type, but cannot update the `secret` field. The `secret` field can only be modified through the configured IAM policies, from a Lambda function for example.

```graphql
type Post @model @auth (rules: [{ allow: private }]) {
  id: ID!
  title: String
  owner: String
  secret: String
    @auth (rules: [{ allow: private, provider: iam, operations: [create, update] }])
}
```

<amplify-callout>

The above schema assumes a combination of **Amazon Cognito User Pools** and **IAM** authentication types

</amplify-callout>

### Allowed authorization mode vs. provider combinations

The following table shows the allowed combinations of authorization modes and providers.

|           | owner | groups | public | private |
|:----------|:-----:|:------:|:------:|:-------:|
| userPools |✅|✅||✅|
| oidc |✅|✅|||
| apiKey |||✅||
| iam |||✅|✅|

Please note that `groups` is leveraging Cognito User Pools but no provider assignment needed/possible.

### Custom claims

`@auth` supports using custom claims if you do not wish to use the default `username` or `cognito:groups` claims from your JWT token which are populated by Amazon Cognito. This can be helpful if you are using tokens from a 3rd party OIDC system or if you wish to populate a claim with a list of groups from an external system, such as when using a [Pre Token Generation Lambda Trigger](https://docs.aws.amazon.com/cognito/latest/developerguide/user-pool-lambda-pre-token-generation.html) which reads from a database. To use custom claims specify `identityClaim` or `groupClaim` as appropriate like in the example below:

```graphql
type Post
@model
@auth(rules: [
	{ allow: owner, identityClaim: "user_id" },
	{ allow: groups, groups: ["Moderator"], groupClaim: "user_groups" }
])
{
  id: ID!
  owner: String
  postname: String
  content: String
}
```

In this example the object owner will check against a `user_id` claim. Similarly if the `user_groups` claim contains a "Moderator" string then access will be granted.

<amplify-callout>

Note `identityField` is being deprecated for `identityClaim`.

</amplify-callout>

### Authorizing subscriptions

<amplify-callout warning>

Prior to version 2.0 of the CLI, `@auth` rules did not apply to subscriptions. Instead you were required to either turn them off or use [Custom Resolvers](~/cli/graphql-transformer/resolvers.md#custom-resolvers) to manually add authorization checks. In the latest versions `@auth` protections have been added to subscriptions, however this can introduce different behavior into existing applications: First, `owner` is now a required argument for Owner-based authorization, as shown below. Second, the selection set will set `null` on fields when mutations are invoked if per-field `@auth` is set on that field. [Read more here](#per-field-with-subscriptions). If you wish to keep the previous behavior set `level: public` on your model as defined below.

</amplify-callout>

When `@auth` is used subscriptions have a few subtle behavior differences than queries and mutations based on their event based nature. When protecting a model using the owner auth strategy, each subscription request will **require** that the user is passed as an argument to the subscription request. If the user field is not passed, the subscription connection will fail. In the case where it is passed, the user will only get notified of updates to records for which they are the owner.

<amplify-callout warning>
 Subscription filtering uses data passed from mutation to do the filtering. If a mutation does not include `owner` field in the selection set of a owner based auth, Subscription message won't be fired for that mutation.
</amplify-callout>

Alternatively, when the model is protected using the static group auth strategy, the subscription request will only succeed if the user is in an allowed group. Further, the user will only get notifications of updates to records if they are in an allowed group. Note: You don't need to pass the user as an argument in the subscription request, since the resolver will instead check the contents of your JWT token.

<amplify-callout>
Dynamic groups have no impact to subscriptions. You will not get notified of any updates to them.
</amplify-callout>

For example suppose you have the following schema:

```
type Post @model
@auth(rules: [{allow: owner}])
{
  id: ID!
  owner: String
  postname: String
  content: String
}
```

This means that the subscription must look like the following or it will fail:

```graphql
subscription OnCreatePost {
  onCreatePost(owner: “Bob”){
    postname
    content
  }
}
```

Note that if your type doesn’t already have an `owner` field the Transformer will automatically add this for you. Passing in the current user can be done dynamically in your code by using [Auth.currentAuthenticatedUser()](~/lib/auth/manageusers.md/q/platform/js#retrieve-current-authenticated-user) in JavaScript, [AWSMobileClient.default().username](~/sdk/auth/working-with-api.md/q/platform/ios#utility-properties) in iOS, or [AWSMobileClient.getInstance().getUsername()](~/sdk/auth/working-with-api.md/q/platform/android#utility-properties) in Android.

In the case of groups if you define the following:

```graphql
type Post @model
@auth(rules: [{ allow: groups, groups: ["Admin"] }])
{
  id: ID!
  owner: String
  postname: String
  content: String
}
```

Then you don’t need to pass an argument, as the resolver will check the contents of your JWT token at subscription time and ensure you are in the “Admin” group.

Finally, if you use both owner and group authorization then the username argument becomes optional. This means the following:

- If you don’t pass the user in, but are a member of an allowed group, the subscription will notify you of records added.
- If you don’t pass the user in, but are NOT a member of an allowed group, the subscription will fail to connect.
- If you pass the user in who IS the owner but is NOT a member of a group, the subscription will notify you of records added of which you are the owner.
- If you pass the user in who is NOT the owner and is NOT a member of a group, the subscription will not notify you of anything as there are no records for which you own


You may disable authorization checks on subscriptions or completely turn off subscriptions as well by specifying either `public` or `off` in `@model`:

```
@model (subscriptions: { level: public })
```

### Field level authorization

The `@auth` directive specifies that access to a specific field should be restricted
 according to its own set of rules. Here are a few situations where this is useful:

**Protect access to a field that has different permissions than the parent model**

You might want to have a user model where some fields, like *username*, are a part of the
public profile and the *ssn* field is visible to owners.

```graphql
type User @model {
  id: ID!
  username: String
  ssn: String @auth(rules: [{ allow: owner, ownerField: "username" }])
}
```

**Protect access to a `@connection` resolver based on some attribute in the source object**

This schema will protect access to Post objects connected to a user based on an attribute
in the User model. You may turn off top level queries by specifying `queries: null` in the `@model`
declaration which restricts access such that queries must go through the `@connection` resolvers
to reach the model.

```graphql
type User @model {
  id: ID!
  username: String
  posts: [Post]
    @connection(name: "UserPosts")
    @auth(rules: [{ allow: owner, ownerField: "username" }])
}
type Post @model(queries: null) { ... }
```

**Protect mutations such that certain fields can have different access rules than the parent model**

When used on field definitions, `@auth` directives protect all operations by default.
To protect read operations, a resolver is added to the protected field that implements authorization logic.
To protect mutation operations, logic is added to existing mutations that will be run if the mutation's input
contains the protected field. For example, here is a model where owners and admins can read employee
salaries but only admins may create or update them.

```graphql
type Employee @model {
  id: ID!
  email: String
  username: String

  # Owners & members of the "Admin" group may read employee salaries.
  # Only members of the "Admin" group may create an employee with a salary
  # or update a salary.
  salary: String
    @auth(rules: [
      { allow: owner, ownerField: "username", operations: [read] },
      { allow: groups, groups: ["Admin"], operations: [create, update, read] }
    ])
}
```

**Note** The `delete` operation, when used in @auth directives on field definitions, translates
to protecting the update mutation such that the field cannot be set to null unless authorized.

**Note**: When specifying operations as a part of the @auth rule on a field, the operations not included in the operations list are not protected by default. For example, let's say you have the following schema:

```graphql
type Todo
  @model
{
  id: ID!
  owner: String
  updatedAt: AWSDateTime!
  content: String! @auth(rules: [{ allow: owner, operations: [update] }])
}
```

In this schema, only the owner of the object has the authorization to perform update operations on the `content` field. But this does not prevent any other owner (any user other than the creator or owner of the object) to update some other field in the object owned by another user. If you want to prevent update operations on a field, the user would need to explicitly add auth rules to restrict access to that field. One of the ways would be to explicitly specify @auth rules on the fields that you would want to protect like the following:

```graphql
type Todo
  @model
{
  id: ID!
  owner: String
  updatedAt: AWSDateTime! @auth(rules: [{ allow: owner, operations: [update] }]) // or @auth(rules: [{ allow: groups, groups: ["Admins"] }])
  content: String! @auth(rules: [{ allow: owner, operations: [update] }])
}
```
You can also provide explicit deny rules to your field like the following:

```graphql
type Todo
  @model
{
  id: ID!
  owner: String
  updatedAt: AWSDateTime! @auth(rules: [{ allow: groups, groups: ["ForbiddenGroup"], operations: [] }])
  content: String! @auth(rules: [{ allow: owner, operations: [update] }])
}
```

You can also combine top-level @auth rules on the type with field level auth rules. For example, let's consider the following schema:

```graphql
type Todo
  @model @auth(rules: [{ allow: groups, groups: ["Admin"], operations:[update] }])
{
  id: ID!
  owner: String
  updatedAt: AWSDateTime!
  content: String! @auth(rules: [{ allow: owner, operations: [update] }])
}
```
In the above schema users in the `Admin` group have the authorization to create, read, delete and update (except the `content` field in the object of another owner) for the type Todo.
An `owner` of an object, has the authorization to create Todo types and read all the objects of type Todo. In addition an `owner` can perform an update operation on the Todo object, only when the `content` field is present as a part of the input.
Any other user - who isn't an owner of an object isn't authorized to update that object.

#### Per-Field with subscriptions

When setting per-field `@auth` the Transformer will alter the response of mutations for those fields by setting them to `null` in order to prevent sensitive data from being sent over subscriptions. For example in the schema below:

```graphql
type Employee @model
  @auth(rules: [
	  { allow: owner },
	  { allow: groups, groups: ["Admins"] }
  ]) {
	id: ID!
	name: String!
	address: String!
	ssn: String @auth(rules: [{allow: owner}])
}
```

Subscribers might be a member of the "Admins" group and should get notified of the new item, however they should not get the `ssn` field. If you run the following mutation:

```graphql
mutation {
  createEmployee(input: {
    name: "Nadia"
    address: "123 First Ave"
    ssn: "392-95-2716"
  }){
    name
    address
    ssn
  }
}
```

The mutation will run successfully, however `ssn` will return null in the GraphQL response. This prevents anyone in the "Admins" group who is subscribed to updates from receiving the private information. Subscribers would still receive the `name` and `address`. The data is still written and this can be verified by running a query.

#### Generates

The `@auth` directive will add authorization snippets to any relevant resolver mapping templates at compile time. Different operations use different methods of authorization.

**Owner Authorization**

```graphql
type Post @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  title: String!
}
```

The generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and automatically set the **owner** attribute to equal `$ctx.identity.username`.
- `Mutation.updateX`: Update the condition expression so that the DynamoDB `UpdateItem` operation only succeeds if the record's **owner** attribute equals the caller's `$ctx.identity.username`.
- `Mutation.deleteX`: Update the condition expression so that the DynamoDB `DeleteItem` operation only succeeds if the record's **owner** attribute equals the caller's `$ctx.identity.username`.
- `Query.getX`: In the response mapping template verify that the result's **owner** attribute is the same as the `$ctx.identity.username`. If it is not return null.
- `Query.listX`: In the response mapping template filter the result's **items** such that only items with an **owner** attribute that is the same as the `$ctx.identity.username` are returned.
- `@connection` resolvers: In the response mapping template filter the result's **items** such that only items with an **owner** attribute that is the same as the `$ctx.identity.username` are returned. This is not enabled when using the `queries` argument.

### Static group authorization

```graphql
type Post @model @auth(rules: [{ allow: groups, groups: ["Admin"] }]) {
  id: ID!
  title: String!
  groups: String
}
```

Static group auth is simpler than the others. The generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Mutation.updateX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Mutation.deleteX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Query.getX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Query.listX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `@connection` resolvers: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail. This is not enabled when using the `queries` argument.

### Dynamic group authorization

```graphql
type Post @model @auth(rules: [{ allow: groups, groupsField: "groups" }]) {
  id: ID!
  title: String!
  groups: String
}
```

The generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and that it contains a claim to at least one group passed to the query in the `$ctx.args.input.groups` argument.
- `Mutation.updateX`: Update the condition expression so that the DynamoDB `UpdateItem` operation only succeeds if the record's **groups** attribute contains at least one of the caller's claimed groups via `$ctx.identity.claims.get("cognito:groups")`.
- `Mutation.deleteX`: Update the condition expression so that the DynamoDB `DeleteItem` operation only succeeds if the record's **groups** attribute contains at least one of the caller's claimed groups via `$ctx.identity.claims.get("cognito:groups")`
- `Query.getX`: In the response mapping template verify that the result's **groups** attribute contains at least one of the caller's claimed groups via `$ctx.identity.claims.get("cognito:groups")`.
- `Query.listX`: In the response mapping template filter the result's **items** such that only items with a
**groups** attribute that contains at least one of the caller's claimed groups via `$ctx.identity.claims.get("cognito:groups")`.
- `@connection` resolver: In the response mapping template filter the result's **items** such that only items with a
**groups** attribute that contains at least one of the caller's claimed groups via `$ctx.identity.claims.get("cognito:groups")`. This is not enabled when using the `queries` argument.


## @function

The `@function` directive allows you to quickly & easily configure AWS Lambda resolvers within your AWS AppSync API.

### Definition

```graphql
directive @function(name: String!, region: String) on FIELD_DEFINITION
```

### Usage

The @function directive allows you to quickly connect lambda resolvers to an AppSync API. You may deploy the AWS Lambda functions via the Amplify CLI, AWS Lambda console, or any other tool. To connect an AWS Lambda resolver, add the `@function` directive to a field in your `schema.graphql`.

Let's assume you have deployed an *echo* function with the following contents:

```javascript
exports.handler =  async function(event, context){
  return event.arguments.msg;
};
```

**If you deployed your function using the 'amplify function' category**

The Amplify CLI provides support for maintaining multiple environments out of the box. When you deploy a function via `amplify add function`, it will automatically add the environment suffix to your Lambda function name. For example if you create a function named **echofunction** using `amplify add function` in the **dev** environment, the deployed function will be named **echofunction-dev**. The `@function` directive allows you to use `${env}` to reference the current Amplify CLI environment.

```
type Query {
  echo(msg: String): String @function(name: "echofunction-${env}")
}
```

**If you deployed your function without amplify**

If you deployed your API without amplify then you must provide the full Lambda function name. If you deployed the same function with the name **echofunction** then you would have:

```
type Query {
  echo(msg: String): String @function(name: "echofunction")
}
```

**Example: Return custom data and run custom logic**

You can use the `@function` directive to write custom business logic in an AWS Lambda function. To get started, use
`amplify add function`, the AWS Lambda console, or other tool to deploy an AWS Lambda function with the following contents.

For example purposes assume the function is named `GraphQLResolverFunction`:

```javascript
const POSTS = [
    { id: 1, title: "AWS Lambda: How To Guide." },
    { id: 2, title: "AWS Amplify Launches @function and @key directives." },
    { id: 3, title: "Serverless 101" }
];
const COMMENTS = [
    { postId: 1, content: "Great guide!" },
    { postId: 1, content: "Thanks for sharing!" },
    { postId: 2, content: "Can't wait to try them out!" }
];

// Get all posts. Write your own logic that reads from any data source.
function getPosts() {
    return POSTS;
}

// Get the comments for a single post.
function getCommentsForPost(postId) {
    return COMMENTS.filter(comment => comment.postId === postId);
}

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Query: {
    posts: ctx => {
      return getPosts();
    },
  },
  Post: {
    comments: ctx => {
      return getCommentsForPost(ctx.source.id);
    },
  },
}

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
```

**Example: Get the logged in user from Amazon Cognito User Pools**

When building applications, it is often useful to fetch information for the current user. You can use the `@function` directive to quickly add a resolver that uses AppSync identity information to fetch a user from Amazon Cognito User Pools. First make sure you have added Amazon Cognito User Pools enabled via `amplify add auth` and a GraphQL API via `amplify add api` to an amplify project. Once you have created the user pool, get the **UserPoolId** from **amplify-meta.json** in the **backend/** directory of your amplify project. You will provide this value as an environment variable in a moment. Next, using the Amplify function category, AWS console, or other tool, deploy a AWS Lambda function with the following contents.

For example purposes assume the function is named `GraphQLResolverFunction`:

```javascript
/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var authMyResourceNameUserPoolId = process.env.AUTH_MYRESOURCENAME_USERPOOLID

Amplify Params - DO NOT EDIT */

const { CognitoIdentityServiceProvider } = require('aws-sdk');
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

/**
 * Get user pool information from environment variables.
 */
const COGNITO_USERPOOL_ID = process.env.AUTH_MYRESOURCENAME_USERPOOLID;
if (!COGNITO_USERPOOL_ID) {
  throw new Error(`Function requires environment variable: 'COGNITO_USERPOOL_ID'`);
}
const COGNITO_USERNAME_CLAIM_KEY = 'cognito:username';

/**
 * Using this as the entry point, you can use a single function to handle many resolvers.
 */
const resolvers = {
  Query: {
    echo: ctx => {
      return ctx.arguments.msg;
    },
    me: async ctx => {
      var params = {
        UserPoolId: COGNITO_USERPOOL_ID, /* required */
        Username: ctx.identity.claims[COGNITO_USERNAME_CLAIM_KEY], /* required */
      };
      try {
        // Read more: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminGetUser-property
        return await cognitoIdentityServiceProvider.adminGetUser(params).promise();
      } catch (e) {
        throw new Error(`NOT FOUND`);
      }
    }
  },
}

// event
// {
//   "typeName": "Query", /* Filled dynamically based on @function usage location */
//   "fieldName": "me", /* Filled dynamically based on @function usage location */
//   "arguments": { /* GraphQL field arguments via $ctx.arguments */ },
//   "identity": { /* AppSync identity object via $ctx.identity */ },
//   "source": { /* The object returned by the parent resolver. E.G. if resolving field 'Post.comments', the source is the Post object. */ },
//   "request": { /* AppSync request object. Contains things like headers. */ },
//   "prev": { /* If using the built-in pipeline resolver support, this contains the object returned by the previous function. */ },
// }
exports.handler = async (event) => {
  const typeHandler = resolvers[event.typeName];
  if (typeHandler) {
    const resolver = typeHandler[event.fieldName];
    if (resolver) {
      return await resolver(event);
    }
  }
  throw new Error("Resolver not found.");
};
```

You can connect this function to your AppSync API deployed via Amplify using this schema:

```graphql
type Query {
    posts: [Post] @function(name: "GraphQLResolverFunction")
}
type Post {
    id: ID!
    title: String!
    comments: [Comment] @function(name: "GraphQLResolverFunction")
}
type Comment {
    postId: ID!
    content: String
}
```

This simple lambda function shows how you can write your own custom logic using a language of your choosing. Try enhancing the example with your own data and logic.

> When deploying the function, make sure your function has access to the auth resource. You can run the `amplify update function` command for the CLI to automatically supply an environment variable named `AUTH_<RESOURCE_NAME>_USERPOOLID` to the function and associate corresponding CRUD policies to the execution role of the function.

After deploying our function, you can connect it to AppSync by defining some types and using the @function directive. Add this to your schema, to connect the
`Query.echo` and `Query.me` resolvers to our new function.

```graphql
type Query {
  me: User @function(name: "ResolverFunction")
  echo(msg: String): String @function(name: "ResolverFunction")
}
# These types derived from https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/CognitoIdentityServiceProvider.html#adminGetUser-property
type User {
  Username: String!
  UserAttributes: [Value]
  UserCreateDate: String
  UserLastModifiedDate: String
  Enabled: Boolean
  UserStatus: UserStatus
  MFAOptions: [MFAOption]
  PreferredMfaSetting: String
  UserMFASettingList: String
}
type Value {
  Name: String!
  Value: String
}
type MFAOption {
  DeliveryMedium: String
  AttributeName: String
}
enum UserStatus {
  UNCONFIRMED
  CONFIRMED
  ARCHIVED
  COMPROMISED
  UNKNOWN
  RESET_REQUIRED
  FORCE_CHANGE_PASSWORD
}
```

Next run `amplify push` and wait as your project finishes deploying. To test that everything is working as expected run `amplify api console` to open the GraphiQL editor for your API. You are going to need to open the Amazon Cognito User Pools console to create a user if you do not yet have any. Once you have created a user go back to the AppSync console's query page and click "Login with User Pools". You can find the **ClientId** in **amplify-meta.json** under the key **AppClientIDWeb**. Paste that value into the modal and login using your username and password. You can now run this query:

```graphql
query {
  me {
    Username
    UserStatus
    UserCreateDate
    UserAttributes {
      Name
      Value
    }
    MFAOptions {
      AttributeName
      DeliveryMedium
    }
    Enabled
    PreferredMfaSetting
    UserMFASettingList
    UserLastModifiedDate
  }
}
```

which will return user information related to the current user directly from your user pool.

### Structure of the function event

When writing lambda functions that are connected via the `@function` directive, you can expect the following structure for the AWS Lambda event object.

| Key  | Description  |
|---|---|
| typeName  | The name of the parent object type of the field being resolver.  |
| fieldName  | The name of the field being resolved.  |
| arguments  | A map containing the arguments passed to the field being resolved.  |
| identity  | A map containing identity information for the request. Contains a nested key 'claims' that will contains the JWT claims if they exist. |
| source  | When resolving a nested field in a query, the source contains parent value at runtime. For example when resolving `Post.comments`, the source will be the Post object.  |
| request   | The AppSync request object. Contains header information.  |
| prev | When using pipeline resolvers, this contains the object returned by the previous function. You can return the previous value for auditing use cases. |

### Calling functions in different regions

By default, you expect the function to be in the same region as the amplify project. If you need to call a function in a different (or static) region, you can provide the **region** argument.

```graphql
type Query {
  echo(msg: String): String @function(name: "echofunction", region: "us-east-1")
}
```

Calling functions in different AWS accounts is not supported via the @function directive but is supported by AWS AppSync.

### Chaining functions

The @function directive supports AWS AppSync pipeline resolvers. That means, you can chain together multiple functions such that they are invoked in series when your field's resolver is invoked. To create a pipeline resolver that calls out to multiple AWS Lambda functions in series, use multiple `@function` directives on the field.

```graphql
type Mutation {
  doSomeWork(msg: String): String @function(name: "worker-function") @function(name: "audit-function")
}
```

In the example above when you run a mutation that calls the `Mutation.doSomeWork` field, the **worker-function** will be invoked first then the **audit-function** will be invoked with an event that contains the results of the **worker-function** under the **event.prev.result** key. The **audit-function** would need to return **event.prev.result** if you want the result of **worker-function** to be returned for the field. Under the hood, Amplify creates an `AppSync::FunctionConfiguration` for each unique instance of `@function` in a document and a pipeline resolver containing a pointer to a function for each `@function` on a given field.

#### Generates

The `@function` directive generates these resources as necessary:

1. An AWS IAM role that has permission to invoke the function as well as a trust policy with AWS AppSync.
2. An AWS AppSync data source that registers the new role and existing function with your AppSync API.
3. An AWS AppSync pipeline function that prepares the lambda event and invokes the new data source.
4. An AWS AppSync resolver that attaches to the GraphQL field and invokes the new pipeline functions.

## @connection

The `@connection` directive enables you to specify relationships between `@model` types. Currently, this supports one-to-one, one-to-many, and many-to-one relationships. You may implement many-to-many relationships using two one-to-many connections and a joining `@model` type. See the usage section for details.

[We also provide a fully working schema with 17 patterns related to relational designs](~/cli/graphql-transformer/dataaccess.md).

### Definition

```graphql
directive @connection(keyName: String, fields: [String!]) on FIELD_DEFINITION
```

### Usage

Relationships between types are specified by annotating fields on an `@model` object type with the `@connection` directive.

The `fields` argument can be provided and indicates which fields can be queried by to get connected objects. The `keyName` argument can optionally be used to specify the name of secondary index (an index that was set up using `@key`) that should be queried from the other type in the relationship.

When specifying a `keyName`, the `fields` argument should be provided to indicate which field(s) will be used to get connected objects. If `keyName` is not provided, then `@connection` queries the target table's primary index.

### Has one

In the simplest case, you can define a one-to-one connection where a project has one team:

```graphql
type Project @model {
  id: ID!
  name: String
  team: Team @connection
}

type Team @model {
  id: ID!
  name: String!
}
```

You can also define the field you would like to use for the connection by populating the first argument to the fields array and matching it to a field on the type:

```graphql
type Project @model {
  id: ID!
  name: String
  teamID: ID!
  team: Team @connection(fields: ["teamID"])
}

type Team @model {
  id: ID!
  name: String!
}
```

In this case, the Project type has a `teamID` field added as an identifier for the team that the project belongs to. `@connection` can then get the connected Team object by querying the Team table with this `teamID`.

After it's transformed, you can create projects and query the connected team as follows:

```graphql
mutation CreateProject {
    createProject(input: { name: "New Project", teamID: "a-team-id"}) {
        id
        name
        team {
            id
            name
        }
    }
}
```

> **Note** The **Project.team** resolver is configured to work with the defined connection. This is done with a query on the Team table where `teamID` is passed in as an argument.

A Has One @connection can only reference the primary index of a model (ie. it cannot specify a "keyName" as described below in the Has Many section).

### Has many

The following schema defines a Post that can have many comments:

```graphql
type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
}

type Comment @model
  @key(name: "byPost", fields: ["postID", "content"]) {
  id: ID!
  postID: ID!
  content: String!
}
```

Note how a one-to-many connection needs an `@key` that allows comments to be queried by the postID and the connection uses this key to get all comments whose postID is the id of the post was called on.
After it's transformed, you can create comments and query the connected Post as follows:

```graphql
mutation CreatePost {
  createPost(input: { id: "a-post-id", title: "Post Title" } ) {
    id
    title
  }
}

mutation CreateCommentOnPost {
  createComment(input: { id: "a-comment-id", content: "A comment", postID: "a-post-id"}) {
    id
    content
  }
}
```

And you can query a Post with its comments as follows:

```graphql
query getPost {
  getPost(id: "a-post-id") {
    id
    title
    comments {
      items {
        id
        content
      }
    }
  }
}
```

### Belongs to

You can make a connection bi-directional by adding a many-to-one connection to types that already have a one-to-many connection. In this case you add a connection from Comment to Post since each comment belongs to a post:

```graphql
type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(keyName: "byPost", fields: ["id"])
}

type Comment @model
  @key(name: "byPost", fields: ["postID", "content"]) {
  id: ID!
  postID: ID!
  content: String!
  post: Post @connection(fields: ["postID"])
}
```

After it's transformed, you can create comments with a post as follows:

```graphql
mutation CreatePost {
  createPost(input: { id: "a-post-id", title: "Post Title" } ) {
    id
    title
  }
}

mutation CreateCommentOnPost1 {
  createComment(input: { id: "a-comment-id-1", content: "A comment #1", postID: "a-post-id"}) {
    id
    content
  }
}

mutation CreateCommentOnPost2 {
  createComment(input: { id: "a-comment-id-2", content: "A comment #2", postID: "a-post-id"}) {
    id
    content
  }
}
```

And you can query a Comment with its Post, then all Comments of that Post by navigating the connection:

```graphql
query GetCommentWithPostAndComments {
  getComment( id: "a-comment-id-1" ) {
    id
    content
    post {
      id
      title
      comments {
        items {
          id
          content
        }
      }
    }
  }
}
```

### Many-to-many connections

You can implement many to many using two 1-M @connections, an @key, and a joining @model. For example:

```graphql
type Post @model {
  id: ID!
  title: String!
  editors: [PostEditor] @connection(keyName: "byPost", fields: ["id"])
}

# Create a join model and disable queries as you don't need them
# and can query through Post.editors and User.posts
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

This case is a bidirectional many-to-many which is why two `@key` calls are needed on the PostEditor model.
You can first create a Post and a User, and then add a connection between them with by creating a PostEditor object as follows:

```graphql
mutation CreateData {
    p1: createPost(input: { id: "P1", title: "Post 1" }) {
        id
    }
    p2: createPost(input: { id: "P2", title: "Post 2" }) {
        id
    }
    u1: createUser(input: { id: "U1", username: "user1" }) {
        id
    }
    u2: createUser(input: { id: "U2", username: "user2" }) {
        id
    }
}

mutation CreateLinks {
    p1u1: createPostEditor(input: { id: "P1U1", postID: "P1", editorID: "U1" }) {
        id
    }
    p1u2: createPostEditor(input: { id: "P1U2", postID: "P1", editorID: "U2" }) {
        id
    }
    p2u1: createPostEditor(input: { id: "P2U1", postID: "P2", editorID: "U1" }) {
        id
    }
}
```

Note that neither the User type nor the Post type have any identifiers of connected objects. The connection info is held entirely inside the PostEditor objects.

You can query a given user with their posts:

```graphql
query GetUserWithPosts {
    getUser(id: "U1") {
        id
        username
        posts {
            items {
                post {
                    title
                }
            }
        }
    }
}
```

Also you can query a given post with the editors of that post and can list the posts of those editors, all in a single query:

```graphql
query GetPostWithEditorsWithPosts {
    getPost(id: "P1") {
        id
        title
        editors {
            items {
                editor {
                    username
                    posts {
                        items {
                            post {
                                title
                            }
                        }
                    }
                }
            }
        }
    }
}
```

#### Alternative definition

The above definition is the recommended way to create relationships between model types in your API. This involves defining index structures using `@key` and connection resolvers using `@connection`. There is an older parameterization of `@connection` that creates indices and connection resolvers that is still functional for backwards compatibility reasons. It is recommended to use `@key` and the new `@connection` via the fields argument.

```
directive @connection(name: String, keyField: String, sortField: String, limit: Int) on FIELD_DEFINITION
```

This parameterization is not compatible with `@key`. See the parameterization above to use `@connection` with indexes created by @key.

### Limit

The default number of nested objects is 100. You can override this behavior by setting the **limit** argument. For example:

```graphql
type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(limit: 50)
}

type Comment @model {
  id: ID!
  content: String!
}
```

### Generates

In order to keep connection queries fast and efficient, the GraphQL transform
manages global secondary indexes (GSIs) on the generated tables on your behalf.
In the future you are investigating using adjacency lists along side GSIs for
different use cases that are connection heavy.

> **Note** After you have pushed a `@connection` directive you should not try to
change it. If you try to change it, the DynamoDB
UpdateTable operation will fail. Should you need to change a `@connection`, you should add a new
`@connection` that implements the new access pattern, update your application
to use the new `@connection`, and then delete the old `@connection` when it's no
longer needed.

## @versioned

The `@versioned` directive adds object versioning and conflict resolution to a type. Do not use this directive when leveraging DataStore as the conflict detection and resolution features are automatically handled inside AppSync and are incompatible with the `@versioned` directive.

### Definition

```graphql
directive @versioned(versionField: String = "version", versionInput: String = "expectedVersion") on OBJECT
```

### Usage

Add `@versioned` to a type that is also annotate with `@model` to enable object versioning and conflict detection for a type.

```graphql
type Post @model @versioned {
  id: ID!
  title: String!
  version: Int!   # <- If not provided, it is added for you.
}
```

**Creating a Post automatically sets the version to 1**

```graphql
mutation Create {
  createPost(input:{
    title:"Conflict detection in the cloud!"
  }) {
    id
    title
    version  # will be 1
  }
}
```

**Updating a Post requires passing the "expectedVersion" which is the object's last saved version**

> Note: When updating an object, the version number will automatically increment.

```graphql
mutation Update($postId: ID!) {
  updatePost(
    input:{
      id: $postId,
      title: "Conflict detection in the cloud is great!",
      expectedVersion: 1
    }
  ) {
    id
    title
    version # will be 2
  }
}
```

**Deleting a Post requires passing the "expectedVersion" which is the object's last saved version**

```graphql
mutation Delete($postId: ID!) {
  deletePost(
    input: {
      id: $postId,
      expectedVersion: 2
    }
  ) {
    id
    title
    version
  }
}
```

Update and delete operations will fail if the **expectedVersion** does not match the version
stored in DynamoDB. You may change the default name of the version field on the type as well as the name
of the input field via the **versionField** and **versionInput** arguments on the `@versioned` directive.

### Generates

The `@versioned` directive manipulates resolver mapping templates and will store a `version` field in versioned objects.

## @searchable

The `@searchable` directive handles streaming the data of an `@model` object type to Amazon Elasticsearch Service and configures search resolvers that search that information.

> **Note**: `@searchable` is not compatible with DataStore but you can use it with the API category.

> **Note**: `@searchable` is not compatible with Amazon ElasticSearch t2.micro instance as it only works with ElasticSearch version 1.5 and 2.3 and Amplify CLI only supports instances with ElasticSearch version >= 6.x.

> **Note**: Support for adding the `@searchable` directive does not yet provide automatic indexing for any existing data to Elasticsearch. View the feature request [here](https://github.com/aws-amplify/amplify-cli/issues/98).

> **Migration warning**: You might observe duplicate records on search operations, if you deployed your GraphQL schema using CLI version older than 4.14.1 and have thereafter updated your schema & deployed the changes with a CLI version between 4.14.1 - 4.16.1.
Please use this Python [script](https://github.com/aws-amplify/amplify-cli/blob/master/packages/graphql-elasticsearch-transformer/scripts/ddb_to_es.py) to remove the duplicate records from your Elasticsearch cluster. [This script](https://github.com/aws-amplify/amplify-cli/blob/master/packages/graphql-elasticsearch-transformer/scripts/ddb_to_es.py) indexes data from your DynamoDB Table to your Elasticsearch Cluster. View an example of how to call the script with the following parameters [here](https://aws-amplify.github.io/docs/cli-toolchain/graphql#example-of-calling-the-script).

### Definition

```graphql
# Streams data from DynamoDB to Elasticsearch and exposes search capabilities.
directive @searchable(queries: SearchableQueryMap) on OBJECT
input SearchableQueryMap { search: String }
```

### Usage

Given the following schema an index is created for Post, if there are more types with `@searchable` the directive will create an index for it, and those posts in Amazon DynamoDB are automatically streamed to the post index in Amazon ElasticSearch via AWS Lambda and connect a searchQueryField resolver.

```graphql
type Post @model @searchable {
  id: ID!
  title: String!
  createdAt: String!
  updatedAt: String!
  upvotes: Int
}
```

You may then create objects in DynamoDB that will be automatically streamed to lambda
using the normal `createPost` mutation.

```graphql
mutation CreatePost {
  createPost(input: { title: "Stream me to Elasticsearch!" }) {
    id
    title
    createdAt
    updatedAt
    upvotes
  }
}
```

And then search for posts using a `match` query:

```graphql
query SearchPosts {
  searchPosts(filter: { title: { match: "Stream" }}) {
    items {
      id
      title
    }
  }
}
```

There are multiple `SearchableTypes` generated in the schema, based on the datatype of the fields you specify in the Post type.

The `filter` parameter in the search query has a searchable type field that corresponds to the field listed in the Post type. For example, the `title` field of the `filter` object, has the following properties (containing the operators that are applicable to the `string` type):

* `eq` - which uses the Elasticsearch keyword type to match for the exact term.
* `ne` - this is the inverse operation of `eq`.
* `matchPhrase` - searches using the Elasticsearch's [Match Phrase Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-match-query-phrase.html) to filter the documents in the search query.
* `matchPhrasePrefix` - This uses the Elasticsearch's [Match Phrase Prefix Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-match-query-phrase-prefix.html) to filter the documents in the search query.
* `multiMatch` - Corresponds to the Elasticsearch [Multi Match Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-multi-match-query.html).
* `exists` - Corresponds to the Elasticsearch [Exists Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-exists-query.html).
* `wildcard` - Corresponds to the Elasticsearch [Wildcard Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-wildcard-query.html).
* `regexp` - Corresponds to the Elasticsearch [Regexp Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-regexp-query.html).

The `sort` parameter can be used to specify the order of the search results, can be ascending (`asc`) or descending (`desc`), if not specified ascending order is used.

The `limit` parameter controls the number of search results returned. If not specified the default value is 100.

For example, you can filter using the wildcard expression to search for posts using the following `wildcard` query:

```graphql
query SearchPosts {
  searchPost(filter: { title: { wildcard: "S*Elasticsearch!" }}) {
    items {
      id
      title
    }
  }
}
```

The above query returns all documents whose `title` begins with `S` and ends with `Elasticsearch!`.

Moreover you can use the `filter` parameter to pass a nested `and`/`or`/`not` condition. By default, every operation in the filter properties is *AND* ed. You can use the `or` or `not` properties in the `filter` parameter of the search query to override this behavior. Each of these operators (`and`, `or`, `not` properties in the filter object) accepts an array of searchable types which are in turn joined by the corresponding operator. For example, consider the following search query:

```graphql
query SearchPosts {
  searchPost(filter: {
    title: { wildcard: "S*" }
    or: [
      { createdAt: { eq: "08/20/2018" } },
      { updatedAt: { eq: "08/20/2018" } }
    ]
  }) {
    items {
      id
      title
    }
  }
}
```

Assuming you used the `createPost` mutation to create new posts with `title`, `createdAt` and `updatedAt` values, the above search query will return you a list of all `Posts`, whose `title` starts with `S` _and_ have `createdAt` _or_ `updatedAt` value as `08/20/2018`.

Here is a complete list of searchable operations per GraphQL type supported as of today:

| GraphQL Type        | Searchable Operation           |
|-------------:|:-------------|
| String      | `ne`, `eq`, `match`, `matchPhrase`, `matchPhrasePrefix`, `multiMatch`, `exists`, `wildcard`, `regexp` |
| Int     | `ne`, `gt`, `lt`, `gte`, `lte`, `eq`, `range`      |
| Float | `ne`, `gt`, `lt`, `gte`, `lte`, `eq`, `range`      |
| Boolean | `eq`, `ne`      |

### Backfill your Elasticsearch index from your DynamoDB table

The following Python [script](https://github.com/aws-amplify/amplify-cli/blob/master/packages/graphql-elasticsearch-transformer/scripts/ddb_to_es.py) creates an event stream of your DynamoDB records and sends them to your Elasticsearch Index. This will help you backfill your data should you choose to add `@searchable` to your @model types at a later time.

**Example of calling the script**:

```bash
python3 ddb_to_ess.py \
  --rn 'us-west-2' \ # Use the region in which your table and elasticsearch domain reside
  --tn 'Post-XXXX-dev' \ # Table name
  --lf 'arn:aws:lambda:us-west-2:123456789xxx:function:DdbToEsFn-<api__id>-dev' \ # Lambda function ARN
  --esarn 'arn:aws:dynamodb:us-west-2:123456789xxx:table/Post-<api__id>-dev/stream/2019-20-03T00:00:00.350' # Event source ARN
```

## @predictions

The `@predictions` directive allows you to query an orchestration of AI/ML services such as Amazon Rekognition, Amazon Translate, and/or Amazon Polly.

> Note: Support for adding the `@predictions` directive uses the s3 storage bucket which is configured via the CLI. At the moment this directive works only with objects located within `public/`.

### Definition

The supported actions in this directive are included in the definition.

```graphql
  directive @predictions(actions: [PredictionsActions!]!) on FIELD_DEFINITION
  enum PredictionsActions {
    identifyText # uses Amazon Rekognition to detect text
    identifyLabels # uses Amazon Rekognition to detect labels
    convertTextToSpeech # uses Amazon Polly in a lambda to output a presigned url to synthesized speech
    translateText # uses Amazon Translate to translate text from source to target language
  }
```

### Usage


Given the following schema a query operation is defined which will do the following with the provided image.

- Identify text from the image
- Translate the text from that image
- Synthesize speech from the translated text.

```graphql
type Query {
  speakTranslatedImageText: String @predictions(actions: [
    identifyText
    translateText
    convertTextToSpeech
  ])
}
```

An example of that query will look like:

```graphql
query SpeakTranslatedImageText($input: SpeakTranslatedImageTextInput!) {
  speakTranslatedImageText(input: {
    identifyText: {
      key: "myimage.jpg"
    }
    translateText: {
      sourceLanguage: "en"
      targetLanguage: "es"
    }
    convertTextToSpeech: {
      voiceID: "Conchita"
    }
  })
}
```

A code example of this using the JS Library:
```js
import React, { useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';
import Amplify, { Storage } from 'aws-amplify';
import awsconfig from './aws-exports';
import { speakTranslatedImageText } from './graphql/queries';

/* Configure Exports */
Amplify.configure(awsconfig);

function SpeakTranslatedImage() {
  const [ src, setSrc ] = useState("");
  const [ img, setImg ] = useState("");

  function putS3Image(event) {
    const file = event.target.files[0];
    Storage.put(file.name, file)
    .then (async (result) => {
      setSrc(await speakTranslatedImageTextOP(result.key))
      setImg(await Storage.get(result.key));
    })
    .catch(err => console.log(err));
  }

  return (
    <div className="Text">
      <div>
        <h3>Upload Image</h3>
        <input
              type = "file" accept='image/jpeg'
              onChange = {(event) => {
                putS3Image(event)
              }}
          />
        <br />
        { img && <img src = {img}></img>}
        { src &&
          <div> <audio id="audioPlayback" controls>
              <source id="audioSource" type="audio/mp3" src = {src}/>
          </audio> </div>
        }
      </div>
    </div>
  );
}

async function speakTranslatedImageTextOP(key) {
  const inputObj = {
    translateText: {
      sourceLanguage: "en", targetLanguage: "es" },
    identifyText: { key },
    convertTextToSpeech: { voiceID: "Conchita" }
  };
  const response = await API.graphql(
    graphqlOperation(speakTranslatedImageText, { input: inputObj }));
  return response.data.speakTranslatedImageText;
}
function App() {
  return (
    <div className="App">
        <h1>Speak Translated Image</h1>
        < SpeakTranslatedImage />
    </div>
  );
}
export default App;
```

### How it works
From example schema above, `@predictions` will create resources to communicate with Amazon Rekognition, Translate and Polly.
For each action the following is created:

- IAM Policy for each service (e.g. Amazon Rekognition `detectText` Policy)
- An AppSync VTL function
- An AppSync DataSource

Finally a resolver is created for `speakTranslatedImageText` which is a pipeline resolver composed of AppSync functions which are defined by the action list provided in the directive.

### Actions
Each of the actions described in the @predictions definition section can be used individually, as well as in a sequence. Sequence of actions supported today are as follows:

- `identifyText -> translateText -> convertTextToSpeech`
- `identifyLabels -> translateText -> convertTextToSpeech`
- `translateText -> convertTextToSpeech`


### Action resources
- [`translateText` Supported Language Codes](https://docs.aws.amazon.com/translate/latest/dg/what-is.html#what-is-languages)
- [`convertTextToSpeech` Supported Voice IDs](https://docs.aws.amazon.com/polly/latest/dg/voicelist.html)

## @http

The `@http` directive allows you to quickly configure HTTP resolvers within your AWS AppSync API.

### Definition

```graphql
directive @http(method: HttpMethod, url: String!, headers: [HttpHeader]) on FIELD_DEFINITION
enum HttpMethod { PUT POST GET DELETE PATCH }
input HttpHeader {
  key: String
  value: String
}
```

### Usage

The `@http` directive allows you to quickly connect HTTP or HTTPS endpoint to an AppSync API by creating an AWS AppSync HTTP resolver. To connect to an endpoint, add the `@http` directive to a field in your `schema.graphql` file. The directive allows you to define URL path parameters, and specify a query string and/or specify a request body. For example, given the definition of a post type,

```graphql
type Post {
  id: ID!
  title: String
  description: String
  views: Int
}

type Query {
  listPosts: Post @http(url: "https://www.example.com/posts")
}
```

Amplify generates the definition below that sends a request to the url when the `listPosts` query is used.

```graphql
type Query {
  listPosts: Post
}
```

**Request Headers**

The `@http` directive generates resolvers that can handle xml and json responses. If an HTTP method is not defined, `GET` is used by default. You can specify a list of static headers to be passed with the HTTP requests to your backend in your directive definition.

```graphql
type Query {
  listPosts: Post
    @http(
      url: "https://www.example.com/posts"
      headers: [{ key: "X-Header", value: "X-Header-Value" }]
    )
}
```

**Path Parameters**

You can create dynamic paths by specifying parameters in the directive URL by using the special `:<parameter>` notation. Your set of parameters can then be specified in the `params` input object of the query. Note that path parameters are not added to the request body or query string. You can define multiple parameters.

Given the definition

```graphql
type Query {
  getPost: Post @http(url: "https://www.example.com/posts/:id")
}
```

Amplify generates

```graphql
type Query {
  getPost(params: QueryGetPostParamsInput!): Post
}

input QueryGetPostParamsInput {
  id: String!
}
```

You can fetch a specific post by enclosing the `id` in the `params` input object.

```graphql
query post {
  getPost(params: {id: "POST_ID"}) {
    id
    title
  }
}
```

which will send

```
GET /posts/POST_ID
Host: www.example.com
```

**Query String**

You can send a query string with your request by specifying variables for your query. The query string is supported with all request methods.

Given the definition

```graphql
type Query {
  listPosts(sort: String!, from: String!, limit: Int!): Post
    @http(url: "https://www.example.com/posts")
}
```

Amplify generates

```graphql
type Query {
  listPosts(query: QueryListPostsQueryInput!): Post
}

input QueryListPostsQueryInput {
  sort: String!
  from: String!
  limit: Int!
}
```

You can query for posts using the `query` input object

```graphql
query posts{
  listPosts(query: {sort: "DESC", from: "last-week", limit: 5}) {
    id
    title
    description
  }
}
```

which sends the following request:

```
GET /posts?sort=DESC&from=last-week&limit=5
Host: www.example.com
```

**Request Body**

The `@http` directive also allows you to specify the body of a request, which is used for `POST`, `PUT`, and `PATCH` requests. To create a new post, you can define the following.

```graphql
type Mutation {
  addPost(title: String!, description: String!, views: Int): Post
    @http(method: POST, url: "https://www.example.com/post")
}
```

Amplify generates the `addPost` query field with the `query` and `body` input objects since this type of request also supports a query string. The generated resolver verifies that non-null arguments (e.g.: the `title` and `description`) are passed in at least one of the input objects; if not, an error is returned.

```graphql
type Mutation {
  addPost(query: QueryAddPostQueryInput, body: QueryAddPostBodyInput): Post
}

input QueryAddPostQueryInput {
  title: String
  description: String
  views: Int
}

input QueryAddPostBodyInput {
  title: String
  description: String
  views: Int
}
```

You can add a post by using the `body` input object:

```graphql
mutation add {
  addPost(body: {title: "new post", description: "fresh content"}) {
    id
  }
}
```

which will send

```
POST /post
Host: www.example.com
{
  title: "new post"
  description: "fresh content"
}
```

**Specifying the environment**

The `@http` directive allows you to use `${env}` to reference the current Amplify CLI environment.

```graphql
type Query {
  listPosts: Post @http(
    url: "https://www.example.com/${env}/posts"
  )
}
```

which, in the `DEV` environment, will send

```
GET /DEV/posts
Host: www.example.com
```

**Combining the different components**

You can use a combination of parameters, query, body, headers, and environments in your `@http` directive definition.

Given the definition

```graphql
type Post {
  id: ID!
  title: String
  description: String
  views: Int
  comments: [Comment]
}

type Comment {
  id: ID!
  content: String
}

type Mutation {
  updatePost(
    title: String!
    description: String!
    views: Int
    withComments: Boolean
  ): Post
    @http(
      method: PUT
      url: "https://www.example.com/${env}/posts/:id"
      headers: [{ key: "X-Header", value: "X-Header-Value" }]
    )
}
```

you can update a post with

```graphql
mutation update {
  updatePost(
    body: {title: "new title", description: "updated description", views: 100}
    params: {id: "EXISTING_ID"}
    query: {withComments: true}) {
    id
    title
    description
    comments {
      id
      content
    }
  }
}
```

which, in the `DEV` environment, will send

```
PUT /DEV/posts/EXISTING_ID?withComments=true
Host: www.example.com
X-Header: X-Header-Value
{
  title: "new title"
  description: "updated description"
  views: 100
}
```

**Advanced cases**

In some cases, you may want to send a request based on existing field data. Take a scenario where you have a post and want to fetch comments associated with the post in a single query. Let's use the previous definition of `Post` and `Comment`.


```graphql
type Post {
  id: ID!
  title: String
  description: String
  views: Int
  comments: [Comment]
}

type Comment {
  id: ID!
  content: String
}
```

A post can be fetched at `/posts/:id` and a post's comments at `/posts/:id/comments`. You can fetch the comments based on the post id with the following updated definition. `$ctx.source` is a map that contains the resolution of the parent field (`Post`) and gives access to `id`.


```graphql
type Post {
  id: ID!
  title: String
  description: String
  views: Int
  comments: [Comment]
    @http(url: "https://www.example.com/posts/${ctx.source.id}/comments")
}

type Comment {
  id: ID!
  content: String
}

type Query {
  getPost: Post @http(url: "https://www.example.com/posts/:id")
}
```

You can retrieve the comments of a specific post with the following query and selection set.

```graphql
query post {
  getPost(params: {id: "POST_ID"}) {
    id
    title
    description
    comments {
      id
      content
    }
  }
}
```

Assuming that `getPost` retrieves a post with the id `POST_ID`, the comments field is resolved by sending this request to the endpoint

```
GET /posts/POST_ID/comments
Host: www.example.com
```

Note that there is no check to ensure that the reference variable (here the post ID) exists. When using this technique, it is recommended to make sure the referenced field is non-null.

### Generates

The `@http` transformer will create one HTTP datasource for each identified base URL. For example, if multiple HTTP resolvers are created that interact with the "https://www.example.com" endpoint, only a single datasource is created. Each directive generates one resolver. Depending on the definition, the appropriate `body`, `params`, and `query` input types are created. Note that `@http` transformer does not support calling other AWS services where Signature Version 4 signing process is required.

