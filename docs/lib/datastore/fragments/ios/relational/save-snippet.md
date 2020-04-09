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
