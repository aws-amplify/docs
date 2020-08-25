Subscribe to mutations for creating real-time clients.

Because the lifetime of the subscription will last longer than the lifetime of a single function, you can create an instance variable at the top of your class:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
var subscription: GraphQLSubscriptionOperation<Todo>?
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
var subscription: GraphQLSubscriptionOperation<Todo>?
var dataSink: AnyCancellable?
```

</amplify-block>

</amplify-block-switcher>


To listen to creation updates, you can use the following code sample:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

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
</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
func createSubscription() {
    subscription = Amplify.API.subscribe(request: .subscription(of: Todo.self, type: .onCreate))
    dataSink = subscription?.subscriptionDataPublisher.sink {
        if case let .failure(apiError) = $0 {
            print("Subscription has terminated with \(apiError)")
        } else {
            print("Subscription has been closed successfully")
        }
    }
    receiveValue: { result in
        switch result {
        case .success(let createdTodo):
            print("Successfully got todo from subscription: \(createdTodo)")
        case .failure(let error):
            print("Got failed result with \(error.errorDescription)")
        }
    }
}
```

</amplify-block>

</amplify-block-switcher>

### Unsubscribing from updates

#### Listener (iOS 11+)

To unsubscribe from updates, you can call `cancel()` on the subscription

```swift
func cancelSubscription() {
    // Cancel the subscription listener when you're finished with it
    subscription?.cancel();
}
```

#### Combine (iOS 13+)

With the Combine flavor of the `subscribe()` API, you have the option of canceling just the downstream Combine subscriber, or the entire GraphQL subscription.

Calling `cancel()` on the subscription will disconnect the subscription from the backend. Any downstream subscribers will also be cancelled. On the other hand, calling `cancel()` on the Combine subscriber (e.g., the `AnyCancellable` returned from `sink()` will cause that Combine subscriber to stop receiving updates, but any other attached subscribers will continue to receive subscription data. For example:

```swift
let subscription = Amplify.API.subscribe(...)
let allUpdates = subscription.subscriptionDataPublisher.sink(...)
let filteredUpdates = subscription.subscriptionDataPublisher.filter{...}.sink(...)

allUpdates.cancel() // subscription is still connected,
                    // filteredUpdates will still receive data

subscription.cancel() // subscription is now disconnected
                      // filteredUpdates will no longer receive data
```