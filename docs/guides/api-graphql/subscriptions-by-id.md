---
title: How to create GraphQL subscriptions by id
description: How to create a custom GraphQL subscription that will listen by id
---

In this guide you will learn how to create a custom GraphQL subscription that will only by connected and triggered by a mutation containing a specific ID as an argument.

When using the Amplify GraphQL transform library, there will often be times when you need to expand the GraphQL schema and operations created by the `@model` directive. A common use case is when fine grained control is needed for GraphQL subscriptions.

Take for example the following GraphQL schema:

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
  comments: [Comment] @connection
}

type Comment @model {
  id: ID!
  content: String
}
```

By default, subscriptions will be created for the following mutations:

```graphql
# Post type
onCreatePost
onUpdatePost
onDeletePost

# Comment type
onCreateComment
onUpdateComment
onDeleteComment
```

One operation that is not covered is if you wanted to only subscribe to comments for a specific post.

Because the schema has a one to many relationship enabled between posts and comments, you can use the auto-generated field `postCommentsId` that defines the relationship between the post and the comment to set this up in a new Subscription definition.

To implement this, you could update the schema with the following:

```graphql
type Post @model {
  id: ID!
  title: String!
  content: String
  comments: [Comment] @connection
}

type Comment @model {
  id: ID!
  content: String
  postCommentsId: ID!
}

type Subscription {
  onCommentByPostId(postCommentsId: ID!): Comment
    @aws_subscribe(mutations: ["createComment"])
}

```

<inline-fragment platform="ios" src="~/guides/api-graphql/fragments/ios/subscriptions-by-id.md"></inline-fragment>
<inline-fragment platform="js" src="~/guides/api-graphql/fragments/js/subscriptions-by-id.md"></inline-fragment>
<inline-fragment platform="android" src="~/guides/api-graphql/fragments/android/subscriptions-by-id.md"></inline-fragment>