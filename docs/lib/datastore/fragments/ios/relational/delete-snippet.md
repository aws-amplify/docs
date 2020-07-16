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
