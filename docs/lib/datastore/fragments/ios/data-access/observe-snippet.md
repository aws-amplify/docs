```swift
let postSubscription = Amplify.DataStore
    .publisher(for: Post.self)
    .sink(receiveCompletion: { completion in
        if case .failure(let error) = completion {
            print("Subscription received error - \(error.localizedDescription)")
        }
    }) { changes in
    // handle incoming changes
    print("Subscription received mutation: \(changes)")
}

// When finished observing
postSubscription.cancel()
```

<amplify-callout>

This API is built on top of the [Combine framework](https://developer.apple.com/documentation/combine); therefore, it is only available on iOS 13 or higher.

The `publisher(for:)` API returns a standard [AnyPublisher](https://developer.apple.com/documentation/combine/anypublisher).

</amplify-callout>
