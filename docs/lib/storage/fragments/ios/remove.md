Delete an object uploaded to S3 by using `Amplify.Storage.remove` and specify the key:

```swift
_ = Amplify.Storage.remove(key: "myKey") { event in
    switch event {
    case let .success(data):
        print("Completed: Deleted \(data)")
    case let .failure(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    }
}
```
