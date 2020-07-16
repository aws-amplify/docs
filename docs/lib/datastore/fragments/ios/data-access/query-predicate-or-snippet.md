```swift
let p = Post.keys
Amplify.DataStore.query(Post.self,
                        where: { p.rating == nil || p.status == PostStatus.draft }) {
    switch $0 {
    case .success(let result):
        // result of type [Post]
        print("Posts in draft or without rating: \(result)")
    case .failure(let error):
        print("Error listing posts - \(error.localizedDescription)")
    }
}
```