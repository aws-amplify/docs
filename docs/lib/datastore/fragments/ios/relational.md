## Relational Models

DataStore has the capability to handle relationships between Models, such as `Has One`, `Has Many`, `Belongs To`, and `Many To Many`. In GraphQL this is done with `@connection` as defined in the [GraphQL Transformer documentation](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection). For the examples below with DataStore use the following schema:

```graphql
type Post @model {
  id: ID!
  title: String!
  comments: [Comment] @connection(name: "PostComments")
  rating: Int!
  status: String!
}
type Comment @model {
  id: ID!
  content: String
  post: Post @connection(name: "PostComments")
}
```

## Saving relations

In order to save connected models you will create an instance of the model you wish to connect and pass it to `DataStore.save` with the parent as an argument (`post` in the below example):

```swift
let postWithComments = Post(title: "My post with comments",
                            rating: 5,
                            status: "active")

let comment = Comment(content: "Loving Amplify DataStore", post: postWithComments)

Amplify.DataStore.save(postWithComments) {
    switch $0 {
    case .failure(let err):
        print("Error adding post - \(err.localizedDescription)")
    case .success(let post):
        Amplify.DataStore.save(comment) {
            switch $0 {
            case .success:
                print("Comment saved!")
            case .failure(let err):
                print("Error adding comment - \(err.localizedDescription)")
            }
        }
    }
}
```

The above example shows how to use a one-to-many schema and save connected models. For many-to-many relations, such as the one shows in the [GraphQL Transformer examples](https://aws-amplify.github.io/docs/cli-toolchain/graphql#connection) you would do something like the following:

```swift
Amplify.DataStore.save(postWithEditors) {
    switch $0 {
    case .failure(let err):
        print("Error adding post - \(err.localizedDescription)")
    case .success:
        Amplify.DataStore.save(nadia) {
            switch $0 {
            case .failure(let err):
                print("Error adding user - \(err.localizedDescription)")
            case .success:
                Amplify.DataStore.save(postEditor) {
                    switch $0 {
                    case .failure(let err):
                        print("Error saving postEditor - \(err.localizedDescription)")
                    case .success:
                        print("Saved user, post and postEditor!")
                    }
                }
            }
        }
    }
}
```

In this case, you save instances of models from each side of the relationship and then join them together in the connecting type on a field defined with `@connection`. For the schema above this corresponds to `post: Post! @connection(fields: ["postID"])` and `editor: User! @connection(fields: ["editorID"])`.

## Querying relations

Models with one-to-many connections are lazy-loaded when accessing the property, so accessing a relation is as simple as:

```swift
if let comments = postWithComments.comments {
    for comment in comments {
        print(comment.content)
    }
}
```

Connections are a type of Swift `Collection`, which means that you can filter, map, etc:

```swift
let excitedComments = postWithComments
    .comments?
    .compactMap { $0.content }
    .filter { $0.contains("Wow!") }
```

## Observing relations

```swift
let commentsSubscription = Amplify
    .DataStore
    .publisher(for: Comment.self)
    .tryMap { try $0.decodeModel() as? Comment }
    .compactMap { $0 }
    .sink(receiveCompletion: { completion in
        if case .failure(let err) = completion {
            print("Subscription received error - \(err.localizedDescription)")
        }
    }) { comment in
        print(comment.content)
}

// When finished observing
commentsSubscription.cancel()
```

## Deleting relations

When you delete a parent object in a one to many relationship, the children will also be removed from the DataStore and mutations for this deletion will be sent over the network. For example the following operation would remove the Post with id `123` as well as any related comments:

```swift
Amplify.DataStore.delete(postWithComments) {
    switch $0 {
    case .success:
        print("Post and comments deleted!")
    case .failure(let err):
        print("Error deleting post and comments - \(err.localizedDescription)")
    }
}
```

However, in a many to many relationship the children are not removed and you must explicitly delete them.
