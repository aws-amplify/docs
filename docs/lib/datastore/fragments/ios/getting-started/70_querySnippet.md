<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.query(Post.self) { result in
    switch result {
    case .success(let posts):
        print("Posts retrieved successfully: \(posts)")
    case .failure(let error):
        print("Error retrieving posts \(error)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let querySink = Amplify.DataStore.query(Post.self).sink {
    if case let .failure(error) = $0 {
        print("Error retrieving posts \(error)")
    }
}
receiveValue: { posts in
    print("Posts retrieved successfully: \(posts)")
}
```

</amplify-block>

</amplify-block-switcher>
