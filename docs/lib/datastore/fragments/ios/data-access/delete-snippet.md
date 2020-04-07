To delete an item simply pass in an instance:

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

Or specify it by ID:

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

You can also pass predicate operators to delete multiple items. 

```swift
// Coming soon...
```