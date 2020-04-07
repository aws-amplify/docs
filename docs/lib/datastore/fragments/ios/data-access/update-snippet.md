```js
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let post):
        print("Updating the post \(String(describing: post))")
        if var updatedPost = post {
            updatedPost.status = .inactive
            Amplify.DataStore.save(updatedPost) { result in
                switch result {
                case .success:
                    print("Post updated!")
                case .failure(let error):
                    print("Failed to update post - \(error.localizedDescription)")
                }
            }
        }
    case .failure(let error):
        print("Post not found - \(error.localizedDescription)")
    }
}
```
