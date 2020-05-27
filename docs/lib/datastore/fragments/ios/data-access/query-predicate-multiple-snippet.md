```swift
let p = Post.keys
Amplify.DataStore.query(Post.self,
                        where: p.title ~= "Amplify" && p.description != nil) {
    switch $0 {
    case .success(let result):
        // result if of type [Post]
        print("Posts: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```

You can also write this in a compositional function manner by replacing the operators with their equivalent predicate statements such as `.ne`, `.or`, etc:

```swift
let p = Post.keys
Amplify.DataStore.query(Post.self,
                        where: p.title.beginsWith("Amplify").and(p.description.ne(nil)) }) {
    // handle the callback like in the previous example
}
```
