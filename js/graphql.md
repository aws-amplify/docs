---
---
# The GraphQL Transform

The GraphQL Transform is a library that simplifies the process of developing, deploying, and maintaining GraphQL APIs. With it, you define your API using the GraphQL Schema Definition Language (SDL) and can then use this library where to transform it into a fully descriptive cloudformation template that implements the API's data model.

The Transform can be run as an independent library, however it is integrated into the Amplify CLI via the `API` category for you to use immediately.

## Quick Start

Navigate into the root of a JavaScript, iOS, or Android project and run:

```bash
amplify init
```

Follow the wizard to create a new app. After finishing the wizard run:

```bash
amplify add api

# Select the graphql option and when asked if you 
# have a schema, say No.
# Select one of the default samples. You can change it later.
# Choose to edit the schema and it will open your schema.graphql in your editor.
```

You can leave the sample as is or try this schema.

```
type Blog @model {
  id: ID!
  name: String!
  posts: [Post] @connection(name: "BlogPosts")
}
type Post @model {
  id: ID!
  title: String!
  blog: Blog @connection(name: "BlogPosts")
  comments: [Comment] @connection(name: "PostComments")
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

Once you are happy with your schema, save the file and click enter in your
terminal window. If now error messages are thrown then you are good to go
and can deploy your new API.

```bash
amplify push
```

Go to AWS CloudFormation to view it. You can also find your project assets in the amplify/backend folder under your API.

Once the API is finsihed deploying, try going to the AWS AppSync console and
running some of these queries in your new API's query page.

```
# Create a blog. Remember the returned id.
# Provide the returned id as the "blogId" variable.
mutation CreateBlog {
  createBlog(input: {
    name: "My New Blog!"
  }) {
    id
    name
  }
}

# Create a post and associate it with the blog via the "postBlogId" input field.
# Provide the returned id as the "postId" variable.
mutation CreatePost($blogId:ID!) {
  createPost(input:{title:"My Post!", postBlogId: $blogId}) {
    id
    title
    blog {
      id
      name
    }
  }
}

# Create a comment and associate it with the post via the "commentPostId" input field.
mutation CreateComment($postId:ID!) {
  createComment(input:{content:"A comment!", commentPostId:$postId}) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
    }
  }
}

# Get a blog, its posts, and its posts comments.
query GetBlog($blogId:ID!) {
  getBlog(id:$blogId) {
    id
    name
    posts(filter: {
      title: {
        eq: "My Post!"
      }
    }) {
      items {
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
}

# List all blogs, their posts, and their posts comments.
query ListBlogs {
  listBlogs { # Try adding: listBlog(filter: { name: { eq: "My New Blog!" } })
    items {
      id
      name
      posts { # or try adding: posts(filter: { title: { eq: "My Post!" } })
        items {
          id
          title
          comments { # and so on ...
            items {
              id
              content
            }
          }
        }
      }
    }
  }
}
```

If you want to update your API, open your project's `backend/api/~apiname~/schema.graphql` file (NOT the one in the `backend/api/~apiname~/build` folder) and edit it in your favorite code editor. You can compile the `backend/api/~apiname~/schema.graphql` by running:

```
amplify api gql-compile
```

and view the compiled schema output in `backend/api/~apiname~/build/schema.graphql`.

You can then push updated changes with:

```
amplify push
```

## Directives

### @model

Object types that are annotated with `@model` are top-level entities in the
generated API. Objects annotated with `@model` are stored in DynamoDB and are
capable of being protected via `@auth`, related to other objects via `@connection`,
and streamed into Elasticsearch via `@searchable`.

#### Definition

```
directive @model(
    queries: ModelQueryMap, 
    mutations: ModelMutationMap
) on OBJECT
input ModelMutationMap { create: String, update: String, delete: String }
input ModelQueryMap { get: String, list: String }
```

#### Usage

Define a GraphQL object type and annotate it with the `@model` directive to store
objects of that type in DynamoDB and automatically configure CRUDL queries and
mutations.

```
type Post @model {
    id: ID! # id: ID! is a required attribute.
    title: String!
    tags: [String!]!
}
```

You may also override the names of any generated queries and mutations, or remove operations entirely.

```
type Post @model(queries: { get: "post" }, mutations: null) {
    id: ID!
    title: String!
    tags: [String!]!
}
```

This would create and configure a single query field `post(id: ID!): Post` and
no mutation fields.

#### Generates

A single `@model` directive configures the following AWS resources:

- An Amazon DynamoDB table with 5 r/w units. Support for auto-scaling and encryption at rest coming soon.
- An AWS AppSync DataSource configured to access the table above.
- An AWS IAM role attached to the DataSource that allows AWS AppSync to call the above table on your behalf.
- Up to 8 resolvers (create, update, delete, get, list, onCreate, onUpdate, onDelete) but this is configurable via the `query`, `mutation`, and `subscription` arguments on the `@model` directive.

This input schema document

```
type Post @model {
    id: ID!
    title: String
}
type MetaData {
    category: Category
}
enum Category { comedy news }
```

would generate the following schema parts

```
type Post {
  id: ID!
  title: String!
  metadata: MetaData
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

### @auth

Object types that are annotated with `@auth` are protected by one of the
supported authorization strategies. Types that are annotated with `@auth`
must also be annotated with `@model`. Currently, Amazon Cognito user pools
is the only supported authorization mode.

#### Definition

```
# When applied to a type, augments the application with
# owner and group-based authorization rules.
directive @auth(rules: [AuthRule!]!) on OBJECT
input AuthRule {
    allow: AuthStrategy!
    ownerField: String # defaults to "owner"
    identityField: String # defaults to "username"
    groupsField: String
    groups: [String]
    queries: [ModelQuery]
    mutations: [ModelMutation]
}
enum AuthStrategy { owner groups }
enum ModelQuery { get list }
enum ModelMutation { create update delete }
```

#### Usage

**Owner Authorization**

```
# The simplest case
type Post @model @auth(rules: [{allow: owner}]) {
  id: ID!
  title: String!
}

# The long form way
type Post 
  @model 
  @auth(
    rules: [
      {allow: owner, ownerField: "owner", mutations: [create, update, delete], queries: [get, list]}
    ]) 
{
  id: ID!
  title: String!
  owner: String
}
```

Owner authorization specifies that a user (and soon to be set of users) can access an object. To
do so, each object has an *ownerField* (by default "owner") that stores ownership information
and is verified in various ways during resolver execution.

You can use the *queries* and *mutations* arguments to specify which operations are augmented as follows:

**get**: If the record's owner is not the same as the logged in user (via `$ctx.identity.username`), throw `$util.unauthorized()`.
**list**: Filter `$ctx.result.items` for owned items.
**create**: Inject the logged in user's `$ctx.identity.username` as the *ownerField* automatically.
**update**: Add conditional update that checks the stored *ownerField* is the same as `$ctx.identity.username`.
**delete**: Add conditional update that checks the stored *ownerField* is the same as `$ctx.identity.username`.

**Multi Owner Authorization (Coming Soon)**

In the future, we will support multiple owners:

```
type Post @model @auth(rules: [{allow: owner, ownerField: "owners"}]) {
  id: ID!
  title: String!
  owners: [String]
}
```

**Static Group Authorization**

```
# Static group auth
type Post @model @auth(rules: [{allow: groups, groups: ["Admin"]}]) {
  id: ID!
  title: String
}
```

If the user credential (as specified by the resolver's `$ctx.identity`) is not
enrolled in the *Admin* group, throw an unauthorized error using `$util.unauthorized()`.

**Dynamic Group Auth**

```
# Dynamic group authorization with multiple groups
type Post @model @auth(rules: [{allow: groups, groupsField: "groups"}]) {
  id: ID!
  title: String
  groups: [String]
}

# Dynamic group authorization with a single group
type Post @model @auth(rules: [{allow: groups, groupsField: "group"}]) {
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

#### Generates

The `@auth` directive will add authorization snippets to any relevant resolver 
mapping templates at compile time. Different operations use different methods
of authorization.

**Owner Authorization**

```
type Post @model @auth(rules: [{allow: owner}]) {
  id: ID!
  title: String!
}
```

the generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and automatically set the **owner** attribute to equal `$ctx.identity.username`.
- `Mutation.updateX`: Update the condition expression so that the DynamoDB `UpdateItem` operation only succeeds if the record's **owner** attribute equals the caller's `$ctx.identity.username`.
- `Mutation.deleteX`: Update the condition expression so that the DynamoDB `DeleteItem` operation only succeeds if the record's **owner** attribute equals the caller's `$ctx.identity.username`.
- `Query.getX`: In the response mapping template verify that the result's **owner** attribute is the same as the `$ctx.identity.username`. If it is not return null.
- `Query.listX`: In the response mapping template filter the result's **items** such that only items with an **owner** attribute that is the same as the `$ctx.identity.username` are returned.

**Multie Owner Authorization**

Work in progress.

**Static Group Authorization**

```
type Post @model @auth(rules: [{allow: groups, groups: ["Admin"]}]) {
  id: ID!
  title: String!
  groups: String 
}
```

Static group auth is simpler than the others. The generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and that `ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail`.
- `Mutation.updateX`: Verify the requesting user has a valid credential and that `ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Mutation.deleteX`: Verify the requesting user has a valid credential and that `ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Query.getX`: Verify the requesting user has a valid credential and that `ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Query.listX`: Verify the requesting user has a valid credential and that `ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.

**Dynamic Group Authorization**

```
type Post @model @auth(rules: [{allow: groups, groupsField: "groups"}]) {
  id: ID!
  title: String!
  groups: String 
}
```

the generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and that it contains a claim to atleast one group passed to the query in the `$ctx.args.input.groups` argument.
- `Mutation.updateX`: Update the condition expression so that the DynamoDB `UpdateItem` operation only succeeds if the record's **groups** attribute contains at least one of the caller's claimed groups via `ctx.identity.claims.get("cognito:groups")`.
- `Mutation.deleteX`: Update the condition expression so that the DynamoDB `DeleteItem` operation only succeeds if the record's **groups** attribute contains at least one of the caller's claimed groups via `ctx.identity.claims.get("cognito:groups")`
- `Query.getX`: In the response mapping template verify that the result's **groups** attribute contains at least one of the caller's claimed groups via `ctx.identity.claims.get("cognito:groups")`.
- `Query.listX`: In the response mapping template filter the result's **items** such that only items with a **groups** attribute that contains at least one of the caller's claimed groups via `ctx.identity.claims.get("cognito:groups")`.


### @connection

The `@connection` directive enables you to specify relationships between `@model` object types.
Currently, this supports one-to-one, one-to-many, and many-to-one relationships. An error
is thrown if you try to configure a many-to-many relationship.

#### Definition

```
directive @connection(name: String) on FIELD_DEFINITION
```

#### Usage

Relationships are specified by annotating fields on an `@model` object type with
the `@connection` directive. 

**Unnamed Connections**

In the simplest case, you can define a one-to-one connection:

```
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

After it's transformed, you can create projects with a team as follows:

```
mutation CreateProject {
    createProject(input: { name: "New Project", projectTeamId: "a-team-id"}) {
        id
        name
        team {
            id
            name
        }
    }
}
```

> **Note** The **Project.team** resolver is preconfigured to work with the defined connection.

Likewise, you can make a simple one-to-many connection as follows:

```
type Post {
    id: ID!
    title: String!
    comments: [Comment] @connection
}
type Comment {
    id: ID!
    content: String!
}
```

After it's transformed, you can create comments with a post as follows:

```
mutation CreateCommentOnPost {
    createComment(input: { content: "A comment", postCommentsId: "a-post-id"}) {
        id
        content
    }
}
```

> **Note** The postCommentsId field on the input may seem unusual. In the one-to-many case without a provided `name` argument there is only partial information to work with, which results in the unusual name. To fix this, provide a value for the @connection's *name* argument and complete the bi-directional relationship by adding a corresponding @connection field to the **Comment** type.

**Named Connections**

The **name** argument specifies a name for the
connection and it's used to create bi-directional relationships that reference
the same underlying foreign key. 

For example, if you wanted your `Post.comments`
and `Comment.post` fields to refer to opposite sides of the same relationship,
you need to provide a name.

```
type Post {
    id: ID!
    title: String!
    comments: [Comment] @connection(name: "PostComments")
}
type Comment {
    id: ID!
    content: String!
    post: Post @connection(name: "PostComments")
}
```

After it's transformed, create comments with a post as follows:

```
mutation CreateCommentOnPost {
    createComment(input: { content: "A comment", commentPostId: "a-post-id"}) {
        id
        content
        post {
            id
            title
            comments {
                id
                # and so on...
            }
        }
    }
}
```

#### Generates

In order to keep connection queries fast and efficient, the GraphQL transform manages
global secondary indexes (GSIs) on the generated tables on your behalf. In the future we
are investigating using adjacency lists along side GSIs for different use cases that are
connection heavy.

TODO: Finish docs


### @versioned

The `@versioned` directive adds object versioning and conflict resolution to a type.

#### Definition

```
directive @versioned(versionField: String = "version", versionInput: String = "expectedVersion") on OBJECT
```

#### Usage

Annotate a `@model` type with the `@versioned` directive to add object versioning and conflict detection to a type.

```
type Post @model @versioned {
  id: ID!
  title: String!
  version: Int!   # <- If not provided, it is added for you.
}
```

**Creating a Post automatically sets the version to 1**

```
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

```
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

```
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

#### Generates

The `@versioned` directive manipulates resolver mapping templates and will store a `version` field in versioned objects.

### @searchable

The `@searchable` directive handles streaming the data of an `@model` object type to
Amazon Elasticsearch Service and configures search resolvers that search that information.

> Note: Support for adding the `@searchable` directive does not yet provide automatic indexing for any existing data to Elasticsearch. View the feature request [here](https://github.com/aws-amplify/amplify-cli/issues/98).

#### Definition

```
# Streams data from DynamoDB to Elasticsearch and exposes search capabilities.
directive @searchable(queries: SearchableQueryMap) on OBJECT
input SearchableQueryMap { search: String }
```

#### Usage

Store posts in DynamoDB and automatically stream them to ElasticSearch
via lambda and connect a searchQueryField resolver.

```
type Post @model @searchable {
  id: ID!
  title: String!
  createdAt: String!
  updatedAt: String!
  upvotes: Int
}
```

You may then create objects in DynamoDB that will automatically streamed to lambda
using the normal `createPost` mutation.

```
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

```
query SearchPosts {
  searchPost(filter: { title: { match: "Stream" }}) {
    items {
      id
      title
    }
  }
}
```

There are multiple `SearchableTypes` generated in the schema, based on the datatype of the fields you specify in the Post type.

The `filter` parameter in the search queery has a searchable type field that corresponds to the field listed in the Post type. For example, the `title` field of the `filter` object, has the following properties (containing the operators that are applicable to the `string` type):

* `eq` - which uses the Elasticsearch keyword type to match for the exact term.
* `ne` - this is an iverse operation of `eq`.
* `matchPhrase` - searches using the Elasticsearch's [Match Phrase Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-match-query-phrase.html) to filter the documents in the search query.
* `matchPhrasePrefix` - This uses the Elasticsearch's [Match Phrase Prefix Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-match-query-phrase-prefix.html) to filter the documents in the search query.
* `multiMatch` - Corresponds to the Elasticsearch [Multi Match Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-multi-match-query.html).
* `exists` - Corresponds to the Elasticsearch [Exists Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-exists-query.html).
* `wildcard` - Corresponds to the Elasticsearch [Wildcard Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-wildcard-query.html).
* `regexp` - Corresponds to the Elasticsearch [Regexp Query](https://www.elastic.co/guide/en/elasticsearch/reference/6.2/query-dsl-regexp-query.html).


For example, you can filter using the wildcard expression to search for posts using the following `wildcard` query:

```
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

Moreover you can use the `filter` parameter to pass a nested `and`/`or`/`not` conditions. By default, every operation in the filter properties is *AND* ed. You can use the `or` or `not` properties in the `filter` parameter of the search query to override this behavior. Each of these operators (`and`, `or`, `not` properties in the filter object) accepts an array of SearchableTypes which are in turn joined by the corresponding operator. For example, consider the following search query:

```
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

Assuming, you used the `createPost` mutation to create new posts with `title`, `createdAt` and `updatedAt` values, the above search query will return you a list of all `Posts`, whose `title` starts with `S` _and_ have `createdAt` _or_ `updatedAt` value as `08/20/2018`.

Here is a complete list of searchable operations per GraphQL type supported as of today:

| GraphQL Type        | Searchable Operation           |
|-------------:|:-------------|
| String      | `ne`, `eq`, `match`, `matchPhrase`, `matchPhrasePrefix`, `multiMatch`, `exists`, `wildcard`, `regexp` |
| Int     | `ne`, `gt`, `lt`, `gte`, `lte`, `eq`, `range`      |
| Float | `ne`, `gt`, `lt`, `gte`, `lte`, `eq`, `range`      |
| Boolean | `eq`, `ne`      |

#### Generates

Todo: What does searchable generate.

## Examples

### Simple Todo

```
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

### Blog

```
type Blog @model {
  id: ID!
  name: String!
  posts: [Post] @connection(name: "BlogPosts")
}
type Post @model {
  id: ID!
  title: String!
  blog: Blog @connection(name: "BlogPosts")
  comments: [Comment] @connection(name: "PostComments")
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

#### Blog Queries

```
# Create a blog. Remember the returned id.
# Provide the returned id as the "blogId" variable.
mutation CreateBlog {
  createBlog(input: {
    name: "My New Blog!"
  }) {
    id
    name
  }
}

# Create a post and associate it with the blog via the "postBlogId" input field.
# Provide the returned id as the "postId" variable.
mutation CreatePost($blogId:ID!) {
  createPost(input:{title:"My Post!", postBlogId: $blogId}) {
    id
    title
    blog {
      id
      name
    }
  }
}

# Create a comment and associate it with the post via the "commentPostId" input field.
mutation CreateComment($postId:ID!) {
  createComment(input:{content:"A comment!", commentPostId:$postId}) {
    id
    content
    post {
      id
      title
      blog {
        id
        name
      }
    }
  }
}

# Get a blog, its posts, and its posts comments.
query GetBlog($blogId:ID!) {
  getBlog(id:$blogId) {
    id
    name
    posts(filter: {
      title: {
        eq: "My Post!"
      }
    }) {
      items {
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
}

# List all blogs, their posts, and their posts comments.
query ListBlogs {
  listBlogs { # Try adding: listBlog(filter: { name: { eq: "My New Blog!" } })
    items {
      id
      name
      posts { # or try adding: posts(filter: { title: { eq: "My Post!" } })
        items {
          id
          title
          comments { # and so on ...
            items {
              id
              content
            }
          }
        }
      }
    }
  }
}
```

### Task App

**Note: To use the @auth directive, the API must be configured to use Amazon Cognito user pools.**

**There is currently a bug with the user pool creation. To make this work you need to have your own user pool and then pass the id via a CloudFormation parameter. The Amplify CLI user pool with the default setting doesn't work (a fix is in the works).**

```
type Task 
  @model 
  @auth(rules: [
      {allow: groups, groups: ["Managers"], mutations: [create, update, delete], queries: null},
      {allow: groups, groups: ["Employees"], mutations: null, queries: [get, list]}
    ])
{
  id: ID!
  title: String!
  description: String
  status: String
}
type PrivateNote
  @model
  @auth(rules: [{allow: owner}])
{
  id: ID!
  content: String!
}
```

#### Task Queries

```
# Create a task. Only allowed if a manager.
mutation M {
  createTask(input:{
    title:"A task",
    description:"A task description",
    status: "pending"
  }) {
    id
    title
    description
  }
}

# Get a task. Allowed if an employee.
query GetTask($taskId:ID!) {
  getTask(id:$taskId) {
    id
    title
    description
  }
}

# Automatically inject the username as owner attribute.
mutation CreatePrivateNote {
  createPrivateNote(input:{content:"A private note of user 1"}) {
    id
    content
  }
}

# Unauthorized error if not owner.
query GetPrivateNote($privateNoteId:ID!) {
  getPrivateNote(id:$privateNoteId) {
    id
    content
  }
}

# Return only my own private notes.
query ListPrivateNote {
  listPrivateNote {
    items {
      id
      content
    }
  }
}
```

### Conflict Detection

```
type Note @model @versioned {
  id: ID!
  content: String!
  version: Int! # You can leave this out. Validation fails if this is not a int like type (Int/BigInt) and is always coerced to non-null.
}
```

#### Conflict Detection Queries

```
mutation Create {
  createNote(input:{
    content:"A note"
  }) {
    id
    content
    version
  }
}

mutation Update($noteId: ID!) {
  updateNote(input:{
    id: $noteId,
    content:"A second version",
    expectedVersion: 1
  }) {
    id
    content
    version
  }
}

mutation Delete($noteId: ID!) {
  deleteNote(input:{
    id: $noteId,
    expectedVersion: 2
  }) {
    id
    content
    version
  }
}
```

## Writing Custom Transformers

This document outlines the process of writing custom GraphQL transformers. The `graphql-transform` package serves as a lightweight framework that takes as input a GraphQL SDL document
and a list of **GraphQL Transformers** and returns a cloudformation document that fully implements the data model defined by the input schema. A GraphQL Transformer is a class the defines a directive and a set of functions that manipulate a context and are called whenever that directive is found in an input schema.

For example, the AWS Amplify CLI calls the GraphQL Transform like this:

```javascript
import GraphQLTransform from 'graphql-transformer-core'
import DynamoDBModelTransformer from 'graphql-dynamodb-transformer'
import ModelConnectionTransformer from 'graphql-connection-transformer'
import ModelAuthTransformer from 'graphql-auth-transformer'
import AppSyncTransformer from 'graphql-appsync-transformer'
import VersionedModelTransformer from 'graphql-versioned-transformer'

// Note: This is not exact as we are omitting the @searchable transformer.
const transformer = new GraphQLTransform({
    transformers: [
        new AppSyncTransformer(),
        new DynamoDBModelTransformer(),
        new ModelAuthTransformer(),
        new ModelConnectionTransformer(),
        new VersionedModelTransformer()
    ]
})
const schema = `
type Post @model {
    id: ID!
    title: String!
    comments: [Comment] @connection(name: "PostComments")
}
type Comment @model {
    id: ID!
    content: String!
    post: Post @connection(name: "PostComments")
}
`
const cfdoc = transformer.transform(schema);
const out = await createStack(cfdoc, name, region)
console.log('Application creation successfully started. It may take a few minutes to finish.')
```

As shown above the `GraphQLTransform` class takes a list of transformers and later is able to transform
GraphQL SDL documents into CloudFormation documents.

### The Transform Lifecycle

At a high level the `GraphQLTransform` takes the input SDL, parses it, and validates the schema
is complete and satisfies the directive definitions. It then iterates through the list of transformers
passed to the transform when it was created and calls `.before()` if it exists. It then walks the parsed AST 
and calls the relevant transformer methods (e.g. `object()`, `field()`, `interface()` etc) as directive matches are found.
In reverse order it then calls each transformer's `.after()` method if it exists, and finally returns the context's finished template.

Here is pseudo code for how `const cfdoc = transformer.transform(schema);` works.

```javascript
function transform(schema: string): Template {
    
    // ...

    for (const transformer of this.transformers) {
        // Run the before function one time per transformer.
        if (isFunction(transformer.before)) {
            transformer.before(context)
        }
        // Transform each definition in the input document.
        for (const def of context.inputDocument.definitions as TypeDefinitionNode[]) {
            switch (def.kind) {
                case 'ObjectTypeDefinition':
                    this.transformObject(transformer, def, context)
                    // Walk the fields and call field transformers.
                    break
                case 'InterfaceTypeDefinition':
                    this.transformInterface(transformer, def, context)
                    // Walk the fields and call field transformers.
                    break;
                case 'ScalarTypeDefinition':
                    this.transformScalar(transformer, def, context)
                    break;
                case 'UnionTypeDefinition':
                    this.transformUnion(transformer, def, context)
                    break;
                case 'EnumTypeDefinition':
                    this.transformEnum(transformer, def, context)
                    break;
                case 'InputObjectTypeDefinition':
                    this.transformInputObject(transformer, def, context)
                    break;
                // Note: Extension and operation definition nodes are not supported.
                default:
                    continue
            }
        }
    }
    // After is called in the reverse order as if they were popping off a stack.
    let reverseThroughTransformers = this.transformers.length - 1;
    while (reverseThroughTransformers >= 0) {
        const transformer = this.transformers[reverseThroughTransformers]
        if (isFunction(transformer.after)) {
            transformer.after(context)
        }
        reverseThroughTransformers -= 1
    }
    // Return the template.
    // In the future there will likely be a formatter concept here.
    return context.template
}
```

### The Transformer Context

The transformer context serves like an accumulator that is manipulated by transformers. See the code to see what methods are available
to you.

[https://github.com/aws-amplify/amplify-cli/blob/7f0cb11915fa945ad9d518e8f9a8f74378fef5de/packages/graphql-transformer-core/src/TransformerContext.ts](https://github.com/aws-amplify/amplify-cli/blob/7f0cb11915fa945ad9d518e8f9a8f74378fef5de/packages/graphql-transformer-core/src/TransformerContext.ts)

> For now, the transform only support cloudformation and uses a library called `cloudform` to create cloudformation resources in code. In the future we would like to support alternative deployment mechanisms like terraform.

### Example

As an example let's walk through how we implemented the @versioned transformer. The first thing to do is to define a directive for our transformer.

```javascript
const VERSIONED_DIRECTIVE = `
    directive @versioned(versionField: String = "version", versionInput: String = "expectedVersion") on OBJECT
`
```

Our `@versioned` directive can be applied to `OBJECT` type definitions and automatically adds object versioning and conflict detection to an APIs mutations. For example, we might write

```
# Any mutations that deal with the Post type will ask for an `expectedVersion`
# input that will be checked using DynamoDB condition expressions.
type Post @model @versioned {
    id: ID!
    title: String!
    version: Int!
}
```

> Note: @versioned depends on @model so we must pass `new new DynamoDBModelTransformer()` before `new new VersionedModelTransformer()`. Also note that `new AppSyncTransformer()` must go first for now. In the future we can add a dependency mechanism and topologically sort it outselves.

The next step after defining the directive is to implement the transformer's business logic. The `graphql-transformer-core` package makes this a little easier
by exporting a common class through which we may define transformers. User's extend the `Transformer` class and implement the required functions.

```javascript
export class Transformer {
    before?: (acc: TransformerContext) => void
    after?: (acc: TransformerContext) => void
    object?: (definition: ObjectTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    interface?: (definition: InterfaceTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    field?: (
        parent: ObjectTypeDefinitionNode | InterfaceTypeDefinitionNode,
        definition: FieldDefinitionNode,
        directive: DirectiveNode,
        acc: TransformerContext) => void
    argument?: (definition: InputValueDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    union?: (definition: UnionTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    enum?: (definition: EnumTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    enumValue?: (definition: EnumValueDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    scalar?: (definition: ScalarTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    input?: (definition: InputObjectTypeDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
    inputValue?: (definition: InputValueDefinitionNode, directive: DirectiveNode, acc: TransformerContext) => void
}
```

Since our `VERSIONED_DIRECTIVE` only specifies `OBJECT` in its **on** condition, we only **NEED* to implement the `object` function. You may also
implement the `before` and `after` functions which will be called once at the beginning and end respectively of the transformation process.

```javascript
/**
 * Users extend the Transformer class and implement the relevant functions.
 */
export class VersionedModelTransformer extends Transformer {

    constructor() {
        super(
            'VersionedModelTransformer',
            VERSIONED_DIRECTIVE
        )
    }

    /**
     * When a type is annotated with @versioned enable conflict resolution for the type.
     *
     * Usage:
     *
     * type Post @model @versioned(versionField: "version", versionInput: "expectedVersion") {
     *   id: ID!
     *   title: String
     *   version: Int!
     * }
     *
     * Enabling conflict resolution automatically manages a "version" attribute in
     * the @model type's DynamoDB table and injects a conditional expression into
     * the types mutations that actually perform the conflict resolutions by
     * checking the "version" attribute in the table with the "expectedVersion" passed
     * by the user.
     */
    public object = (def: ObjectTypeDefinitionNode, directive: DirectiveNode, ctx: TransformerContext): void => {
        // @versioned may only be used on types that are also @model
        const modelDirective = def.directives.find((dir) => dir.name.value === 'model')
        if (!modelDirective) {
            throw new InvalidDirectiveError('Types annotated with @auth must also be annotated with @model.')
        }

        const isArg = (s: string) => (arg: ArgumentNode) => arg.name.value === s
        const getArg = (arg: string, dflt?: any) => {
            const argument = directive.arguments.find(isArg(arg))
            return argument ? valueFromASTUntyped(argument.value) : dflt
        }

        const versionField = getArg('versionField', "version")
        const versionInput = getArg('versionInput', "expectedVersion")
        const typeName = def.name.value

        // Make the necessary changes to the context
        this.augmentCreateMutation(ctx, typeName, versionField, versionInput)
        this.augmentUpdateMutation(ctx, typeName, versionField, versionInput)
        this.augmentDeleteMutation(ctx, typeName, versionField, versionInput)
        this.stripCreateInputVersionedField(ctx, typeName, versionField)
        this.addVersionedInputToDeleteInput(ctx, typeName, versionInput)
        this.addVersionedInputToUpdateInput(ctx, typeName, versionInput)
        this.enforceVersionedFieldOnType(ctx, typeName, versionField)
    }

    // ... Implement the functions that do the real work by calling the context methods.
}
```
