```swift
Amplify.DataStore.query(Post.self) { result in
    switch result {
    case .success(let posts):
        print("Posts retrieved successfully: \(posts)")
    case .failure(let error):
        print("Error retrieving posts \(error)")
    }
}
```
