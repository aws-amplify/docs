```swift
Amplify.DataStore.save(
    Post(title: "My first post",
         description: "Amplify.DataStore is awesome!",
         status: .draft)
) {
    switch $0 {
    case .success:
        print("Created a new post successfully")
    case .failure(let error):
        print("Error creating post - \(error.localizedDescription)")
    }
}
```
