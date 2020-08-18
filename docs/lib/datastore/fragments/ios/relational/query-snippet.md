Models with one-to-many connections are lazy-loaded when accessing the connected property, so accessing a relation is as simple as:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let post):
        if let postWithComments = post {
            if let comments = postWithComments.comments {
                for comment in comments {
                    print(comment.content)
                }
            }
        } else {
            print("Post not found")
        }
    case .failure(let error):
        print("Post not found - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.query(Post.self, byId: "123")
    .compactMap { $0?.comments }
    .flatMap { $0.loadAsPublisher() }
    .sink {
        if case let .failure(error) = $0 {
            print("Error retrieving post \(error.localizedDescription)")
        }
    }
    receiveValue: {
        for comment in $0 {
            print(comment.content)
        }
    }
```

</amplify-block>

</amplify-block-switcher>

The connected properties are of type `List<M>`, where `M` is the model type, and that type is a custom [Swift Collection](https://developer.apple.com/documentation/swift/collection), which means that you can `filter`, `map`, etc:

```swift
let excitedComments = postWithComments
    .comments?
    .compactMap { $0.content }
    .filter { $0.contains("Wow!") }
```
