```swift
// Tests only against the local state
if post.title.starts(with: "[Amplify]") {
    Amplify.DataStore.save(post) {
        // handle result
    }
}

// Only applies the update if the data in the remote backend satisfies the criteria
Amplify.DataStore.save(post, where: Post.keys.title.beginsWith("[Amplify]")) {
    // handle result
}
```
