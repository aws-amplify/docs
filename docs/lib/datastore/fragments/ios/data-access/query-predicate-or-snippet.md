<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self,
                        where: { p.rating == nil || p.status == PostStatus.draft }) {
    switch $0 {
    case .success(let result):
        // result of type [Post]
        print("Posts in draft or without rating: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let p = Post.keys
let sink = Amplify.DataStore.query(
    Post.self,
    where: { p.rating == nil || p.status == PostStatus.draft }
).sink {
    if case let .failure(error) = $0 {
        print("Error listing posts - \(error.localizedDescription)")
    }
}
receiveValue: { result in
    // result of type [Post]
    print("Posts in draft or without rating: \(result)")
}
```

</amplify-block>

</amplify-block-switcher>
