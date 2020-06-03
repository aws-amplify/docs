```swift
Amplify.DataStore.delete(post) {
    switch $0 {
    case .success:
        print("Post deleted!")
    case .failure(let error):
        print("Error deleting post - \(error.localizedDescription)")
    }
}
```

A delete can also be achieved by a `type` and its `id`.

```swift
Amplify.DataStore.delete(Post.self, withId: "123") {
    switch $0 {
    case .success:
        print("Post deleted!")
    case .failure(let error):
        print("Error deleting post - \(error.localizedDescription)")
    }
}
```
