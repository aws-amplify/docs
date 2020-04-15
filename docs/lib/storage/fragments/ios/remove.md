Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key:

```swift
Amplify.Storage.remove(key: "myKey") { event in
    switch event {
    case let .completed(data):
        print("Completed: Deleted \(data)")
    case let .failed(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    case let .inProcess(progress):
        print("Progress: \(progress)")
    default:
        break
    }
}
```
