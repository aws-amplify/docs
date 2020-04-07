```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating > 4 && p.status == .active }) {
    switch $0 {
    case .success(let result):
        // result if of type [Post]
        print("Posts: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```

You can also write this in a compositional function manner by replacing the operators with their equivalent predicate statements such as `.gt`, `.or`, etc:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating.gt(4).and(p.status.eq(.active)) }) {
    // handle the callback like in the previous example
}
```
