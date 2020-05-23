```swift
func uploadData() {
    let dataString = "Example file contents"
    let data = dataString.data(using: .utf8)!
    
    Amplify.Storage.uploadData(key: "ExampleKey", data: data) { (event) in
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