---
title: Examples
description: Refer to these examples to learn about various sample application's GraphQL schemas.
---
## Simple Todo

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
}
```

## Blog

```graphql
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

### Blog Queries

```graphql
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

## Task App

**Note: To use the @auth directive, the API must be configured to use Amazon Cognito user pools.**

```graphql
type Task
  @model
  @auth(rules: [
    {allow: groups, groups: ["Managers"], mutations: [create, update, delete], queries: null},
    {allow: groups, groups: ["Employees"], mutations: null, queries: [get, list]}
  ]) {
  id: ID!
  title: String!
  description: String
  status: String
}
type PrivateNote
  @model
  @auth(rules: [{allow: owner}]) {
  id: ID!
  content: String!
}
```

### Task Queries

```graphql
# Create a task. Only allowed if a manager.
mutation CreateTask {
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

## Conflict Detection

```graphql
type Note @model @versioned {
  id: ID!
  content: String!
  version: Int! # You can leave this out. Validation fails if this is not a int like type (Int/BigInt) and is always coerced to non-null.
}
```

### Conflict Detection Queries

```graphql
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

## Common Patterns for the API Category

The Amplify CLI exposes the GraphQL Transform libraries to help create APIs with common
patterns and best practices baked in but it also provides number of escape hatches for
those situations where you might need a bit more control. Here are a few common use cases
you might find useful.

### Filter Subscriptions by model fields and/or relations

In multi-tenant scenarios, subscribed clients may not always want to receive every change for a model type. These are useful features for limiting the objects that are returned by a client subscription. It is crucial to remember that subscriptions can only filter by what fields are returned from the mutation query. Keep in mind, these two methods can be used together to create truly robust filtering options.

Consider this simple schema for our examples:

```graphql
type Todo @model {
  id: ID!
  name: String!
  description: String
  comments: [Comment] @connection(name: "TodoComments")
}
type Comment @model {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

**Filtering by type fields**

This is the simpler method of filtering subscriptions, as it requires one less change to the model than filtering on relations.

1. Add the subscriptions argument on the *@model* directive, telling Amplify to *not* generate subscriptions for your Comment type.

```graphql
type Comment @model(subscriptions: null) {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
}
```

2. Run `amplify push` at this point, as running it after adding the Subscription type will throw an error, claiming you cannot have two Subscription definitions in your schema.

3. After the push, you will need to add the Subscription type to your schema, including whichever scalar Comment fields you wish to use for filtering (content in this case):

```graphql
type Subscription {
  onCreateComment(content: String): Comment @aws_subscribe(mutations: ["createComment"])
  onUpdateComment(id: ID, content: String): Comment @aws_subscribe(mutations: ["updateComment"])
  onDeleteComment(id: ID, content: String): Comment @aws_subscribe(mutations: ["deleteComment"])
}
```

**Filtering by related (*@connection* designated) type**

This is useful when you need to filter by what Todo objects the Comments are connected to. You will need to augment your schema slightly to enable this.

1. Add the subscriptions argument on the *@model* directive, telling Amplify to *not* generate subscriptions for your Comment type. Also, just as importantly, we will be utilizing an auto-generated column from DynamoDB by adding `commentTodoId` to our Comment model:

```graphql
type Comment @model(subscriptions: null) {
  id: ID!
  content: String
  todo: Todo @connection(name: "TodoComments")
  commentTodoId: String # This references the commentTodoId field in DynamoDB
}
```

2. You should run `amplify push` at this point, as running it after adding the Subscription type will throw an error, claiming you cannot have two Subscription definitions in your schema.

3. After the push, you will need to add the Subscription type to your schema, including the `commentTodoId` as an optional argument:

```graphql
type Subscription {
  onCreateComment(commentTodoId: String): Comment @aws_subscribe(mutations: ["createComment"])
  onUpdateComment(id: ID, commentTodoId: String): Comment @aws_subscribe(mutations: ["updateComment"])
  onDeleteComment(id: ID, commentTodoId: String): Comment @aws_subscribe(mutations: ["deleteComment"])
}
```

The next time you run `amplify push` or `amplify api gql-compile`, your subscriptions will allow an `id` and/or `commentTodoId` argument on a Comment subscription. As long as your mutation on the Comment type returns the specified argument field from its query, AppSync filters which subscription events will be pushed to your subscribed client.
