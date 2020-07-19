Subscribe to mutations for creating real-time clients.

Because the lifetime of the subscription will last longer than the lifetime of a single function, you can create an instance variable at the top of your class:
```swift
var subscription: GraphQLSubscriptionOperation<Todo>?
```

To listen to creation updates, you can use the following code sample:
```swift
func createSubscription() {
    subscription = Amplify.API.subscribe(request: .subscription(of: Todo.self, type: .onCreate), valueListener: { (subscriptionEvent) in
        switch subscriptionEvent {
        case .connection(let subscriptionConnectionState):
            print("Subscription connect state is \(subscriptionConnectionState)")
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
}
```

Finally, to unsubscribe to updates, you can call `cancel()` on the subscription
```swift
func cancelSubscription() {
    // Cancel the subscription listener when you're finished with it
    subscription?.cancel();
}
```
