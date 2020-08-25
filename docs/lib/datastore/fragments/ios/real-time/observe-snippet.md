```swift
// In your type declaration, declare a cancellable to hold onto the subscription
var postsSubscription: AnyCancellable?

// Then in the body of your code, subscribe to the publisher
func subscribeToPosts() {
    postsSubscription = Amplify.DataStore.publisher(for: Todo.self)
        .sink {
            if case let .failure(error) = $0 {
                print("Subscription received error - \(error.localizedDescription)")
            }
        }
        receiveValue: { changes in
            // handle incoming changes
            print("Subscription received mutation: \(changes)")
        }
}

// Then, when you're finished observing, cancel the subscription
func unsubscribeFromPosts() {
    postsSubscription?.cancel()
}
```

<amplify-callout>

This API is built on top of the [Combine framework](https://developer.apple.com/documentation/combine); therefore, it is only available on iOS 13 or higher.

The `publisher(for:)` API returns a standard [AnyPublisher](https://developer.apple.com/documentation/combine/anypublisher).

</amplify-callout>
