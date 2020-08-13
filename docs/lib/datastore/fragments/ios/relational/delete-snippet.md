<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let postWithComments):
        // postWithComments might be nil, unwrap the optional appropriately
        Amplify.DataStore.delete(postWithComments!) { deleteResult in
            switch deleteResult {
            case .success:
                print("Post with id 123 deleted with success")
            case .failure(let error):
                print("Error deleting post and comments - \(error.localizedDescription)")
            }
        }
    case .failure(let error):
        print("Error fetching post with id 123 - \(error.localizedDescription)")
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let sink = Amplify.DataStore.query(Post.self, byId: "123")
    // postWithComments might be nil, unwrap the optional appropriately
    .compactMap { $0 }
    .flatMap { postWithComments in
        Amplify.DataStore.delete(postWithComments)
    }
    .sink {
        if case let .failure(error) = $0 {
            print("Error deleting post and comments - \(error.localizedDescription)")
        }
    }
    receiveValue: {
        print("Post with id 123 deleted with success")
    }
```

</amplify-block>

</amplify-block-switcher>
