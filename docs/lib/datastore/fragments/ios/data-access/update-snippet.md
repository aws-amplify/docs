```swift
let existingPost: Post = /* get an existing post */
existingPost.title = "[updated] My first post"

Amplify.DataStore.save(existingPost) {
    switch $0 {
    case .success:
        print("Updated the existing post")
    case .failure(let error):
        print("Error updating post - \(error.localizedDescription)")
    }
}
```
