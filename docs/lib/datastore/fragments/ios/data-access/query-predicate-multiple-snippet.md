<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self,
                        where: p.rating > 4 && p.status == PostStatus.published) {
    switch $0 {
    case .success(let result):
        // result of type [Post]
        print("Published posts with rating greater than 4: \(result)")
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
    where: p.rating > 4 && p.status == PostStatus.published
).sink {
    if case let .failure(error) = $0 {
        print("Error listing posts - \(error.localizedDescription)")
    }
}
receiveValue: { result in
    print("Published posts with rating greater than 4: \(result)")
}
```

</amplify-block>

</amplify-block-switcher>


You can also write this in a compositional function manner by replacing the operators with their equivalent predicate statements such as `.gt`, `.and`, etc:

<amplify-block-switcher>

<amplify-block name="Listener (iOS 11+)">

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self,
                        where: p.rating.gt(4).and(p.status.eq(PostStatus.published))) {
    // handle the callback like in the previous example
}
```

</amplify-block>

<amplify-block name="Combine (iOS 13+)">

```swift
let p = Post.keys
let sink = Amplify.DataStore.query(
    Post.self,
    where: p.rating > 4 && p.status == PostStatus.published
).sink {
    // handle the callback like in the previous example
}
```

</amplify-block>

</amplify-block-switcher>
