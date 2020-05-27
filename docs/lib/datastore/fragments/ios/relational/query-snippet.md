Models with one-to-many connections are lazy-loaded when accessing the connected property, so accessing a relation is as simple as:

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

The connected properties are of type `List<M>`, where `M` is the model type, and that type is a custom [Swift Collection](https://developer.apple.com/documentation/swift/collection), which means that you can `filter`, `map`, etc:

```swift
let excitedComments = postWithComments
    .comments?
    .compactMap { $0.content }
    .filter { $0.contains("Wow!") }
```
