```swift
func uploadData() {
    let dataString = "My Data"
    let data = dataString.data(using: .utf8)!
    Amplify.Storage.uploadData(key: "myKey", data: data) { (event) in
        switch event {
        case .completed(let data):
            print("Completed: \(data)")
        case .failed(let storageError):
            print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
        case .inProcess(let progress):
            print("Progress: \(progress)")
        default:
            break
        }
    }
}
```