<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.query(Post.self, sort: .ascending(Post.keys.rating)) {
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
let sink = Amplify.DataStore.query(Post.self, sort: .ascending(Post.keys.rating)).sink {
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