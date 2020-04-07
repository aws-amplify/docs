```swift
let p = Post.keys
Amplify.DataStore.query(Post.self, where: { p.rating > 4 || p.status == .active }) {
    switch $0 {
    case .success(let result):
        // result if of type [Post]
        print("Posts: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```