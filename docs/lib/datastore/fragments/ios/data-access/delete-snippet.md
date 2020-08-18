<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

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

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.delete(post).sink {
    if case let .failure(error) = $0 {
        print("Fetch session failed with error \(error)")
    }
}
receiveValue: {
    print("Post deleted!")
}
```

</amplify-block>

</amplify-block-switcher>

A delete can also be achieved by a `type` and its `id`.

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

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

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.delete(Post.self, withId: "123").sink {
    if case let .failure(error) = $0 {
        print("Error deleting post - \(error.localizedDescription)")
    }
}
receiveValue: {
    print("Post deleted!")
}
```

</amplify-block>

</amplify-block-switcher>
