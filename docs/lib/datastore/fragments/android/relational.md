## Relational Models

DataStore has the capability to handle relationships between Models,
such as `Has One`, `Has Many`, `Belongs To`, and `Many To Many`. In
GraphQL this is done with `@connection` as defined in the
[GraphQL Transformer documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection).
For the examples that follow, we will use the following schema:

```graphql
enum PostStatus {
  ACTIVE
  INACTIVE
}

type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(name: "PostComments")
  rating: Int!
  status: PostStatus!
}

type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

## Saving relations

```java
Post post = Post.builder()
    .title("My Post with comments")
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post,
    postSaved -> Log.i("AmplifyGetStarted", "Post saved."),
    saveFailure -> Log.e("AmplifyGetStarted", "Post not saved.", saveFailure)
);

Comment comment = Comment.builder()
    .content("Loving Amplify DataStore!")
    .post(post) // Directly pass in the post instance
    .build();

Amplify.DataStore.save(comment,
    commentSaved -> Log.i("AmplifyGetStarted", "Comment saved."),
    saveFailure -> Log.e("AmplifyGetStarted", "Comment not saved.", saveFailed)
);
```

The above example shows how to use a one-to-many schema and save
connected models. For many-to-many relationships, such as the one shown
in the [GraphQL Transformer examples](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection)
you can do as below:

```java
Post post = Post.builder()
    .title("My First Post")
    .status(PostStatus.ACTIVE)
    .build();

Amplify.DataStore.save(post,
    postSaved -> Log.i("AmplifyGetStarted", "Post saved."),
    saveFailure -> Log.e("AmplifyGetStarted", "Post not saved.", saveFailure)
);

User editor = User.builder()
    .username("Nadia")
    .build();
Amplify.DataStore.save(editor,
    editorSaved -> Log.i("AmplifyGetStarted", "Editor saved."),
    saveFailure -> Log.e("AmplifyGetStarted", "Editor not saved.", saveFailure)
);

PostEditor postEditor = PostEditor.builder()
    .post(post)
    .editor(editor)
    .build();
Amplify.DataStore.save(postEditor,
    postEditorSaved -> Log.i("AmplifyGetStarted", "PostEditor saved."),
    saveFailure -> Log.e("AmplifyGetStarted", "PostEditor not saved.", saveFailure)
);
```

In this case, you save instances of models from each side of the
relationship and then join them together in the connecting type on a
field defined with `@connection`. For the schema above this corresponds
to `post: Post! @connection(fields: ["postID"])` and
`editor: User! @connection(fields: ["editorID"])`.

## Querying relations

When querying for a model that `Belongs To` (i.e. identity depends on)
another model, the predicate can directly refer to model that owns it.

This example queries for all comments that belong to a post with given
ID value.

```java
Amplify.DataStore.query(
    Comment.class,
    Post.ID.eq("123"),
    matchingComments -> {
        while (matchingComments.hasNext()) {
            Comment comment = matchingComments.next();
            Log.i("AmplifyGetStarted", "Comment: " + comment.getContent());
        }
    },
    queryFailure -> Log.e("AmplifyGetStarted", "Query failed.", queryFailure)
);
```

## Deleting relations

When you delete a parent object in a one-to-many relationship, the
children will also be removed from the DataStore. These deletions will
also be dispatched for synchronization over the network. For example,
the following operation would remove `myPost` as well as any
related comments:

```java
Amplify.DataStore.delete(myPost,
    postDeleted -> Log.i("AmplifyGetStarted", "Post deleted"),
    deleteFailed -> Log.e("AmplifyGetStarted", "Post not deleted.", deleteFailed)
);
```
However, in a many-to-many relationship, the children are not removed
and you must explicitly delete them.

