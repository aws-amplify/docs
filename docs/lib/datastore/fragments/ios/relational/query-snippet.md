Models with one-to-many connections are lazy-loaded when accessing the connected property, so accessing a relation is as simple as:

```swift
// assume postWithComments was fetched using Amplify.DataStore.query()
if let comments = postWithComments.comments {
    for comment in comments {
        print(comment.content)
    }
}
```

The connected properties are of type `List<M>`, where `M` is the model type, and that type is a custom [Swift Collection](https://developer.apple.com/documentation/swift/collection), which means that you can `filter`, `map`, etc:

```swift
let excitedComments = postWithComments
    .comments?
    .compactMap { $0.content }
    .filter { $0.contains("Wow!") }
```
