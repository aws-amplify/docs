<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.save(post, where: Post.keys.title.beginsWith("[Amplify]")) {
    switch $0 {
    case .success:
        print("Post updated successfully!")
    case .failure(let error)
        print("Could not update post, maybe the title has been changed?")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.save(post, where: Post.keys.title.beginsWith("[Amplify]"))
    .sink {
        if case let .failure(error) = $0 {
            print("Could not update post, maybe the title has been changed?")
        }
    }
    receiveValue: { _ in
        print("Post updated successfully!")
    }
```

</amplify-block>

</amplify-block-switcher>
