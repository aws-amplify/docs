```swift
Amplify.DataStore.clear { result in
    switch result {
    case .success:
        print("DataStore cleared")
    case .failure(let error):
        print("Error clearing DataStore: \(error)")
    }
}
```
