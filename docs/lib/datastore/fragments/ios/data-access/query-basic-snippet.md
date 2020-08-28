<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.query(Post.self) {
    switch $0 {
    case .success(let result):
        // result will be of type [Post]
        print("Posts: \(result)")
    case .failure(let error):
        print("Error on query() for type Post - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.query(Post.self).sink {
    if case let .failure(error) = $0 {
        print("Error on query() for type Post - \(error.localizedDescription)")
    }
}
receiveValue: { result in
    print("Posts: \(result)")
}
```

</amplify-block>

</amplify-block-switcher>

### Query by `id`

Query has an alternative signature that allows to fetch a single item by its `id`:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let result):
        // result will be a single object of type Post?
        print("Posts: \(result)")
    case .failure(let error):
        print("Error on query() for type Post - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.query(Post.self, byId: "123").sink {
    if case let .failure(error) = $0 {
        print("Error on query() for type Post - \(error.localizedDescription)")
    }
}
receiveValue: { result in
    print("Posts: \(result)")
}
```

</amplify-block>

</amplify-block-switcher>
