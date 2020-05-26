Subscribe to mutations for creating real-time clients.

```swift
var subscription: GraphQLSubscriptionOperation<Todo>?

func onCreateSubscription() {
    subscription = Amplify.API.subscribe(request: .subscription(of: Todo.self, type: .onCreate), valueListener: { (subscriptionEvent) in
        switch subscriptionEvent {
        case .connection(let subscriptionConnectionState):
            print("Subsription connect state is \(subscriptionConnectionState)")
        case .data(let result):
            switch result {
            case .success(let createdTodo):
                print("Successfully got todo from subscription: \(createdTodo)")
            case .failure(let error):
                print("Got failed result with \(error.errorDescription)")
            }
        }
    }) { result in
        switch result {
        case .success:
            print("Subscription has been closed successfully")
        case .failure(let apiError):
            print("Subscription has terminated with \(apiError)")
        }
    }

    // Cancel the subscription listener when you're finished with it
    subscription?.cancel();
}
```
