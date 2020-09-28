Now you can create a custom subscription for comment creation with a specific post id:

<amplify-block-switcher>
<amplify-block name="Java">

```java
extension GraphQLRequest {
    static func onCreateComment(byPostId id: String) -> GraphQLRequest<Comment> {
        let operationName = "onCommentByPostId"
        let document = """
        subscription onCreateCommentByPostId($id:ID!) {
          \(operationName)(postCommentsId: $id) {
            content
            createdAt
            id
            postCommentsId
            updatedAt
          }
        }
        """
        return GraphQLRequest<Comment>(document: document,
                                    variables: ["id": id],
                                    responseType: Comment.self,
                                    decodePath: operationName)
    }
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
extension GraphQLRequest {
    static func onCreateComment(byPostId id: String) -> GraphQLRequest<Comment> {
        let operationName = "onCommentByPostId"
        let document = """
        subscription onCreateCommentByPostId($id:ID!) {
          \(operationName)(postCommentsId: $id) {
            content
            createdAt
            id
            postCommentsId
            updatedAt
          }
        }
        """
        return GraphQLRequest<Comment>(document: document,
                                    variables: ["id": id],
                                    responseType: Comment.self,
                                    decodePath: operationName)
    }
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
extension GraphQLRequest {
    static func onCreateComment(byPostId id: String) -> GraphQLRequest<Comment> {
        let operationName = "onCommentByPostId"
        let document = """
        subscription onCreateCommentByPostId($id:ID!) {
          \(operationName)(postCommentsId: $id) {
            content
            createdAt
            id
            postCommentsId
            updatedAt
          }
        }
        """
        return GraphQLRequest<Comment>(document: document,
                                    variables: ["id": id],
                                    responseType: Comment.self,
                                    decodePath: operationName)
    }
}
```

</amplify-block>
</amplify-block-switcher>

To listen to creation updates with the specific post using the post id, you can use the following code sample:

<amplify-block-switcher>
<amplify-block name="Java">

```java
func createSubscription() {
    subscription = Amplify.API.subscribe(request: .onCreateComment(byPostId: "12345"), valueListener: { (subscriptionEvent) in
        switch subscriptionEvent {
        case .connection(let subscriptionConnectionState):
            print("Subscription connect state is \(subscriptionConnectionState)")
        case .data(let result):
            switch result {
            case .success(let createdComment):
                print("Successfully got comment from subscription: \(createdComment)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
    }, completionListener: { (result) in
        switch result {
        case .success:
            print("Subscription has been closed successfully")
        case .failure(let apiError):
            print("Subscription has terminated with \(apiError)")
        }
    })
}
```

</amplify-block>
<amplify-block name="Kotlin">

```kotlin
func createSubscription() {
    subscription = Amplify.API.subscribe(request: .onCreateComment(byPostId: "12345"), valueListener: { (subscriptionEvent) in
        switch subscriptionEvent {
        case .connection(let subscriptionConnectionState):
            print("Subscription connect state is \(subscriptionConnectionState)")
        case .data(let result):
            switch result {
            case .success(let createdComment):
                print("Successfully got comment from subscription: \(createdComment)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
    }, completionListener: { (result) in
        switch result {
        case .success:
            print("Subscription has been closed successfully")
        case .failure(let apiError):
            print("Subscription has terminated with \(apiError)")
        }
    })
}
```

</amplify-block>
<amplify-block name="RxJava">

```java
func createSubscription() {
    subscription = Amplify.API.subscribe(request: .onCreateComment(byPostId: "12345"), valueListener: { (subscriptionEvent) in
        switch subscriptionEvent {
        case .connection(let subscriptionConnectionState):
            print("Subscription connect state is \(subscriptionConnectionState)")
        case .data(let result):
            switch result {
            case .success(let createdComment):
                print("Successfully got comment from subscription: \(createdComment)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
    }, completionListener: { (result) in
        switch result {
        case .success:
            print("Subscription has been closed successfully")
        case .failure(let apiError):
            print("Subscription has terminated with \(apiError)")
        }
    })
}
```

</amplify-block>
</amplify-block-switcher>