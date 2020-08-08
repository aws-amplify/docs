```swift
func uploadData() {
    let dataString = "Example file contents"
    let data = dataString.data(using: .utf8)!
    _ = Amplify.Storage.uploadData(key: "ExampleKey", data: data, 
        progressListener: { progress in
            print("Progress: \(progress)")
        }, resultListener: { (event) in
            switch event {
            case .success(let data):
                print("Completed: \(data)")
            case .failure(let storageError):
                print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        }
    })
}
```
