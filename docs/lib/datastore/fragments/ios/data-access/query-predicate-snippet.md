```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: p.description != nil) {
    switch $0 {
    case .success(let result):
        print("Posts: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```