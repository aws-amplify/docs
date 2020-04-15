You can list all of the objects uploaded:

```swift
Amplify.Storage.list { event in
    switch event {
    case let .completed(listResult):
        print("Completed")
        listResult.items.forEach { item in
            print("Key: \(item.key)")
        }
    case let .failed(storageError):
        print("Failed: \(storageError.errorDescription). \(storageError.recoverySuggestion)")
    case let .inProcess(progress):
        print("Progress: \(progress)")
    default:
        break
    }
}
```
