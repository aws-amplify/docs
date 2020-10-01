<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let existingPost: Post = /* get an existing post */
existingPost.title = "[updated] My first post"

Amplify.DataStore.save(existingPost) {
    switch $0 {
    case .success:
        print("Updated the existing post")
    case .failure(let error):
        print("Error updating post - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let existingPost: Post = /* get an existing post */
existingPost.title = "[updated] My first post"

let saveSink = Amplify.DataStore.save(existingPost).sink {
    if case let .failure(error) = $0 {
        print("Error updating post - \(error.localizedDescription)")
    }
}
receiveValue: {
    print("Updated the existing post")
}
```

</amplify-block>

</amplify-block-switcher>
