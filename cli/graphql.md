---
---
# GraphQL Transform

The GraphQL Transform provides a simple to use abstraction that helps you quickly
create backends for your web and mobile applications on AWS. With the GraphQL Transform,
you define your application's data model using the GraphQL Schema Definition Language (SDL)
and the library handles converting your SDL definition into a set of fully descriptive
AWS CloudFormation templates that implement your data model.

For example you might create the backend for a blog like this:

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

When used along with tools like the Amplify CLI, the GraphQL Transform simplifies the process of 
developing, deploying, and maintaining GraphQL APIs. With it, you define your API using the 
[GraphQL Schema Definition Language (SDL)](https://facebook.github.io/graphql/June2018/) and can then use automation to transform it into a fully 
descriptive cloudformation template that implements the spec. The transform also provides a framework
through which you can define you own transformers as `@directives` for custom workflows.

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
terminal window. if no error messages are thrown this means the transformation 
was successful and you can deploy your new API.

```bash
amplify push
```

Go to AWS CloudFormation to view it. You can also find your project assets in the amplify/backend folder under your API.

Once the API is finished deploying, try going to the AWS AppSync console and
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

# Provide the returned id from the CreateBlog mutation as the "blogId" variable 
# in the "variables" pane (bottom left pane) of the query editor:
{
  "blogId": "returned-id-goes-here"
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

# Provide the returned id from the CreatePost mutation as the "postId" variable 
# in the "variables" pane (bottom left pane) of the query editor:
{
  "postId": "returned-id-goes-here"
}

# Get a blog, its posts, and its posts' comments.
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

# List all blogs, their posts, and their posts' comments.
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

```bash
amplify api gql-compile
```

and view the compiled schema output in `backend/api/~apiname~/build/schema.graphql`.

You can then push updated changes with:

```bash
amplify push
```

## Directives

### @model

Object types that are annotated with `@model` are top-level entities in the
generated API. Objects annotated with `@model` are stored in Amazon DynamoDB and are
capable of being protected via `@auth`, related to other objects via `@connection`,
and streamed into Amazon Elasticsearch via `@searchable`. You may also apply the
`@versioned` directive to instantly add a version field and conflict detection to a
model type.

#### Definition

The following SDL defines the `@model` directive that allows you to easily define
top level object types in your API that are backed by Amazon DynamoDB.

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

- An Amazon DynamoDB table with 5 read/write units.
- An AWS AppSync DataSource configured to access the table above.
- An AWS IAM role attached to the DataSource that allows AWS AppSync to call the above table on your behalf.
- Up to 8 resolvers (create, update, delete, get, list, onCreate, onUpdate, onDelete) but this is configurable via the `query`, `mutation`, and `subscription` arguments on the `@model` directive.
- Input objects for create, update, and delete mutations.
- Filter input objects that allow you to filter objects in list queries and connection fields.

This input schema document

```
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

Object types that are annotated with `@auth` are protected by a set of authorization
rules. Currently, @auth only supports APIs with Amazon Cognito User Pools enabled. 
Types that are annotated with `@auth` must also be annotated with `@model`.

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
      {allow: owner, ownerField: "owner", mutations: [create, update, delete], queries: [get, list]},
    ]) 
{
  id: ID!
  title: String!
  owner: String
}
```

Owner authorization specifies that a user can access an object. To
do so, each object has an *ownerField* (by default "owner") that stores ownership information
and is verified in various ways during resolver execution.

You can use the *queries* and *mutations* arguments to specify which operations are augmented as follows:

- **get**: If the record's owner is not the same as the logged in user (via `$ctx.identity.username`), throw `$util.unauthorized()`.
- **list**: Filter `$ctx.result.items` for owned items.
- **create**: Inject the logged in user's `$ctx.identity.username` as the *ownerField* automatically.
- **update**: Add conditional update that checks the stored *ownerField* is the same as `$ctx.identity.username`.
- **delete**: Add conditional update that checks the stored *ownerField* is the same as `$ctx.identity.username`.

You may also apply multiple ownership rules on a single `@model` type. For example, imagine you have a type **Draft**
that stores unfinished posts for a blog. You might want to allow the **Draft's owner** to create, update, delete, and
read **Draft** objects. However, you might also want the **Draft's editors** to be able to update and read **Draft** objects.
To allow for this use case you could use the following type definition:

```
type Draft 
    @model 
    @auth(rules: [

        # Defaults to use the "owner" field.
        { allow: owner },

        # Authorize the update mutation and both queries. Use `queries: null` to disable auth for queries.
        { allow: owner, ownerField: "editors", mutations: [update] }
    ]) {
    id: ID!
    title: String!
    content: String
    owner: String
    editors: [String]!
}
```

**Ownership with create mutations**

The ownership authorization rule tries to make itself as easy as possible to use. One
feature that helps with this is that it will automatically fill ownership fields unless 
told explicitly not to do so. To show how this works, lets look at how the create mutation
would work for the **Draft** type above:

```
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
you need to do is include a value for it in your input. For example, to have the resolver
automatically set the **owner** but not the **editors**, you would run this:

```
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

You can try do the same to **owner** but this will throw an **Unauthorized** exception because you are no longer the owner of the object you are trying to create

```
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

To set the owner to null with the current schema, you would still need to be in the editors list:

```
mutation CreateDraft {
    createDraft(
        input: { 
            title: "A new draft", 
            editors: ["someuser@my-domain.com"],
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

Would return:

```json
{
    "data": {
        "createDraft": {
            "id": "...",
            "title": "A new draft",
            "owner": null,
            "editors": ["someuser@my-domain.com"]
        }
    }
}
```


**Static Group Authorization**

Static group authorization allows you to protect `@model` types by restricting access
to a known set of groups. For example, you can allow all **Admin** users to create,
update, delete, get, and list Salary objects.

```
type Salary @model @auth(rules: [{allow: groups, groups: ["Admin"]}]) {
  id: ID!
  wage: Int
  currency: String
}
```

When calling the GraphQL API, if the user credential (as specified by the resolver's `$ctx.identity`) is not
enrolled in the *Admin* group, the operation will fail.

To enable advanced authorization use cases, you can layer auth rules to provide specialized functionality.
To show how we might do that, let's expand the **Draft** example we started in the **Owner Authorization**
section above. When we last left off, a **Draft** object could be updated and read by both its owner
and any of its editors and could be created and deleted only by its owner. Let's change it so that 
now any member of the "Admin" group can also create, update, delete, and read a **Draft** object.

```
type Draft 
    @model 
    @auth(rules: [
        
        # Defaults to use the "owner" field.
        { allow: owner },
        
        # Authorize the update mutation and both queries. Use `queries: null` to disable auth for queries.
        { allow: owner, ownerField: "editors", mutations: [update] },

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

**Dynamic Group Authorization**

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

Just as with the other auth rules, you can layer dynamic group rules on top of other rules.
Let's again expand the **Draft** example from the **Owner Authorization** and **Static Group Authorization**
sections above. When we last left off editors could update and read objects, owners had full
access, and members of the admin group had full access to **Draft** objects. Now we have a new
requirement where each record should be able to specify an optional list of groups that can read
the draft. This would allow you to share an individual document with an external team, for example.

```
type Draft 
    @model 
    @auth(rules: [
        
        # Defaults to use the "owner" field.
        { allow: owner },
        
        # Authorize the update mutation and both queries. Use `queries: null` to disable auth for queries.
        { allow: owner, ownerField: "editors", mutations: [update] },

        # Admin users can access any operation.
        { allow: groups, groups: ["Admin"] }

        # Each record may specify which groups may read them.
        { allow: groups, groupsField: "groupsCanAccess", mutations: [], queries: [get, list] }
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

```
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

```
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

The generated resolvers would be protected like so:

- `Mutation.createX`: Verify the requesting user has a valid credential and automatically set the **owner** attribute to equal `$ctx.identity.username`.
- `Mutation.updateX`: Update the condition expression so that the DynamoDB `UpdateItem` operation only succeeds if the record's **owner** attribute equals the caller's `$ctx.identity.username`.
- `Mutation.deleteX`: Update the condition expression so that the DynamoDB `DeleteItem` operation only succeeds if the record's **owner** attribute equals the caller's `$ctx.identity.username`.
- `Query.getX`: In the response mapping template verify that the result's **owner** attribute is the same as the `$ctx.identity.username`. If it is not return null.
- `Query.listX`: In the response mapping template filter the result's **items** such that only items with an **owner** attribute that is the same as the `$ctx.identity.username` are returned.

**Multi Owner Authorization**

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

- `Mutation.createX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Mutation.updateX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Mutation.deleteX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Query.getX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.
- `Query.listX`: Verify the requesting user has a valid credential and that `$ctx.identity.claims.get("cognito:groups")` contains the **Admin** group. If it does not, fail.

**Dynamic Group Authorization**

```
type Post @model @auth(rules: [{allow: groups, groupsField: "groups"}]) {
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
- `Query.listX`: In the response mapping template filter the result's **items** such that only items with a **groups** attribute that contains at least one of the caller's claimed groups via `$ctx.identity.claims.get("cognito:groups")`.


### @connection

The `@connection` directive enables you to specify relationships between `@model` object types.
Currently, this supports one-to-one, one-to-many, and many-to-one relationships. You may implement many-to-many relationships
yourself using two one-to-many connections and joining `@model` type. See the usage section for details.

#### Definition

```
directive @connection(name: String, keyField: String, sortField: String) on FIELD_DEFINITION
```

#### Usage

Relationships between data are specified by annotating fields on an `@model` object type with the `@connection` directive. You can use the `keyField` to specify what field should be used to partition the elements within the index and the `sortField` argument to specify how the records should be sorted.

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

> **Note** The **Project.team** resolver is configured to work with the defined connection.

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

> **Note** The postCommentsId field on the input may seem unusual. In the one-to-many case without a provided `name` argument there is only partial information to work with, which results in the unusual name. To fix this, provide a value for the `@connection`'s *name* argument and complete the bi-directional relationship by adding a corresponding `@connection` field to the **Comment** type.

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
    comments: [Comment] @connection(name: "PostComments", sortField: "createdAt")
}
type Comment {
    id: ID!
    content: String!
    post: Post @connection(name: "PostComments", sortField: "createdAt")
    createdAt: String
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

When you query the connection, the comments will return sorted by their `createdAt` field.

```
query GetPostAndComments {
    getPost(id: "...") {
        id
        title
        comments {
          items {
            content
            createdAt
          }
        }
    }
}
```


**Many-To-Many Connections**

You can implement many to many yourself using two 1-M @connections and a joining @model. For example:

```
type Post @model {
  id: ID!
  title: String!
  editors: [PostEditor] @connection(name: "PostEditors")
}

# Create a join model and disable queries as you don't need them
# and can query through Post.editors and User.posts
type PostEditor @model(queries: null) {
  id: ID!
  post: Post! @connection(name: "PostEditors")
  editor: User! @connection(name: "UserEditors")
}

type User @model {
  id: ID!
  username: String!
  posts: [PostEditor] @connection(name: "UserEditors")
}
```

You can then create Posts & Users independently and join them in a many-to-many by creating PostEditor objects. In the future we will support more native support for many to many out of the box. The issue is being [tracked on github here](https://github.com/aws-amplify/amplify-cli/issues/91).

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

Add `@versioned` to a type that is also annotate with `@model` to enable object versioning and conflict detection for a type.

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

Store posts in Amazon DynamoDB and automatically stream them to Amazon ElasticSearch
via AWS Lambda and connect a searchQueryField resolver.

```
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

The `filter` parameter in the search query has a searchable type field that corresponds to the field listed in the Post type. For example, the `title` field of the `filter` object, has the following properties (containing the operators that are applicable to the `string` type):

* `eq` - which uses the Elasticsearch keyword type to match for the exact term.
* `ne` - this is the inverse operation of `eq`.
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

Moreover you can use the `filter` parameter to pass a nested `and`/`or`/`not` condition. By default, every operation in the filter properties is *AND* ed. You can use the `or` or `not` properties in the `filter` parameter of the search query to override this behavior. Each of these operators (`and`, `or`, `not` properties in the filter object) accepts an array of searchable types which are in turn joined by the corresponding operator. For example, consider the following search query:

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

Assuming you used the `createPost` mutation to create new posts with `title`, `createdAt` and `updatedAt` values, the above search query will return you a list of all `Posts`, whose `title` starts with `S` _and_ have `createdAt` _or_ `updatedAt` value as `08/20/2018`.

Here is a complete list of searchable operations per GraphQL type supported as of today:

| GraphQL Type        | Searchable Operation           |
|-------------:|:-------------|
| String      | `ne`, `eq`, `match`, `matchPhrase`, `matchPhrasePrefix`, `multiMatch`, `exists`, `wildcard`, `regexp` |
| Int     | `ne`, `gt`, `lt`, `gte`, `lte`, `eq`, `range`      |
| Float | `ne`, `gt`, `lt`, `gte`, `lte`, `eq`, `range`      |
| Boolean | `eq`, `ne`      |

## API Category Project Structure

At a high level, the transform libraries take a schema defined in the GraphQL Schema Definition Language (SDL) and converts it into a set of AWS CloudFormation templates and other assets that are deployed as part of `amplify push`. The full set of assets uploaded can be found at *amplify/backend/api/YOUR-API-NAME/build*.

When creating APIs, you will make changes to the other files and directories in the *amplify/backend/api/YOUR-API-NAME/* directory but you should not manually change anything in the *build* directory. The build directory will be overwritten the next time you run `amplify push` or `amplify api gql-compile`. Here is an overview of the API directory:

```terminal
- resolvers/ 
| # Store any resolver templates written in vtl here. E.G.
|-- Query.ping.req.vtl
|-- Query.ping.res.vtl
|
- stacks/
| # Create custom resources with CloudFormation stacks that will be deployed as part of `amplify push`.
|-- CustomResources.json
|
- parameters.json
| # Tweak certain behaviors with custom CloudFormation parameters.
|
- schema.graphql
| # Write your GraphQL schema in SDL
- schema/
| # Optionally break up your schema into many files. You must remove schema.graphql to use this.
|-- Query.graphql
|-- Post.graphql
```

### Common Patterns for the API Category

The Amplify CLI exposes the GraphQL Transform libraries to help create APIs with common
patterns and best practices baked in but it also provides number of escape hatches for
those situations where you might need a bit more control. Here are a few common use cases
you might find useful.

#### Overwrite a resolver generated by the GraphQL Transform

Let's say you have a simple *schema.graphql*...

```
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

and you want to change the behavior of request mapping template for the *Query.getTodo* resolver that will be generated when the project compiles. To do this you would create a file named `Query.getTodo.req.vtl` in the *resolvers* directory of your API project. The next time you run `amplify push` or `amplify api gql-compile`, your resolver template will be used instead of the auto-generated template. You may similarly create a `Query.getTodo.res.vtl` file to change the behavior of the resolver's response mapping template.

#### Add a custom resolver that targets a DynamoDB table from @model

This is useful if you want to write a more specific query against a DynamoDB table that was created by *@model*. For example, assume you had this schema with two *@model* types and a pair of *@connection* directives.

```
type Todo @model {
  id: ID!
  name: String!
  description: String
  comments: [Todo] @connection(name: "TodoComments")
}
type Comment @model {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

This schema will generate resolvers for *Query.getTodo*, *Query.listTodos*, *Query.getComment*, and *Query.listComments* at the top level as well as for *Todo.comments*, and *Comment.todo* to implement the *@connection*. Under the hood, the transform will create a global secondary index on the Comment table in DynamoDB but it will not generate a top level query field that queries the GSI because you can fetch the comments for a given todo object via the *Query.getTodo.comments* query path. If you want to fetch all comments for a todo object via a top level query field i.e. *Query.commentsForTodo* then do the following:

1. Add the desired field to your *schema.graphql*.

```
// ... Todo and Comment types from above

type CommentConnection {
  items: [Comment]
  nextToken: String
}
type Query {
  commentsForTodo(todoId: ID!, limit: Int, nextToken: String): CommentConnection
}
```

2. Add a resolver resource to a stack in the *stacks/* directory.

```json
{
  // ... The rest of the template
  "Resources": {
    "QueryCommentsForTodoResolver": {
      "Type": "AWS::AppSync::Resolver",
      "Properties": {
        "ApiId": {
          "Ref": "AppSyncApiId"
        },
        "DataSourceName": "CommentTable",
        "TypeName": "Query",
        "FieldName": "commentsForTodo",
        "RequestMappingTemplateS3Location": {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.commentsForTodo.req.vtl",
            {
              "S3DeploymentBucket": {
                "Ref": "S3DeploymentBucket"
              },
              "S3DeploymentRootKey": {
                "Ref": "S3DeploymentRootKey"
              }
            }
          ]
        },
        "ResponseMappingTemplateS3Location": {
          "Fn::Sub": [
            "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.commentsForTodo.res.vtl",
            {
              "S3DeploymentBucket": {
                "Ref": "S3DeploymentBucket"
              },
              "S3DeploymentRootKey": {
                "Ref": "S3DeploymentRootKey"
              }
            }
          ]
        }
      }
    }
  }
}
```

3. Write the resolver templates.

```vtl
## Query.commentsForTodo.req.vtl **

#set( $limit = $util.defaultIfNull($context.args.limit, 10) )
{
  "version": "2017-02-28",
  "operation": "Query",
  "query": {
    "expression": "#connectionAttribute = :connectionAttribute",
    "expressionNames": {
        "#connectionAttribute": "commentTodoId"
    },
    "expressionValues": {
        ":connectionAttribute": {
            "S": "$context.args.todoId"
        }
    }
  },
  "scanIndexForward": true,
  "limit": $limit,
  "nextToken": #if( $context.args.nextToken ) "$context.args.nextToken" #else null #end,
  "index": "gsi-TodoComments"
}
```

```vtl
## Query.commentsForTodo.res.vtl **

$util.toJson($ctx.result)
```

#### Add a custom resolver that targets an AWS Lambda function

Velocity is useful as a fast, secure environment to run arbitrary code but when it comes to writing complex business logic you can just as easily call out to an AWS lambda function. Here is how:

1. First create a function by running `amplify add function`. The rest of the example assumes you created a function named "echofunction" via the `amplify add function` command. If you already have a function then you may skip this step.

2. Add a field to your schema.graphql that will invoke the AWS Lambda function.

```
type Query {
  echo(msg: String): String
}
```

3. Add the function as an AppSync data source in the stack's *Resources* block.

```json
"EchoLambdaDataSource": {
  "Type": "AWS::AppSync::DataSource",
  "Properties": {
    "ApiId": {
      "Ref": "AppSyncApiId"
    },
    "Name": "EchoFunction",
    "Type": "AWS_LAMBDA",
    "ServiceRoleArn": {
      "Fn::GetAtt": [
        "EchoLambdaDataSourceRole",
        "Arn"
      ]
    },
    "LambdaConfig": {
      "LambdaFunctionArn": {
        "Fn::Sub": [
          "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:echofunction-${env}",
          { "env": { "Ref": "env" } }
        ]
      }
    }
  }
}
```

4. Create an AWS IAM role that allows AppSync to invoke the lambda function on your behalf to the stack's *Resources* block.

```json
"EchoLambdaDataSourceRole": {
  "Type": "AWS::IAM::Role",
  "Properties": {
    "RoleName": "EchoLambdaDataSourceRole",
    "AssumeRolePolicyDocument": {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "Service": "appsync.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
        }
      ]
    },
    "Policies": [
      {
        "PolicyName": "InvokeLambdaFunction",
        "PolicyDocument": {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Action": [
                "lambda:invokeFunction"
              ],
              "Resource": [
                {
                  "Fn::Sub": [
                    "arn:aws:lambda:${AWS::Region}:${AWS::AccountId}:function:echofunction-${env}",
                    { "env": { "Ref": "env" } }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  }
}
```

5. Create an AppSync resolver in the stack's *Resources* block.

```json
"QueryEchoResolver": {
  "Type": "AWS::AppSync::Resolver",
  "Properties": {
    "ApiId": {
      "Ref": "AppSyncApiId"
    },
    "DataSourceName": {
      "Fn::GetAtt": [
        "EchoLambdaDataSource",
        "Name"
      ]
    },
    "TypeName": "Query",
    "FieldName": "echo",
    "RequestMappingTemplateS3Location": {
      "Fn::Sub": [
        "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.echo.req.vtl",
        {
          "S3DeploymentBucket": {
            "Ref": "S3DeploymentBucket"
          },
          "S3DeploymentRootKey": {
            "Ref": "S3DeploymentRootKey"
          }
        }
      ]
    },
    "ResponseMappingTemplateS3Location": {
      "Fn::Sub": [
        "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.echo.res.vtl",
        {
          "S3DeploymentBucket": {
            "Ref": "S3DeploymentBucket"
          },
          "S3DeploymentRootKey": {
            "Ref": "S3DeploymentRootKey"
          }
        }
      ]
    }
  }
}
```

6. Create the resolver templates in the project's *resolvers* directory.

**resolvers/Query.echo.req.vtl**

```
{
    "version": "2017-02-28",
    "operation": "Invoke",
    "payload": {
        "type": "Query",
        "field": "echo",
        "arguments": $utils.toJson($context.arguments),
        "identity": $utils.toJson($context.identity),
        "source": $utils.toJson($context.source)
    }
}
```

**resolvers/Query.echo.res.vtl**

```
$util.toJson($ctx.result)
```

After running `amplify push` open the AppSync console with `amplify api console` and test your API with this simple query:

```
query {
  echo(msg:"Hello, world!")
}
```

#### Add a custom geolocation search resolver that targets an Elasticsearch domain created by @searchable

To add a geolocation search capabilities to an API add the *@searchable* directive to an *@model* type.

```
type Todo @model @searchable {
  id: ID!
  name: String!
  description: String
  comments: [Todo] @connection(name: "TodoComments")
}
```

The next time you run `amplify push`, an Amazon Elasticsearch domain will be created and configured such that data automatically streams from DynamoDB into Elasticsearch. The *@searchable* directive on the Todo type will generate a *Query.searchTodos* query field and resolver but it is not uncommon to want more specific search capabilities. You can write a custom search resolver by following these steps:

1. Add the relevant location and search fields to the schema.

```
type Location {
  lat: Float
  lon: Float
}
input LocationInput {
  lat: Float
  lon: Float
}
type Todo @model @searchable {
  id: ID!
  name: String!
  description: String
  comments: [Todo] @connection(name: "TodoComments")
  location: Location
}
type Query {
  nearbyTodos(location: LocationInput!, km: Int): TodoConnection
}
```

2. Create the resolver record in the stack's *Resources* block.

```json
"QueryNearbyTodos": {
    "Type": "AWS::AppSync::Resolver",
    "Properties": {
        "ApiId": {
            "Ref": "AppSyncApiId"
        },
        "DataSourceName": "ElasticsearchDomain",
        "TypeName": "Query",
        "FieldName": "nearbyTodos",
        "RequestMappingTemplateS3Location": {
            "Fn::Sub": [
                "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.nearbyTodos.req.vtl",
                {
                    "S3DeploymentBucket": {
                        "Ref": "S3DeploymentBucket"
                    },
                    "S3DeploymentRootKey": {
                        "Ref": "S3DeploymentRootKey"
                    }
                }
            ]
        },
        "ResponseMappingTemplateS3Location": {
            "Fn::Sub": [
                "s3://${S3DeploymentBucket}/${S3DeploymentRootKey}/resolvers/Query.nearbyTodos.res.vtl",
                {
                    "S3DeploymentBucket": {
                        "Ref": "S3DeploymentBucket"
                    },
                    "S3DeploymentRootKey": {
                        "Ref": "S3DeploymentRootKey"
                    }
                }
            ]
        }
    }
}
```

3. Write the resolver templates.

```
## Query.nearbyTodos.req.vtl
## Objects of type Todo will be stored in the /todo index

#set( $indexPath = "/todo/doc/_search" )
#set( $distance = $util.defaultIfNull($ctx.args.km, 200) )
{
    "version": "2017-02-28",
    "operation": "GET",
    "path": "$indexPath.toLowerCase()",
    "params": {
        "body": {
            "query": {
                "bool" : {
                    "must" : {
                        "match_all" : {}
                    },
                    "filter" : {
                        "geo_distance" : {
                            "distance" : "${distance}km",
                            "location" : $util.toJson($ctx.args.location)
                        }
                    }
                }
            }
        }
    }
}
```

```
## Query.nearbyTodos.res.vtl

#set( $items = [] )
#foreach( $entry in $context.result.hits.hits )
  #if( !$foreach.hasNext )
    #set( $nextToken = "$entry.sort.get(0)" )
  #end
  $util.qr($items.add($entry.get("_source")))
#end
$util.toJson({
  "items": $items,
  "total": $ctx.result.hits.total,
  "nextToken": $nextToken
})
```

4. Run `ampify push`

Amazon Elasticsearch domains can take a while to deploy. Take this time to read up on Elasticsearch to see what capabilities you are about to unlock.

[Getting Started with Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)

4. After the update is complete but before creating any objects, update your Elasticsearch index mapping.

An index mapping tells Elasticsearch how it should treat the data that you are trying to store. By default, if we create an object with field `"location": { "lat": 40, "lon": -40 }`, Elasticsearch will treat that data as an *object* type when in reality we want it to be treated as a *geo_point*. You use the mapping APIs to tell Elasticsearch how to do this.

Make sure you tell Elasticsearch that your location field is a *geo_point* before creating objects in the index because otherwise you will need delete the index and try again. Go to the [Amazon Elasticsearch Console](https://console.aws.amazon.com/es/home) and find the Elasticsearch domain that contains this environment's GraphQL API ID. Click on it and open the kibana link. To get kibana to show up you need to install a browser extension such as [AWS Agent](https://addons.mozilla.org/en-US/firefox/addon/aws-agent/) and configure it with your AWS profile's public key and secret so the browser can sign your requests to kibana for security reasons. Once you have kibana open, click the "Dev Tools" tab on the left and run the commands below using the in browser console.

```json
# Create the /todo index if it does not exist
PUT /todo

# Tell Elasticsearch that the location field is a geo_point
PUT /todo/_mapping/doc
{
    "properties": {
        "location": {
            "type": "geo_point"
        }
    }
}
```

5. Use your API to create objects and immediately search them.

After updating the Elasticsearch index mapping, open the AWS AppSync console with `amplify api console` and try out these queries.

```
mutation CreateTodo {
  createTodo(input:{
    name: "Todo 1",
    description: "The first thing to do",
    location: {
      lat:43.476446,
      lon:-110.767786
    }
  }) {
    id
    name
    location {
      lat
      lon
    }
    description
  }
}

query NearbyTodos {
  nearbyTodos(location: {
    lat: 43.476546,
    lon: -110.768786
  }, km: 200) {
    items {
      id
      name
      location {
        lat
        lon
      }
    }
  }
}
```

When you run *Mutation.createTodo*, the data will automatically be streamed via AWS Lambda into Elasticsearch such that it nearly immediately available via *Query.nearbyTodos*.

## AWS CloudFormation Template Parameters

Much of the behavior of the GraphQL Transform logic is configured by passing arguments to the directives in the GraphQL SDL definition. However, certain other things are configured by passing parameters to the CloudFormation template itself. This provides escape hatches without leaking too many implementation details into the SDL definition. You can pass values to these parameters by adding them to the `parameters.json` file in the API directory of your amplify project.

### AppSyncApiName

**Override the name of the generated AppSync API**

```json
{
  "AppSyncApiName": "AppSyncAPI"
}
```

### APIKeyExpirationEpoch

**Resets the API Key to expire 1 week after the next `amplify push`**

```json
{
  "APIKeyExpirationEpoch": "0"
}
```

**Do not create an API key**

```json
{
  "APIKeyExpirationEpoch": "-1"
}
```

**Set a custom API key expiration date**

```json
{
  "APIKeyExpirationEpoch": "1544745428"
}
```

> The value specified is the expiration date in seconds since Epoch

### DynamoDBBillingMode

**Set the DynamoDB billing mode for the API. One of "PROVISIONED" or "PAY_PER_REQUEST".**

```json
{
  "DynamoDBBillingMode": "PAY_PER_REQUEST"
}
```

### DynamoDBModelTableReadIOPS

**Override the default read IOPS provisioned for each @model table**

**Only valid if the "DynamoDBBillingMode" is set to "PROVISIONED"**

```json
{
  "DynamoDBModelTableReadIOPS": 5
}
```

### DynamoDBModelTableWriteIOPS

**Override the default write IOPS provisioned for each @model table**

**Only valid if the "DynamoDBBillingMode" is set to "PROVISIONED"**

```json
{
  "DynamoDBModelTableWriteIOPS": 5
}
```

### ElasticsearchStreamingFunctionName

**Override the name of the AWS Lambda searchable streaming function**

```json
{
  "ElasticsearchStreamingFunctionName": "CustomFunctionName"
}
```

### ElasticsearchInstanceCount

**Override the number of instances launched into the Elasticsearch domain created by @searchable**

```json
{
  "ElasticsearchInstanceCount": 1
}
```

### ElasticsearchInstanceType

**Override the type of instance launched into the Elasticsearch domain created by @searchable**

```json
{
  "ElasticsearchInstanceType": "t2.small.elasticsearch"
}
```

### ElasticsearchEBSVolumeGB

**Override the amount of disk space allocated to each instance in the Elasticsearch domain created by @searchable**

```json
{
  "ElasticsearchEBSVolumeGB": 10
}
```

## S3 Objects

The GraphQL Transform, Amplify CLI, and Amplify Library make it simple to add complex object
support with Amazon S3 to an application.

### Basics

At a minimum the steps to add S3 Object support are as follows:

**Create a Amazon S3 bucket to hold files via `amplify add storage`.**

**Create a user pool in Amazon Cognito User Pools via `amplify add auth`.**

**Create a GraphQL API via `amplify add api` and add the following type definition:**

```
type S3Object {
  bucket: String!
  region: String!
  key: String!
}
```

**Reference the S3Object type from some `@model` type:**

```
type Picture @model @auth(rules: [{allow: owner}]) {
  id: ID!
  name: String
  owner: String

  # Reference the S3Object type from a field.
  file: S3Object
}
```

The GraphQL Transform handles creating the relevant input types and will store pointers to S3 objects in Amazon DynamoDB. The AppSync SDKs and Amplify library handle uploading the files to S3 transparently.

**Run a mutation with s3 objects from your client app:**

```
mutation ($input: CreatePictureInput!) {
  createPicture(input: $input) {
    id
    name
    visibility
    owner
    createdAt
    file {
      region
      bucket
      key
    }
  }
}
```

### Handling Common Errors



### Tutorial (S3 & React)

**First create an amplify project:**

```bash
amplify init
```

**Next add the `auth` category to enable Amazon Cognito User Pools:**

```bash
amplify add auth

# You may use the default settings.
```

**Then add the `storage` category and configure an Amazon S3 bucket to store files.**

```bash
amplify add storage

# Select "Content (Images, audio, video, etc.)"
# Follow the rest of the instructions and customize as necessary.
```

**Next add the `api` category and configure a GraphQL API with Amazon Cognito User Pools enabled.**

```bash
amplify add api

# Select the graphql option and then Amazon Cognito User Pools option.
# When asked if you have a schema, say No.
# Select one of the default samples. You can change it later.
# Choose to edit the schema and it will open your schema.graphql in your editor.
```

**Once your `schema.graphql` is open in your editor of choice, enter the following:**

```
type Picture @model @auth(rules: [{allow: owner}]) {
  id: ID!
  name: String
  owner: String
  visibility: Visibility
  file: S3Object
  createdAt: String
}

type S3Object {
  bucket: String!
  region: String!
  key: String!
}

enum Visibility {
  public
  private
}
```

**After defining your API's schema.graphql deploy it to AWS.**

```bash
amplify push
```

**In your top level `App.js` (or similar), instantiate the AppSync client and include
the necessary `<Provider />` and `<Rehydrated />` components.**

```javascript
import React, { Component } from 'react';
import Amplify, { Auth } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';
import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import awsconfig from './aws-exports';

// Amplify init
Amplify.configure(awsconfig);

const GRAPHQL_API_REGION = awsconfig.aws_appsync_region
const GRAPHQL_API_ENDPOINT_URL = awsconfig.aws_appsync_graphqlEndpoint
const S3_BUCKET_REGION = awsconfig.aws_user_files_s3_bucket_region
const S3_BUCKET_NAME = awsconfig.aws_user_files_s3_bucket
const AUTH_TYPE = awsconfig.aws_appsync_authenticationType

// AppSync client instantiation
const client = new AWSAppSyncClient({
  url: GRAPHQL_API_ENDPOINT_URL,
  region: GRAPHQL_API_REGION,
  auth: {
    type: AUTH_TYPE,
    // Get the currently logged in users credential from 
    // Amazon Cognito User Pools.
    jwtToken: async () => (
        await Auth.currentSession()).getAccessToken().getJwtToken(),
  },
  // Uses Amazon IAM credentials to authorize requests to S3.
  complexObjectsCredentials: () => Auth.currentCredentials(),
});

// Define you root app component
class App extends Component {
    render() {
        // ... your code here
    }
}

const AppWithAuth = withAuthenticator(App, true);

export default () => (
  <ApolloProvider client={client}>
    <Rehydrated>
      <AppWithAuth />
    </Rehydrated>
  </ApolloProvider>
);
```

**Then define a component and call a mutation to create a Picture object and upload
a file.**

```javascript
import React, { Component } from 'react';
import gql from 'graphql-tag';

// Define your component
class AddPhoto extends Component {
    render() {
        <Button onClick={async () => {
            const visibility = 'private';
            const { identityId } = await Auth.currentCredentials();
            const name = 'Friendly File Name';
            const file = {
                bucket: this.props.s3Bucket,
                key: `${visibility}/${identityId}/${this.state.selectedFile.name}`,
                region,
                mimeType,
                
                // This comes from an HTML file input element.
                // <input type="file" onChange={this.updateStateOnFileSelected} />
                localUri: this.state.selectedFile,
            };
            // Fires the createPicture mutation and transparently uploads the
            // file to Amazon S3.
            this.props.createPicture({ name, visibility, file });
        }} />
    }
}

// Write your mutation
const MutationCreatePicture = gql`
mutation ($input: CreatePictureInput!) {
  createPicture(input: $input) {
    id
    name
    visibility
    owner
    createdAt
    file {
      region
      bucket
      key
    }
  }
}`;

// Decorate your component with your mutation. 
export default graphql(
    MutationCreatePicture,
    {
        options: {
            // Tell the SDK how to store the new "Picture" 
            // object in the offline cache.
            update: (proxy, { data: { createPicture } }) => {
                const query = QueryListPictures;
                const data = proxy.readQuery({ query });
                data.listPictures.items = [
                    ...data.listPictures.items,
                    createPicture
                ];
                proxy.writeQuery({ query, data });
            }
        },
        props: ({ ownProps, mutate }) => ({

            // Add a "createPicture" prop that will trigger 
            // our mutation from our component.
            createPicture: photo => mutate({

                // Pass our photo (NOTE: with the file object as variables)
                // The AppSync SDK will know how to upload the file to S3.
                variables: { input: photo },

                // Optionally provide an optimistic update rule 
                // for snappy UIs.
                optimisticResponse: () => ({
                    createPicture: {
                        ...photo,
                        id: uuid(),
                        createdAt: new Date().toISOString(),
                        __typename: 'Picture',
                        file: { ...photo.file, __typename: 'S3Object' }
                    }
                }),
            }),
        }),
    }
)(AddPhoto);
```

> See [https://github.com/aws-samples/aws-amplify-graphql](https://github.com/aws-samples/aws-amplify-graphql) for the full code.

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

> Note: @versioned depends on @model so we must pass `new new DynamoDBModelTransformer()` before `new new VersionedModelTransformer()`. Also note that `new AppSyncTransformer()` must go first for now. In the future we can add a dependency mechanism and topologically sort it ourselves.

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
