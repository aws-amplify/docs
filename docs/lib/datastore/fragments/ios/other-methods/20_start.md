```swift
Amplify.DataStore.start { result in
    switch result {
    case .success:
        print("DataStore started")
    case .failure(let error):
        print("Error starting DataStore: \(error)")
    }
}
```
