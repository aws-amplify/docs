```swift
let post = Post(title: "Create an Amplify DataStore app")

Amplify.DataStore.save(post) { result in
    switch result {
    case .success:
        print("Post saved successfully!")
    case .failure(let error):
        print("Error saving post \(error)")
    }
}
```
