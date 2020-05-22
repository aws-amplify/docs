```swift
func uploadData() {
    let dataString = "My Data"
    let data = dataString.data(using: .utf8)!
    _ = Amplify.Storage.uploadData(key: "myKey", data: data, 
        progressListener: { progress in
            print(progress)
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