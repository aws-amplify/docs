```swift
Amplify.DataStore.save(
    Post(title: "My First Post",
         rating: 10,
         status: .active)
) {
    switch $0 {
    case .success:
        print("Added post")
    case .failure(let error):
        print("Error adding post - \(error.localizedDescription)")
    }
}
```
