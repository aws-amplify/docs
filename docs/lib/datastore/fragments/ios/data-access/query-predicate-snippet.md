<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: p.rating > 4) {
    switch $0 {
    case .success(let result):
        print("Posts: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let p = Post.keys
let sink = Amplify.DataStore.query(Post.self, where: p.rating > 4).sink {
    if case let .failure(error) = $0 {
        print("Error listing posts - \(error.localizedDescription)")
    }
}
receiveValue: { result in
    print("Posts: \(result)")
}
```

</amplify-block>

</amplify-block-switcher>
