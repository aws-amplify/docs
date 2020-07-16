```swift
Amplify.DataStore.query(Post.self) {
    switch $0 {
    case .success(let result):
        // result will be of type [Post]
        print("Posts: \(result)")
    case .failure(let error):
        print("Error on query() for type Post - \(error.localizedDescription)")
    }
}
```

### Query by `id`

Query has an alternative signature that allows to fetch a single item by its `id`:

```swift
Amplify.DataStore.query(Post.self, byId: "123") {
    switch $0 {
    case .success(let result):
        // result will be a single object of type Post?
        print("Posts: \(result)")
    case .failure(let error):
        print("Error on query() for type Post - \(error.localizedDescription)")
    }
}
```
