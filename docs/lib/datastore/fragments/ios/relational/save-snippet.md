<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let postWithComments = Post(title: "My post with comments",
                            rating: 5,
                            status: .active)

let comment = Comment(content: "Loving Amplify DataStore", post: postWithComments)

Amplify.DataStore.save(postWithComments) { postResult in
    switch postResult {
    case .failure(let error):
        print("Error adding post - \(error.localizedDescription)")
    case .success:
        Amplify.DataStore.save(comment) { commentResult in
            switch commentResult {
            case .success:
                print("Comment saved!")
            case .failure(let error):
                print("Error adding comment - \(error.localizedDescription)")
            }
        }
    }
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let postWithComments = Post(title: "My post with comments",
                            rating: 5,
                            status: .active)

let comment = Comment(content: "Loving Amplify DataStore", post: postWithComments)

let sink = Amplify.DataStore.save(postWithComments)
    .flatMap { Amplify.DataStore.save(comment) }
    .sink {
        if case let .failure(error) = $0 {
            print("Error adding post and comment - \(error.localizedDescription)")
        }
    }
    receiveValue: {
        print("Post and comment saved!")
    }
```

</amplify-block>

</amplify-block-switcher>
